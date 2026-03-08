import React from 'react';
import { GROUP_META, CATEGORY_ICONS } from '../../data/icons';
import type { CategoryGroup } from '../../types';

interface Props {
  group: CategoryGroup;
  iconId?: string;
  color?: string;
  size?: number | string;
  className?: string;
  strokeWidth?: number;
}

export const CategoryIcon: React.FC<Props> = ({ 
  group, 
  iconId, 
  color, 
  size = '100%', 
  className = '',
  strokeWidth = 1.8
}) => {
  const meta = GROUP_META[group] || { color: '#94a3b8', path: '' };
  const iconPath = (iconId && CATEGORY_ICONS[iconId]) || meta.path;
  const iconColor = color || meta.color;

  return (
    <svg 
      className={className}
      width={size} 
      height={size} 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke={iconColor} 
      strokeWidth={strokeWidth} 
      strokeLinecap="round" 
      strokeLinejoin="round"
    >
      <path d={iconPath} />
    </svg>
  );
};
