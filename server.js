var express = require('express');
var morgan = require('morgan');
var path = require('path');

var app = express();
app.use(morgan('combined'));

var articles= {
'article-one':{
    title:'Article 1 | Yaswanth',
    heading:'Article one',
    date:'19-09-2016',
    content: ` <p> Hi this is first .Hi this is first article.Hi this is first articleHi this is first articleHi this is first articleHi this is first articleHi this is first articleHi this is first articleHi this is first articleHi this is first articleHi this is first articleHi this is first articleHi this is first articleHi this is first articleHi this is first article new using var and functions</p>`
    
},
'article-two':{
       title:'Article 2 | Yaswanth',
    heading:'Article two',
    date:'20-09-2016',
    content: ` <p> This is the second article  Hi this is first .Hi this is first article.Hi this is first articleHi this is first articleHi this is first articleHi this is first articleHi this is first articleHi this is first articleHi this is first articleHi this is first articleHi this is first articleHi this is first articleHi this is first articleHi this is first articleHi this is first article new using var and functions</p>`
  
},
'article-three':{
    title:'Article 3 | Yaswanth',
    heading:'Article three',
    date:'22-09-2016',
    content: ` <p>This is third article
    Hi this is first .Hi this is first article.Hi this is first articleHi this is first articleHi this is first articleHi this is first articleHi this is first articleHi this is first articleHi this is first articleHi this is first articleHi this is first articleHi this is first articleHi this is first articleHi this is first articleHi this is first article new using var and functions</p>`
  
},
 'article-four':{title:'About | Yaswanth',
        heading:' About us',
    date:'20-09-2016',
    content: `<p> We are still in the basic stage</p>
              <p> This web application is soon going to update</p>
              <p> Hope you guys co-operate with us make this Big</p>`
},

'article-five':{title:'Contact Us | Yaswanth',
        heading:'You can contact us at below Apps',
        date:'20-09-2016',
     content: '<h1> This is team page </h1>',
        foot: '<p> Facebook </p>'
            
   
},
'article-six':{title:'Team | Yaswanth',
        heading:'Here is our team',
    date:'20-09-2016',
    content: `<p> <img src="/ui/ganesh.jpeg" class="img-high"/>
            <hr/>
            <img src="/ui/DSC_0113.JPG" class="img-high"/>
            <hr/>
            <img src="/ui/group2.jpeg" class="img-high"/>
            <hr/>
            <img src="/ui/group1.jpeg" class="img-high"/>
            
             Team Members</p>`
}

};



function createTemplate(data){
    var title=data.title;
    var date=data.date;
    var heading=data.heading;
    var content=data.content;
    var foot=data.foot;
    var htmlTemplate=

            `<html>
        <head>
        <title> ${title} </title>
        <meta name="viewport" content="width=device-width, initial-scale=1"/>
         <link href="/ui/style.css" rel="stylesheet" />
        
        </head>
   
             <body>
                <header> <a href="/">HOME</a> </header>
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
                 <footer> ${foot}</footer>    
         </body>
            </html>`;
            return htmlTemplate;


    
}
app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'index.html'));
});

app.get('/:articleName', function (req, res) {
    var articleName=req.params.articleName;
     // articleName = article-one
    // articles[articleName] == {} content object for article one
  res.send(createTemplate(articles[articleName]));
});





app.get('/ui/style.css', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'style.css'));
});

app.get('/ui/main.js', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'main.js'));
});

app.get('/ui/madi.png', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'madi.png'));
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
