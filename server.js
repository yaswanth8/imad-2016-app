var express = require('express');
var morgan = require('morgan');
var path = require('path');
var Pool= require('pg').Pool;
var config={
    user:'yaswanth8',
    database:'yaswanth8',
    host:'db.imad.hasura-app.io',
    port:'5432',
    password: process.env.DB_PASSWORD
    
};
var app = express();
app.use(morgan('combined'));

var articles= {
'article-one':{
    title:'Article 1 | Yaswanth',
    head: '<a href="/">HOME</a>',
    heading:'Article one',
    date:'19-09-2016',
    content: ` <p> Hi this is first .Hi this is first article.Hi this is first articleHi this is first articleHi this is first articleHi this is first articleHi this is first articleHi this is first articleHi this is first articleHi this is first articleHi this is first articleHi this is first articleHi this is first articleHi this is first articleHi this is first article new using var and functions</p>`,
     foot: '<p></p>'
    },
'article-two':{
       title:'Article 2 | Yaswanth',
       head: '<a href="/">HOME</a>',
    heading:'Article two',
    date:'20-09-2016',
    content: ` <p> This is the second article  Hi this is first .Hi this is first article.Hi this is first articleHi this is first articleHi this is first articleHi this is first articleHi this is first articleHi this is first articleHi this is first articleHi this is first articleHi this is first articleHi this is first articleHi this is first articleHi this is first articleHi this is first article new using var and functions</p>`,
     foot: '<p></p>'
  
},
'article-three':{
    title:'Article 3 | Yaswanth',
    head: '<a href="/">HOME</a>',
    heading:'Article three',
    date:'22-09-2016',
    content: ` <p>This is third article
    Hi this is first .Hi this is first article.Hi this is first articleHi this is first articleHi this is first articleHi this is first articleHi this is first articleHi this is first articleHi this is first articleHi this is first articleHi this is first articleHi this is first articleHi this is first articleHi this is first articleHi this is first article new using var and functions</p>`,
     foot: '<p></p>'
  
},
 'article-four':{title:'About | Yaswanth',
        head: '<a href="/">HOME</a>',
        heading:' About us',
        date:'20-09-2016',
        content: `<p> This web application is soon going to update</p>
              <p> Hope you guys co-operate with us and make this big</p>`,
              foot: '<p></p>'
},

'article-five':{title:'Contact Us | Yaswanth',
        head: '<a href="/">HOME</a>',
        heading:'You can contact us at below Apps',
        date:'20-09-2016',
        content: '<h1> Contact us </h1>',
        foot: `<p><a href="https://www.facebook.com/yaswanth8"> <img src="/ui/fb.png" class="img-small"/> </a>
                <a href="https://twitter.com/yaswanth8k">  <img src="/ui/twitter.png" class="img-small"/> </a>
                <a href= "https://www.instagram.com/yaswanth___k/"><img src="/ui/instagram.png" class="img-small"/> </a> </p>`
            
   
},
'article-six':{title:'Team | Yaswanth',
            head: '<a href="/">HOME</a>',
            heading:'Here is our team',
            date:'20-09-2016',
            content: `<p> <img src="/ui/ganesh.jpeg" class="img-high"/>
            <hr/>
            <img src="/ui/DSC_0113.JPG" class="img-high"/>
            <hr/>
            <img src="/ui/group2.jpeg" class="img-high"/>
            <hr/>
            <img src="/ui/group1.jpeg" class="img-high"/>
            
             Team Members</p>`,
              foot: '<p></p>'
}

};



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
                                         ${date}
                                 </div>
                                 <div>
                                 ${content}
                                </div>
                 </div>
                 <footer> ${foot} <div> <p align="right"><a href="http://yaswanth8.imad.hasura-app.io/article-five">Send feedback</a></p></div></footer>    
         </body>
            </html>`;
            return htmlTemplate;


    
}
app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'index.html'));
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
    pool.query("SELECT * FROM article WHERE title = '"+req.params.articleName+"'",function(err,result){
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
  console.log(`IMAD course app listening on port ${port}!`);
});
