import { gql } from '@apollo/client';

const FETCH_POSTS_QUERY = gql`
  query {
    getPosts {
      id
      username
      body
      reactionCount
      commentCount
      user
      createdAt
      reactions {
        username
        user
      }
      comments {
        id
        username
        user
        body
        createdAt
      }
    }
  }
`;

export { FETCH_POSTS_QUERY };
