document.addEventListener('DOMContentLoaded', function() {
    const totalMeats = 25;
    const meatSpaces = ['headerMeat1', 'footerMeat1', 'footerMeat2'];

    const shuffledMeats = shuffle([...Array(totalMeats)].map((_, i) => i + 1));

    const selectedMeats = shuffledMeats.slice(0, 3);


    meatSpaces.forEach((spaceId, index) => {
        const meatElement = document.getElementById(spaceId);
        const meatNumber = selectedMeats[index];
        meatElement.style.backgroundImage = `url('assets/images/meats/${meatNumber}.gif')`;
    });
});

function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}
