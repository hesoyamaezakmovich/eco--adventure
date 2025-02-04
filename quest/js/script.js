let currentStage = 1;
let score = 0;

// Факты для каждого этапа
const facts = [
    "Ежегодно в океан попадает 8 миллионов тонн пластика.",
    "Популяция морских черепах сократилась на 90% за последние 50 лет.",
    "Тропические леса производят 20% кислорода на Земле.",
    "Загрязнение воды убивает более 1 миллиона морских птиц ежегодно.",
    "Добыча полезных ископаемых уничтожает 70% горных экосистем."
];

// Начало игры
function startGame() {
    document.getElementById('main-screen').classList.add('hidden');
    document.getElementById('stage1').classList.remove('hidden');
}

// Выбор игрока
function chooseOption(option) {
    if (option === 1 || option === 2) score += 1; 
    showFact();
}

// Показать факт
function showFact() {
    const factText = document.getElementById('fact-text');
    factText.textContent = facts[currentStage - 1]; // Показываем факт для текущего этапа
    document.getElementById(`stage${currentStage}`).classList.add('hidden');
    document.getElementById('fact-screen').classList.remove('hidden');
}

// Продолжить игру
function continueGame() {
    if (currentStage < 5) {
        currentStage += 1;
        document.getElementById('fact-screen').classList.add('hidden');
        document.getElementById(`stage${currentStage}`).classList.remove('hidden');
    } else {
        showEndScreen();
    }
}

// Показать итоговую сцену
function showEndScreen() {
    const endScreen = document.getElementById('end-screen');
    const endMessage = document.getElementById('end-message');
    const endImage = document.getElementById('end-image');

    if (score >= 4) {
        endMessage.textContent = "Остров спасён! Вы сделали правильные выборы.";
        endImage.src = "quest/image/6g.jpeg";
    } else if (score >= 2) {
        endMessage.textContent = "Остров частично восстановлен. Ещё есть шанс всё исправить.";
        endImage.src = "quest/image/7f.jpg";
    } else {
        endMessage.textContent = "Остров разрушен. Природа нуждается в нашей защите.";
        endImage.src = "quest/image/8b.jpeg";
    }

    document.getElementById('fact-screen').classList.add('hidden');
    endScreen.classList.remove('hidden');
}

// Перезапуск игры
function restartGame() {
    currentStage = 1;
    score = 0;
    document.getElementById('end-screen').classList.add('hidden');
    document.getElementById('main-screen').classList.remove('hidden');
}