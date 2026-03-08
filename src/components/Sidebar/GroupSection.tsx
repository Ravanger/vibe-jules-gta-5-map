import React, { useCallback, useMemo } from 'react';
import type { CategoryDefinition, CategoryGroup } from '../../types';
import { useProgressStore } from '../../store/useProgressStore';
import { CategoryItem } from './CategoryItem';
import { CategoryIcon } from '../Common/CategoryIcon';

interface Props {
  group: CategoryGroup;
  categories: CategoryDefinition[];
  search: string;
}

export const GroupSection: React.FC<Props> = React.memo(({ group, categories, search }) => {
  const setCategoryVisible = useProgressStore(state => state.setCategoryVisible);
  const visibleCategories = useProgressStore(state => state.visibleCategories);
  const storedExpanded = useProgressStore(state => state.expandedGroups[group] ?? true);
  const toggleGroupExpanded = useProgressStore(state => state.toggleGroupExpanded);

  // If we are searching, we force-expand all groups that have matches
  const isExpanded = search ? true : storedExpanded;

  const allVisible = useMemo(() => {
    return categories.every(c => visibleCategories[c.id] ?? c.visible);
  }, [categories, visibleCategories]);

  const handleToggleAll = useCallback((e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    const next = !allVisible;
    categories.forEach(c => setCategoryVisible(c.id, next));
  }, [allVisible, categories, setCategoryVisible]);

  const toggleExpanded = useCallback(() => {
    toggleGroupExpanded(group);
  }, [group, toggleGroupExpanded]);

  return (
    <div className="cat-group mb-2 border border-[#1e1e2d] rounded-xl overflow-hidden shadow-lg bg-[#0c0c18]/50 ring-1 ring-white/5">
      <div 
        onClick={toggleExpanded}
        className="cat-group-hd w-full flex items-center gap-3 p-3 bg-white/5 hover:bg-white/10 transition-colors text-left cursor-pointer"
        aria-expanded={isExpanded}
        data-ghd={group}
      >
        <span className={`chev w-4 h-4 text-gray-400 transition-transform ${isExpanded ? '' : '-rotate-90'}`}>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M6 9l6 6 6-6"/></svg>
        </span>
        <CategoryIcon group={group} size={20} />
        <span className="group-name text-sm font-semibold text-gray-200">{group}</span>
        <span className="group-count text-[10px] bg-gray-800 text-gray-400 px-1.5 py-0.5 rounded-full ml-auto">{categories.length}</span>
        <div 
          onClick={handleToggleAll}
          className={`gtoggle-btn text-[10px] font-bold px-2 py-1 rounded transition-all ml-2 cursor-pointer select-none ${allVisible ? 'bg-blue-600/20 text-blue-400 border border-blue-600/30' : 'bg-gray-800 text-gray-500 border border-transparent'}`}
        >
          {allVisible ? 'HIDE' : 'SHOW'}
        </div>
      </div>

      <div 
        data-gbody={group}
        className={`cat-group-body p-2 space-y-1 transition-all duration-200 ${isExpanded ? 'block' : 'hidden group-body--closed'}`}
      >
        {categories.map(c => (
          <CategoryItem key={c.id} category={c} />
        ))}
      </div>
    </div>
  );
});
