'use strict';


let leftImageElement = document.getElementById('left-image');
let rightImageElement = document.getElementById('right-image');
let midimageElemnt = document.getElementById('mid-image');
let container = document.getElementById('sec-one');


// let arrOfindex=[]
let counts = 0;
let maxAttempts = 25;
let leftIndex=0; 
let rightIndex=0;
let midindex=0;
let arrOfnames = [];
let votes=[];
let arrOfindex=[] ;
// let productsArr=[];

function product(name,source){ 
  this.name= name;
  this.source = source;
  this.time = 0;
  this.votes = 0;
 
  product.allImages.push(this);
  arrOfnames.push(this.name);

}


product.allImages =[];

//creating the instances 

new product('bag','../images/bag.jpg');
new product('banana','../images/banana.jpg');
new product('bathroom','../images/bathroom.jpg');
new product('boots','../images/boots.jpg');
new product('breakfast','../images/breakfast.jpg');

new product('bubblegum','../images/bubblegum.jpg');
new product('chair','../images/chair.jpg');
new product('cthulhu','../images/cthulhu.jpg');
new product('dog-duck','../images/dog-duck.jpg');
new product('dragon','../images/dragon.jpg');

new product('pen','../images/pen.jpg');
new product('pet-sweep','../images/pet-sweep.jpg');
new product('scissors','../images/scissors.jpg');
new product('shark','../images/shark.jpg');
new product('weep','../images/sweep.png');

new product('tauntaun','../images/tauntaun.jpg');
new product('unicorn','../images/unicorn.jpg');
new product('usb','../images/usb.gif');
new product('water-can','../images/water-can.jpg');
new product('glass','../images/wine-glass.jpg');//


console.log(product.allImages);

// function genrateRandomIndex(){
//   return Math.floor(Math.random()* productsArr.length);
// }


// function to generate the three imgs
function renderthreeImages(){

  
    leftIndex = genrateRandomIndex(); 
    midindex =  genrateRandomIndex();
    rightIndex = genrateRandomIndex();
    
    ////

  //while with includes to prevent shows in imgs in  a row
    while(leftIndex === rightIndex || leftIndex === midindex || rightIndex === midindex 
      || arrOfindex.includes(leftIndex)|| arrOfindex.includes(rightIndex)||
       arrOfindex.includes(midindex)){
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
  // console.log(event.target.id);
    counts++; //0 11
    if(maxAttempts >= counts){
      saveToLocalStorage();
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
    ////
    
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

// 


/// this function to make the random imgs generated.
function genrateRandomIndex(){
   return Math.floor(Math.random() * product.allImages.length); 
} 

function chart(){
  let ctx = document.getElementById('myChart')
  let myChart = new Chart(ctx, {  
      type: 'bar',
      data: {
          labels: arrOfnames, 
          datasets: [{
              label: 'Number Of votes',
              data: arrOfVotes,
              backgroundColor: [
                  'rgba(255, 99, 132, 0.2)',
              ],
              borderWidth: 1
          },{
            label:'# of Shown',
            data: arrOfShown,
            backgroundColor:[
              "rgb(192,192,192)"
            ],
            borderWidth: 1
          }]
      }
  })
}
  
//local storage how to create?

function saveToLocalStorage (){
  let arrStr = JSON.stringify(product.allImages);
  localStorage.setItem('allobjects' , arrStr);
}


function gettingFromLocal (){
  let datashown = localStorage.getItem('allobjects');
  let datashownback = JSON.parse(datashown);
  let votes = JSON.parse(datashown);
  console.log(datashownback);

  if(datashownback !== null){
    product.allImages= datashownback;
    // chart();
    renderList();
}

}
gettingFromLocal();

