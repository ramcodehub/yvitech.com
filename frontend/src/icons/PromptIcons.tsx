// PromptIcons.tsx - Simple icon component library for the chat widget
import React from 'react';

interface IconProps {
  name: string;
  className?: string;
}

const PromptIcons: React.FC<IconProps> = ({ name, className = '' }) => {
  // Map of icon names to emojis
  const iconMap: Record<string, string> = {
    'about': '🏢',
    'services': '🛠',
    'ai': '🤖',
    'cloud': '☁️',
    'erp': '🧾',
    'contact': '📞',
    'cases': '💼',
    'pricing': '📊',
    'tech': '🧩',
    'domains': '🏭',
    'more': '➕',
  };

  const icon = iconMap[name] || '💬'; // Default icon if name not found

  return (
    <span className={className}>
      {icon}
    </span>
  );
};

export default PromptIcons;