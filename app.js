/* app.js */

/* 
  Require and instantiate express module downloaded via npm 
  require('express')() is the same as the code block below:
    
    const express = require('express');
    const app = express();
*/
const app = require('express')();

// Fake posts to simulate a database
const posts = [
  {
    id: 1,
    author: 'John',
    title: 'Templating with EJS',
    body: 'Blog post number 1'
  },
  {
    id: 2,
    author: 'Drake',
    title: 'Express: Starting from the Bottom',
    body: 'Blog post number 2'
  },
  {
    id: 3,
    author: 'Emma',
    title: 'Streams',
    body: 'Blog post number 3'
  },
  {
    id: 4,
    author: 'John',
    title: 'Events',
    body: 'Blog post number 4'
  }
];

/* 
  app.set(name, value) assigns setting name to value
  You can retrieve the value by app.get(name)
*/
  // Set the view engine to ejs
app.set('view engine', 'ejs');
// console.log(app.get('view engine'));

/*
  req: request object containing information about the HTTP request that raised the event
  res: response object to send back the desired HTTP response
  Note: You cannot send request to the root directory (/)
*/
// 1. Blog homepage
app.get('/', (req, res) => {
  // Render 'home.ejs' with the list of posts
  /*
    app.render(view, [locals], callback)
    returns the rendered HTML of a view via the callback function
    In the example below, 'home' is assigned to the root dir and {posts: posts} is the object that's passed to /
  */
  res.render('home', {
    posts: posts
  });
});

// 2. Blog post
app.get('/post/:id', (req, res) => {
  // posts object is passed from app.get('/')
  // Find the post in the 'posts' array
  const post = posts.filter(post => {
    return post.id === req.params.id;
  })[0];

  // Render the 'post.ejs' template with the post content
  res.render('post', {
    author: post.author,
    title: post.title,
    body: post.body
  });
});

app.listen(8080);

console.log('Listening on port 8080');