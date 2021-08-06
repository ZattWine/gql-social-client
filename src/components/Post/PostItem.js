import React from 'react';
import { Link } from 'react-router-dom';
import { Card, Image } from 'semantic-ui-react';
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
        <p>buttons here</p>
      </Card.Content>
    </Card>
  );
};

export default PostItem;
