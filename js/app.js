'use strict';


let leftImageElement = document.getElementById('left-image');
let rightImageElement = document.getElementById('right-image');
let midimageElemnt = document.getElementById('mid-image');
let container = document.getElementById('sec-one');


let arrOfindex=[]
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



new product('bag','../images/bag.jpg');//[0]
new product('banana','../images/banana.jpg');//[0]
new product('bathroom','../images/bathroom.jpg');//[0]
new product('boots','../images/boots.jpg');//[0]
new product('breakfast','../images/breakfast.jpg');//[0]

new product('bubblegum','../images/bubblegum.jpg');//[0]
new product('chair','../images/chair.jpg');//[0]
new product('cthulhu','../images/cthulhu.jpg');//[0]
new product('dog-duck','../images/dog-duck.jpg');//[0]
new product('dragon','../images/dragon.jpg');//[0]

new product('pen','../images/pen.jpg');//[0]
new product('pet-sweep','../images/pet-sweep.jpg');//[0]
new product('scissors','../images/scissors.jpg');//[0]
new product('shark','../images/shark.jpg');//[0]
new product('weep','../images/sweep.png');//[0]

new product('tauntaun','../images/tauntaun.jpg');//[0]
new product('unicorn','../images/unicorn.jpg');//[0]
new product('usb','../images/usb.gif');//[0]
new product('water-can','../images/water-can.jpg');//[0]
new product('glass','../images/wine-glass.jpg');//[0]


console.log(product.allImages);



function renderthreeImages(){

  
    leftIndex = genrateRandomIndex(); //0 - 7
    midindex =  genrateRandomIndex();
    rightIndex = genrateRandomIndex(); // 0 - 7 
    ////

  
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

// let submit=document.getElementById('submitt');
// submit.addEventListener('click', renderList)
// submit.removeEventListener('click', renderList)



function genrateRandomIndex(){
   return Math.floor(Math.random() * product.allImages.length); 
                  // 0.99999999999 * 8 => 7.999999994 floor()  => 7
                  // 0.99999999999  * 5 => 4.999999 floor => 4
}
//between 1-20 

function chart(){
  let ctx = document.getElementById('myChart')
  let myChart = new Chart(ctx, { // its an instance 
      type: 'bar',
      data: {
          labels: arrOfnames, // ['goat away' ,  ... 'sassy goat']
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