import React, { useState } from 'react';
import { Button, Confirm, Icon, Popup } from 'semantic-ui-react';
import { gql, useMutation } from '@apollo/client';

import { FETCH_POSTS_QUERY } from '../graphql/queries';

const DeleteButton = ({ postId, commentId, callback }) => {
  const [confirmOpen, setConfirmOpen] = useState(false);

  const mutation = commentId ? DELETE_COMMENT_MUTATION : DELETE_POST_MUTATION;

  const [deletePostOrComment] = useMutation(mutation, {
    update: (cache) => {
      setConfirmOpen(false);

      if (!commentId) {
        const data = cache.readQuery({
          query: FETCH_POSTS_QUERY,
        });
        const newPosts = data.getPosts.filter((p) => p.id !== postId);
        cache.writeQuery({
          query: FETCH_POSTS_QUERY,
          data: { getPosts: newPosts },
        });
      }

      if (callback) callback();
    },
    variables: {
      postId,
      commentId,
    },
    onError: (error) => console.log(error),
    // refetchQueries: [FETCH_POSTS_QUERY],
  });

  return (
    <>
      <Popup
        content={commentId ? 'Delete comment' : 'Delete post'}
        inverted
        trigger={
          <Button
            as='div'
            color='red'
            floated='right'
            onClick={() => setConfirmOpen(true)}
          >
            <Icon name='trash' style={{ margin: 0 }} />
          </Button>
        }
      />
      <Confirm
        open={confirmOpen}
        onCancel={() => setConfirmOpen(false)}
        onConfirm={deletePostOrComment}
      />
    </>
  );
};

const DELETE_POST_MUTATION = gql`
  mutation deletePost($postId: ID!) {
    deletePost(postId: $postId)
  }
`;

const DELETE_COMMENT_MUTATION = gql`
  mutation deleteComment($postId: ID!, $commentId: ID!) {
    deleteComment(postId: $postId, commentId: $commentId) {
      id
      comments {
        id
        body
        username
        user
        createdAt
      }
      commentCount
    }
  }
`;

export default DeleteButton;
