console.log('Loaded!');
// change the element of main-text div
var counter= 0;
var button= document.getElementById('counter');
button.onclick= function () {
    // make a request to the counter endpoint
    
    // capture the response and store it in a variable
    
    // render the variable in correct span
    counter=counter+ 1;
    var span= document.getElementById('count');
    span.InnerHTML=counter.toString();
    
}

