
function loadLoginForm () {
    var loginHtml = `
            <div class="loginbox">
            <center>
          <ul style="list-style-type:none" class="loginbox" >
       <h3>Login or Register to comment these articles below</h3>  
       <li> User  ID:  <input type="text" id="username" placeholder="Username" />  </li>
       <li> Password:  <input type="password" id="password" />  <li> 
        </ul>
    <br/><br/>
        <input type="submit" id="login_btn" value="Login" />
        <input type="submit" id="register_btn" value="Register" />
        </center>
          </div> `;
    document.getElementById('login_area').innerHTML = loginHtml;
    
    // Submit username/password to login
    var submit = document.getElementById('login_btn');
    submit.onclick = function () {
        // Create a request object
        var request = new XMLHttpRequest();
        
        // Capture the response and store it in a variable
        request.onreadystatechange = function () {
          if (request.readyState === XMLHttpRequest.DONE) {
              // Take some action
              if (request.status === 200) {
                  submit.value = 'Sucess!';
              } else if (request.status === 403) {
                  submit.value = 'Invalid credentials. Try again?';
              } else if (request.status === 500) {
                  alert('Something went wrong on the server');
                  submit.value = 'Login';
              } else {
                  alert('Something went wrong on the server');
                  submit.value = 'Login';
              }
              loadLogin();
          }  
          // Not done yet
        };
        
        // Make the request
        var username = document.getElementById('username').value;
        var password = document.getElementById('password').value;
        console.log(username);
        console.log(password);
        request.open('POST', '/login', true);
        request.setRequestHeader('Content-Type', 'application/json');
        request.send(JSON.stringify({username: username, password: password}));  
        submit.value = 'Logging in...';
        
    };
    
    var register = document.getElementById('register_btn');
    register.onclick = function () {
        // Create a request object
        var request = new XMLHttpRequest();
        
        // Capture the response and store it in a variable
        request.onreadystatechange = function () {
          if (request.readyState === XMLHttpRequest.DONE) {
              // Take some action
              if (request.status === 200) {
                  alert('User created successfully');
                  register.value = 'Registered!';
              } else {
                  alert('Could not register the user');
                  register.value = 'Register';
              }
          }
        };
        
        // Make the request
        var username = document.getElementById('username').value;
        var password = document.getElementById('password').value;
        console.log(username);
        console.log(password);
        request.open('POST', '/create-user', true);
        request.setRequestHeader('Content-Type', 'application/json');
        request.send(JSON.stringify({username: username, password: password}));  
        register.value = 'Registering...';
    
    };
}

function loadArticleForm() {
    var articleHtml = `
        <h2>Write an Article</h2>
        <input type="text" id="heading" placeholder="heading" /><br/>
        <input type="text" id="title" placeholder="title" /><br/>
        <textarea rows="4" cols="50" id="content" placeholder="Content" /></textarea><br/>
        <input type="submit" id="save_btn" value="Create Article" />
        `;
        document.getElementById('article_area').innerHTML = articleHtml;
        var store = document.getElementById('save_btn');
        store.onclick = function () {
        var request = new XMLHttpRequest();
        request.onreadystatechange = function () {
          if (request.readyState === XMLHttpRequest.DONE) {
              if (request.status === 200) {
                  alert('Article created successfully');
                  store.value = 'Article Created';
              } 
                  else {
                  alert('Article could not be created');
                  store.value = 'Create Article';
              }
          }
        };
var heading = document.getElementById('heading').value;
var title = document.getElementById('title').value;
var content = document.getElementById('content').value;
        request.open('POST', '/create-article', true);
        request.setRequestHeader('Content-Type', 'application/json');
        request.send(JSON.stringify({heading: heading, title: title, content: content}));  
        store.value = 'Creating...';
    };
}

function loadLoggedInUser (username) {
    var loginArea = document.getElementById('login_area');
    loginArea.innerHTML = `
        <h3> Hi <i>${username}</i></h3>
        <a href="/logout">Logout</a>
    `;
}

function loadLogin () {
    // Check if the user is already logged in
    var request = new XMLHttpRequest();
    request.onreadystatechange = function () {
        if (request.readyState === XMLHttpRequest.DONE) {
            if (request.status === 200) {
                loadLoggedInUser(this.responseText);
            } else {
                loadLoginForm();
            }
        }
    };
    
    request.open('GET', '/check-login', true);
    request.send(null);
}
// visit count
function getCounter(){
var request = new XMLHttpRequest();
request.onreadystatechange = function() {
    if(request.readyState === XMLHttpRequest.DONE) {
        if (request.status === 200) {
            var counter = request.responseText;
            var span = document.getElementById('count');
            span.innerHTML = counter.toString();
        }
    }
};
 request.open('GET', '/counter', true);
    request.send(null);
}

function loadArticles () {
        // Check if the user is already logged in
    var request = new XMLHttpRequest();
    request.onreadystatechange = function () {
        if (request.readyState === XMLHttpRequest.DONE) {
            var articles = document.getElementById('articles');
            if (request.status === 200) {
                var content = '<ul>';
                var articleData = JSON.parse(this.responseText);
                for (var i=0; i< articleData.length; i++) {
                    content += `<li>
                    <a href="/articles/${articleData[i].title}">${articleData[i].heading}</a>
                    (${articleData[i].date.split('T')[0]})</li>`;
                }
                content += "</ul>"
                articles.innerHTML = content;
            } else {
                articles.innerHTML('Oops! Could not load all articles!')
            }
        }
    };
    
    request.open('GET', '/get-articles', true);
    request.send(null);
}
getCounter();

// The first thing to do is to check if the user is logged in!
loadLogin();

// Now this is something that we could have directly done on the server-side using templating too!
loadArticles();
