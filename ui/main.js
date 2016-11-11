console.log('Loaded!');

// Submit username/passwor to login

var submit= document.getElementById('submit_btn');

submit.onclick = function () {

  // create a request object
  var request= new XMLHttpRequest();
  // capture the response and store it in a variable
   request.onreadystatechange= function(){
       if(request.readyState===XMLHttpRequest.DONE){
           //Take some action
           if(request.status===200){
             
             console.log('user logged in');
             
             alert('logged in successfully');
             
           }
           else if (request.status===403){
               alert('username/ passsword is incorret');
           }
           else if(request.status===500){
               alert('something went wrong on server');
           }
       }
   };


   var username= document.getElementById('username').value;
   var password= document.getElementById('password').value;
   console.log(username);
   console.log(password);
  
  //request.open('POST','http://yaswanth8.imad.hasura-app.io/login',true);
  //request.setRequestHeader('Content-Type','applicatoin/json');
  //request.send(JSON.stringify({username: username, password: password}));




};
