import React, { useState } from 'react';
import { CATEGORIES, MORE_CATEGORIES, Category, getFullPrompt } from '../../data/promptCategories';

interface InitialScreenProps {
  onExampleClick: (prompt: string) => void;
}

const InitialScreen: React.FC<InitialScreenProps> = ({ onExampleClick }) => {
  const [view, setView] = useState<'main' | 'more' | 'category'>('main');
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(null);

  const handleCategoryClick = (category: Category) => {
    setSelectedCategory(category);
    setView('category');
  };

  const handleBackToMain = () => {
    setView('main');
    setSelectedCategory(null);
  };

  const handleBackToCategories = () => {
    setView('more');
  };

  const renderMainCategories = () => (
    <div className="initial-screen flex flex-col items-center justify-start w-full h-full relative pt-24 pb-16">
      {/* Radial background */}
      <div className="absolute top-0 left-0 w-full h-52 bg-[radial-gradient(circle_at_top,rgba(0,0,0,0.07),transparent_70%)] pointer-events-none"></div>
      
      {/* Heading + Subtitle */}
      <h1 className="text-2xl font-bold text-gray-900 text-center mb-3">
        Welcome to YVI Assistant
      </h1>
      
      <p className="text-gray-500 text-center text-sm mb-10">
        Your intelligent assistant for everything about YVI Technologies.
        Ask me anything.
      </p>
      
      {/* Category grid */}
      <div className="w-full max-w-md px-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 w-full">
          {CATEGORIES.map((category) => (
            <button
              key={category.id}
              onClick={() => handleCategoryClick(category)}
              className="
                flex items-center justify-start gap-3
                px-4 py-3
                w-full rounded-full
                border border-gray-200 bg-white
                text-gray-900 shadow-sm
                hover:bg-gray-50 active:scale-[0.98]
                transition-all duration-200 text-left text-sm font-medium
              "
            >
              <span>{category.icon}</span>
              <span>{category.title}</span>
            </button>
          ))}
          
          {/* More button */}
          <button
            onClick={() => setView('more')}
            className="
              flex items-center justify-start gap-3
              px-4 py-3
              w-full rounded-full
              border border-gray-200 bg-white
              text-gray-900 shadow-sm
              hover:bg-gray-50 active:scale-[0.98]
              transition-all duration-200 text-left text-sm font-medium
              col-span-1 sm:col-span-2
            "
          >
            <span>➕</span>
            <span>More</span>
          </button>
        </div>
      </div>
    </div>
  );

  const renderMoreCategories = () => (
    <div className="initial-screen flex flex-col items-center justify-start w-full h-full relative pt-24 pb-16">
      {/* Radial background */}
      <div className="absolute top-0 left-0 w-full h-52 bg-[radial-gradient(circle_at_top,rgba(0,0,0,0.07),transparent_70%)] pointer-events-none"></div>
      
      {/* Back button */}
      <button 
        className="mb-4 text-sm text-gray-500 hover:text-gray-800 flex items-center gap-1 self-start ml-4"
        onClick={handleBackToMain}
      >
        ← Back
      </button>
      
      {/* Heading + Subtitle */}
      <h1 className="text-2xl font-bold text-gray-900 text-center mb-3">
        More Topics
      </h1>
      
      <p className="text-gray-500 text-center text-sm mb-10">
        Explore additional areas of our expertise
      </p>
      
      {/* More categories grid */}
      <div className="w-full max-w-md px-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 w-full">
          {MORE_CATEGORIES.map((category) => (
            <button
              key={category.id}
              onClick={() => handleCategoryClick(category)}
              className="
                flex items-center justify-start gap-3
                px-4 py-3
                w-full rounded-full
                border border-gray-200 bg-white
                text-gray-900 shadow-sm
                hover:bg-gray-50 active:scale-[0.98]
                transition-all duration-200 text-left text-sm font-medium
              "
            >
              <span>{category.icon}</span>
              <span>{category.title}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );

  const renderCategoryPrompts = () => {
    if (!selectedCategory) return null;
    
    return (
      <div className="initial-screen flex flex-col items-center justify-start w-full h-full relative pt-24 pb-16">
        {/* Radial background */}
        <div className="absolute top-0 left-0 w-full h-52 bg-[radial-gradient(circle_at_top,rgba(0,0,0,0.07),transparent_70%)] pointer-events-none"></div>
        
        {/* Back button */}
        <button 
          className="mb-4 text-sm text-gray-500 hover:text-gray-800 flex items-center gap-1 self-start ml-4"
          onClick={view === 'more' ? handleBackToCategories : handleBackToMain}
        >
          ← Back
        </button>
        
        {/* Category heading */}
        <h1 className="text-2xl font-bold text-gray-900 text-center mb-3">
          {selectedCategory.title}
        </h1>
        
        <p className="text-gray-500 text-center text-sm mb-10">
          Select a prompt to get started
        </p>
        
        {/* Prompts grid */}
        <div className="w-full max-w-md px-4">
          <div className="grid grid-cols-1 gap-3 w-full">
            {selectedCategory.prompts.map((prompt) => (
              <button
                key={prompt.id}
                onClick={() => onExampleClick(getFullPrompt(prompt.text))}
                className="
                  flex items-center justify-start gap-3
                  px-4 py-3
                  w-full rounded-full
                  border border-gray-200 bg-white
                  text-gray-900 shadow-sm
                  hover:bg-gray-50 active:scale-[0.98]
                  transition-all duration-200 text-left text-sm font-medium
                "
              >
                <span>{selectedCategory.icon}</span>
                <span>{prompt.text}</span>
              </button>
            ))}
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="initial-screen flex flex-col items-center justify-start w-full h-full relative pt-24 pb-16">
      {/* Custom animation definition */}
      <style>{`
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(6px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
      
      {view === 'main' && renderMainCategories()}
      {view === 'more' && renderMoreCategories()}
      {view === 'category' && renderCategoryPrompts()}
    </div>
  );
};

export default InitialScreen;