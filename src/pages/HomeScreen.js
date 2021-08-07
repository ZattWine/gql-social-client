import React from 'react';
import { useQuery, gql } from '@apollo/client';
import { Grid } from 'semantic-ui-react';

import PostItem from '../components/Post/PostItem';

const FETCH_POSTS_QUERY = gql`
  query {
    getPosts {
      id
      username
      body
      reactionCount
      commentCount
      createdAt
      reactions {
        username
      }
      comments {
        id
        username
        body
        createdAt
      }
    }
  }
`;

const HomeScreen = () => {
  const { loading, error, data } = useQuery(FETCH_POSTS_QUERY);

  if (loading) return <h1>Loading posts...</h1>;
  if (error) return <p>{error}</p>;

  return (
    <Grid columns={3}>
      <Grid.Row className='page-title'>
        <h1>Recent Posts</h1>
      </Grid.Row>

      <Grid.Row>
        {data.getPosts &&
          data.getPosts.map((post) => (
            <Grid.Column key={post.id} style={{ marginBottom: 10 }}>
              <PostItem post={post} />
            </Grid.Column>
          ))}
      </Grid.Row>
    </Grid>
  );
};

export default HomeScreen;
