import React, { useEffect, useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import { useMutation, gql } from '@apollo/client';
import { Button, Icon, Label } from 'semantic-ui-react';

import { AuthContext } from '../context/auth';

const ReactionButton = ({ post: { id, reactions, reactionCount } }) => {
  const { user } = useContext(AuthContext);
  const [reacted, setReacted] = useState(false);

  useEffect(() => {
    if (
      user &&
      reactions.find(
        (reaction) => reaction.user.toString() === user.id.toString()
      )
    ) {
      setReacted(true);
    } else {
      setReacted(false);
    }
  }, [user, reactions]);

  const [reactionToPost] = useMutation(REACTION_TO_POST, {
    variables: { postId: id },
  });

  const reactionButton = user ? (
    reacted ? (
      <Button color='teal'>
        <Icon name='heart' />
      </Button>
    ) : (
      <Button color='teal' basic>
        <Icon name='heart' />
      </Button>
    )
  ) : (
    <Button as={Link} to={`/login`} color='teal' basic>
      <Icon name='heart' />
    </Button>
  );

  return (
    <Button as='div' labelPosition='right' onClick={reactionToPost}>
      {reactionButton}
      <Label as='a' basic color='teal' pointing='left'>
        {reactionCount}
      </Label>
    </Button>
  );
};

const REACTION_TO_POST = gql`
  mutation reactionToPost($postId: ID!) {
    reactPost(postId: $postId) {
      id
      reactions {
        id
        username
        user
      }
      reactionCount
    }
  }
`;

export default ReactionButton;
