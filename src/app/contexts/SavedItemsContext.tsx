"use client";

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

type SavedItem = {
  id: string;
  title: string;
  type: string;
  path: string;
  savedAt: Date;
};

interface SavedItemsContextType {
  savedItems: SavedItem[];
  addSavedItem: (item: Omit<SavedItem, 'id' | 'savedAt'>) => void;
  removeSavedItem: (id: string) => void;
}

const SavedItemsContext = createContext<SavedItemsContextType | undefined>(undefined);

export function SavedItemsProvider({ children }: { children: ReactNode }) {
  const [savedItems, setSavedItems] = useState<SavedItem[]>([]);

  // Load saved items from localStorage on mount
  useEffect(() => {
    const storedItems = localStorage.getItem('savedItems');
    if (storedItems) {
      try {
        const parsedItems = JSON.parse(storedItems);
        // Convert string dates back to Date objects
        const itemsWithDates = parsedItems.map((item: any) => ({
          ...item,
          savedAt: new Date(item.savedAt)
        }));
        setSavedItems(itemsWithDates);
      } catch (error) {
        console.error('Failed to parse saved items:', error);
      }
    }
  }, []);

  // Save to localStorage whenever savedItems changes
  useEffect(() => {
    localStorage.setItem('savedItems', JSON.stringify(savedItems));
  }, [savedItems]);

  const addSavedItem = (item: Omit<SavedItem, 'id' | 'savedAt'>) => {
    const newItem: SavedItem = {
      ...item,
      id: `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      savedAt: new Date()
    };
    
    setSavedItems(prev => {
      // Check if item with same path already exists
      const exists = prev.some(existingItem => existingItem.path === item.path);
      if (exists) {
        return prev; // Don't add duplicate
      }
      return [...prev, newItem];
    });
  };

  const removeSavedItem = (id: string) => {
    setSavedItems(prev => prev.filter(item => item.id !== id));
  };

  return (
    <SavedItemsContext.Provider value={{ savedItems, addSavedItem, removeSavedItem }}>
      {children}
    </SavedItemsContext.Provider>
  );
}

export function useSavedItems() {
  const context = useContext(SavedItemsContext);
  if (context === undefined) {
    throw new Error('useSavedItems must be used within a SavedItemsProvider');
  }
  return context;
}
