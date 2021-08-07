import React, { useContext } from 'react';
import { useQuery } from '@apollo/client';
import { Grid } from 'semantic-ui-react';

import { FETCH_POSTS_QUERY } from '../graphql/queries';
import { AuthContext } from '../context/auth';
import PostItem from '../components/Post/PostItem';
import NewPostForm from '../components/Post/NewPostForm';

const HomeScreen = () => {
  const { user } = useContext(AuthContext);
  const { loading, error, data } = useQuery(FETCH_POSTS_QUERY);

  if (loading) return <h1>Loading posts...</h1>;
  if (error) return <p>{error}</p>;

  return (
    <Grid container>
      <Grid.Column>
        {user && (
          <Grid.Row className='new-post-container'>
            <NewPostForm />
          </Grid.Row>
        )}

        <Grid.Row>
          {data.getPosts &&
            data.getPosts.map((post) => <PostItem key={post.id} post={post} />)}
        </Grid.Row>
      </Grid.Column>
    </Grid>
  );
};

export default HomeScreen;
