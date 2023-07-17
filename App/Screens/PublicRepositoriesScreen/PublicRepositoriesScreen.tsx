import React, { useState, useEffect } from 'react';
import { View, FlatList, TextInput, Text, Button, TouchableOpacity, Linking } from 'react-native';
import axios from 'axios';

import styles from './PublicRepositoriesScreen.style';

const RepoScreen = () => {
  const [repos, setRepos] = useState([]);
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    fetchRepos();
  }, [search, page]);

  const fetchRepos = async () => {
    try {
      let url = 'https://api.github.com/repositories';

      if (search) {
        url = `https://api.github.com/search/repositories?q=${search}`;
      }

      const response = await axios.get(url, {
        params: {
          page: page,
          per_page: 30,
        },
      });

      if (search) {
        setRepos(response.data.items);
        setTotalPages(Math.ceil(response.data.total_count / 30));
      } else {
        setRepos(response.data);
        setTotalPages(Math.ceil(response.data.length / 30));
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleSearch = (text) => {
    setSearch(text);
    setPage(1);
  };

  const handlePrevPage = () => {
    if (page > 1) {
      setPage((prevPage) => prevPage - 1);
    }
  };

  const handleNextPage = () => {
    if (page < totalPages) {
      setPage((prevPage) => prevPage + 1);
    }
  };

  const handlePressRepo = (url) => {
    Linking.openURL(url);
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        onChangeText={handleSearch}
        value={search}
        placeholder="Search for repositories..."
      />

      <FlatList
        data={repos}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }:any) => (
          <TouchableOpacity onPress={() => handlePressRepo(item.html_url)} style={styles.repoContainer}>
            <Text style={styles.repoName}>{item.name}</Text>
            <Text style={styles.repoDescription}>{item.description}</Text>
          </TouchableOpacity>
        )}
      />

      {totalPages > 1 && (
        <View style={styles.pagination}>
          <Button title="Prev" onPress={handlePrevPage} disabled={page === 1} />
          <Text style={styles.pageNumber}>{`Page ${page} / ${totalPages}`}</Text>
          <Button title="Next" onPress={handleNextPage} disabled={page === totalPages} />
        </View>
      )}
    </View>
  );
};


export default RepoScreen;