
document.addEventListener('DOMContentLoaded', () => {
    const mainMenu = document.getElementById('main-menu');
    const menuOptionsContainer = document.getElementById('menu-options');
    const hintArea = document.getElementById('hint-area');
    const hintTopicTitle = document.getElementById('hint-topic-title');
    const hintStepsContainer = document.getElementById('hint-steps');
    const nextHintButton = document.getElementById('next-hint-button');
    const backButton = document.getElementById('back-button');

    let currentTopicId = null;
    let currentHints = [];
    let currentHintIndex = 0;

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


    function showTopic(topicId) {
        const topicData = HINT_DATA[topicId];
        if (!topicData) {
            console.error(`Topic data not found for ID: ${topicId}`);
            return;
        }

        currentTopicId = topicId;

        mainMenu.classList.add('hidden');
        hintArea.classList.remove('hidden');
        hintTopicTitle.textContent = topicData.title;
        hintStepsContainer.innerHTML = '';

        if (topicData.type === 'submenu' && topicData.subtopics) {
            displaySubmenu(topicData.subtopics);
            nextHintButton.classList.add('hidden');

        } else if (topicData.type === 'hints' && topicData.steps) {
            prepareHints(topicData.steps);
            nextHintButton.classList.remove('hidden');

        } else {
            console.error(`Topic "${topicId}" has invalid structure. Needs type ('hints' or 'submenu') and corresponding 'steps' or 'subtopics'.`);
            hintStepsContainer.innerHTML = '<p>Error: Hint data is configured incorrectly.</p>';
            nextHintButton.classList.add('hidden');
        }
    }

    function displaySubmenu(subtopics) {
        hintStepsContainer.innerHTML = '';

        const list = document.createElement('ul');
        list.className = 'submenu-list';

        subtopics.forEach(sub => {
            const listItem = document.createElement('li');
            const button = document.createElement('button');
            button.textContent = sub.title;
            button.dataset.topic = sub.id;
            button.className = 'submenu-button';
            button.addEventListener('click', () => showTopic(sub.id));
            listItem.appendChild(button);
            list.appendChild(listItem);
        });

        hintStepsContainer.appendChild(list);
    }

    function prepareHints(steps) {
        currentHints = steps;
        currentHintIndex = 0;
        hintStepsContainer.innerHTML = '';
        nextHintButton.textContent = "Show First Hint";
        nextHintButton.disabled = false;
    }

    function showNextHint() {
        if (currentHintIndex < currentHints.length) {
            const hintText = currentHints[currentHintIndex];
            const hintElement = document.createElement('p');
            hintElement.textContent = hintText;
            hintStepsContainer.appendChild(hintElement);
            currentHintIndex++;

            if (currentHintIndex < currentHints.length) {
                nextHintButton.textContent = "Show Next Hint";
            } else {
                nextHintButton.textContent = "Good luck!";
                nextHintButton.disabled = true;
            }
        }
    }

    function goBackToMenu() {
        hintArea.classList.add('hidden');
        mainMenu.classList.remove('hidden');
        currentTopicId = null;
        currentHints = [];
        currentHintIndex = 0;
        hintStepsContainer.innerHTML = '';
        hintTopicTitle.textContent = '';
        nextHintButton.classList.remove('hidden');
        nextHintButton.disabled = false;
        nextHintButton.textContent = "Show Hint";
    }

    nextHintButton.addEventListener('click', showNextHint);
    backButton.addEventListener('click', goBackToMenu);

    populateMainMenu();
});
