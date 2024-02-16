// BookDetails.js

import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';

const BookDetails = ({ route, navigation }) => {
  const { book } = route.params;

  const handleEditBook = () => {
    navigation.navigate('EditBookForm', { book });
  };

  const handleDeleteBook = async () => {
    try {
      const response = await fetch(`http://192.168.31.225:3000/books/${book.id}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        console.error('Error al eliminar el libro. Código de estado:', response.status);
        return;
      }

      console.log('Libro eliminado con éxito.');

      // Volver a la pantalla anterior
      navigation.goBack();
    } catch (error) {
      console.error('Error al eliminar el libro:', error.message);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Title: {book.title}</Text>
      <Text style={styles.label}>Author: {book.author}</Text>
      <Text style={styles.label}>Year: {book.year}</Text>

      <View style={styles.buttonContainer}>
        <Button title="Edit Book" onPress={handleEditBook} />
      </View>

      <View style={styles.buttonContainer}>
        <Button title="Delete Book" onPress={handleDeleteBook} />
      </View>
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
  buttonContainer: {
    marginTop: 20, // Add space between buttons
  },
});

export default BookDetails;
