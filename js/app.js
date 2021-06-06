'use strict';


let leftImageElement = document.getElementById('left-image');
let rightImageElement = document.getElementById('right-image');
let midimageElemnt = document.getElementById('mid-image');
let container = document.getElementById('section-one');
////
let counts = 0;
let maxAttempts = 25;
let leftIndex=0; 
let rightIndex=0;
let midindex=0;
let arrOfnames = [];


function product(name,source){
  this.name= name;
  this.source = source;
  this.time = 0;
  this.votes = 0;
  product.allImages.push(this);
  arrOfnames.push(this.name);

}


product.allImages =[];


new product('bag','../img/bag.jpg');
new product('banana','../img/banana.jpg');
new product('bathroom','../img/bathroom.jpg');
new product('boots','../img/boots.jpg');
new product('breakfast','../img/breakfast.jpg');

new product('bubblegum','../img/bubblegum.jpg');
new product('chair','../img/chair.jpg');
new product('cthulhu','../img/cthulhu.jpg');
new product('dog-duck','../img/dog-duck.jpg');
new product('dragon','../img/dragon.jpg');

new product('pen','../img/pen.jpg');

new product('scissors','../img/scissors.jpg');
new product('shark','../img/shark.jpg');
new product('sweep','../img/sweep.png');

new product('tauntaun','../img/tauntaun.jpg');
new product('unicorn','../img/unicorn.jpg');
new product('usb','../img/usb.gif');
new product('water-can','../img/water-can.jpg');
new product('glass','../img/wine-glass.jpg');


console.log(product.allImages);



function renderthreeImages(){

  
    leftIndex = genrateRandomIndex(); 
    midindex =  genrateRandomIndex();
    rightIndex = genrateRandomIndex();  
    let arrOfindex=[]

  
    while(leftIndex === rightIndex || leftIndex === midindex || rightIndex === midindex 
      || arrOfindex.includes(leftIndex)|| arrOfindex.includes(rightIndex)|| arrOfindex.includes(midindex)){
      leftIndex = genrateRandomIndex();
      rightIndex = genrateRandomIndex();
      midindex =  genrateRandomIndex();
      }
      
    arrOfindex[0]=leftIndex;
    arrOfindex[1]=rightIndex;
    arrOfindex[2]=midindex;
    console.log(arrOfindex);
  

  
  leftImageElement.src =  product.allImages[leftIndex].source;
  rightImageElement.src = product.allImages[rightIndex].source;
  midimageElemnt.src = product.allImages[midindex].source
  product.allImages[leftIndex].time++
  product.allImages[rightIndex].time++
  product.allImages[midindex].time++


}

renderthreeImages();

container.addEventListener('click',handleClicking);




function handleClicking(event){
 
    counts++; 
    if(maxAttempts >= counts){
      if(event.target.id ==='left-image'){
         product.allImages[leftIndex].votes++;
       }else if(event.target.id ==='right-image'){
            product.allImages[rightIndex].votes++;
    }else if(event.target.id ==='mid-image'){
        product.allImages[midindex].votes++;
}


    renderthreeImages();
    console.log(product.allImages);
  }else {
    container.removeEventListener('click',handleClicking);

    renderList();
    chart()
  }
}

let arrOfVotes = [];
let arrOfShown = [];
function renderList(){
  let ul = document.getElementById('unList');
  for(let i = 0 ; i < product.allImages.length;i++){
    arrOfVotes.push(product.allImages[i].votes);
    arrOfShown.push(product.allImages[i].time);
    let li = document.createElement('li');
    ul.appendChild(li);
    li.textContent = `${product.allImages[i].name}  has ${product.allImages[i].votes} Votes and it has appeared ${product.allImages[i].time} times`;
  }

}




function genrateRandomIndex(){
   return Math.floor(Math.random() * product.allImages.length); 

}