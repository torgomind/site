// script.js - Main hint system logic (with submenu support)

document.addEventListener('DOMContentLoaded', () => {
    const mainMenu = document.getElementById('main-menu');
    const menuOptionsContainer = document.getElementById('menu-options');
    const hintArea = document.getElementById('hint-area');
    const hintTopicTitle = document.getElementById('hint-topic-title');
    const hintStepsContainer = document.getElementById('hint-steps');
    const nextHintButton = document.getElementById('next-hint-button');
    const backButton = document.getElementById('back-button');

    let currentTopicId = null; // Keep track of the currently active topic/subtopic ID
    let currentHints = [];
    let currentHintIndex = 0;

    // --- Initialization ---
    function populateMainMenu() {
        menuOptionsContainer.innerHTML = '';
        MENU_ORDER.forEach(topicId => {
            if (HINT_DATA[topicId]) {
                const topic = HINT_DATA[topicId];
                const listItem = document.createElement('li');
                const button = document.createElement('button');
                button.textContent = topic.title;
                button.dataset.topic = topicId;
                button.addEventListener('click', () => showTopic(topicId));
                listItem.appendChild(button);
                menuOptionsContainer.appendChild(listItem);
            } else {
                console.warn(`Topic ID "${topicId}" listed in MENU_ORDER but not found in HINT_DATA.`);
            }
        });
    }

    // --- Core Functions ---

    function showTopic(topicId) {
        const topicData = HINT_DATA[topicId];
        if (!topicData) {
            console.error(`Topic data not found for ID: ${topicId}`);
            return; // Exit if data is missing
        }

        currentTopicId = topicId; // Store the ID of the topic being shown

        // Prepare the main area
        mainMenu.classList.add('hidden');
        hintArea.classList.remove('hidden');
        hintTopicTitle.textContent = topicData.title; // Set title (for both submenu and hints)
        hintStepsContainer.innerHTML = ''; // Clear previous hints OR submenu buttons

        // --- Check Topic Type ---
        if (topicData.type === 'submenu' && topicData.subtopics) {
            // We are showing a SUBMENU
            displaySubmenu(topicData.subtopics);
            nextHintButton.classList.add('hidden'); // Hide "Next Hint" button

        } else if (topicData.type === 'hints' && topicData.steps) {
            // We are showing HINTS for a topic/subtopic
            prepareHints(topicData.steps);
            nextHintButton.classList.remove('hidden'); // Show "Next Hint" button

        } else {
            // Handle malformed data or missing type/steps/subtopics
            console.error(`Topic "${topicId}" has invalid structure. Needs type ('hints' or 'submenu') and corresponding 'steps' or 'subtopics'.`);
            hintStepsContainer.innerHTML = '<p>Error: Hint data is configured incorrectly.</p>';
            nextHintButton.classList.add('hidden');
        }
    }

    function displaySubmenu(subtopics) {
        // Clear any existing content (should be cleared by showTopic, but safe)
        hintStepsContainer.innerHTML = '';

        // Create buttons for each subtopic
        const list = document.createElement('ul');
        list.className = 'submenu-list'; // Add a class for styling

        subtopics.forEach(sub => {
            const listItem = document.createElement('li');
            const button = document.createElement('button');
            button.textContent = sub.title;
            button.dataset.topic = sub.id; // Store the ID to navigate to
            button.className = 'submenu-button'; // Add a class for styling
            // Add event listener to show the selected subtopic's hints/submenu
            button.addEventListener('click', () => showTopic(sub.id));
            listItem.appendChild(button);
            list.appendChild(listItem);
        });

        hintStepsContainer.appendChild(list);
    }

    function prepareHints(steps) {
        currentHints = steps;
        currentHintIndex = 0;
        hintStepsContainer.innerHTML = ''; // Clear any previous hints/submenu buttons
        nextHintButton.textContent = "Show First Hint";
        nextHintButton.disabled = false;
        // Optionally show the first hint immediately:
        // showNextHint();
    }

    function showNextHint() {
        if (currentHintIndex < currentHints.length) {
            const hintText = currentHints[currentHintIndex];
            const hintElement = document.createElement('p');
            hintElement.textContent = hintText;
            hintStepsContainer.appendChild(hintElement); // Append the hint paragraph
            currentHintIndex++;

            // Update button text/state
            if (currentHintIndex < currentHints.length) {
                nextHintButton.textContent = "Show Next Hint";
            } else {
                nextHintButton.textContent = "That's all the hints!";
                nextHintButton.disabled = true;
            }
        }
    }

    function goBackToMenu() {
        hintArea.classList.add('hidden');
        mainMenu.classList.remove('hidden');
        // Reset state fully
        currentTopicId = null;
        currentHints = [];
        currentHintIndex = 0;
        hintStepsContainer.innerHTML = '';
        hintTopicTitle.textContent = '';
        // Ensure next hint button is reset and hidden initially if needed
        nextHintButton.classList.remove('hidden'); // Or add 'hidden' if you prefer
        nextHintButton.disabled = false;
        nextHintButton.textContent = "Show Hint"; // Reset text
    }

    // --- Event Listeners ---
    nextHintButton.addEventListener('click', showNextHint);
    backButton.addEventListener('click', goBackToMenu);

    // --- Initial Setup ---
    populateMainMenu();
}); // End DOMContentLoaded
