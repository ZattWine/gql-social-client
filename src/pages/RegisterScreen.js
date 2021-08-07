import React, { useState } from 'react';
import { Form, Button } from 'semantic-ui-react';
import { gql, useMutation } from '@apollo/client';

import { useForm } from '../hooks/form';

const RegisterScreen = ({ history }) => {
  const [errors, setErrors] = useState({});
  const { handleInputChange, handleSubmit, values } = useForm(
    {
      username: '',
      email: '',
      password: '',
      confirmPassword: '',
    },
    register
  );

  const [createUser, { loading }] = useMutation(REGISTER_USER, {
    update: (_, result) => history.push('/'),
    onError: (err) => setErrors(err.graphQLErrors),
    variables: values,
  });

  function register() {
    createUser();
  }

  return (
    <div className='form-container'>
      <h1>Register</h1>

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
          <label htmlFor='username'>Username</label>
          <input
            type='text'
            id='username'
            name='username'
            value={values.username}
            onChange={handleInputChange}
            placeholder='Username'
          />
        </Form.Field>

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

        <Form.Field>
          <label htmlFor='confirmPassword'>Confirm Password</label>
          <input
            type='password'
            id='confirmPassword'
            name='confirmPassword'
            value={values.confirmPassword}
            onChange={handleInputChange}
            placeholder='Confirm Password'
          />
        </Form.Field>

        {/* <Form.Field>
          <Checkbox label='I agree to the Terms and Conditions' />
        </Form.Field> */}
        <Button type='submit' primary>
          Submit
        </Button>
      </Form>
    </div>
  );
};

const REGISTER_USER = gql`
  mutation register(
    $username: String!
    $email: String!
    $password: String!
    $confirmPassword: String!
  ) {
    register(
      registerInput: {
        username: $username
        email: $email
        password: $password
        confirmPassword: $confirmPassword
      }
    ) {
      id
      email
      username
      createdAt
      token
    }
  }
`;

export default RegisterScreen;
