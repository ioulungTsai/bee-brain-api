const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcryptjs');
const cors = require('cors');

const app = express();

const database = {
  users: [
    {
      id: '123',
      name: 'John',
      password: 'cookies',
      email: 'john@gmail.com',
      entries: 0,
      joined: new Date()
    },
    {
      id: '124',
      name: 'Sally',
      password: 'bananas',
      email: 'Sally@gmail.com',
      entries: 0,
      joined: new Date()
    }
  ],
  login: [
    {
      id: '987',
      hash: '',
      email: 'john@gmail.com '
    }
  ]
};

app.use(bodyParser.json());
app.use(cors());

app.get('/', (req, res) => {
  res.send(database.users)
})

app.post('/signin', (req, res) => {
  // bcrypt.compare("apples", "$2a$10$6d8hg/HZu0DYR29xU5MpC.SGgYcTRBJof9BmTSeibZQRWQyrxamFS", function(err, res) {
  //   console.log('salt = 10 => ', res);
  // });
  // bcrypt.compare("apple", "$2a$08$CvdaBfPR6KPcZYCPWjzJleL/PP5tSRK0fISoZuDyx3R7KXISOjNx6", function(err, res) {
  //   console.log('salt = 8 => ', res);
  // });
  // bcrypt.compare("haha", "$2a$04$v5upASuL6feCmY03y7ti6eYE2BDRWVXkMkvHGcrIN5FsdmsU2/K1W", function(err, res) {
  //   console.log('salt = 1 => ', res);
  // });
  if(req.body.email === database.users[0].email &&
     req.body.password === database.users[0].password) {
    res.json('success');
  } else {
    res.status(400).json('error logging in');
  }
})

app.post('/register', (req, res) => {
  const {name, email, password} = req.body;
  bcrypt.hash(password, 10, function(err, hash) {
    console.log(hash);
  });
  database.users.push({
    id: '125',
    name: name,
    email: email,
    entries: 0,
    joined: new Date()
  });
  res.json(database.users[database.users.length - 1]);
})

app.get('/profile/:id', (req, res) => {
  const { id } = req.params;
  let found = false;
  database.users.forEach(user => {
    if(user.id === id) {
      isUser = true;
      return res.json(user);
    }
  });
  if(!found) {
    res.status(400).json('not found')
  }
})

app.put('/image', (req, res) => {
  const { id } = req.body;
  let found = false;
  database.users.forEach(user => {
    if(user.id === id) {
      isUser = true;
      user.entries++
      return res.json(user.entries);
    }
  });
  if(!found) {
    res.status(400).json('not found')
  }
})

app.listen(3000, () => {
  console.log('App is running on port 3000');
})

/*
/ --> res = this is working
/signin --> POST = success/fail
/register --> POST = user
/profile/:userId --> GET = user
/image --> PUT = user
*/