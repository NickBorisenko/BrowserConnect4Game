const board = document.getElementById('board');
const status = document.getElementById('status');
const rows = 6;
const cols = 7;
const boardState = Array(rows).fill().map(() => Array(cols).fill(null));
let currentPlayer = 1;

function createBoard() {
  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < cols; j++) {
      const cell = document.createElement('div');
      cell.classList.add('cell');
      cell.dataset.row = i;
      cell.dataset.col = j;
      cell.addEventListener('click', handleCellClick);
      board.appendChild(cell);
    }
  }
}

function handleCellClick(e) {
    const row = parseInt(e.target.dataset.row);
    const col = parseInt(e.target.dataset.col);
  
    for (let i = rows - 1; i >= 0; i--) {
      if (boardState[i][col] === null) {
        boardState[i][col] = currentPlayer;
  
        const cell = document.querySelector(`[data-row='${i}'][data-col='${col}']`);
        cell.classList.add(`player${currentPlayer}`);
  
        if (checkWinner(i, col)) {
          status.textContent = `Player ${currentPlayer} wins!`;
          board.removeEventListener('click', handleCellClick);
        } else {
          currentPlayer = 3 - currentPlayer;
          status.textContent = `Player ${currentPlayer}'s turn`;
        }
        break;
      }
    }
  }
  
  function checkWinner(row, col) {
    const player = boardState[row][col];
  
    const directions = [
      [[-1, 0], [1, 0]], // Vertical
      [[0, -1], [0, 1]], // Horizontal
      [[-1, -1], [1, 1]], // Diagonal down
      [[1, -1], [-1, 1]]  // Diagonal up
    ];
  
    for (const direction of directions) {
      let count = 1;
      for (const [dx, dy] of direction) {
        let r = row + dx;
        let c = col + dy;
        while (r >= 0 && r < rows && c >= 0 && c < cols && boardState[r][c] === player) {
          count++;
          r += dx;
          c += dy;
        }
      }
      if (count >= 4) {
        return true;
      }
    }
    return false;
  }
  
  createBoard();

createBoard();
