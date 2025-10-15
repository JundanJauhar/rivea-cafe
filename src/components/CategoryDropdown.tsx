'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';

interface Category {
  id: string;
  title: string;
  parentId?: string | null;
  items?: any[];
  subcategories?: Category[];
}

interface CategoryDropdownProps {
  isMobile?: boolean;
  onLinkClick?: () => void;
}

export default function CategoryDropdown({ isMobile = false, onLinkClick }: CategoryDropdownProps) {
  const [allCategories, setAllCategories] = useState<Category[]>([]);
  const [mainCategories, setMainCategories] = useState<Category[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [openSubmenus, setOpenSubmenus] = useState<Set<string>>(new Set());
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Fetch categories
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch('/api/categories');
        if (!response.ok) throw new Error('Failed to fetch categories');
        const data = await response.json();
        console.log('Categories fetched:', data);
        
        // Filter main categories (those without parentId)
        const main = data.filter((cat: Category) => !cat.parentId);
        
        // Attach subcategories to main categories
        const categoriesWithSubs = main.map((mainCat: Category) => ({
          ...mainCat,
          subcategories: data.filter((cat: Category) => cat.parentId === mainCat.id)
        }));
        
        setAllCategories(data);
        setMainCategories(categoriesWithSubs);
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };

    fetchCategories();
  }, []);

  const toggleSubmenu = (categoryId: string) => {
    setOpenSubmenus(prev => {
      const newSet = new Set(prev);
      if (newSet.has(categoryId)) {
        newSet.delete(categoryId);
      } else {
        newSet.add(categoryId);
      }
      return newSet;
    });
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  const handleCategoryClick = () => {
    setIsOpen(false);
    if (onLinkClick) onLinkClick();
  };

  if (isMobile) {
    // Mobile version - expandable list with subcategories
    return (
      <div>
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="w-full text-left py-2 px-4 text-gray-700 hover:bg-amber-50 hover:text-amber-700 rounded transition flex items-center justify-between"
        >
          <span>MENU</span>
          <svg 
            className={`w-4 h-4 transition-transform ${isOpen ? 'rotate-180' : ''}`}
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </button>
        {isOpen && (
          <div className="pl-2 mt-1 space-y-1">
            <Link
              href="/menu"
              className="block py-2 px-4 text-sm font-semibold text-amber-700 hover:bg-amber-50 rounded transition"
              onClick={handleCategoryClick}
              prefetch={true}
            >
              🏠 Semua Menu
            </Link>
            
            {mainCategories.map((mainCat) => (
              <div key={mainCat.id}>
                {/* Main Category */}
                <button
                  onClick={() => toggleSubmenu(mainCat.id)}
                  className="w-full text-left py-2 px-4 text-sm font-semibold text-gray-800 hover:bg-amber-50 rounded transition flex items-center justify-between"
                >
                  <span>{mainCat.title}</span>
                  <svg 
                    className={`w-3 h-3 transition-transform ${openSubmenus.has(mainCat.id) ? 'rotate-180' : ''}`}
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                
                {/* Subcategories */}
                {openSubmenus.has(mainCat.id) && mainCat.subcategories && mainCat.subcategories.length > 0 && (
                  <div className="pl-4 space-y-1">
                    {mainCat.subcategories.map((subCat) => (
                      <Link
                        key={subCat.id}
                        href={`/menu?category=${encodeURIComponent(subCat.title)}`}
                        className="block py-2 px-4 text-xs text-gray-600 hover:bg-amber-50 hover:text-amber-700 rounded transition"
                        onClick={handleCategoryClick}
                        prefetch={true}
                      >
                        • {subCat.title}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    );
  }

  // Desktop version - dropdown with nested categories like Starbucks
  return (
    <div ref={dropdownRef} className="relative group">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="text-gray-700 hover:text-amber-700 transition flex items-center gap-1 font-medium"
      >
        <span>MENU</span>
        <svg 
          className={`w-4 h-4 transition-transform ${isOpen ? 'rotate-180' : ''}`}
          fill="none" 
          stroke="currentColor" 
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>
      
      {isOpen && (
        <div className="absolute top-full left-0 mt-2 w-80 bg-white rounded-lg shadow-xl border border-gray-200 py-3 z-50 max-h-[500px] overflow-y-auto">
          <Link
            href="/menu"
            className="block px-5 py-2 text-sm font-semibold text-amber-700 hover:bg-amber-50 transition"
            onClick={handleCategoryClick}
            prefetch={true}
          >
            🏠 Semua Menu
          </Link>
          <div className="border-t border-gray-200 my-2"></div>
          
          {mainCategories.map((mainCat) => (
            <div key={mainCat.id} className="mb-3">
              {/* Main Category Header */}
              <div className="px-5 py-1">
                <h3 className="text-xs font-bold text-gray-900 uppercase tracking-wider">
                  {mainCat.title}
                </h3>
              </div>
              
              {/* Subcategories */}
              {mainCat.subcategories && mainCat.subcategories.length > 0 && (
                <div className="space-y-0.5">
                  {mainCat.subcategories.map((subCat) => (
                    <Link
                      key={subCat.id}
                      href={`/menu?category=${encodeURIComponent(subCat.title)}`}
                      className="block px-7 py-2 text-sm text-gray-700 hover:bg-amber-50 hover:text-amber-700 transition"
                      onClick={handleCategoryClick}
                      prefetch={true}
                    >
                      {subCat.title}
                    </Link>
                  ))}
                </div>
              )}
              
              {mainCat !== mainCategories[mainCategories.length - 1] && (
                <div className="border-t border-gray-100 mt-2"></div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
