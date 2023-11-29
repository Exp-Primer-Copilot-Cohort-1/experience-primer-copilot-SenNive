// Create web server
const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');
const cors = require('cors');

const app = express();
app.use(bodyParser.json());
app.use(cors());

// Store all comments
const commentsByPostId = {};

// Get all comments for a post
app.get('/posts/:id/comments', (req, res) => {
  const postId = req.params.id;
  const comments = commentsByPostId[postId] || [];
  res.send(comments);
});

// Add a comment to a post
app.post('/posts/:id/comments', async (req, res) => {
  const postId = req.params.id;
  const { content } = req.body;

  // Get comments for a post
  const comments = commentsByPostId[postId] || [];
  // Create new comment
  const comment = {
    id: comments.length + 1,
    content,
    status: 'pending',
  };
  // Push new comment to comments array
  comments.push(comment);
  // Store comments
  commentsByPostId[postId] = comments;

  // Send event to event bus
  await axios.post('http://localhost:4005/events', {
    type: 'CommentCreated',
    data: {
      ...comment,
      postId,
    },
  });

  res.status(201).send(comments);
});

// Handle event from event bus
app.post('/events', async (req, res) => {
  const { type, data } = req.body;

  if (type === 'CommentModerated') {
    // Get comments for a post
    const comments = commentsByPostId[data.postId];
    // Find comment in comments array
    const comment = comments.find((comment) => comment.id === data.id);
    // Update comment status
    comment.status = data.status;

    // Send event to event bus
    await axios.post('http://localhost:4005/events', {
      type: 'CommentUpdated',
      data: {
        ...comment,
        postId: data.postId,
      },
    });
  }

  res.send({});
});

app.listen(4001, () => {
  console.log('Listening on 4001');
});