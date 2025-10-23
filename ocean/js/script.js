// Экологические факты
const ecoFacts = [
    "Каждую минуту в океан попадает эквивалент одного мусоровоза пластика!",
    "К 2050 году в океане может быть больше пластика, чем рыбы (по весу).",
    "Пластиковые отходы убивают более 1 миллиона морских птиц и 100,000 морских млекопитающих ежегодно.",
    "Пластик в океане распадается на микропластик, который попадает в пищевую цепочку.",
    "Большое тихоокеанское мусорное пятно в 3 раза больше территории Франции!",
    "80% пластика в океане попадает туда с суши, а не с кораблей.",
    "Пластиковая бутылка может плавать в океане сотни лет, медленно распадаясь на микропластик.",
    "Каждый год в океан попадает около 8 миллионов тонн пластика."
];

// Игровые переменные
let canvas, ctx;
let gameLoop;
let isPaused = false;
let gameTime = 60;
let score = 0;
let collectedTrash = 0;
let savedAnimals = 0;

// Игровые объекты
let items = [];
let particles = [];

// Типы мусора
const trashTypes = [
    { emoji: "🥤", points: 10, type: "trash" },
    { emoji: "🧴", points: 10, type: "trash" },
    { emoji: "🥫", points: 10, type: "trash" },
    { emoji: "🛍️", points: 10, type: "trash" },
    { emoji: "💊", points: 10, type: "trash" },
    { emoji: "🔋", points: 15, type: "trash" },
    { emoji: "📱", points: 15, type: "trash" }
];

// Морские животные (их нельзя собирать)
const animalTypes = [
    { emoji: "🐟", penalty: -20, type: "animal" },
    { emoji: "🐠", penalty: -20, type: "animal" },
    { emoji: "🐡", penalty: -20, type: "animal" },
    { emoji: "🦈", penalty: -25, type: "animal" },
    { emoji: "🐙", penalty: -20, type: "animal" },
    { emoji: "🐢", penalty: -30, type: "animal" },
    { emoji: "🦀", penalty: -20, type: "animal" }
];

class Item {
    constructor() {
        this.x = Math.random() * (canvas.width - 60) + 30;
        this.y = -50;
        this.size = 40;
        this.speed = Math.random() * 2 + 1;

        // Случайный выбор: мусор или животное (70% мусор, 30% животное)
        if (Math.random() < 0.7) {
            const trash = trashTypes[Math.floor(Math.random() * trashTypes.length)];
            this.emoji = trash.emoji;
            this.points = trash.points;
            this.type = trash.type;
        } else {
            const animal = animalTypes[Math.floor(Math.random() * animalTypes.length)];
            this.emoji = animal.emoji;
            this.points = animal.penalty;
            this.type = animal.type;
        }
    }

    update() {
        this.y += this.speed;
    }

    draw() {
        ctx.font = `${this.size}px Arial`;
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(this.emoji, this.x, this.y);
    }

    isClicked(mouseX, mouseY) {
        const distance = Math.sqrt(
            Math.pow(mouseX - this.x, 2) +
            Math.pow(mouseY - this.y, 2)
        );
        return distance < this.size;
    }

    isOffScreen() {
        return this.y > canvas.height + 50;
    }
}

class Particle {
    constructor(x, y, color) {
        this.x = x;
        this.y = y;
        this.vx = (Math.random() - 0.5) * 5;
        this.vy = (Math.random() - 0.5) * 5;
        this.alpha = 1;
        this.color = color;
        this.size = Math.random() * 5 + 3;
    }

    update() {
        this.x += this.vx;
        this.y += this.vy;
        this.alpha -= 0.02;
        this.vy += 0.1; // Гравитация
    }

    draw() {
        ctx.save();
        ctx.globalAlpha = this.alpha;
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
    }

    isDead() {
        return this.alpha <= 0;
    }
}

// Начать игру
function startGame() {
    // Сброс переменных
    gameTime = 60;
    score = 0;
    collectedTrash = 0;
    savedAnimals = 0;
    items = [];
    particles = [];
    isPaused = false;

    // Показать игровой экран
    showScreen('game-screen');

    // Настройка canvas (нужно сделать после показа экрана)
    setTimeout(() => {
        canvas = document.getElementById('game-canvas');
        ctx = canvas.getContext('2d');

        // Установить правильные размеры canvas
        const rect = canvas.getBoundingClientRect();
        canvas.width = rect.width;
        canvas.height = rect.height;

        // Обработчики событий
        canvas.removeEventListener('click', handleClick);
        canvas.removeEventListener('touchstart', handleTouch);
        canvas.addEventListener('click', handleClick);
        canvas.addEventListener('touchstart', handleTouch);

        // Обновить UI
        updateUI();

        // Запустить игру
        startGameLoop();
        startTimer();
    }, 100);
}

// Игровой цикл
function startGameLoop() {
    gameLoop = setInterval(() => {
        if (!isPaused) {
            update();
            draw();
        }
    }, 1000 / 60); // 60 FPS
}

// Обновление
function update() {
    // Создание новых предметов
    if (Math.random() < 0.02) {
        items.push(new Item());
    }

    // Обновление предметов
    items.forEach((item, index) => {
        item.update();
        if (item.isOffScreen()) {
            items.splice(index, 1);
            // Если мусор упал - животные спасены!
            if (item.type === 'trash') {
                savedAnimals++;
            }
        }
    });

    // Обновление частиц
    particles.forEach((particle, index) => {
        particle.update();
        if (particle.isDead()) {
            particles.splice(index, 1);
        }
    });
}

