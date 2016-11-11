var express = require('express');
var morgan = require('morgan');
var path = require('path');
var Pool= require('pg').Pool;
var crypto=require('crypto');
var bodyParser=require('body-parser');


var config={
    user:'yaswanth8',
    database:'yaswanth8',
    host:'db.imad.hasura-app.io',
    port:'5432',
    password: process.env.DB_PASSWORD
    
};
var app = express();
app.use(morgan('combined'));
app.use(bodyParser.json());

 



function createTemplate(data){
    var title=data.title;
    var date=data.date;
    var heading=data.heading;
    var content=data.content;
    var head=data.head;
    var foot=data.foot;
    var htmlTemplate=

            `<html>
        <head>
        <title> ${title} </title>
        <meta name="viewport" content="width=device-width, initial-scale=1"/>
         <link href="/ui/style.css" rel="stylesheet" />
        
        </head>
   
             <body>
                <header> ${head} </header>
                 <div class="container">
                               
                     <hr/>
                                <div>
                                     <h3> ${heading}</h3>    
                                 </div>
                                <div>
                                         ${date.toDateString()}
                                 </div>
                                 <div>
                                 ${content}
                                </div>
                 </div>
                 <footer> ${foot} <div> <p align="right"><a href="http://yaswanth8.imad.hasura-app.io/articles/article-five">Send feedback</a></p></div></footer>    
         </body>
            </html>`;
            return htmlTemplate;


    
}
app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'index.html'));
});

function hash(input, salt){
    
    var hashed= crypto.pbkdf2Sync(input, salt,100000, 512, 'sha512');
    
    return ["pbkdf2","10000",salt,hashed.toString('hex')].join('$');
}


app.post('/hash/:input',function(req,res){
   var hashedString = hash(req.params.input, 'this-is-some-random-string');
   res.send(hashedString);
});


app.post('/create-user',function(req,res){
   // username and password
   var username= req.body.username;
   var password= req.body.password;
   
   var salt= crypto.randomBytes(128).toString('hex');
   var dbString=hash(password,salt);
   pool.query('INSERT INTO "user"(username,password) VALUES ($1,$2)',[username,dbString],function(err,result){
        if(err){
         res.status(500).send(err.toString());
     }
     else{
         res.send('User successfully created'+username);
     }
       
   });
    
});

app.post('/login',function(req,res){
   // username and password
   var username= req.body.username;
   var password= req.body.password;
   
  
  
   pool.query('SELECT * FROM "user" WHERE username= $1',[username],function(err,result){
        if(err){
         res.status(500).send(err.toString());
     }
     else{
           if(results.rows.lenght===0){
               res.send(403).send('username/password is invalid');
           }
           else{
               // match the password
               var dbString=result.rows[0].password;
               var salt=dbString.split('$')[2];
               var hashedPassword= hash(password,salt); // creating hash based on the password submited and orginal salt
               
               if(hashedPassword=== dbString){
                   
                   res.send('credentials are correct');
               }
               else{
                   res.send(403).send('username/password is invalid');
               }
               
               
           }
         
     }
       
   });
    
});

var pool= new Pool(config);

app.get('/test-db', function (req, res) {
 
 // make a select request
 // return a response with results
 pool.query('SELECT * FROM article',function(err,result){
     if(err){
         res.status(500).send(err.toString());
     }
     else{
         res.send(JSON.stringify(result.rows));
     }
 });
 
});


var counter= 0;
app.get('/counter', function (req, res) {
    counter= counter + 1;
  res.send(counter.toString());
});

var names=[];
app.get('/submit-name/',function(req,res){  // URL ://submit-name?namename=xxxx
    //get the name from the request
    var name = req.query.name; //1000
    names.push(name);
    // JSON ; java script obejct notation
    res.send(JSON.stringify(names));
    
    
});


app.get('/articles/:articleName', function (req, res) {
    
     // articleName = article-one
    // articles[articleName] == {} content object for article one
    pool.query("SELECT * FROM article WHERE title = $1",[req.params.articleName],function(err,result){
        if(err){
            res.status(500).send(err.toString());
        }
        else{
            if(result.rows.length===0){
                res.status(404).send('article not found');
            }
            else{
                var articleData= result.rows[0];
                res.send(createTemplate(articleData));
            }
        }
    });
  });





app.get('/ui/style.css', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'style.css'));
});

app.get('/ui/main.js', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'main.js'));
});




app.get('/ui/yaswanth.jpg', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'yaswanth.jpg'));
});

app.get('/ui/fb.png', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'fb.png'));
});

app.get('/ui/twitter.png', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'twitter.png'));
});

app.get('/ui/instagram.png', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'instagram.png'));
});

app.get('/ui/linkedin.png', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'linkedin.png'));
});

app.get('/ui/ganesh.jpeg', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'ganesh.jpeg'));
});

app.get('/ui/DSC_0113.JPG', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'DSC_0113.JPG'));
});

app.get('/ui/group1.jpeg', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'group1.jpeg'));
});

app.get('/ui/group2.jpeg', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'group2.jpeg'));
});


var port = 8080; // Use 8080 for local development because you might already have apache running on 80
app.listen(8080, function () {
  console.log(`IMAD course appp listening on port ${port}!`);
});
