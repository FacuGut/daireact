import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import Main from './navigation/Main.js';
import { ContextProvider } from './contextState';

export default function App() {

  return (
    
   <ContextProvider>
    <Main/>
    </ContextProvider>
  );
}