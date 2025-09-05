import { useState, useEffect, useCallback, useMemo } from 'react';
import data from '../../data.json';

const CONFIG = {
  DEBOUNCE_DELAY: 300,
  MIN_SEARCH_LENGTH: 3,
  SEARCH_TYPES: {
    USERS: 'users',
    CATEGORIES: 'categories'
  },
  SECTION_TITLES: {
    USERS: 'Usernames',
    CATEGORIES: 'Categories'
  }
};


const transformToSectionData = (users, categories) => {
  const sections = [];

  if (users.length > 0) {
    sections.push({
      title: CONFIG.SECTION_TITLES.USERS,
      data: users,
      type: CONFIG.SEARCH_TYPES.USERS
    });
  }

  if (categories.length > 0) {
    sections.push({
      title: CONFIG.SECTION_TITLES.CATEGORIES,
      data: categories,
      type: CONFIG.SEARCH_TYPES.CATEGORIES
    });
  }

  return sections;
};


const useSearch = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [debouncedQuery, setDebouncedQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [isSearching, setIsSearching] = useState(false);

  
  const getAllData = useMemo(() => {
    return transformToSectionData(data.users, data.categories);
  }, []);

  const performSearch = useCallback((query) => {
    const lowerQuery = query.toLowerCase();

    const matchingUsers = data.users.filter((item) => item.toLowerCase().includes(lowerQuery));
    const matchingCategories = data.categories.filter((item) => item.toLowerCase().includes(lowerQuery));

    const results = transformToSectionData(matchingUsers, matchingCategories);
    setSearchResults(results);
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (searchQuery.length >= CONFIG.MIN_SEARCH_LENGTH) {
        setDebouncedQuery(searchQuery);
        setIsSearching(true);
      } else {
        setDebouncedQuery('');
        setIsSearching(false);
      }
    }, CONFIG.DEBOUNCE_DELAY);

    return () => clearTimeout(timer);
  }, [searchQuery]);


  useEffect(() => {
    if (debouncedQuery.length >= CONFIG.MIN_SEARCH_LENGTH) {
      performSearch(debouncedQuery);
    } else {
      setSearchResults(getAllData);
    }
  }, [debouncedQuery, performSearch, getAllData]);


  const hasResults = useMemo(() => searchResults.length > 0, [searchResults]);
  const showAllData = useMemo(() =>
    !isSearching && searchQuery.length < CONFIG.MIN_SEARCH_LENGTH,
    [isSearching, searchQuery.length]
  );

  return {
    searchQuery,
    setSearchQuery,
    searchResults,
    isSearching,
    hasResults,
    showAllData,
    config: CONFIG
  };
};

export default useSearch;
