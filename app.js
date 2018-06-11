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
/*
  We use app.set('view engine', 'ejs') to tell express to use EJS as our templating engine
  Express will automatically look inside the views/ folder for template files
*/
app.set('view engine', 'ejs');
// console.log(app.get('view engine'));

/*
  req: request object containing information about the HTTP request that raised the event
  res: response object to send back the desired HTTP response
  Note: You cannot send request to the root directory (/)
*/
// 1. Blog homepage
app.get('/', (req, res) => {
  /*
    app.render(view, [locals], callback)
    method used to render the view we pass it and send the HTML to the client.
    
    When the user visits the homepage ('/'), we want to render the home.ejs template
    and pass in an object ({posts: posts}) to the render method to make it available 
    for the home.ejs template to use.

    Note: 'views/' and '.ejs' are omitted. Thus 'home' means 'views/home.ejs'
  */
  // Render 'home.ejs' with the list of posts
  let obj = {posts: posts};
  res.render('home', obj);
});

// 2. Blog post
app.get('/post/:id', (req, res) => {
  /* 
    Render pages like /post/1 to post.ejs.
  */
  const post = posts.filter(post => {
    return post.id == req.params.id;
  })[0];
  // console.log(post);
  
  // Render the 'post.ejs' template with the post content
  let obj = {
    author: post.author,
    title: post.title,
    body: post.body
  };
  res.render('post', obj);
});

app.listen(8080);

console.log('Listening on port 8080');