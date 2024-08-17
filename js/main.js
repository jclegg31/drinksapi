//The user will enter a cocktail. Get a cocktail name,
//photo, and instructions and place them in the DOM

//Grab the ul
const track = document.querySelector('.carousel__track');

//Grab Navigation buttons for right and left
const nextButton = document.querySelector('.carousel__button--right');
const prevButton = document.querySelector('.carousel__button--left');

//Grabs the element that contains the carousel navigation dots
//and store its children (the individual dots) in the dots variable as an array.
const dotsNav = document.querySelector('.carousel__nav');
const dots = Array.from(dotsNav.children);

//event listener on drink button (kicks off getting data) by calling getDrink function
document.querySelector('button').addEventListener('click', getDrink);

//Once the button is clicked, retrieve the input the user
//entered and plug it into the API to get the corresponding drink
//*** USE THIS API FETCH FOR NOW ***/
function getDrink() {
  //gets user input
  let drink = document.querySelector('input').value;

  //fetches data from the API using the user's input (drink).
  //The response is parsed as JSON and passed to the next .then() method as data.
  fetch(`https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${drink}`)
    .then((res) => res.json()) //parse response as JSON
    .then((data) => {
      //The drinks array from the API response is stored in the drinks variable.
      const drinks = data.drinks;

      //Clear previous slides from the track (the ul element)
      //to avoid stacking images on each search.
      track.innerHTML = '';

      //This loop iterates over each drink in the drinks array.
      for (let i = 0; i < drinks.length; i++) {
        //within the loop, for each drink
        //Create a new li element and set its class to carousel__slide.
        //Create a new img element and set its src attribute to the
        //drink's thumbnail URL and alt attribute to the drink's name.
        let li = document.createElement('li');
        li.className = 'carousel__slide';

        //create a new img element
        const img = document.createElement('img');
        img.src = drinks[i].strDrinkThumb;
        img.alt = drinks[i].strDrink;

        //append the img to the li
        li.appendChild(img);

        //append the li to the track (ul)
        track.appendChild(li);

        //Recalculate and Set Slide Positions
        //After appending all li elements
        //Get the width of one slide and define a function to set each slides position
        //call this function for each slide to position them correctly
        const slides = Array.from(track.children);
        //gets the width of one of the picture frames
        //this will tell you how much space each frame will take on the wall
        const slideWidth = slides[0].getBoundingClientRect().width;

        //this helper function will tell each picture frame exactly where to
        //go on the wall. slide - picture frame. index = the number of the picture
        //frame in the line (first, second, third)
        /* Inside this function you tell each picture frame to move to a position
        based on its order in the line. The first frame stays at the start ('index' 0),
        the second frame moves to the right by one frames width ('index', 1),
        the third frame moves to the right by two frames widths ('index', 2), and so on
        
Let's say each frame is 100 pixels wide.

For the first frame (index 0):

Position: 100 pixels * 0 = 0 pixels from the left edge of the wall.
For the second frame (index 1):

Position: 100 pixels * 1 = 100 pixels from the left edge of the wall.
For the third frame (index 2):

Position: 100 pixels * 2 = 200 pixels from the left edge of the wall.
And so on...

By doing this, you ensure that all picture frames (slides) are placed side by side, 
making them look neat and organized.*/
        const setSlidePosition = (slide, index) => {
          slide.style.left = slideWidth * index + 'px';
        };

        /*finally you go through each picture frame in the array ('slides') and 
        use your helper function to tell each frame where to go on the wall. This
        way they all line up nicely without overlapping*/
        slides.forEach(setSlidePosition);
      }

      document.querySelector('h2').innerText = data.drinks[0].strDrink;
      document.querySelector('img').src = data.drinks[0].strDrinkThumb;
      document.querySelector('h3').innerText = data.drinks[0].strInstructions;
    })
    .catch((err) => {
      console.log(`error ${err}`);
    });
}
