// Seletores dos elementos
const display = document.getElementById('display');
const timerDisplay = document.getElementById('timer');
const startTimerBtn = document.getElementById('startTimer');
const pauseTimerBtn = document.getElementById('pauseTimer');
const resetTimerBtn = document.getElementById('resetTimer');
const historyContainer = document.getElementById('history');
const clearButton = document.getElementById('clear');

// Variáveis do cálculo e timer
let currentCalculation = "";
let currentInput = '';
let previousInput = '';
let operation = null;
let isRunning = false;
let memory = 0;
let timer;
let seconds = 0;
let minutes = 0;
let expression = ''; // Para armazenar a expressão enquanto o usuário digita
let history = [];

// Atualiza a tela com a entrada atual (mostra a expressão)
function updateDisplay() {
  display.textContent = expression || '0';
  console.log("Display Atualizado");
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
  console.log(`Número adicionado: ${number}`);
}

// Configura a operação
function chooseOperation(op) {
  if (expression === '') return;
  if (previousInput !== '') calculate();
  operation = op;
  previousInput = expression; // Salva a expressão até agora
  expression = ''; // Limpa a expressão para digitar o próximo número
  console.log(`Operação escolhida: ${op}`);
}

// Calcula o resultado
function equals() {
  if (operation) calculate();
  console.log('Resultado calculado');
}

function calculate() {
  const prev = parseFloat(previousInput);
  const current = parseFloat(expression);

  if (isNaN(prev) || isNaN(current)) return;

  let result;
  switch (operation) {
    case '+': result = prev + current; break;
    case '-': result = prev - current; break;
    case '*': result = prev * current; break;
    case '/': result = current !== 0 ? prev / current : 'Erro'; break;
    default: return;
  }

  expression = result.toString();
  operation = null;
  previousInput = '';

  // Adiciona cálculo ao histórico
  addToHistory(`${previousInput} ${operation} ${current} = ${result}`);
  updateDisplay();
  console.log(`Cálculo: ${previousInput} ${operation} ${current} = ${result}`);
}

// Limpa a entrada e a operação
function clearDisplay() {
  expression = ''; // Limpa apenas a expressão
  previousInput = '';
  operation = null;
  updateDisplay();
  console.log("Entrada e Operação Limpas");
}

// Adiciona a expressão ao histórico
function addToHistory(expression) {
  history.unshift(expression);
  if (history.length > 5) {
    history.pop();
  }

  updateHistoryDisplay();
  console.log(`Histórico atualizado: ${expression}`);
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
    console.log("Temporizador Iniciado");
  }
}

function pauseTimer() {
  if (isRunning) {
    clearInterval(timer);
    isRunning = false;
    console.log("Temporizador pausado");
  }
}

function resetTimer() {
  clearInterval(timer);
  isRunning = false;
  seconds = 0;
  minutes = 0;
  timerDisplay.textContent = '00:00';
  console.log("Temporizador Resetado");
}

function updateTimer() {
  seconds++;
  if (seconds >= 60) {
    seconds = 0;
    minutes++;
  }
  timerDisplay.textContent = formatTime(minutes, seconds);
  console.log(`Temporizador Atualizado: ${minutes}:${seconds}`);
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
