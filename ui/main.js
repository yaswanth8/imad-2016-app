console.log('Loaded!');
// change the element of main-text div

var element=document.getElementById('main-text');
element.innerHTML='Hi I am Yaswanth This is my webapp and Im from vijayawada ';

// move the image

var img=document.getElementById('madi');

function moveRight(){
    marginLeft= marginLeft+10;
    img.style.marginLeft+'px';
}
img.onclick= function(){
    var interval= setInterval(moveRight,100);
}