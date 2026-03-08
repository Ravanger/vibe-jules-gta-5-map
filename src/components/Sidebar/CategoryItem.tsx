import React, { useCallback, useMemo } from 'react';
import type { CategoryDefinition } from '../../types';
import { useProgressStore } from '../../store/useProgressStore';
import { CategoryIcon } from '../Common/CategoryIcon';

interface Props {
  category: CategoryDefinition;
}

export const CategoryItem: React.FC<Props> = React.memo(({ category }) => {
  const setCategoryVisible = useProgressStore(state => state.setCategoryVisible);
  const visibleCategories = useProgressStore(state => state.visibleCategories);
  const isVisible = visibleCategories[category.id] ?? category.visible;
  
  const collectedMarkers = useProgressStore(state => state.collected[category.id]);
  const collectedCount = useMemo(() => collectedMarkers ? Object.keys(collectedMarkers).length : 0, [collectedMarkers]);
  const totalCount = category.markers.length;

  const toggleVisible = useCallback(() => {
    setCategoryVisible(category.id, !isVisible);
  }, [category.id, isVisible, setCategoryVisible]);

  return (
    <div 
      className="cat-item flex items-center justify-between p-2 rounded-lg hover:bg-white/5 transition-all group/cat"
      data-category-id={category.id}
    >
      <div 
        className="flex items-center gap-3 flex-1 cursor-pointer min-w-0"
        onClick={toggleVisible}
      >
        <div className="w-7 h-7 rounded-lg bg-white/5 flex items-center justify-center shrink-0 group-hover/cat:bg-white/10 transition-colors">
          <CategoryIcon 
            group={category.group} 
            iconId={category.iconId} 
            color={category.color} 
            size={16} 
          />
        </div>
        <div className="flex flex-col min-w-0">
          <span className={`cat-name text-xs font-medium truncate transition-colors ${isVisible ? 'text-gray-200' : 'text-gray-500'}`}>
            {category.name}
          </span>
          <span 
            className="text-[9px] text-gray-500 font-mono"
            data-progress-category={category.id}
          >
            {collectedCount}/{totalCount}
          </span>
        </div>
      </div>
      
      <div 
        onClick={toggleVisible}
        className={`w-8 h-4 rounded-full relative transition-colors cursor-pointer shrink-0 ${isVisible ? 'bg-blue-600' : 'bg-gray-700'}`}
      >
        <div className={`absolute top-1 w-2 h-2 rounded-full bg-white transition-all ${isVisible ? 'left-5' : 'left-1'}`} />
      </div>
    </div>
  );
});
