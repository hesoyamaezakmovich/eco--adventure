// Сравнения углеродного следа
const comparisons = [
    {
        options: [
            { icon: "🚗", title: "Автомобиль", desc: "100 км на машине", carbon: 25 },
            { icon: "🚆", title: "Поезд", desc: "100 км на поезде", carbon: 6 }
        ],
        correct: 0,
        fact: "Автомобиль производит примерно в 4 раза больше CO₂, чем поезд на том же расстоянии. Общественный транспорт значительно экологичнее!"
    },
    {
        options: [
            { icon: "🥩", title: "Говядина", desc: "1 кг говядины", carbon: 27 },
            { icon: "🌱", title: "Овощи", desc: "1 кг овощей", carbon: 2 }
        ],
        correct: 0,
        fact: "Производство 1 кг говядины создаёт около 27 кг CO₂, тогда как овощи - всего 2 кг. Сокращение потребления мяса значительно снижает ваш углеродный след."
    },
    {
        options: [
            { icon: "✈️", title: "Самолёт", desc: "Рейс Москва-Париж", carbon: 244 },
            { icon: "🚄", title: "Поезд", desc: "Поездка Москва-Париж", carbon: 22 }
        ],
        correct: 0,
        fact: "Авиаперелёт создаёт в 11 раз больше выбросов CO₂, чем путешествие на поезде. Выбирайте поезд для коротких расстояний!"
    },
    {
        options: [
            { icon: "🌳", title: "Новая книга", desc: "Бумажная книга", carbon: 7.5 },
            { icon: "📱", title: "Электронная книга", desc: "E-book", carbon: 0.4 }
        ],
        correct: 0,
        fact: "Производство бумажной книги создаёт около 7.5 кг CO₂, тогда как чтение электронной книги - всего 0.4 кг. Цифровые книги экологичнее!"
    },
    {
        options: [
            { icon: "🍔", title: "Бургер с говядиной", desc: "Один бургер", carbon: 3.5 },
            { icon: "🥗", title: "Салат", desc: "Овощной салат", carbon: 0.5 }
        ],
        correct: 0,
        fact: "Бургер с говядиной производит в 7 раз больше CO₂, чем овощной салат. Растительная пища значительно экологичнее!"
    },
    {
        options: [
            { icon: "🚿", title: "Горячий душ", desc: "10 минут горячего душа", carbon: 0.9 },
            { icon: "🛁", title: "Ванна", desc: "Полная ванна", carbon: 1.2 }
        ],
        correct: 1,
        fact: "Полная ванна требует больше воды и энергии для нагрева, чем 10-минутный душ. Выбирайте душ вместо ванны!"
    },
    {
        options: [
            { icon: "👕", title: "Новая футболка", desc: "Хлопковая футболка", carbon: 6.4 },
            { icon: "♻️", title: "Секонд-хенд", desc: "Б/у футболка", carbon: 0.2 }
        ],
        correct: 0,
        fact: "Производство новой футболки создаёт 6.4 кг CO₂. Покупка секонд-хенд почти не производит выбросов!"
    },
    {
        options: [
            { icon: "💡", title: "Лампа накаливания", desc: "1000 часов работы", carbon: 45 },
            { icon: "💡", title: "LED лампа", desc: "1000 часов работы", carbon: 4.5 }
        ],
        correct: 0,
        fact: "LED лампы потребляют в 10 раз меньше энергии, чем лампы накаливания. Переходите на LED!"
    },
    {
        options: [
            { icon: "🍕", title: "Доставка еды", desc: "Доставка на машине", carbon: 1.2 },
            { icon: "🚴", title: "Самовывоз", desc: "Пешком или на велосипеде", carbon: 0 }
        ],
        correct: 0,
        fact: "Доставка на автомобиле создаёт около 1.2 кг CO₂. Самовывоз пешком или на велосипеде - нулевой след!"
    },
    {
        options: [
            { icon: "🥤", title: "Пластиковая бутылка", desc: "0.5л бутылка воды", carbon: 0.45 },
            { icon: "🚰", title: "Водопроводная вода", desc: "Фильтрованная вода", carbon: 0.0001 }
        ],
        correct: 0,
        fact: "Производство пластиковой бутылки создаёт в 4500 раз больше CO₂, чем использование водопроводной воды!"
    },
    {
        options: [
            { icon: "📧", title: "Email с вложением", desc: "Письмо с файлом 1 МБ", carbon: 0.019 },
            { icon: "📧", title: "Обычный email", desc: "Текстовое письмо", carbon: 0.004 }
        ],
        correct: 0,
        fact: "Email с большим вложением создаёт почти в 5 раз больше выбросов. Используйте облачные ссылки вместо вложений!"
    },
    {
        options: [
            { icon: "🧥", title: "Химчистка", desc: "Чистка одной вещи", carbon: 2.5 },
            { icon: "👔", title: "Стирка дома", desc: "Домашняя стирка", carbon: 0.6 }
        ],
        correct: 0,
        fact: "Химчистка использует много энергии и химикатов. Домашняя стирка в 4 раза экологичнее!"
    },
    {
        options: [
            { icon: "🍎", title: "Импортные фрукты", desc: "Яблоко из-за границы", carbon: 0.5 },
            { icon: "🍎", title: "Местные фрукты", desc: "Местное яблоко", carbon: 0.1 }
        ],
        correct: 0,
        fact: "Импортные фрукты требуют транспортировки, что создаёт в 5 раз больше выбросов. Покупайте местное!"
    },
    {
        options: [
            { icon: "☕", title: "Кофе в капсулах", desc: "Одна капсула кофе", carbon: 0.06 },
            { icon: "☕", title: "Молотый кофе", desc: "Порция молотого кофе", carbon: 0.02 }
        ],
        correct: 0,
        fact: "Капсулы для кофе создают в 3 раза больше отходов и выбросов. Используйте молотый кофе!"
    },
    {
        options: [
            { icon: "🏠", title: "Кондиционер", desc: "1 час работы", carbon: 1.2 },
            { icon: "💨", title: "Вентилятор", desc: "1 час работы", carbon: 0.04 }
        ],
        correct: 0,
        fact: "Кондиционер потребляет в 30 раз больше энергии, чем вентилятор. Используйте вентилятор, когда возможно!"
    },
    {
        options: [
            { icon: "🖨️", title: "Печать документа", desc: "10 страниц текста", carbon: 0.05 },
            { icon: "📱", title: "Цифровой документ", desc: "Чтение на экране", carbon: 0.002 }
        ],
        correct: 0,
        fact: "Печать документа создаёт в 25 раз больше выбросов. Читайте документы на экране, когда возможно!"
    },
    {
        options: [
            { icon: "🍔", title: "Фастфуд", desc: "Упакованный бургер", carbon: 4.5 },
            { icon: "🍳", title: "Домашняя еда", desc: "Домашний бургер", carbon: 2.2 }
        ],
        correct: 0,
        fact: "Фастфуд создаёт вдвое больше выбросов из-за упаковки и транспортировки. Готовьте дома!"
    },
    {
        options: [
            { icon: "🧴", title: "Гель для душа", desc: "Флакон геля", carbon: 1.5 },
            { icon: "🧼", title: "Твёрдое мыло", desc: "Кусок мыла", carbon: 0.3 }
        ],
        correct: 0,
        fact: "Производство геля и пластиковой упаковки создаёт в 5 раз больше CO₂. Используйте твёрдое мыло!"
    },
    {
        options: [
            { icon: "🎮", title: "Игровая консоль", desc: "4 часа игры", carbon: 0.8 },
            { icon: "📚", title: "Чтение книги", desc: "4 часа чтения", carbon: 0 }
        ],
        correct: 0,
        fact: "Игровые консоли потребляют много электроэнергии. Чтение книги не производит выбросов!"
    },
    {
        options: [
            { icon: "🛒", title: "Онлайн-шопинг", desc: "Доставка посылки", carbon: 1.8 },
            { icon: "🚶", title: "Поход в магазин", desc: "Пешком до магазина", carbon: 0 }
        ],
        correct: 0,
        fact: "Доставка посылки создаёт около 1.8 кг CO₂. Покупайте в местных магазинах, когда возможно!"
    }
];