// Отрисовка
function draw() {
    // Очистка canvas
    const gradient = ctx.createLinearGradient(0, 0, 0, canvas.height);
    gradient.addColorStop(0, '#4db8ff');
    gradient.addColorStop(1, '#0077be');
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Рисуем "пузырьки" для эффекта воды
    ctx.fillStyle = 'rgba(255, 255, 255, 0.1)';
    for (let i = 0; i < 10; i++) {
        const x = Math.random() * canvas.width;
        const y = (Date.now() / 1000 + i * 50) % canvas.height;
        const size = Math.random() * 10 + 5;
        ctx.beginPath();
        ctx.arc(x, y, size, 0, Math.PI * 2);
        ctx.fill();
    }

    // Рисуем предметы
    items.forEach(item => item.draw());

    // Рисуем частицы
    particles.forEach(particle => particle.draw());
}

// Обработка клика
function handleClick(event) {
    if (isPaused) return;

    const rect = canvas.getBoundingClientRect();
    const mouseX = event.clientX - rect.left;
    const mouseY = event.clientY - rect.top;

    checkItemClick(mouseX, mouseY);
}

// Обработка касания
function handleTouch(event) {
    event.preventDefault();
    if (isPaused) return;

    const rect = canvas.getBoundingClientRect();
    const touch = event.touches[0];
    const mouseX = touch.clientX - rect.left;
    const mouseY = touch.clientY - rect.top;

    checkItemClick(mouseX, mouseY);
}

// Проверка клика по предмету
function checkItemClick(mouseX, mouseY) {
    for (let i = items.length - 1; i >= 0; i--) {
        const item = items[i];
        if (item.isClicked(mouseX, mouseY)) {
            if (item.type === 'trash') {
                // Собран мусор - хорошо!
                score += item.points;
                collectedTrash++;
                createParticles(item.x, item.y, '#4caf50');
            } else {
                // Кликнули на животное - плохо!
                score += item.points;
                createParticles(item.x, item.y, '#f44336');
            }
            items.splice(i, 1);
            updateUI();
            break;
        }
    }
}

// Создание частиц
function createParticles(x, y, color) {
    for (let i = 0; i < 10; i++) {
        particles.push(new Particle(x, y, color));
    }
}

// Обновление UI
function updateUI() {
    document.getElementById('score').textContent = score;
    document.getElementById('time').textContent = gameTime;
    document.getElementById('collected').textContent = collectedTrash;
}

// Таймер
let timerInterval;
function startTimer() {
    if (timerInterval) {
        clearInterval(timerInterval);
    }
    timerInterval = setInterval(() => {
        if (!isPaused) {
            gameTime--;
            updateUI();

            if (gameTime <= 0) {
                clearInterval(timerInterval);
                endGame();
            }
        }
    }, 1000);
}

// Пауза
function togglePause() {
    isPaused = !isPaused;
    const pauseScreen = document.getElementById('pause-screen');
    pauseScreen.classList.toggle('hidden');
}

// Выход из игры
function quitGame() {
    if (gameLoop) {
        clearInterval(gameLoop);
    }
    if (timerInterval) {
        clearInterval(timerInterval);
    }
    isPaused = false;
    document.getElementById('pause-screen').classList.add('hidden');
    showScreen('welcome-screen');
}

// Конец игры
function endGame() {
    if (gameLoop) {
        clearInterval(gameLoop);
    }
    if (timerInterval) {
        clearInterval(timerInterval);
    }

    // Обновить финальную статистику
    document.getElementById('final-score').textContent = score;
    document.getElementById('final-collected').textContent = collectedTrash;
    document.getElementById('final-saved').textContent = savedAnimals;

    // Определить достижение
    let title, text;
    if (collectedTrash >= 100) {
        title = '🌟 Герой океана!';
        text = 'Невероятно! Вы собрали огромное количество мусора и сделали океан чище!';
    } else if (collectedTrash >= 50) {
        title = '🌊 Защитник океана!';
        text = 'Отличная работа! Вы собрали много мусора и помогли морским обитателям!';
    } else if (collectedTrash >= 25) {
        title = '🐟 Друг океана';
        text = 'Хороший результат! Вы внесли вклад в очистку океана!';
    } else {
        title = '🌱 Начинающий эколог';
        text = 'Неплохой старт! Продолжайте практиковаться, чтобы очистить больше мусора!';
    }

    document.getElementById('achievement-title').textContent = title;
    document.getElementById('achievement-text').textContent = text;

    // Показать случайный факт
    const randomFact = ecoFacts[Math.floor(Math.random() * ecoFacts.length)];
    document.getElementById('eco-fact-text').textContent = randomFact;

    showScreen('final-screen');
}

// Показать экран
function showScreen(screenId) {
    document.querySelectorAll('.screen').forEach(screen => {
        screen.classList.add('hidden');
    });
    document.getElementById(screenId).classList.remove('hidden');
}

// Адаптация canvas при изменении размера
window.addEventListener('resize', () => {
    if (canvas && ctx) {
        const rect = canvas.getBoundingClientRect();
        canvas.width = rect.width;
        canvas.height = rect.height;
    }
});
