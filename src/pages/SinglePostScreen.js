import React, { useContext, useState, useRef } from 'react';
import { gql, useQuery, useMutation } from '@apollo/client';
import {
  Grid,
  Image,
  Card,
  Divider,
  Button,
  Icon,
  Label,
  Form,
} from 'semantic-ui-react';
import moment from 'moment';

import { AuthContext } from '../context/auth';
import ReactionButton from '../components/ReactionButton';
import DeleteButton from '../components/DeleteButton';

const SinglePostScreen = ({ match, history }) => {
  const postId = match.params.postId;
  const { user } = useContext(AuthContext);

  const [comment, setComment] = useState('');
  const commentInputRef = useRef(null);

  const { loading, error, data } = useQuery(FETCH_SINGLE_POST_QUERY, {
    variables: {
      postId,
    },
    onError: (error) => console.log(error),
  });

  const [createComment] = useMutation(CREATE_COMMENT_MUTATION, {
    update() {
      setComment('');
      commentInputRef.current.blur();
    },
    variables: {
      postId,
      body: comment,
    },
    onError: (error) => console.log(error),
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    createComment();
  };

  function onDeleteFinished() {
    history.push('/');
  }

  if (loading) return <h1>Loading post...</h1>;
  if (error) return <p>{error.graphQLErrors[0].message}</p>;

  return (
    <>
      {data && data.getPostById && (
        <Grid>
          <Grid.Row>
            <Grid.Column width={2}>
              <Image
                src='https://react.semantic-ui.com/images/avatar/large/jenny.jpg'
                size='small'
                floated='right'
              />
            </Grid.Column>
            <Grid.Column width={10}>
              <Card fluid>
                <Card.Content>
                  <Card.Header>{data.getPostById.username}</Card.Header>
                  <Card.Meta>
                    {moment(new Date(+data.getPostById.createdAt)).fromNow()}
                  </Card.Meta>
                  <Card.Description>{data.getPostById.body}</Card.Description>
                </Card.Content>
                <Divider />
                <Card.Content extra>
                  <ReactionButton
                    post={{
                      id: data.getPostById.id,
                      reactionCount: data.getPostById.reactionCount,
                      reactions: data.getPostById.reactions,
                    }}
                  />

                  <Button
                    as='div'
                    labelPosition='right'
                    onClick={() => console.log('comment on post')}
                  >
                    <Button color='blue' basic>
                      <Icon name='comments' />
                    </Button>
                    <Label as='a' basic color='blue' pointing='left'>
                      {data.getPostById.commentCount}
                    </Label>
                  </Button>

                  {user &&
                    user.id.toString() === data.getPostById.user.toString() && (
                      <DeleteButton
                        postId={postId}
                        callback={onDeleteFinished}
                      />
                    )}
                </Card.Content>
              </Card>

              {user && (
                <Card fluid>
                  <Card.Content>
                    <Form>
                      <div className='ui action input fluid'>
                        <input
                          type='text'
                          placeholder='Say something...'
                          name='comment'
                          id='comment'
                          value={comment}
                          onChange={(e) => setComment(e.target.value)}
                          ref={commentInputRef}
                        />
                        <button
                          type='submit'
                          className='ui button teal'
                          disabled={comment.trim() === ''}
                          onClick={handleSubmit}
                        >
                          Send
                        </button>
                      </div>
                    </Form>
                  </Card.Content>
                </Card>
              )}

              {data.getPostById.comments.map((comment) => (
                <Card fluid key={comment.id}>
                  <Card.Content>
                    {user && user.id.toString() === comment.user.toString() && (
                      <DeleteButton postId={postId} commentId={comment.id} />
                    )}

                    <Card.Header>{comment.username}</Card.Header>
                    <Card.Meta>
                      {moment(new Date(+comment.createdAt)).fromNow()}
                    </Card.Meta>
                    <Card.Description>{comment.body}</Card.Description>
                  </Card.Content>
                </Card>
              ))}
            </Grid.Column>
          </Grid.Row>
        </Grid>
      )}
    </>
  );
};

const CREATE_COMMENT_MUTATION = gql`
  mutation ($postId: ID!, $body: String!) {
    createComment(postId: $postId, body: $body) {
      id
      comments {
        id
        body
        username
        createdAt
      }
      commentCount
    }
  }
`;

const FETCH_SINGLE_POST_QUERY = gql`
  query ($postId: ID!) {
    getPostById(postId: $postId) {
      id
      username
      body
      user
      createdAt
      updatedAt
      comments {
        id
        username
        body
        user
        createdAt
      }
      commentCount
      reactions {
        id
        username
        user
        createdAt
      }
      reactionCount
    }
  }
`;

export default SinglePostScreen;
