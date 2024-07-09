function submitName() {
    var name = document.getElementById('nameInput').value;
    document.getElementById('submissionBox').innerHTML = "<p>CUSTOMER: " + name + "</p>";
    document.getElementById('visitCount').style.marginTop = "0";
  }
// Function to update the date and time
function updateDateTime() {
  // Get current date and time
  var currentDate = new Date();
  
  // Format the date and time
  var dateTimeString = currentDate.toLocaleString();

  // Display the formatted date and time in the 'datetime' element
  document.getElementById('datetime').textContent = dateTimeString ;
}

// Call the function initially to display the current date and time
updateDateTime();

// Update the date and time every second
setInterval(updateDateTime, 1000);
// Check if the count is stored in localStorage
if (localStorage.getItem('visitCount')) {
  // If count exists, get it from localStorage and display it
  var count = parseInt(localStorage.getItem('visitCount'));
  document.getElementById('count').innerText = count;
} else {
  // If count doesn't exist, initialize it to 1 and display it
  var count = 1;
  document.getElementById('count').innerText = count;
}

// Increment the count and update the display
count++;
document.getElementById('count').innerText = count;

// Store the updated count in localStorage
localStorage.setItem('visitCount', count);
// Function to show the popup
function showPopup(id) {
  let numberOfPopups = 15;
  for (let i = 1; i <= numberOfPopups; i ++){
    var currentPopup = document.getElementById("popup" + i);
    console.log("popup" + i);
    currentPopup.style.display = "none"; // Hide the popup
  }
  var popup = document.getElementById(id);
  popup.style.display = "block"; // Show the popup
}
// Function to hide the popup
function hidePopup(id) {
  var popup = document.getElementById(id);
  popup.style.display = "none"; // Hide the popup
}

function addToOrder(itemName) {
  var orderList = document.getElementById('orderItems');
  var listItem = document.createElement('li');

  if (orderList.children.length >= 3) {
    orderList.removeChild(orderList.children[0]);
  }

  var p = document.createElement('p');
  p.textContent = itemName;
  listItem.appendChild(p);
  orderList.appendChild(listItem);
}

function handlePopupOnclick(id, itemName){
  showPopup(id);
  addToOrder(itemName);
}
// Get the HTML elements
const decrementBtn = document.getElementById('decrement');
const incrementBtn = document.getElementById('increment');
const numberText = document.getElementById('number');

// Add event listeners for buttons
decrementBtn.addEventListener('click', () => {
  // Parse the current number text to an integer and decrement by 1
  let currentValue = parseInt(numberText.textContent);
  if (currentValue > 0) {
    numberText.textContent = currentValue - 1;
  }
});

incrementBtn.addEventListener('click', () => {
  // Parse the current number text to an integer and increment by 1
  let currentValue = parseInt(numberText.textContent);
  numberText.textContent = currentValue + 1;
});

// Fetching JSON
let cafe_data;
fetch('./tags.json')
    .then((response) => response.json())
    .then((json) => {
      console.log(json);
      cafe_data = json;
    });

function search() {
  const searchBar = document.getElementById('search-bar');
  const searchBarInput = searchBar.value.toLowerCase();
  for (const cafe of cafe_data) {
    console.log(cafe);
    if(cafe.name.toLowerCase().includes(searchBarInput))  {
      document.getElementById(cafe.div_id).style.display = "block";

      for (const cafe of cafe_data) {
        console.log(cafe);
        if(!cafe.name.toLowerCase().includes(searchBarInput))  {
          document.getElementById(cafe.div_id).style.display = "none";
      
      }
    }
    }
  }
}

function checkTextInputEmpty() {
  const searchBar = document.getElementById('search-bar');
  const searchBarInput = searchBar.value.toLowerCase();
  if (searchBarInput === "") {
    search();
  }
}

document.getElementById('search-bar').addEventListener('keydown', function(event) {
  if (event.key === 'Enter') {
      search();
  }
});

// Filtering Functions
function getSelectedOptions() {
  // Get all checkboxes with name="features"
  const tagCheckboxes = document.querySelectorAll('input[name="tags"]:checked');
  const locationCheckboxes = document.querySelectorAll('input[name="locations"]:checked');
  
  // Initialize an array to store selected values
  let selectedTags = [];
  let selectedLocations = [];
  
  // Iterate through the NodeList of checked checkboxes
  tagCheckboxes.forEach((checkbox) => {
    selectedTags.push(checkbox.value);
  });

  locationCheckboxes.forEach((checkbox) => {
    selectedLocations.push(checkbox.value);
  });

    
  if (selectedTags.length !== 0 || selectedLocations.length !== 0) {
    for (const cafe of cafe_data) { 
      document.getElementById(cafe.div_id).style.display = "none";
    }
    for (const cafe of cafe_data) {
      let meetsAllTags = selectedTags.length == 0 || selectedTags.every(tag => cafe.tags[tag] === "true");
      let meetsLocation = selectedLocations.length === 0 || selectedLocations.some(location => cafe.location.includes(location));
      
      if (meetsAllTags && meetsLocation) {
          document.getElementById(cafe.div_id).style.display = "block";
      }
  }
  }
  else {
    for (const cafe of cafe_data) { 
      document.getElementById(cafe.div_id).style.display = "block";
    }
  }
}

