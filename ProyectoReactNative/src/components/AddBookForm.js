import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import { globalState } from './state';

const AddBookForm = ({ navigation }) => {
  const [bookData, setBookData] = useState({ title: '', author: '', year: '' });

  const handleAddBook = async () => {
    console.log('Añadiendo libro:', bookData);

    try {
      const response = await fetch('http://192.168.31.225:3000/books', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(bookData),
      });

      if (!response.ok) {
        console.error('Error al agregar el libro. Código de estado:', response.status);
        return;
      }

      console.log('Libro agregado con éxito.');

      // Update BookList after successful addition
      const data = await globalState.fetchBooks();
      if (data) {
        navigation.navigate('BookList'); // Navigate back to BookList
      }
    } catch (error) {
      console.error('Error al agregar el libro:', error.message);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Title:</Text>
      <TextInput
        style={styles.input}
        value={bookData.title}
        placeholder="Enter title"
        onChangeText={(text) => setBookData({ ...bookData, title: text })}
      />

      <Text style={styles.label}>Author:</Text>
      <TextInput
        style={styles.input}
        value={bookData.author}
        placeholder="Enter author"
        onChangeText={(text) => setBookData({ ...bookData, author: text })}
      />

      <Text style={styles.label}>Year:</Text>
      <TextInput
        style={styles.input}
        value={bookData.year}
        placeholder="Enter year"
        onChangeText={(text) => setBookData({ ...bookData, year: text })}
      />

      <Button title="Add Book" onPress={handleAddBook} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f0f0',
    padding: 16,
  },
  label: {
    fontSize: 18,
    color: '#333',
    marginBottom: 8,
  },
  input: {
    fontSize: 16,
    padding: 8,
    marginBottom: 16,
    backgroundColor: '#ffffff',
    borderRadius: 8,
    color: '#333',
  },
});

export default AddBookForm;
