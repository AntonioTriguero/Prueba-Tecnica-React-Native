// En src/Navigation.js
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import BookList from './components/BookList';
import BookDetails from './components/BookDetails';
import AddBookForm from './components/AddBookForm';

const Stack = createStackNavigator();

const Navigation = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="BookList">
        <Stack.Screen name="BookList" component={BookList} />
        <Stack.Screen name="BookDetails" component={BookDetails} />
        <Stack.Screen name="AddBookForm" component={AddBookForm} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Navigation;