document.addEventListener('DOMContentLoaded', function() {
  // Hide filter content initially
  const tagFilterContent = document.getElementById('tag-filter-check');
  const locationFilterContent = document.getElementById('location-filter-check');

  tagFilterContent.style.display = 'none'; // Hide tag filter initially
  locationFilterContent.style.display = 'none'; // Hide location filter initially
});

// Function to toggle visibility of filter sections
function toggleFilters(sectionId, buttonId) {
  const section = document.getElementById(sectionId);  
  const toggleButton = document.getElementById(buttonId);

  // Toggle visibility of the section content
  if (section.style.display === 'block' || section.style.display === '') {
    section.style.display = 'none';
    toggleButton.style.transform = 'rotate(0deg)'; // Revert rotation
  } else {
    section.style.display = 'block';
    toggleButton.style.transform = 'rotate(45deg)'; // Rotate the button
  }
}

let slideIndex = 0;
let slideSrc = ["./sevengrams/seven grams1.png", "./sevengrams/sevengrams2.png", "./sevengrams/sevengrams3.png"]
showSlide(slideIndex);

function showSlide(index) {
  const slide = document.getElementById('slide');
  slide.src = slideSrc[index];
}

function changeSlide(n) {
  const slide = document.getElementById('slide');
  slideIndex = (slideIndex + n + 3) % 3;
  slide.src = slideSrc[slideIndex];
  console.log(slide.src);
  showSlide(slideIndex);
  console.log("change")
}

// end 

let slide2Index = 0;
let slide2Src = ["./plantshed/plantshed1.png", "./plantshed/plantshed2.png", "./plantshed/plantshed3.png"]
showSlide2(slide2Index);

function showSlide2(index) {
  const slide = document.getElementById('slide2');
  slide.src = slide2Src[index];
}

function changeSlide2(n) {
  const slide = document.getElementById('slide2');
  slide2Index = (slide2Index + n + 3) % 3;
  slide.src = slide2Src[slide2Index];
  console.log(slide.src);
  showSlide2(slide2Index);
  console.log("change")
}

//end 


let slide3Index = 0;
let slide3Src = ["./librae/librae1.png", "./librae/librae2.png", "./librae/librae3.png"]
showSlide3(slide3Index);

function showSlide3(index) {
  const slide = document.getElementById('slide3');
  slide.src = slide3Src[index];
}

function changeSlide3(n) {
  const slide = document.getElementById('slide3');
  slide3Index = (slide3Index + n + 3) % 3;
  slide.src = slide3Src[slide3Index];
  console.log(slide.src);
  showSlide3(slide3Index);
  console.log("change")
}

//end 

let slide4Index = 0;
let slide4Src = ["./kona/kona1.png", "./kona/kona2.png", "./kona/kona3.png"]
showSlide4(slide4Index);

function showSlide4(index) {
  const slide = document.getElementById('slide4');
  slide.src = slide4Src[index];
}

function changeSlide4(n) {
  const slide = document.getElementById('slide4');
  slide4Index = (slide4Index + n + 3) % 3;
  slide.src = slide4Src[slide4Index];
  console.log(slide.src);
  showSlide4(slide4Index);
  console.log("change")
}

//end 

let slide5Index = 0;
let slide5Src = ["./threejewels/threejewels1.png", "./threejewels/threejewels2.png", "./threejewels/threejewels3.png"];
showSlide5(slide5Index);

function showSlide5(index) {
  const slide = document.getElementById('slide5');
  slide.src = slide5Src[index];
}

function changeSlide5(n) {
  const slide = document.getElementById('slide5');
  slide5Index = (slide5Index + n + 3) % 3;
  slide.src = slide5Src[slide5Index];
  console.log(slide.src);
  showSlide5(slide5Index);
  console.log("change");
}

//end

let slide6Index = 0;
let slide6Src = ["./remi43/remi431.png", "./remi43/remi432.png", "./remi43/remi433.png"];
showSlide6(slide6Index);

function showSlide6(index) {
  const slide = document.getElementById('slide6');
  slide.src = slide6Src[index];
}

function changeSlide6(n) {
  const slide = document.getElementById('slide6');
  slide6Index = (slide6Index + n + 3) % 3;
  slide.src = slide6Src[slide6Index];
  console.log(slide.src);
  showSlide6(slide6Index);
  console.log("change");
}

//end


let slide7Index = 0;
let slide7Src = ["./devocion/devocion1.png", "./devocion/devocion2.png", "./devocion/devocion3.png"];
showSlide7(slide7Index);

