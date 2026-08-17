#!/usr/bin/env python3
"""
Graphify setup script for any project.
- Installs graphifyy via pip
- Injects a Graphify section (marker-delimited, idempotent) into detected agent-
  instruction files: AGENTS.md (always), CLAUDE.md / .github/copilot-instructions.md /
  GEMINI.md / .cursor/rules/graphify.mdc / .windsurfrules / .clinerules / WARP.md
  (only if the file already exists)
- Adds graphify-out/ to .gitignore and all gcloudignore-style files
- Creates .graphifyignore
- Installs post-commit (+ post-checkout) git hooks via `graphify hook install`, falling
  back to a hand-rolled hook when the subcommand is unavailable or a non-graphify hook
  already exists
- Adds a Graphify section to README.md
- Runs the initial knowledge graph build (skip with --skip-build)

Usage: python setup.py [--project-root PATH] [--skip-build]
"""
import subprocess
import sys
import os

PROJECT_ROOT = None

# ---------------------------------------------------------------------------
# Constants
# ---------------------------------------------------------------------------

MARKER_START = "<!-- graphify:start -->"
MARKER_END = "<!-- graphify:end -->"

GRAPHIFY_INSTRUCTIONS = f"""\
{MARKER_START}
## Graphify Knowledge Graph

This project keeps a queryable knowledge graph of the source in `graphify-out/`
(git-ignored, rebuilt after each commit). Use it to navigate the code instead of
broad file searches.

Before grepping or reading many files, query the graph:

    python -m graphify query "where is the project store defined?"
    python -m graphify path "ModuleA" "ModuleB"
    python -m graphify explain "concept-name"

Read `graphify-out/GRAPH_REPORT.md` for a high-level map.
Missing graph? Build once: pip install graphifyy && python -m graphify .

> Windows: always use `python -m graphify`, never `graphify` (may not be on PATH).
{MARKER_END}"""

# Files that get the section injected — tuple: (relative path, create_if_missing)
AGENT_FILES = [
    ("AGENTS.md", True),
    ("CLAUDE.md", False),
    (".github/copilot-instructions.md", False),
    ("GEMINI.md", False),
    (".cursor/rules/graphify.mdc", False),
    (".windsurfrules", False),
    (".clinerules", False),
    ("WARP.md", False),
]

GRAPHIFYIGNORE = """\
# Node modules and installed dependencies
node_modules/
lib/

# Build outputs
public/
dist/
build/
.eggs/
*.egg-info/

# Virtual environments
venv/
env/
devenv/

# Test coverage reports
coverage/
coverage-reports/

# Graphify own output (don't analyze itself)
graphify-out/

# Git internals
.git/

# Agent skills / tooling (markdown-only, no code value)
.agents/
.claude/
.codex/

# Project docs
docs/

# Doc formats that require LLM (no tree-sitter parser)
*.md
*.markdown
*.txt
*.rst
*.html
*.htm
*.yaml
*.yml
*.sh
*.bash
*.xml
*.csv
*.ini
*.cfg
*.toml
*.conf
*.lcl

# Files that require LLM (binary/media)
*.png
*.jpg
*.jpeg
*.gif
*.webp
*.svg
*.ico
*.bmp
*.tiff
*.tif
*.pdf
*.mp4
*.mov
*.mp3
*.wav
*.avi
*.mkv
*.webm
*.ogg
*.docx
*.xlsx
*.pptx
*.doc
*.xls
*.ppt

# Compiled artifacts
*.pyc
*.pyo
*.pyd
__pycache__/
*.map
*.snap

# Lock files
yarn.lock
package-lock.json
Pipfile.lock

# IDE metadata
.idea/
.vscode/
*.iml

# Environment / secrets
.env
.env.*
"""

# Hand-rolled post-commit hook (fallback when `graphify hook install` is unavailable
# or when a non-graphify hook already exists and we must preserve it).
POST_COMMIT_HOOK_BODY = """\
#!/bin/sh
# Regenerate Graphify knowledge graph after each commit.
# Setup (run once): pip install graphifyy && python -m graphify .
PY=$(command -v python3 2>/dev/null || command -v python 2>/dev/null)
if [ -z "$PY" ]; then
    echo "[graphify] Python not found — skipping graph update."
    exit 0
fi
if "$PY" -m graphify . --update; then
    echo "[graphify] Knowledge graph updated."
else
    echo "[graphify] Update failed. Run manually: python -m graphify ."
    echo "           Setup: pip install graphifyy && python -m graphify ."
fi
"""

