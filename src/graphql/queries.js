import { gql } from '@apollo/client';

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

export { FETCH_POSTS_QUERY };
