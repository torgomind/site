// hints.js - Store all hint data here

const HINT_DATA = {

    // --- TOP LEVEL: Controls ---
    "controls": {
        title: "Controls",
        type: "hints",
        steps: [
            "WASD are used for movement and Q/E for turning. ESC key will bring up the pause menu and toggle the HUD. Spacebar is for use or action. F will swap to the next item. F4 can toggle fullscreen mode.",
            "The entire game can also be controlled with the mouse by clicking on the various buttons on the UI which correspond to the above. Note the button in the very top-right corner.",
            "The entire game can also be controlled with a gameplay/controller. D-pad/R1/L1 for movement. FaceButtons Left(X/square) and Right(B/circle) for actions. Start/select for more options. LeftStick for cursor control. FaceButton Down(A/X) for click.",
            "The game's brightness can be adjusted from the pause menu once you start the game."
        ]
    },

    // --- TOP LEVEL: Starting Town (Submenu) ---
    "starting_town": {
        title: "The Starting Town Area",
        type: "submenu",
        subtopics: [
            { id: "start_general_tips", title: "Lost and need general tips" },
            { id: "start_npc_item", title: "NPC wants an item I cannot find" }
        ]
    },
    // --- Starting Town Sub-Topics (Hints) ---
    "start_general_tips": {
        title: "Lost and need general tips",
        type: "hints",
        steps: [
            "Keeping notes with a pen and paper would be useful.",
            "Try exploring around and interacting with things. In this way you can acquire useful items.",
            "There is a hint room in the town that will give some tips. Sometimes characters can also impart useful advice.",
            "Sometimes you need to interact multiple times, not just once.",
            "Some characters will want you to do one quest, other characters may want you to do multiple quests.",
            "It's important to figure out how to generate currency, which can be used to purchase items. There are hints around the game that will suggest a way to generate currency.",
            "The quests are randomly generated, but you will never be softlocked. If completely confused you can restart the game and hope for easier quests."
        ]
    },
    "start_npc_item": {
        title: "NPC wants an item I cannot find",
        type: "hints",
        steps: [
            "Check the shops and note down those items. Is it one of those?",
            "It might be that you need to figure out how to gather currency or how to use the shops to purchase items.",
            "Some quest items are more difficult than others, depending on the character and rng. Sometimes it will be easy to acquire the item, other times it will be a long process.",
            "If not a store item, it is probably a quest item from another NPC. Have you fulfilled all of the quests of the other NPCs? Try going back to complete more quests from an important NPC.",
            "If stumped, try fishing for quest items in the garbage bins or the fountain.",
            "Items can come from the three merchants, the ear fountain, the garbage bins, or other NPCs. You just need to get the right item to the right characters.",
            "Currency is given to you from just one character. It's possible to farm this character for infinite currency."
        ]
    },

    // --- TOP LEVEL: Later Areas (Submenu) ---
    "later_areas": {
        title: "A Later Area",
        type: "submenu",
        subtopics: [
            { id: "later_maze_end", title: "Maze completed. What now?" },
            { id: "later_teleporter", title: "The teleporter in the bus station." },
            { id: "later_butcher", title: "The butcher shop" },
            { id: "later_guards", title: "The guards and shields" },
            { id: "later_ending_b", title: "I finished Ending B. What now?" },
            { id: "later_underground", title: "The underground" }
        ]
    },
    // --- Later Areas Sub-Topics (Hints) ---
    "later_maze_end": {
        title: "I've completed the maze. What now?",
        type: "hints",
        steps: [
            "At the end of the maze you are given use knowledge.",
            "The statue at the end of the maze. Did it look familiar?",
            "Your character looks closely at a detail on the statue/object. This is important.",
            "The statue is the same as the object on the main menu.",
            "The hint is drawing your attention to a part of this organic shape from the main menu.",
            "Have you tried clicking this detail on the main menu?"
        ]
    },
    "later_teleporter": {
        title: "The teleporter in the train station.",
        type: "hints",
        steps: [
            "This mysterious object can be useful but it's optional.",
            "It works as a teleport/save system to fast-travel to later areas.",
            "Using it requires you to note nearby hints.",
            "The password is hinted, and it can be entered somewhere."
        ]
    },
    "later_butcher": {
        title: "The butcher shop",
        type: "hints",
        steps: [
            "In the fridge section there is a character who will give you hints.",
            "The objective is to create the right kind of sausage.",
            "The butcher gives you mystery meat. You can use the scanner and the charts on the walls to figure out which animal the meat comes from.",
            "Listen and look carefully in the fridge section. Do some of the fridges look different?",
            "Some of the mystery meat is rotten. If you can make a completely rotten sausage, the door guard will be thwarted."
        ]
    },
    "later_guards": {
        title: "The guards and shields",
        type: "hints",
        steps: [
            "This is a very difficult puzzle that will require careful observation and the synthesis of information from other areas of the game.",
            "The puzzle is solved by taking the shields and then moving back down to use them on the grid.",
            "Each shield has a letter on it. The puzzle grid is a 5x5 grid.",
            "Is there some other part of the game involving letters on a 5x5 grid?",
            "The letters have to be placed in their correct positions corresponding to the positions of letters from the secret menu on the main menu.",
            "This puzzle has a nasty trick. Double check to make sure you have the letters correct. What is unique about these letters? Maybe giving the shields back to the guards can clear things up.",
            "For each of the letters, when you flip the letter does it remain the same or is it unchanged?"
        ]
    },
    "later_ending_b": {
        title: "I finished Ending B. What now?",
        type: "hints",
        steps: [
            "After the shield puzzle you made it to a building. You should have been given a clue.",
            "By opening a chest the clue was revealed to you. Did you write it down?",
            "The clue is a password that can be entered to reveal the final area."
        ]
    },
    "later_underground": {
        title: "The underground",
        type: "hints",
        steps: [
            "This is the final area, there are no puzzles here.",
            "If you're confused or lost then keep exploring.",
            "You will eventually find everything you need."
        ]
    },

    // --- TOP LEVEL: Steam Achievements ---
    "achievements": {
        title: "Steam Achievements",
        type: "hints",
        steps: [
            "Deep Pockets : Can be unlocked by acquiring 10 in-game currency.",
            "Voguing: can be unlocked by activating a special event in the night club. This event requires localisation options unlocked.",
            "Tinnitus: can be unlocked by watching a special event in the bar. This event requires localisation options unlocked.",
            "Skip: unlocked by using the in-game teleporter system.",
            "Front Row: unlocked by witnessing an event in the bar under normal conditions."
        ]
    }
    // --- Add more topics/subtopics as needed ---
};

// MENU_ORDER defines the top-level menu item IDs and their order
const MENU_ORDER = [
    "controls",
    "starting_town",
    "later_areas",
    "achievements"
];
