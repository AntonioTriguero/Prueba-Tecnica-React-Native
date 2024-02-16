// En App.js
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import BookList from './src/components/BookList';
import BookDetails from './src/components/BookDetails';
import AddBookForm from './src/components/AddBookForm';
import EditBookForm from './src/components/EditBookForm';

const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="BookList">
        <Stack.Screen name="BookList" component={BookList} />
        <Stack.Screen name="BookDetails" component={BookDetails} />
        <Stack.Screen name="AddBookForm" component={AddBookForm} />
        <Stack.Screen name="EditBookForm" component={EditBookForm} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;

//prueba
