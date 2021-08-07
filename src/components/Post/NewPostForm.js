import React from 'react';
import { gql, useMutation } from '@apollo/client';
import { Form, Button, Grid } from 'semantic-ui-react';

import { useForm } from '../../hooks/form';
import { FETCH_POSTS_QUERY } from '../../graphql/queries';

const NewPostForm = () => {
  const { handleInputChange, handleSubmit, values } = useForm(
    {
      body: '',
    },
    createNewPost
  );

  const [createPost, { error }] = useMutation(CREATE_POST, {
    variables: values,
    update: (cache, result) => {
      values.body = '';
    },
    onError: (err) => console.log(err),
    refetchQueries: [FETCH_POSTS_QUERY],
  });

  function createNewPost() {
    createPost();
  }

  return (
    <>
      <Form onSubmit={handleSubmit}>
        <Grid>
          <Grid.Row>
            <Grid.Column width={9}>
              <Form.Field>
                <Form.Input
                  placeholder={`What's on your mind?`}
                  name='body'
                  id='body'
                  value={values.body}
                  error={error ? true : false}
                  onChange={handleInputChange}
                />
              </Form.Field>
            </Grid.Column>
            <Grid.Column width={3}>
              <Button color='teal' type='submit' fluid>
                Post
              </Button>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Form>

      {error && (
        <div className='ui error message'>
          <ul className='list'>
            <li>{error.graphQLErrors[0].message}</li>
          </ul>
        </div>
      )}
    </>
  );
};

const CREATE_POST = gql`
  mutation createPost($body: String!) {
    createPost(body: $body) {
      id
      username
      body
      createdAt
      reactions {
        id
        username
        createdAt
      }
      reactionCount
      comments {
        id
        username
        body
        createdAt
      }
      commentCount
      createdAt
      updatedAt
    }
  }
`;

export default NewPostForm;
