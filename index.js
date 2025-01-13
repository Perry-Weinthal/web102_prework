/*****************************************************************************
 * Challenge 2: Review the provided code. The provided code includes:
 * -> Statements that import data from games.js
 * -> A function that deletes all child elements from a parent element in the DOM
*/

// import the JSON data about the crowd funded games from the games.js file
import GAMES_DATA from './games.js';

// create a list of objects to store the data about the games using JSON.parse
const GAMES_JSON = JSON.parse(GAMES_DATA);

// remove all child elements from a parent element in the DOM
function deleteChildElements(parent) {
    while (parent.firstChild) {
        parent.removeChild(parent.firstChild);
    }
}

// grab the element with the id games-container
const gamesContainer = document.getElementById("games-container");

// create a function that adds all data from the games array to the page
function addGamesToPage(games) {
  

   // Loop over each game in the games array
    for (let i = 0; i < GAMES_JSON.length; i++) {
        //const GAMES_JSON = GAMES_JSON[i];

        // Create a new div for the game card
        const gameCard = document.createElement('div');

        // create a new div element, which will become the game card
        gameCard.classList.add('game-card');
        
        // Set the innerHTML of the game card
        // set the inner HTML using a template literal to display some info 
        // about each game
        // TIP: if your images are not displaying, make sure there is space
        // between the end of the src attribute and the end of the tag ("/>")
        /* from games.js
                            "name": "",
                            "description": "",
                            "pledged": 0,
                            "goal": 0,
                            "backers": 0,
                            "img": ""
         */
        /*
        gameCard.innerHTML = `
            <h3>${GAMES_JSON[i].name}</h3>
            <p>${GAMES_JSON[i].description}</p>
            <p>Pledged: ${GAMES_JSON[i].pledged.toLocaleString()}</p>
            <p>Goal :${GAMES_JSON[i].goal.toLocaleString()}</p>
            <p>Backers :${GAMES_JSON[i].backers.toLocaleString()}</p>
            <img src="${GAMES_JSON[i].img}" class="game-img" alt="${GAMES_JSON[i].name} 
            style= “width: 300px ; height= 200px; " ></p>
        `; */
        gameCard.innerHTML = `
            <h3>${games[i].name}</h3>
            <p>${games[i].description}</p>
            <p>Pledged: $${games[i].pledged.toLocaleString()}</p>
            <p>Goal: $${games[i].goal.toLocaleString()}</p>
            <p>Backers: ${games[i].backers}</p>
            <img src="${games[i].img}" class="game-img" alt="${games[i].name}" style="width: 300px; height: 200px;" />
        `;
        
         // append the game to the games-container
        document.getElementById('games-container').appendChild(gameCard);
    }
}

// call the function we just defined using the correct variable
// later, we'll call this function using a different list of games
addGamesToPage(GAMES_JSON);


/*************************************************************************************
 * Challenge 4: Create the summary statistics at the top of the page displaying the
 * total number of contributions, amount donated, and number of games on the site.
 * Skills used: arrow functions, reduce, template literals
*/

// grab the contributions card element
const contributionsCard = document.getElementById("num-contributions");

// use reduce() to count the number of total contributions by summing the backers
const totalContributions = GAMES_JSON.reduce((total, game) => total + game.backers, 0);

// set the inner HTML using a template literal and toLocaleString to get a number with commas
contributionsCard.innerHTML = `$${totalContributions.toLocaleString()}`;



// grab the amount raised card, then use reduce() to find the total amount raised
const raisedCard = document.getElementById("total-raised");

// Calculate total money pledged
const totalRaised = GAMES_JSON.reduce((total, game) => total + game.pledged, 0);

// set inner HTML using template literal
raisedCard.innerHTML = `$${totalRaised.toLocaleString()}`;
             console.log("totalRaised=", totalRaised.toLocaleString());


// grab number of games card and set its inner HTML
const gamesCard = document.getElementById("num-games");

// Calculate and display total number of games
const totalGames = GAMES_JSON.length;
gamesCard.innerHTML = totalGames.toLocaleString();

//  11800268DOODLE


/*************************************************************************************
 * Challenge 5: Add functions to filter the funded and unfunded games
 * total number of contributions, amount donated, and number of games on the site.
 * Skills used: functions, filter
*/

// show only games that do not yet have enough funding

function filterUnfundedOnly() {
    const unfundedGames = GAMES_JSON.filter(({pledged, goal}) => pledged < goal);

    if (gamesContainer) {
        deleteChildElements(gamesContainer);
        addGamesToPage(unfundedGames);
    }

    console.log("Unfunded games:", unfundedGames);
    return unfundedGames.length;
}


// show only games that are fully funded

function filterFundedOnly() {
    const fundedGames = GAMES_JSON.filter(({pledged, goal}) => pledged >= goal);

    if (gamesContainer) {
        deleteChildElements(gamesContainer);
        addGamesToPage(fundedGames);
    }

    console.log("Funded games:", fundedGames);
    return fundedGames.length;
}

