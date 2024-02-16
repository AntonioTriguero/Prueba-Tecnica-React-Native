export const globalState = {
  fetchBooks: async () => {
    try {
      const response = await fetch('http://192.168.31.225:3000/books');

      if (!response.ok) {
        console.error('Error al obtener libros. Código de estado:', response.status);
        return;
      }

      const data = await response.json();
      console.log('Libros obtenidos:', data);
      return data;
    } catch (error) {
      console.error('Error al obtener libros:', error.message);
    }
  },
};
