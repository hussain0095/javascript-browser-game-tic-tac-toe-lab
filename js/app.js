/*-------------------------------- Constants --------------------------------*/
const WINNING_COMBOS = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];


/*---------------------------- Variables (state) ----------------------------*/

let board;   // تمثيل المربعات التسعة
let turn;    // دور من؟ 1 = X ، -1 = O
let winner;  // null = ما في فائز، 1 = X فاز، -1 = O فاز، 'T' = تعادل


/*------------------------ Cached Element References ------------------------*/


const squareEls = document.querySelectorAll('.sqr');
const messageEl = document.querySelector('#message');


/*-------------------------------- Functions --------------------------------*/
function init() {
  // نرجع البورد فاضي
  board = [null, null, null, null, null, null, null, null, null];

  // X يبدأ اللعب
  turn = 1;

  // ما في فائز للحين
  winner = null;

  // نرسم الحالة على الشاشة
  render();
}
function render() {
  // نمر على كل مربع في البورد
  board.forEach((value, idx) => {
    const square = document.getElementById(idx.toString());

    if (value === 1) {
      square.textContent = 'X';
    } else if (value === -1) {
      square.textContent = 'O';
    } else {
      square.textContent = '';
    }
  });

  // نحدّث الرسالة
  if (winner === null) {
    // ما في فائز → نعرض دور من
    messageEl.textContent = turn === 1 ? 'دور اللاعب X' : 'دور اللاعب O';
  } else if (winner === 'T') {
    messageEl.textContent = 'تعادل 🤝';
  } else if (winner === 1) {
    messageEl.textContent = 'X فاز 🎉';
  } else if (winner === -1) {
    messageEl.textContent = 'O فاز 🎉';
  }
}
function handleClick(event) {
  const idx = event.target.id;   // رقم المربع اللي ضغطناه (0–8)

  // لو في فائز خلاص، ما نسمح بحركات زيادة
  if (winner) return;

  // لو المربع مو فاضي، تجاهل الكلك
  if (board[idx] !== null) return;

  // نحط حركة اللاعب الحالي في البورد
  board[idx] = turn;

  // نشوف إذا في فائز بعد الحركة
  getWinner();

  // نقلب الدور (من X إلى O أو العكس)
  turn *= -1;

  // نرسم التحديثات
  render();
}

function getWinner() {
  for (let combo of WINNING_COMBOS) {
    const sum =
      board[combo[0]] +
      board[combo[1]] +
      board[combo[2]];

    if (sum === 3) {
      winner = 1;   // X فاز
      return;
    } else if (sum === -3) {
      winner = -1;  // O فاز
      return;
    }
  }

  // إذا ما في فائز وكل الخانات مليانة → تعادل
  if (!board.includes(null)) {
    winner = 'T';
  }
}


/*----------------------------- Event Listeners -----------------------------*/
squareEls.forEach(square => {
  square.addEventListener('click', handleClick);
});

// نشغّل اللعبة أول مرة
init();