// Состояние игры
let currentRound = 0;
let correctAnswers = 0;
let currentStreak = 0;
let maxStreak = 0;
let totalScore = 0;
let shuffledComparisons = [];

// Начать игру
function startGame() {
    currentRound = 0;
    correctAnswers = 0;
    currentStreak = 0;
    maxStreak = 0;
    totalScore = 0;

    // Перемешать вопросы
    shuffledComparisons = [...comparisons].sort(() => Math.random() - 0.5);

    showScreen('game-screen');
    loadRound();
}

// Загрузить раунд
function loadRound() {
    const comparison = shuffledComparisons[currentRound];

    // Обновить прогресс
    document.getElementById('current-round').textContent = currentRound + 1;
    document.getElementById('total-rounds').textContent = shuffledComparisons.length;
    const progress = ((currentRound + 1) / shuffledComparisons.length) * 100;
    document.getElementById('progress').style.width = progress + '%';

    // Загрузить варианты
    document.getElementById('icon-a').textContent = comparison.options[0].icon;
    document.getElementById('title-a').textContent = comparison.options[0].title;
    document.getElementById('desc-a').textContent = comparison.options[0].desc;

    document.getElementById('icon-b').textContent = comparison.options[1].icon;
    document.getElementById('title-b').textContent = comparison.options[1].title;
    document.getElementById('desc-b').textContent = comparison.options[1].desc;

    // Сбросить стили
    document.getElementById('option-a').style.border = '3px solid transparent';
    document.getElementById('option-b').style.border = '3px solid transparent';

    // Обновить статистику
    document.getElementById('correct-count').textContent = correctAnswers;
    document.getElementById('streak').textContent = currentStreak;
    document.getElementById('score').textContent = totalScore;
}

