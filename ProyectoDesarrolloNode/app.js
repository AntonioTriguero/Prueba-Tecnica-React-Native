const express = require('express');
const admin = require('firebase-admin');
const cors = require('cors'); // Importar el módulo CORS

const app = express();
const port = 3000;

app.use(express.json());

// Configurar Firebase
const serviceAccount = require('./credentials/proyectodesarrollonode-firebase-adminsdk-1tfro-e5fbd24312.json');
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: 'https://proyectodesarrollonode.firebaseio.com',
});

// Configurar CORS para permitir solicitudes solo desde la dirección IP de tu máquina virtual
app.use(cors({
  origin: 'http://192.168.31.225:3000',
}));

// Rutas
app.get('/books', async (req, res) => {
  try {
    const snapshot = await admin.firestore().collection('books').get();
    const books = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    res.json(books);
  } catch (error) {
    console.error(error);
    res.status(500).send('Error obteniendo la lista de libros');
  }
});

app.get('/books/:id', async (req, res) => {
  try {
    const bookId = req.params.id;
    const bookDoc = await admin.firestore().collection('books').doc(bookId).get();

    if (!bookDoc.exists) {
      res.status(404).send('Libro no encontrado');
      return;
    }

    const bookData = bookDoc.data();
    res.json({ id: bookId, ...bookData });
  } catch (error) {
    console.error(error);
    res.status(500).send('Error obteniendo detalles del libro');
  }
});

app.post('/books', async (req, res) => {
  try {
    console.log('Body de la solicitud:', req.body);

    if (!req.body || !req.body.title || !req.body.author || !req.body.year) {
      console.log('Faltan datos del libro en la solicitud');
      return res.status(400).send('Faltan datos del libro en la solicitud');
    }

    const newBook = req.body;
    console.log('Nuevo libro recibido:', newBook);

    const docRef = await admin.firestore().collection('books').add(newBook);
    console.log('Libro agregado con ID:', docRef.id);

    res.json({ id: docRef.id, ...newBook });
  } catch (error) {
    console.error('Error creando un nuevo libro:', error);
    res.status(500).send('Error creando un nuevo libro');
  }
});

app.put('/books/:id', async (req, res) => {
  try {
    const bookId = req.params.id;
    const updatedBook = req.body; // Asegúrate de que la solicitud incluya la información actualizada del libro

    await admin.firestore().collection('books').doc(bookId).update(updatedBook);
    res.json({ id: bookId, ...updatedBook });
  } catch (error) {
    console.error(error);
    res.status(500).send('Error actualizando el libro');
  }
});

app.delete('/books/:id', async (req, res) => {
  try {
    const bookId = req.params.id;
    await admin.firestore().collection('books').doc(bookId).delete();
    res.json({ id: bookId, message: 'Libro eliminado exitosamente' });
  } catch (error) {
    console.error(error);
    res.status(500).send('Error eliminando el libro');
  }
});

app.listen(port, () => {
  console.log(`Servidor escuchando en http://localhost:${port}`);
});
