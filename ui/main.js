console.log('Loaded!');
// create a request object
var counter= 0;
var button= document.getElementById('counter');
button.onclick= function () {
    // make a request to the counter endpoint
    var request= new XMLHttpRequest();
    // capture the response and store it in a variable
     request.onreadystatechange= function(){
         if(request.readyState===XMLHttpRequest.DONE){
             //Take some action
             if(request.status===200){
                 var counter= request.responseText
                  var span= document.getElementById('count');
    span.innerHTML=counter.toString();
             }
         }
     }
    
    //make a request
    request.open('GET','http://yaswanth8.imad.hasura-app.io/counter',true);
    request.send(null);
}