README_SECTION = f"""\
## Graphify — AI Knowledge Graph

This project uses [Graphify](https://github.com/safishamsi/graphify) to generate a
queryable knowledge graph of the source code. AI coding assistants read the graph
instead of broad file searches, which reduces unnecessary reads and improves accuracy.

The graph is built locally in `graphify-out/` (git-ignored) and regenerates automatically
after each commit.

### Setup (once per machine)

Requires Python 3.12+.

```bash
pip install graphifyy
python -m graphify .
```

> **Windows note:** always use `python -m graphify`, never `graphify` directly — the
> executable may not be on PATH.

### Manual update

```bash
python -m graphify . --update
```

### Query the graph from your assistant

```
python -m graphify query "where is the projects store?"
python -m graphify path "ModuleA" "ModuleB"
python -m graphify explain "concept-name"
```
"""


# ---------------------------------------------------------------------------
# Helpers
# ---------------------------------------------------------------------------

def run(cmd, **kwargs):
    return subprocess.run(cmd, shell=True, text=True, capture_output=True, **kwargs)


def root(*parts):
    return os.path.join(PROJECT_ROOT, *parts)


def step(msg):
    print(f"\n\033[1;34m▶ {msg}\033[0m")


def ok(msg):
    print(f"  \033[32m✓\033[0m {msg}")


def warn(msg):
    print(f"  \033[33m!\033[0m {msg}")


def ensure_line_in_file(path, line):
    """Append `line` to `path` if not already present. Creates the file if needed."""
    if os.path.exists(path):
        content = open(path).read()
        if line in content:
            return False
        with open(path, "a", newline="\n") as f:
            if not content.endswith("\n"):
                f.write("\n")
            f.write(line + "\n")
    else:
        with open(path, "w", newline="\n") as f:
            f.write(line + "\n")
    return True


def upsert_section(path, body, create_if_missing=False):
    """
    Inject or update a marker-delimited section in `path`.

    - Markers present → replace content between them.
    - No markers but file exists → append the full body.
    - File absent and create_if_missing → create it with just the body.
    - File absent and not create_if_missing → skip.

    Returns: 'created' | 'updated' | 'appended' | 'skipped'
    """
    if not os.path.exists(path):
        if not create_if_missing:
            return "skipped"
        os.makedirs(os.path.dirname(path), exist_ok=True) if os.path.dirname(path) else None
        with open(path, "w", newline="\n", encoding="utf-8") as f:
            f.write(body + "\n")
        return "created"

    content = open(path, encoding="utf-8").read()

    if MARKER_START in content and MARKER_END in content:
        # Replace existing section between markers (inclusive)
        before = content[: content.index(MARKER_START)]
        after = content[content.index(MARKER_END) + len(MARKER_END):]
        new_content = before + body + after
        with open(path, "w", newline="\n", encoding="utf-8") as f:
            f.write(new_content)
        return "updated"

    # Append
    with open(path, "a", newline="\n", encoding="utf-8") as f:
        if not content.endswith("\n"):
            f.write("\n")
        f.write("\n" + body + "\n")
    return "appended"


def collect_ignore_files(project_root):
    """
    Discover all ignore files that should include graphify-out/:
    .gitignore (always), plus any *ignore* files at root or under deployables/.
    """
    import glob as globmod

    found = set()
    found.add(os.path.join(project_root, ".gitignore"))

    for f in globmod.glob(os.path.join(project_root, "*ignore*")):
        if os.path.isfile(f) and ".graphifyignore" not in f:
            found.add(f)
    for f in globmod.glob(os.path.join(project_root, ".*ignore*")):
        if os.path.isfile(f) and ".graphifyignore" not in f:
            found.add(f)

    deployables_dir = os.path.join(project_root, "deployables")
    if os.path.isdir(deployables_dir):
        for dirpath, _dirs, filenames in os.walk(deployables_dir):
            for fname in filenames:
                if "ignore" in fname.lower():
                    found.add(os.path.join(dirpath, fname))

    return sorted(found)


# ---------------------------------------------------------------------------
# Steps
# ---------------------------------------------------------------------------

def step_install():
    step("Installing graphifyy")
    result = run(f"{sys.executable} -m pip install graphifyy --quiet")
    if result.returncode == 0:
        ok("graphifyy installed (or already up to date)")
    else:
        warn(f"pip install failed: {result.stderr.strip()}")
        sys.exit(1)


def step_inject_agent_files():
    step("Injecting Graphify section into agent-instruction files")
    for rel_path, create in AGENT_FILES:
        full_path = root(rel_path)
        # Ensure parent directory exists before attempting to create the file
        parent = os.path.dirname(full_path)
        if parent and not os.path.exists(parent) and create:
            os.makedirs(parent, exist_ok=True)
        result = upsert_section(full_path, GRAPHIFY_INSTRUCTIONS, create_if_missing=create)
        if result == "skipped":
            ok(f"{rel_path} — not present, skipped")
        else:
            ok(f"{rel_path} — {result}")