// show all games
function showAllGames() {
    if (gamesContainer) {
        deleteChildElements(gamesContainer);
        addGamesToPage(GAMES_JSON);
    }
    return GAMES_JSON.length;
}
// select each button in the "Our Games" section
const unfundedBtn = document.getElementById("unfunded-btn");
const fundedBtn = document.getElementById("funded-btn");
const allBtn = document.getElementById("all-btn");

// add event listeners with the correct functions to each button
unfundedBtn.addEventListener("click", filterUnfundedOnly);
fundedBtn.addEventListener("click", filterFundedOnly);
allBtn.addEventListener("click", showAllGames);

// Initial display of all games
showAllGames();




/*************************************************************************************
 * Challenge 6: Add more information at the top of the page about the company.
 * Skills used: template literals, ternary operator
*/

// grab the description container
const descriptionContainer = document.getElementById("description-container");
// use filter or reduce to count the number of unfunded games
// create a string that explains the number of unfunded games using the ternary operator
// create a new DOM element containing the template string and append it to the description container

// Step 1: Sum the number of unfunded games
const numUnfundedGames = GAMES_JSON.filter(({ pledged, goal }) => pledged < goal).length;

// Step 2: Calculate total raised and construct template string
//let totalRaised = GAMES_JSON.reduce((total, game) => total + game.pledged, 0);
const descriptionText = `
A total of $${totalRaised.toLocaleString()} has been raised for ${GAMES_JSON.length} games. 
Currently, ${numUnfundedGames} game${numUnfundedGames === 1 ? '' : 's'} remain unfunded.
`;

// Step 3: Add the template string to the description container
const paragraph = document.createElement("p");
paragraph.textContent = descriptionText;
descriptionContainer.appendChild(paragraph);
//



/************************************************************************************
 * Challenge 7: Select & display the top 2 games
 * Skills used: spread operator, destructuring, template literals, sort 
 */

const firstGameContainer = document.getElementById("first-game");
const secondGameContainer = document.getElementById("second-game");
/*
const sortedGames =  GAMES_JSON.sort( (item1, item2) => {
    return item2.pledged - item1.pledged;
});
*/
// use destructuring and the spread operator to grab the first and second games
// create a new element to hold the name of the top pledge game, then append it to the correct element
// do the same for the runner up item
// Sort games in descending order based on the amount pledged
const sortedGames = [...GAMES_JSON].sort((a, b) => b.pledged - a.pledged);

// Destructure to grab the top two most funded games
const [mostFundedGame, secondMostFundedGame] = sortedGames;

// Log their names to find the first word of each
console.log("Most funded game:", mostFundedGame.name);
console.log("Second most funded game:", secondMostFundedGame.name);

// Select the containers for the top two games
// Create and append elements for the top-funded games
const firstGameElement = document.createElement("p");
firstGameElement.textContent = mostFundedGame.name;

const secondGameElement = document.createElement("p");
secondGameElement.textContent = secondMostFundedGame.name;

firstGameContainer.appendChild(firstGameElement);
secondGameContainer.appendChild(secondGameElement);

/************************************************************************************
options features:
*/

/************************************************************************************
 * Optional Feature: Search functionality
 * Skills used: event listeners, array methods, DOM manipulation
 */
const searchInput = document.getElementById("search-input");
const searchButton = document.getElementById("search-button");

function performSearch() {
    const query = searchInput.value.trim().toLowerCase();

    if (query === "") {
        // If the search query is empty, show all games
        showAllGames();
        return;
    }
    const filteredGames = GAMES_JSON.filter(game => 
        game.name.toLowerCase().includes(query) ||
        game.description.toLowerCase().includes(query)
    );

    if (filteredGames.length === 0) {
        // Display a message when no games match the search
        deleteChildElements(gamesContainer);
        const noResultsMessage = document.createElement("p");
        noResultsMessage.textContent = "No games found matching your search.";
        gamesContainer.appendChild(noResultsMessage);
    } else {
        // Display the filtered games
        deleteChildElements(gamesContainer);
        addGamesToPage(filteredGames);
    }

    // Update the game count
    updateGameCount(filteredGames.length);
}

// Function to update the game count display
function updateGameCount(count) {
    const gamesCard = document.getElementById("num-games");
    gamesCard.innerHTML = count.toLocaleString();
}

// Add click event listener to the search button
searchButton.addEventListener("click", performSearch);

// Add keypress event listener to the search input for Enter key
searchInput.addEventListener("keypress", (event) => {
    if (event.key === "Enter") {
        event.preventDefault(); // Prevent form submission
        performSearch();
    }
});

// Add input event listener for real-time search (optional)
searchInput.addEventListener("input", () => {
    if (searchInput.value.trim() === "") {
        showAllGames();
    }
});


