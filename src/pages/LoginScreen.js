import React, { useState, useContext } from 'react';
import { Form, Button } from 'semantic-ui-react';
import { gql, useMutation } from '@apollo/client';

import { useForm } from '../hooks/form';
import { AuthContext } from '../context/auth';

const LoginScreen = ({ history }) => {
  const context = useContext(AuthContext);
  const [errors, setErrors] = useState({});

  const { handleInputChange, handleSubmit, values } = useForm(
    {
      email: '',
      password: '',
    },
    login
  );

  const [loginUser, { loading }] = useMutation(LOGIN_USER, {
    update: (_, { data: { login: userData } }) => {
      context.login(userData);
      history.push('/');
    },
    onError: (err) => setErrors(err.graphQLErrors),
    variables: values,
  });

  function login() {
    loginUser();
  }

  return (
    <div className='form-container'>
      <h1>Login</h1>

      {Object.keys(errors).length > 0 && (
        <div className='ui error message'>
          <ul className='list'>
            {Object.values(errors).map(({ message }) => (
              <li key={message}>{message}</li>
            ))}
          </ul>
        </div>
      )}

      <Form
        onSubmit={handleSubmit}
        noValidate
        className={loading ? 'loading' : ''}
      >
        <Form.Field>
          <label htmlFor='email'>Email</label>
          <input
            type='email'
            id='email'
            name='email'
            value={values.email}
            onChange={handleInputChange}
            placeholder='Email'
          />
        </Form.Field>

        <Form.Field>
          <label htmlFor='password'>Password</label>
          <input
            type='password'
            id='password'
            name='password'
            value={values.password}
            onChange={handleInputChange}
            placeholder='Password'
          />
        </Form.Field>

        <Button type='submit' primary fluid>
          Login
        </Button>
      </Form>
    </div>
  );
};

const LOGIN_USER = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      id
      email
      username
      createdAt
      token
    }
  }
`;

export default LoginScreen;
