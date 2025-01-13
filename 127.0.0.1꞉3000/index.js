// Calculate total money pledged
const totalRaised = GAMES_JSON.reduce((total, game) => total + game.pledged, 0);

// Display the result
const raisedCard = document.getElementById('raised-card');
raisedCard.textContent = `$${totalRaised.toLocaleString()}`;