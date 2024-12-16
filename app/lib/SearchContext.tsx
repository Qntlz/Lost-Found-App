"use client";

import { createContext, useContext, useState, ReactNode } from "react";
import { SearchContextType, SearchProviderProps } from "./definitions";

// Define the shape of the context data

// Create the context with an initial value
const SearchContext = createContext<SearchContextType | undefined>(undefined);

// Custom hook to use the SearchContext
export const useSearch = () => {
  const context = useContext(SearchContext);
  if (!context) {
    throw new Error("useSearch must be used within a SearchProvider");
  }
  return context;
};

// Provider component
export const SearchProvider: React.FC<SearchProviderProps> = ({ children }) => {
  const [searchQuery, setSearchQuery] = useState<string>("");

  // Function to update the search query
  const updateSearch = (query: string) => {
    setSearchQuery(query);
  };

  return (
    <SearchContext.Provider value={{ searchQuery, updateSearch }}>
      {children}
    </SearchContext.Provider>
  );
};
