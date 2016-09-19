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
  
}
};
function createTemplate(data){
    var title=data.title;
    var date=data.date;
    var heading=data.heading;
    var content=data.content;
    var htmlTemplate=

            `<html>
        <head>
        <title> ${title}</title>
        <meta name="viewport" content="width=device-width, initial-scale=1"/>
         <link href="/ui/style.css" rel="stylesheet" />
        
        </head>
   
    <body>
        <div class="container">
        <div>
            <a href="/">HOME</a>
        </div>
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
        
        
        
        
    </body>
            </html>`;
            return htmlTemplate;


    
}
app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'index.html'));
});

app.get('/:articleName', function (req, res) {
    var articleName=req.params.articleName;
  res.send(createTemplate(articles[articleName]));
});




app.get('/ui/style.css', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'style.css'));
});

app.get('/ui/madi.png', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'madi.png'));
});


var port = 8080; // Use 8080 for local development because you might already have apache running on 80
app.listen(8080, function () {
  console.log(`IMAD course app listening on port ${port}!`);
});