def step_graphifyignore():
    step("Writing .graphifyignore")
    target = root(".graphifyignore")
    with open(target, "w", newline="\n") as f:
        f.write(GRAPHIFYIGNORE)
    ok(".graphifyignore created (code-only, no API key needed)")


def step_ignore_files():
    step("Updating ignore files (.gitignore, .gcloudignore, gcloudignore-gae, etc.)")
    ignore_files = collect_ignore_files(PROJECT_ROOT)
    for ignore_path in ignore_files:
        rel = os.path.relpath(ignore_path, PROJECT_ROOT)
        added = ensure_line_in_file(ignore_path, "graphify-out/")
        if added:
            ok(f"graphify-out/ added to {rel}")
        else:
            ok(f"graphify-out/ already in {rel}")


def step_git_hook():
    step("Installing git hook(s)")
    hooks_dir = root(".git", "hooks")
    if not os.path.isdir(hooks_dir):
        warn(".git/hooks not found — is this a git repository?")
        return

    hook_path = os.path.join(hooks_dir, "post-commit")
    existing = open(hook_path).read() if os.path.exists(hook_path) else ""

    if "graphify" in existing:
        ok("post-commit hook already has graphify — skipped")
        return

    if existing.strip():
        # Non-graphify hook exists → don't risk clobbering it with native install;
        # append our body instead.
        warn("Existing post-commit hook found — appending graphify body to preserve it")
        with open(hook_path, "a", newline="\n") as f:
            f.write("\n" + POST_COMMIT_HOOK_BODY)
        os.chmod(hook_path, 0o755)
        ok("Graphify appended to existing post-commit hook")
        return

    # No existing hook — try native `graphify hook install` first (installs both
    # post-commit and post-checkout with cross-platform Python detection).
    os.chdir(PROJECT_ROOT)
    result = run(f"{sys.executable} -m graphify hook install")
    if result.returncode == 0:
        ok("post-commit + post-checkout hooks installed via `graphify hook install`")
        return

    # Native subcommand unavailable — fall back to hand-rolled hook.
    warn("`graphify hook install` unavailable — writing hand-rolled post-commit hook")
    with open(hook_path, "w", newline="\n") as f:
        f.write(POST_COMMIT_HOOK_BODY)
    os.chmod(hook_path, 0o755)
    ok("Hand-rolled post-commit hook created (uses python3/python detection, correct --update syntax)")


def step_readme():
    step("Updating README.md")
    readme_path = root("README.md")
    if not os.path.exists(readme_path):
        ok("README.md not found — skipping")
        return

    readme = open(readme_path, encoding="utf-8").read()

    # Idempotent check: markers already present?
    if MARKER_START in readme:
        ok("README.md already has Graphify section — skipped")
        return

    # Loose substring check for legacy installs without markers
    if "graphify" in readme.lower() and "graphify-out" in readme.lower():
        ok("README.md already mentions graphify — skipped")
        return

    ci_heading = "\n## CI/CD"
    marked_section = f"\n{MARKER_START}\n{README_SECTION.strip()}\n{MARKER_END}\n"
    if ci_heading in readme:
        readme = readme.replace(ci_heading, marked_section + ci_heading)
    else:
        readme = readme.rstrip() + "\n\n" + marked_section.strip() + "\n"

    with open(readme_path, "w", newline="\n", encoding="utf-8") as f:
        f.write(readme)
    ok("Graphify section added to README.md")


def step_initial_build(skip_build):
    if skip_build:
        ok("Initial build skipped (--skip-build)")
        return
    step("Building initial knowledge graph (code-only, no API key needed)")
    print("  This may take a few minutes on large projects…")
    result = run(f"{sys.executable} -m graphify .", **{"capture_output": False})
    if result.returncode == 0:
        ok("Knowledge graph built in graphify-out/")
    else:
        warn("Initial build failed. Check output above.")
        warn("Retry manually: python -m graphify .")


# ---------------------------------------------------------------------------
# Main
# ---------------------------------------------------------------------------

def main():
    global PROJECT_ROOT

    args = sys.argv[1:]
    skip_build = "--skip-build" in args
    if "--project-root" in args:
        idx = args.index("--project-root")
        PROJECT_ROOT = os.path.abspath(args[idx + 1])
    else:
        PROJECT_ROOT = os.getcwd()

    print(f"\n\033[1mGraphify setup — {PROJECT_ROOT}\033[0m")

    step_install()
    step_inject_agent_files()
    step_graphifyignore()
    step_ignore_files()
    step_git_hook()
    step_readme()
    step_initial_build(skip_build)

    print("\n\033[1;32m✓ Graphify setup complete.\033[0m")
    print("  Each teammate runs once: pip install graphifyy && python setup.py")
    print("  Graph auto-updates after every git commit.\n")


if __name__ == "__main__":
    main()
