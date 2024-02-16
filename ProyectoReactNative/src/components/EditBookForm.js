// EditBookForm.js

import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';

const EditBookForm = ({ route, navigation }) => {
  const { book, updateBookList } = route.params;

  const [editedBook, setEditedBook] = useState({ ...book });

  const handleSaveChanges = async () => {
    try {
      if (!book) {
        console.error('No se pudo obtener el libro para editar.');
        return;
      }

      const response = await fetch(`http://192.168.31.225:3000/books/${book.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(editedBook),
      });

      if (!response.ok) {
        console.error('Error al guardar los cambios en el libro. Código de estado:', response.status);
        return;
      }

      console.log('Cambios guardados con éxito.');

      if (updateBookList) {
        updateBookList(); // Llama a la función para actualizar la lista de libros si está disponible
      }

      // Actualizar manualmente los detalles del libro
      navigation.navigate('BookDetails', { book: editedBook });
    } catch (error) {
      console.error('Error al guardar los cambios en el libro:', error.message);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Title:</Text>
      <TextInput
        style={styles.input}
        value={editedBook.title}
        onChangeText={(text) => setEditedBook({ ...editedBook, title: text })}
      />

      <Text style={styles.label}>Author:</Text>
      <TextInput
        style={styles.input}
        value={editedBook.author}
        onChangeText={(text) => setEditedBook({ ...editedBook, author: text })}
      />

      <Text style={styles.label}>Year:</Text>
      <TextInput
        style={styles.input}
        value={editedBook.year}
        onChangeText={(text) => setEditedBook({ ...editedBook, year: text })}
      />

      <Button title="Save Changes" onPress={handleSaveChanges} />
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

export default EditBookForm;
