import React from 'react';
import { Category, getFullPrompt } from '../../data/promptCategories';

interface PromptListProps {
  category: Category;
  onPromptSelect: (prompt: string) => void;
  onBack: () => void;
}

const PromptList: React.FC<PromptListProps> = ({ category, onPromptSelect, onBack }) => {
  return (
    <div className="prompt-list-container">
      {/* Back button */}
      <button 
        className="prompt-list-back-btn"
        onClick={onBack}
      >
        ← Back
      </button>
      
      {/* Prompt list */}
      <div className="prompt-list">
        {category.prompts.map((prompt) => (
          <div
            key={prompt.id}
            className="prompt-item"
            onClick={() => onPromptSelect(getFullPrompt(prompt.text))}
          >
            {prompt.text}
          </div>
        ))}
      </div>
    </div>
  );
};

export default PromptList;