import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { Container } from 'semantic-ui-react';

import Header from './components/Header';
import HomeScreen from './pages/HomeScreen';
import RegisterScreen from './pages/RegisterScreen';
import LoginScreen from './pages/LoginScreen';

import 'semantic-ui-css/semantic.min.css';
import './App.css';

function App() {
  return (
    <Router>
      <Container>
        <Header />
        <Route exact path='/' component={HomeScreen} />
        <Route exact path='/register' component={RegisterScreen} />
        <Route exact path='/login' component={LoginScreen} />
      </Container>
    </Router>
  );
}

export default App;
