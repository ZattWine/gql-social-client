import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { Card, Image, Button, Icon, Label } from 'semantic-ui-react';
import moment from 'moment';

import { AuthContext } from '../../context/auth';
import ReactionButton from '../ReactionButton';
import DeleteButton from '../DeleteButton';

const PostItem = ({
  post: {
    id,
    username,
    body,
    user: userId,
    commentCount,
    reactionCount,
    reactions,
    createdAt,
  },
}) => {
  const { user } = useContext(AuthContext);

  const reactionToPost = () => {};

  const commentOnPost = () => {};

  return (
    <Card fluid>
      <Card.Content>
        <Image
          floated='right'
          size='mini'
          src='https://react.semantic-ui.com/images/avatar/large/jenny.jpg'
        />
        <Card.Header>{username}</Card.Header>
        <Card.Meta as={Link} to={`/posts/${id}`}>
          {moment(new Date(+createdAt)).fromNow(true)}
        </Card.Meta>
        <Card.Description>{body}</Card.Description>
      </Card.Content>
      <Card.Content extra>
        <ReactionButton
          post={{ id, reactions, reactionCount }}
          onReactToPostPress={reactionToPost}
        />

        <Button as='div' labelPosition='right' onClick={commentOnPost}>
          <Button color='blue' basic>
            <Icon name='comments' />
          </Button>
          <Label as='a' basic color='blue' pointing='left'>
            {commentCount}
          </Label>
        </Button>

        {user && user.id.toString() === userId.toString() && (
          <DeleteButton postId={id} />
        )}
      </Card.Content>
    </Card>
  );
};

export default PostItem;
