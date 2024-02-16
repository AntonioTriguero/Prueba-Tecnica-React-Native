import React, { useState, useEffect } from 'react';
import { View, FlatList, Text, TouchableOpacity, Button, StyleSheet } from 'react-native';
import { globalState } from './state';

const BookList = ({ navigation }) => {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const data = await globalState.fetchBooks();
      if (data) {
        setBooks(data);
      }
    };
    fetchData();
  }, [books]); // Include books as a dependency

  const handleBookPress = (book) => {
    if (book && typeof book === 'object') {
      console.log('Detalles del libro seleccionado:', JSON.stringify(book));
      navigation.navigate('BookDetails', { book });
    } else {
      console.error('El objeto book no es válido:', book);
    }
  };

  const handleAddBookPress = async () => {
    navigation.navigate('AddBookForm');
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={books}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.bookItem}
            onPress={() => handleBookPress(item)}
          >
            <Text style={styles.bookTitle}>{item.title}</Text>
          </TouchableOpacity>
        )}
      />
      <Button title="Add Book" onPress={handleAddBookPress} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f0f0',
    padding: 16,
  },
  bookItem: {
    marginBottom: 8,
    padding: 12,
    backgroundColor: '#ffffff',
    borderRadius: 8,
  },
  bookTitle: {
    fontSize: 18,
    color: '#333',
  },
});

export default BookList;
