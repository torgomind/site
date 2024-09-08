document.addEventListener('DOMContentLoaded', function() {
    const totalMeats = 25;
    const meatSpaces = ['headerMeat1', 'footerMeat1', 'footerMeat2'];

    // Generate an array of meat numbers and shuffle it
    const shuffledMeats = shuffle([...Array(totalMeats)].map((_, i) => i + 1));

    // Select the first three meats from the shuffled array
    const selectedMeats = shuffledMeats.slice(0, 3);


    // Load meats into the meat spaces
    meatSpaces.forEach((spaceId, index) => {
        const meatElement = document.getElementById(spaceId);
        const meatNumber = selectedMeats[index];
        meatElement.style.backgroundImage = `url('images/meats/${meatNumber}.gif')`;
    });
});

// Fisher-Yates shuffle algorithm
function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}