// Выбрать вариант
function selectOption(selectedIndex) {
    const comparison = shuffledComparisons[currentRound];
    const isCorrect = selectedIndex === comparison.correct;

    if (isCorrect) {
        correctAnswers++;
        currentStreak++;
        maxStreak = Math.max(maxStreak, currentStreak);
        totalScore += 10 + (currentStreak * 2); // Бонус за серию
    } else {
        currentStreak = 0;
    }

    showResult(isCorrect, comparison);
}

// Показать результат
function showResult(isCorrect, comparison) {
    const resultHeader = document.getElementById('result-header');
    const resultStatus = document.getElementById('result-status');

    if (isCorrect) {
        resultHeader.className = 'result-header correct';
        resultStatus.textContent = '✅ Правильно!';
    } else {
        resultHeader.className = 'result-header incorrect';
        resultStatus.textContent = '❌ Неправильно';
    }

    // Показать сравнение углеродного следа
    const maxCarbon = Math.max(comparison.options[0].carbon, comparison.options[1].carbon);

    document.getElementById('label-a').textContent = comparison.options[0].title;
    document.getElementById('value-a').textContent = comparison.options[0].carbon + ' кг CO₂';
    document.getElementById('bar-a').style.width = (comparison.options[0].carbon / maxCarbon * 100) + '%';

    document.getElementById('label-b').textContent = comparison.options[1].title;
    document.getElementById('value-b').textContent = comparison.options[1].carbon + ' кг CO₂';
    document.getElementById('bar-b').style.width = (comparison.options[1].carbon / maxCarbon * 100) + '%';

    // Показать факт
    document.getElementById('fact-text').textContent = comparison.fact;

    showScreen('result-screen');
}

// Следующий раунд
function nextRound() {
    currentRound++;

    if (currentRound < shuffledComparisons.length) {
        showScreen('game-screen');
        loadRound();
    } else {
        showFinalScreen();
    }
}

// Показать финальный экран
function showFinalScreen() {
    const percentage = Math.round((correctAnswers / shuffledComparisons.length) * 100);

    document.getElementById('final-percentage').textContent = percentage + '%';
    document.getElementById('final-correct').textContent = correctAnswers;
    document.getElementById('final-total').textContent = shuffledComparisons.length;
    document.getElementById('final-streak').textContent = maxStreak;
    document.getElementById('final-score').textContent = totalScore;

    let title, text;

    if (percentage >= 90) {
        title = '🌟 Эко-гений!';
        text = 'Невероятно! Вы отлично понимаете, как наши действия влияют на климат. Продолжайте делать экологичный выбор!';
    } else if (percentage >= 70) {
        title = '🌍 Эко-эксперт!';
        text = 'Отлично! Вы хорошо разбираетесь в углеродном следе. Теперь применяйте эти знания в жизни!';
    } else if (percentage >= 50) {
        title = '🌱 Экологичный новичок';
        text = 'Хороший результат! Вы начинаете понимать, как снизить свой углеродный след. Продолжайте учиться!';
    } else {
        title = '🌿 Есть что изучить';
        text = 'Некоторые ответы могли удивить вас. Пройдите игру снова, чтобы лучше узнать об углеродном следе!';
    }

    document.getElementById('achievement-title').textContent = title;
    document.getElementById('achievement-text').textContent = text;

    showScreen('final-screen');
}

// Подтвердить выход
function confirmExit() {
    if (confirm('Вы уверены, что хотите выйти? Прогресс будет потерян.')) {
        window.location.href = 'index.html';
    }
}

// Показать экран
function showScreen(screenId) {
    document.querySelectorAll('.screen').forEach(screen => {
        screen.classList.add('hidden');
    });
    document.getElementById(screenId).classList.remove('hidden');
}
