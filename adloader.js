document.addEventListener('DOMContentLoaded', function() {
    const totalAds = 25;
    const adSpaces = ['headerAd', 'footerAd1', 'footerAd2'];

    // Generate an array of ad numbers and shuffle it
    const shuffledAds = shuffle([...Array(totalAds)].map((_, i) => i + 1));

    // Select the first three ads from the shuffled array
    const selectedAds = shuffledAds.slice(0, 3);


    // Load ads into the ad spaces
    adSpaces.forEach((spaceId, index) => {
        const adElement = document.getElementById(spaceId);
        const adNumber = selectedAds[index];
        adElement.style.backgroundImage = `url('images/ads/${adNumber}.gif')`;
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
