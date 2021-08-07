import React from 'react';
import { Link } from 'react-router-dom';
import { Card, Image, Button, Icon, Label } from 'semantic-ui-react';
import moment from 'moment';

const PostItem = ({
  post: {
    id,
    username,
    body,
    commentCount,
    reactionCount,
    reactions,
    createdAt,
  },
}) => {
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
        <Button as='div' labelPosition='right'>
          <Button color='teal' basic onClick={reactionToPost}>
            <Icon name='heart' />
          </Button>
          <Label as='a' basic color='teal' pointing='left'>
            {reactionCount}
          </Label>
        </Button>

        <Button as='div' labelPosition='right' onClick={commentOnPost}>
          <Button color='blue' basic>
            <Icon name='comments' />
          </Button>
          <Label as='a' basic color='blue' pointing='left'>
            {commentCount}
          </Label>
        </Button>
      </Card.Content>
    </Card>
  );
};

export default PostItem;
