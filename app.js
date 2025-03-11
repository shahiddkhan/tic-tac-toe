// Selecting elements
const boxes = document.querySelectorAll(".box");
const resetBtn = document.querySelector("#reset-btn");
const newGameBtn = document.querySelector("#new-btn");
const msgContainer = document.querySelector(".msg-container");
const msg = document.querySelector("#msg");

// Initial player turn (true = O, false = X) and move counter
let turnO = true;
let count = 0; // Tracks the number of moves
let gameOver = false; // Prevent further moves after game ends

// Winning patterns for Tic-Tac-Toe
const winPatterns = [
    [0, 1, 2], [0, 3, 6], [0, 4, 8],
    [1, 4, 7], [2, 4, 6], [2, 5, 8],
    [3, 4, 5], [6, 7, 8]
];

/**
 * Resets the game to its initial state.
 */
const resetGame = () => {
    turnO = true;
    count = 0; // Reset move count
    gameOver = false; // Allow new moves
    enableBoxes();
    msg.innerText = ""; // Clear any previous message
    msgContainer.classList.add("hide");
    msgContainer.style.display = "none";
};

/**
 * Disables all boxes to prevent further moves.
 */
const disableBoxes = () => {
    boxes.forEach(box => box.disabled = true);
};

/**
 * Enables all boxes and clears their content.
 */
const enableBoxes = () => {
    boxes.forEach(box => {
        box.disabled = false;
        box.innerText = "";
        box.classList.remove("x-color", "o-color"); // Remove color classes on reset
    });
};

/**
 * Displays the winner message and disables further moves.
 * @param {string} winner - The winning player's symbol ('X' or 'O').
 */
const showWinner = (winner) => {
    msg.innerText = `🎉 Congratulations! Winner is ${winner}`;
    msgContainer.classList.remove("hide");
    msgContainer.style.display = "block"; 
    disableBoxes();
    gameOver = true; // Prevent further clicks
};

/**
 * Displays the draw message when no player wins after 9 moves.
 */
const showDraw = () => {
    msg.innerText = `😲 It's a Draw! Try Again.`;
    msgContainer.classList.remove("hide");
    msgContainer.style.display = "block"; 
    disableBoxes(); // Prevent further moves after a draw
    gameOver = true;
};

/**
 * Checks if a player has won by matching any winning pattern.
 * If all 9 moves are made without a winner, declares a draw.
 */
const checkWinner = () => {
    for (const pattern of winPatterns) {
        const [a, b, c] = pattern;
        const pos1Val = boxes[a].innerText;
        const pos2Val = boxes[b].innerText;
        const pos3Val = boxes[c].innerText;

        // Ensure all three positions are filled and match
        if (pos1Val !== "" && pos1Val === pos2Val && pos2Val === pos3Val) {
            showWinner(pos1Val);
            gameOver = true; // Stop further moves
            return true; // Exit function immediately
        }
    }

    // If all 9 moves are made and no winner, it's a draw
    if (count === 9) {
        showDraw();
        gameOver = true;
    }

    return false; // No winner yet
};

// Adding event listeners to each box for player moves
boxes.forEach(box => {
    box.addEventListener("click", () => {
        if (gameOver || box.innerText !== "") return; // Prevent moves after game ends

        const currentPlayer = turnO ? "O" : "X";
        box.innerText = currentPlayer.toUpperCase(); // Ensure uppercase
        box.classList.add(currentPlayer === "X" ? "x-color" : "o-color"); 
        box.disabled = true;
        count++; 

        // Check winner only after a valid move
        if (checkWinner()) return; // 🛑 Stop execution if game is over

        turnO = !turnO; // Only switch turn if game is still ongoing
    });
});

// Adding event listeners for reset and new game buttons
[newGameBtn, resetBtn].forEach(btn => btn.addEventListener("click", resetGame));
