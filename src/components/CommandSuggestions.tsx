import React from 'react';

type Suggestion = {
  command: string;
  description: string;
};

type CommandSuggestionsProps = {
  suggestions: Suggestion[];
  selectedIndex: number;
  onSelect: (command: string) => void;
  visible: boolean;
};

const CommandSuggestions: React.FC<CommandSuggestionsProps> = ({
  suggestions,
  selectedIndex,
  onSelect,
  visible,
}) => {
  if (!visible || suggestions.length === 0) return null;

  return (
    <div className="absolute z-10 w-full mt-1 bg-[#282c34] border border-[#3e4451] rounded-md shadow-lg">
      <ul className="py-1">
        {suggestions.map((suggestion, index) => (
          <li
            key={suggestion.command}
            className={`px-4 py-2 text-sm cursor-pointer flex justify-between ${
              index === selectedIndex
                ? 'bg-[#3e4451] text-white'
                : 'text-[#abb2bf] hover:bg-[#2c313a]'
            }`}
            onClick={() => onSelect(suggestion.command)}
          >
            <span className="text-[#61afef] font-mono">{suggestion.command}</span>
            <span className="text-[#5c6370] ml-4">{suggestion.description}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CommandSuggestions;
