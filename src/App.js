import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { Container } from 'semantic-ui-react';

import { AuthProvider } from './context/auth';
import AuthRoute from './routes/authRoutes';
import Header from './components/Header';
import HomeScreen from './pages/HomeScreen';
import RegisterScreen from './pages/RegisterScreen';
import LoginScreen from './pages/LoginScreen';
import SinglePostScreen from './pages/SinglePostScreen';

import 'semantic-ui-css/semantic.min.css';
import './App.css';

function App() {
  return (
    <AuthProvider>
      <Router>
        <Header />
        <Container>
          <Route exact path='/' component={HomeScreen} />
          <AuthRoute exact path='/register' component={RegisterScreen} />
          <AuthRoute exact path='/login' component={LoginScreen} />
          <Route exact path='/posts/:postId' component={SinglePostScreen} />
        </Container>
      </Router>
    </AuthProvider>
  );
}

export default App;
