// Seletores dos elementos
const display = document.getElementById('display');
const timerDisplay = document.getElementById('timer');
const startTimerBtn = document.getElementById('startTimer');
const pauseTimerBtn = document.getElementById('pauseTimer');
const resetTimerBtn = document.getElementById('resetTimer');
const historyContainer = document.getElementById('history');
const clearButton = document.getElementById('clear');
const themeToggle = document.getElementById('themeToggle');

// Variáveis do cálculo e timer
let currentInput = '';
let previousInput = '';
let operation = null;
let isRunning = false;
let timer;
let seconds = 0;
let minutes = 0;
let expression = ''; // Para armazenar a expressão enquanto o usuário digita
let history = [];

// Função para alternar o tema
function toggleTheme() {
  const body = document.body;

  // Verifica o tema atual e alterna
  if (body.classList.contains('bg-dark')) {
    body.classList.remove('bg-dark', 'text-light');
    body.classList.add('bg-light', 'text-dark');
    console.log("Tema alterado para Claro");
  } else {
    body.classList.remove('bg-light', 'text-dark');
    body.classList.add('bg-dark', 'text-light');
    console.log("Tema alterado para Escuro");
  }
}

// Atualiza a tela com a entrada atual (mostra a expressão)
function updateDisplay() {
  display.textContent = expression || '0';
}

// Função para processar o clique nos botões da calculadora
function handleButtonClick(event) {
  const value = event.target.textContent;

  if (!isNaN(value) || value === '.') {
    appendNumber(value);
  } else if (['+', '-', '*', '/'].includes(value)) {
    chooseOperation(value);
  } else if (value === '=') {
    equals();
  } else if (value === 'C') {
    clearDisplay();
  }
}

// Adiciona números à entrada atual
function appendNumber(number) {
  expression += number; // Agora adiciona à expressão
  updateDisplay();
}

// Configura a operação
function chooseOperation(op) {
  if (expression === '') return;
  if (previousInput !== '') calculate();
  operation = op;
  previousInput = expression; // Salva a expressão até agora
  expression = ''; // Limpa a expressão para digitar o próximo número
}

// Calcula o resultado
function equals() {
  if (operation) {
    calculate();
    operation = null; // Limpa a operação após o cálculo
  }
}

// Realiza o cálculo com base na operação escolhida
function calculate() {
  const prev = parseFloat(previousInput);
  const current = parseFloat(expression);

  if (isNaN(prev) || isNaN(current)) return;

  let result;
  switch (operation) {
    case '+':
      result = prev + current;
      break;
    case '-':
      result = prev - current;
      break;
    case '*':
      result = prev * current;
      break;
    case '/':
      result = current !== 0 ? prev / current : 'Erro';
      break;
    default:
      return;
  }

  // Adiciona cálculo ao histórico
  addToHistory(`${previousInput} ${operation} ${expression} = ${result}`);

  // Atualiza a exibição com o resultado
  expression = result.toString();
  previousInput = '';
  updateDisplay();
}

// Limpa apenas a entrada atual
function clearDisplay() {
  expression = ''; // Limpa apenas a expressão
  updateDisplay();
}

// Adiciona a expressão ao histórico
function addToHistory(expression) {
  history.unshift(expression);
  if (history.length > 5) {
    history.pop(); // Remove o item mais antigo se o histórico ultrapassar 5 itens
  }
  updateHistoryDisplay();
}

// Atualiza a exibição do histórico
function updateHistoryDisplay() {
  historyContainer.innerHTML = history.map(item => `<li>${item}</li>`).join('');
}

// Funções do temporizador
function startTimer() {
  if (!isRunning) {
    timer = setInterval(updateTimer, 1000);
    isRunning = true;
  }
}

function pauseTimer() {
  if (isRunning) {
    clearInterval(timer);
    isRunning = false;
  }
}

function resetTimer() {
  clearInterval(timer);
  isRunning = false;
  seconds = 0;
  minutes = 0;
  timerDisplay.textContent = '00:00';
}

function updateTimer() {
  seconds++;
  if (seconds >= 60) {
    seconds = 0;
    minutes++;
  }
  timerDisplay.textContent = formatTime(minutes, seconds);
}

function formatTime(minutes, seconds) {
  return `${minutes < 10 ? '0' : ''}${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
}

// Eventos dos botões da calculadora
document.querySelectorAll('.buttons button').forEach(button => {
  button.addEventListener('click', handleButtonClick);
});

// Eventos dos botões do temporizador
startTimerBtn.addEventListener('click', startTimer);
pauseTimerBtn.addEventListener('click', pauseTimer);
resetTimerBtn.addEventListener('click', resetTimer);
themeToggleBtn.addEventListener('click', toggleTheme);
