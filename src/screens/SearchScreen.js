import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import SearchBar from '../components/SearchBar';
import ResultList from '../components/ResultList';
import EmptySearchState from '../components/EmptySearchState';
import useSearch from '../hooks/useSearch';

const SearchScreen = () => {
  const {
    searchQuery,
    setSearchQuery,
    searchResults,
    isSearching,
    hasResults,
    showAllData
  } = useSearch();

  const renderContent = () => {
    if (showAllData) {
      return <ResultList data={searchResults} />;
    }
    
    if (isSearching && hasResults) {
      return <ResultList data={searchResults} />;
    }
    
    if (isSearching && !hasResults) {
      return <EmptySearchState message="No results found" />;
    }
    
    return <ResultList data={searchResults} />;
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>GigGap Search</Text>
        <Text style={styles.subtitle}>Find categories and users</Text>
      </View>
      
      <SearchBar
        value={searchQuery}
        onChangeText={setSearchQuery}
        placeholder="Search categories and users..."
      />
      
      {renderContent()}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  header: {
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 10,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
  },
});

export default SearchScreen;