function showSlide7(index) {
  const slide = document.getElementById('slide7');
  slide.src = slide7Src[index];
}

function changeSlide7(n) {
  const slide = document.getElementById('slide7');
  slide7Index = (slide7Index + n + 3) % 3;
  slide.src = slide7Src[slide7Index];
  console.log(slide.src);
  showSlide7(slide7Index);
  console.log("change");
}

//end

let slide8Index = 0;
let slide8Src = ["./usagi/usagi1.png", "./usagi/usagi2.png", "./usagi/usagi3.png"];
showSlide8(slide8Index);

function showSlide8(index) {
  const slide = document.getElementById('slide8');
  slide.src = slide8Src[index];
}

function changeSlide8(n) {
  const slide = document.getElementById('slide8');
  slide8Index = (slide8Index + n + 3) % 3;
  slide.src = slide8Src[slide8Index];
  console.log(slide.src);
  showSlide8(slide8Index);
  console.log("change");
}

//end

let slide9Index = 0;
let slide9Src = ["./la obra/laobra1.png", "./la obra/laobra2.png", "./la obra/laobra3.png"];
showSlide9(slide9Index);

function showSlide9(index) {
  const slide = document.getElementById('slide9');
  slide.src = slide9Src[index];
}

function changeSlide9(n) {
  const slide = document.getElementById('slide9');
  slide9Index = (slide9Index + n + 3) % 3;
  slide.src = slide9Src[slide9Index];
  console.log(slide.src);
  showSlide9(slide9Index);
  console.log("change");
}

//end

let slide10Index = 0;
let slide10Src = ["./787/7871.png", "./787/7872.png", "./787/7873.png"];
showSlide10(slide10Index);

function showSlide10(index) {
  const slide = document.getElementById('slide10');
  slide.src = slide10Src[index];
}

function changeSlide10(n) {
  const slide = document.getElementById('slide10');
  slide10Index = (slide10Index + n + 3) % 3;
  slide.src = slide10Src[slide10Index];
  console.log(slide.src);
  showSlide10(slide10Index);
  console.log("change");
}

//end

let slide11Index = 0;
let slide11Src = ["./biblio/biblio1.png", "./biblio/biblio2.png", "./biblio/biblio3.png"];
showSlide11(slide11Index);

function showSlide11(index) {
  const slide = document.getElementById('slide11');
  slide.src = slide11Src[index];
}

function changeSlide11(n) {
  const slide = document.getElementById('slide11');
  slide11Index = (slide11Index + n + 3) % 3;
  slide.src = slide11Src[slide11Index];
  console.log(slide.src);
  showSlide11(slide11Index);
  console.log("change");
}

//end

let slide12Index = 0;
let slide12Src = ["./partners/partners1.png", "./partners/partners2.png", "./partners/partners3.png"];
showSlide12(slide12Index);

function showSlide12(index) {
  const slide = document.getElementById('slide12');
  slide.src = slide12Src[index];
}

function changeSlide12(n) {
  const slide = document.getElementById('slide12');
  slide12Index = (slide12Index + n + 3) % 3;
  slide.src = slide12Src[slide12Index];
  console.log(slide.src);
  showSlide12(slide12Index);
  console.log("change");
}

//end


let slide13Index = 0;
let slide13Src = ["./ariston/ariston1.png", "./ariston/ariston2.png", "./ariston/ariston3.png"];
showSlide13(slide13Index);

function showSlide13(index) {
  const slide = document.getElementById('slide13');
  slide.src = slide13Src[index];
}

function changeSlide13(n) {
  const slide = document.getElementById('slide13');
  slide13Index = (slide13Index + n + 3) % 3;
  slide.src = slide13Src[slide13Index];
  console.log(slide.src);
  showSlide13(slide13Index);
  console.log("change");
}

//end

let slide14Index = 0;
let slide14Src = ["./bluebottle/bluebottle1.png", "./bluebottle/bluebottle2.png", "./bluebottle/bluebottle3.png"];
showSlide14(slide14Index);

function showSlide14(index) {
  const slide = document.getElementById('slide14');
  slide.src = slide14Src[index];
}

function changeSlide14(n) {
  const slide = document.getElementById('slide14');
  slide14Index = (slide14Index + n + 3) % 3;
  slide.src = slide14Src[slide14Index];
  console.log(slide.src);
  showSlide14(slide14Index);
  console.log("change");
}

//end

let slide15Index = 0;
let slide15Src = ["./hungryghost/hungry1.png", "./hungryghost/hungry2.png", "./hungryghost/hungry3.png"];
showSlide15(slide15Index);

function showSlide15(index) {
  const slide = document.getElementById('slide15');
  slide.src = slide15Src[index];
}

function changeSlide15(n) {
  const slide = document.getElementById('slide15');
  slide15Index = (slide15Index + n + 3) % 3;
  slide.src = slide15Src[slide15Index];
  console.log(slide.src);
  showSlide15(slide15Index);
  console.log("change");
}

//end

