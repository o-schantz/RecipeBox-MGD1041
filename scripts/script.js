//Reference: https://youtu.be/9n98o44tgAc?si=-HEr7gtLjOwSsphl
// API docs: https://www.themealdb.com/documentation#authentication

const apiBase = "themealdb.com/api/json/v2/1/";

const searchForm = document.getElementById("searchForm");
const searchButton = document.getElementById("searchButton");
const searchInput = document.getElementById("searchInput");

const recipesContainer = document.getElementById('recipesContainer');

const recipeTitle = document.getElementById('recipeTitle');
const recipeImage = document.getElementById('recipeImage');
const recipeIngredients = document.getElementById("recipeIngredients");
const recipeInstructions = document.getElementById('recipeInstructions');
const closeButton = document.getElementById('closeButton');

//jQuery document.ready function: code inside will run when the document and DOM are loaded 
$(document).ready(function (){
  //console.log("ready!")

  $(searchForm).on('submit', async function (e) {
     e.preventDefault();
    const searchTerm = searchInput.value.trim();
    if(searchTerm !== ''){
      await searchRecipes(searchTerm);
  }
});

//Search handler function for TheMealDB -- searching the recipes in TheMealDB
async function searchRecipes(searchTerm){
  //try/catch/finally structure handles errors by running the first block first, then the second to catch errors, then the third
  try{
    const response = await fetch(`https://themealdb.com/api/json/v1/1/search.php?s=${searchTerm}`)
    const data = await response.json();
    //console.log(data, response);
    recipes = data.meals || []; //if the API query fails, recipes will become undefined. With the OR statement, if a query fails it defaults to empty array
    //console.log(recipes);
    //Pass recipe array to structuring and formatting function to read data
    renderRecipes(recipes);
  }catch (error){
    console.warn("Some error occurred", error);
  }finally{
    //once everything is done, resolve loading indicator
  }
}

//Function to read through and render recipes
function renderRecipes(recipes){
  recipesContainer.innerHTML = ""; //Clear the container of any previous search results
  if(recipes.length > 0){ //Check that the storage array contains results from API
    recipes.forEach(recipe => { //Iterate through the results
      //Generate a recipe card for each recipe
      //data-recipe-id follows standard formatting of lowercase with -id at end
      const recipeCard = ` 
        <div class="recipe-card" data-recipe-id="${recipe.idMeal}">
          <img src="${recipe.strMealThumb}" alt="${recipe.strMeal}">
          <h2>${recipe.strMeal}</h2>
          <h3>${recipe.strCountry}</h3>
          <ul id="ingredientsUL">
            <li id="ingredientsLI">
            
            </li>
          </ul>
          <p>${recipe.strInstructions}</p>
        </div>
      `; //Closing semicolon of recipeCard
      recipesContainer.innerHTML += recipeCard; //Add each recipe card with content to the HTML of recipesContainer
      //for styling: the recipe cards are living in the recipesContainer element
    });
  }
}









//View recipe details when card is clicked
//Event listener for recipe card click
$(recipesContainer).on("click", function(e){
  console.log(e.target);
  const recipeCard = e.target.closest(".recipe-card"); //look for the element with the class recipe-card closest to the click
  if(recipeCard){
    const recipeId = recipeCard.dataset.recipeId;
    //console.log(recipeId);
    //array.find 
    //arrow function to access the idMeal key in the array storing the API return if the idMeal value exactly matches the recipeID variable
    const recipe = recipes.find(recipe => recipe.idMeal === recipeId)
    console.log(recipe);
    //openRecipeDetails(recipe);
    const ingredientsList = ingredientListFormatter(recipe);
  }
})

//Create storage for ingredients

//Match ingredient and amount keys by number
function ingredientListFormatter(recipe) {
  // Access keys of relevant information and assign them to elements of the on-click view

  //Update to handle any null values
  //for value in list of keys, if value is null, set value to... "something"
  if (recipe.strMeal || recipe.strMealThumb || recipe.strMeal != ""){
    recipeTitle.textContent = recipe.strMeal;
    recipe.src = recipe.strMealThumb;
    recipeImage.alt = recipe.strMeal;
  } 

  //Clear ingredients and instructions so the information resets between recipes
  recipeIngredients.innerHTML = "";
  recipeInstructions.textContent = "";


  const ingreidentList = document.getElementById("ingredientsUL");
  const ingredientEach = document.createElement('li');

  // get the ingredients: keys strIngredient# numbers 1-20 and strMeasure# numbers 1-20 with ingredient and measure associated by number in key
  for (let i = 1; i <= 20; i++){
    //iterate through the keys

    // within the recipe passed to the function, the value of ingredient is each strIngredient#
    const ingredient = recipe[`strIngredient${i}`];
    const measure = recipe[`strMeasure${i}`];

    ingredientEach.textContent = (`${measure} - ${ingredient}`);

    ingreidentList.appendChild(ingredientEach);
}
};








/*
//function to open recipe details
function openRecipeDetails(recipe) {
  // Access keys of relevant information and assign them to elements of the on-click view
  recipeTitle.textContent = recipe.strMeal;
  recipe.src = recipe.strMealThumb;
  recipeImage.alt = recipe.strMeal;

  //Clear ingredients and instructions so the information resets between recipes
  recipeIngredients.innerHTML = "";
  recipeInstructions.textContent = "";

  // render ingredients 
  // get the ingredients: keys strIngredient# numbers 1-20 and strMeasure# numbers 1-20 with ingredient and measure associated by number in key
  for (let i = 1; i <= 20; i++){
    //iterate through the keys

    // within the recipe passed to the function, the value of ingredient is each strIngredient#
    const ingredient = recipe[`strIngredient${i}`];
    const measure = recipe[`strMeasure${i}`];
    console.log(ingredient, measure);
    //if ingredient and measure both contain a value
    if (ingredient && measure){
      //create a list item to contain the ingredient
      const ingredListItem = document.createElement("li");
      // add ingredient and measure to list item created for it as text content
      ingredListItem.textContent = `${measure} - ${ingredient}`;
      //Append the ingredient with measure as a child of the overall list of ingredients 
      recipeIngredients.appendChild(ingredListItem);
    }
  }
}
*/


//end of document.ready
});