
const express = require('express')
const multer = require('multer')
const sqlite3 = require('sqlite3').verbose();
const bodyParser = require('body-parser');
const app = express()
const path = require('path')
const port = 3000
const fs = require("fs")
//const request = require("request")
//const uploads = multer({ dest: })

app.set('view engine', 'pug')

app.use(express.static('public'))

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'public/uploads')
    },
    filename: function (req, file, cb) {
      cb(null, Date.now() + path.extname(file.originalname)) //Appending extension
    }
})

const upload = multer({ storage: storage})
  


app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json())




let db = new sqlite3.Database('flatmoon.db', sqlite3.OPEN_READWRITE, (err) => {
  if (err) {
    console.error(err.message);
  }
  else
    console.log('Connected to the database.');

});

app.get('/text', (req, res) => {
  messages = []
  db.serialize(() => {
    db.all(`SELECT * FROM posts`, (err, row) => {
      if (err) {
        console.error(err.message);
      }
      row.forEach((row) => {
      temp = []
        temp.push(row.message)
        temp.push(row.user)

        messages.push(temp)
      });
      res.send(posts)
    });
    
  });
  
})


app.get('/',(req, res) => {
  posts = []
  db.serialize(() => {
    db.all(`SELECT * FROM posts`, (err, row) => {
      if (err) {
        console.error(err.message);
      }
      posts.push(row)
      console.log(posts)
      res.render('index', {"posts" : row});
    });
    
    
  });
    
});

app.get('/post',(req, res) => {
  console.log(req["query"])
  db.serialize(() => {
    db.all(`SELECT * FROM posts WHERE id = ${req["query"]["id"]}`, (err, row) => {
      if (err) {
        console.error(err.message);
      }
      console.log(row)
      res.render('posts', {"data" : row})
    })
  }
  )
    
});

app.get('/create',(req, res) => {

  res.render('create') 
});

app.post('/create', upload.single('image'), function (req, res, next) {
  // req.file is the `avatar` file
  // req.body will hold the text fields, if there were any
  console.log(req["body"])
  console.log(req.file["filename"])
  title = req["body"]["titel"]
  text = req["body"]["textruta"]
  file_name = req.file["filename"]
  db.serialize(() => {
    db.all(`INSERT INTO posts(title,text,image) VALUES ('${title}', '${text}', '${file_name}')`, (err, row) => {
      if (err) {
        console.error(err.message);
      };
      res.render('create', { "success": "File successfully uploaded" })
    });
    
  });
  
  
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
});
  

