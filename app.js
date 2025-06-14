const inputBox = document.querySelector(".searchbox");
const searchBtn = document.getElementById("btn");
const recipeContainer = document.querySelector(".recipe-container");
const recipe_details = document.querySelector(".recipe-detailes-content");
const recipecloseBtn = document.querySelector(".recipe-close-btn")

const fechRecipe = async (query)=>{
    recipeContainer.innerHTML = "<h2>Feching Recipes...</h2>";
    try {
    const data = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${query}`);
    const response =await data.json();
    //console.log(response);
    //console.log(response.meals[0]);

    recipeContainer.innerHTML = "";
    response.meals.forEach(meal => {
        const recipeDiv = document.createElement("div");
        recipeDiv.classList.add("recipe")
        recipeDiv.innerHTML = `
            <img src="${meal.strMealThumb}">
            <h3>${meal.strMeal}</h3>
            <p><span>${meal.strArea}</span> Dish</p>
            <p>Belongs to <span>${meal.strCategory}<span> Category</p>
            `;
        const button = document.createElement("button");
        button.innerHTML = "View Recipe";
        recipeDiv.appendChild(button);

        button.addEventListener("click",()=>{
            openRecipePopup(meal);
        })

        recipeContainer.appendChild(recipeDiv);

    });
    }catch (error) {
        recipeContainer.innerHTML = "<h2>error in fatching recipe..</h2>"
    }
}
//function to fetc ingridents and mesurements

const fetchingridents = (meal) =>{
    let ingrident_list = "";
    for(let i=1; i<=20; i++){
        const ingrident = meal[`strIngredient${i}`];
        if(ingrident){
            const mesure = meal[`strMeasure${i}`];
            ingrident_list += `<li> ${mesure} ${ingrident}`;
        }else{
            break;
        }
    }
    return ingrident_list;
}

const openRecipePopup = (meal)=>{
    recipe_details.innerHTML = `
        <h2 class="resipename">${meal.strMeal}</h2>
        <h3>Ingridents:</h3>
        <ul class="ingredientlist">${fetchingridents(meal)}</ul>
        <div class="recipeinstructions">
        <h3>Instruction:</h3>
        <p >${meal.strInstructions}</p>
        </div>

    `
     
    recipe_details.parentElement.style.display = "block"
}

recipecloseBtn.addEventListener("click", ()=>{
    recipe_details.parentElement.style.display = "none";

})


searchBtn.addEventListener("click", (e)=>{
    e.preventDefault();
    const searchInp = inputBox.value.trim();
    fechRecipe(searchInp);

    if(!searchInp){
        recipeContainer.innerHTML = `<h2>type mile in the search box...</h2>`;
        return;
    }
})


