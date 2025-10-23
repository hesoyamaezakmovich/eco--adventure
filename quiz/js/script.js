// Вопросы викторины
const quizQuestions = [
    {
        question: "Сколько времени разлагается пластиковая бутылка в природе?",
        answers: ["1-5 лет", "50-100 лет", "450-1000 лет", "Не разлагается"],
        correct: 2,
        fact: "Пластиковая бутылка может разлагаться от 450 до 1000 лет! За это время она распадается на микропластик, который загрязняет почву и воду."
    },
    {
        question: "Какой процент кислорода на Земле производят океаны?",
        answers: ["20%", "50%", "70%", "90%"],
        correct: 2,
        fact: "Океаны производят около 70% кислорода на Земле благодаря фитопланктону - микроскопическим водорослям."
    },
    {
        question: "Сколько деревьев нужно срубить для производства 1 тонны бумаги?",
        answers: ["5-7 деревьев", "10-12 деревьев", "17-24 дерева", "30-35 деревьев"],
        correct: 2,
        fact: "Для производства 1 тонны бумаги требуется срубить 17-24 дерева. Переработка макулатуры спасает эти деревья!"
    },
    {
        question: "Какая страна производит больше всего солнечной энергии?",
        answers: ["США", "Китай", "Германия", "Индия"],
        correct: 1,
        fact: "Китай является мировым лидером по производству солнечной энергии, производя более 30% от мировой выработки."
    },
    {
        question: "Сколько воды экономит семья из 4 человек, установив экономичный душ на год?",
        answers: ["5000 литров", "25000 литров", "60000 литров", "100000 литров"],
        correct: 2,
        fact: "Семья из 4 человек может сэкономить до 60000 литров воды в год, используя экономичную душевую лейку!"
    },
    {
        question: "Какой процент пластика в мире перерабатывается?",
        answers: ["Менее 10%", "20-25%", "40-45%", "60-70%"],
        correct: 0,
        fact: "К сожалению, только около 9% всего пластика в мире перерабатывается. Остальное попадает на свалки или в океан."
    },
    {
        question: "Сколько энергии экономит переработка одной алюминиевой банки?",
        answers: ["Достаточно для 1 часа работы лампочки", "Достаточно для 3 часов работы TV", "Достаточно для зарядки телефона", "Достаточно для 4 часов работы ноутбука"],
        correct: 1,
        fact: "Переработка одной алюминиевой банки экономит энергию, достаточную для работы телевизора в течение 3 часов!"
    },
    {
        question: "Какое животное считается индикатором чистоты воды?",
        answers: ["Лягушка", "Рак", "Форель", "Все перечисленные"],
        correct: 3,
        fact: "Лягушки, раки и форель очень чувствительны к загрязнению воды. Их присутствие указывает на хорошее качество воды."
    },
    {
        question: "Сколько CO2 поглощает одно дерево за год?",
        answers: ["5 кг", "22 кг", "50 кг", "100 кг"],
        correct: 1,
        fact: "Одно взрослое дерево может поглотить около 22 кг углекислого газа за год, выделяя кислород для двух человек!"
    },
    {
        question: "Какая часть земной суши занята свалками мусора?",
        answers: ["0.5%", "1%", "3%", "5%"],
        correct: 2,
        fact: "Свалки занимают около 3% земной суши, и эта цифра постоянно растет. Важно сокращать отходы и перерабатывать!"
    },
    {
        question: "Сколько времени разлагается алюминиевая банка?",
        answers: ["50 лет", "100 лет", "200 лет", "500 лет"],
        correct: 2,
        fact: "Алюминиевая банка разлагается около 200 лет, но может быть переработана бесконечное количество раз!"
    },
    {
        question: "Какой транспорт производит наименьший углеродный след?",
        answers: ["Велосипед", "Электрический автобус", "Метро", "Электросамокат"],
        correct: 0,
        fact: "Велосипед не производит выбросов CO2 и является самым экологичным видом транспорта!"
    },
    {
        question: "Сколько пластиковых пакетов используется в мире каждую минуту?",
        answers: ["100 тысяч", "500 тысяч", "1 миллион", "5 миллионов"],
        correct: 2,
        fact: "В мире используется около 1 миллиона пластиковых пакетов каждую минуту! Используйте многоразовые сумки."
    },
    {
        question: "Какой процент воды на Земле пригоден для питья?",
        answers: ["1%", "3%", "10%", "25%"],
        correct: 1,
        fact: "Только около 3% воды на Земле пригодно для питья, и большая часть заморожена в ледниках. Берегите воду!"
    },
    {
        question: "Сколько энергии можно сэкономить, используя LED лампочки вместо обычных?",
        answers: ["30%", "50%", "75%", "90%"],
        correct: 3,
        fact: "LED лампочки потребляют на 90% меньше энергии, чем обычные лампы накаливания, и служат в 25 раз дольше!"
    }
];

// Состояние игры
let currentQuestionIndex = 0;
let correctAnswers = 0;
let totalScore = 0;
let userAnswers = [];

// Начать викторину
function startQuiz() {
    currentQuestionIndex = 0;
    correctAnswers = 0;
    totalScore = 0;
    userAnswers = [];

    showScreen('quiz-screen');
    loadQuestion();
    updateProgress();
}

// Загрузить вопрос
function loadQuestion() {
    const question = quizQuestions[currentQuestionIndex];

    document.getElementById('question-text').textContent = question.question;
    document.getElementById('current-question').textContent = currentQuestionIndex + 1;
    document.getElementById('total-questions').textContent = quizQuestions.length;

    const answersContainer = document.getElementById('answers-container');
    answersContainer.innerHTML = '';

    question.answers.forEach((answer, index) => {
        const button = document.createElement('button');
        button.className = 'answer-btn';
        button.textContent = answer;
        button.onclick = () => selectAnswer(index);
        answersContainer.appendChild(button);
    });

    updateProgress();
}

// Выбрать ответ
function selectAnswer(selectedIndex) {
    const question = quizQuestions[currentQuestionIndex];
    const buttons = document.querySelectorAll('.answer-btn');

    // Отключить все кнопки
    buttons.forEach(btn => btn.disabled = true);

    // Подсветить правильный и неправильный ответы
    buttons[question.correct].classList.add('correct');

    if (selectedIndex === question.correct) {
        correctAnswers++;
        totalScore += 10;
        document.getElementById('fact-result').textContent = '✅ Правильно!';
        document.getElementById('fact-result').style.color = '#4caf50';
    } else {
        buttons[selectedIndex].classList.add('incorrect');
        document.getElementById('fact-result').textContent = '❌ Неправильно';
        document.getElementById('fact-result').style.color = '#f44336';
    }

    // Обновить статистику
    document.getElementById('correct-count').textContent = correctAnswers;
    document.getElementById('score').textContent = totalScore;

    // Показать факт через 1 секунду
    setTimeout(() => {
        showFact(question.fact);
    }, 1000);
}

// Показать факт
function showFact(fact) {
    document.getElementById('fact-text').textContent = fact;
    showScreen('fact-screen');
}

// Следующий вопрос
function nextQuestion() {
    currentQuestionIndex++;

    if (currentQuestionIndex < quizQuestions.length) {
        showScreen('quiz-screen');
        loadQuestion();
    } else {
        showResults();
    }
}

// Показать результаты
function showResults() {
    const percentage = Math.round((correctAnswers / quizQuestions.length) * 100);

    document.getElementById('result-percentage').textContent = percentage + '%';
    document.getElementById('final-correct').textContent = correctAnswers;
    document.getElementById('final-total').textContent = quizQuestions.length;
    document.getElementById('final-score').textContent = totalScore;

    let title, message;

    if (percentage >= 90) {
        title = '🌟 Эко-эксперт!';
        message = 'Невероятно! Вы отлично разбираетесь в экологии. Продолжайте заботиться о планете!';
    } else if (percentage >= 70) {
        title = '🌱 Эко-знаток!';
        message = 'Отличный результат! Вы хорошо знаете экологические проблемы и их решения.';
    } else if (percentage >= 50) {
        title = '🌍 Начинающий эколог';
        message = 'Хороший старт! Продолжайте изучать экологию, чтобы ещё лучше помогать планете.';
    } else {
        title = '🌿 Учитесь дальше';
        message = 'Есть над чем поработать. Пройдите викторину снова, чтобы узнать больше!';
    }

    document.getElementById('result-title').textContent = title;
    document.getElementById('result-message').textContent = message;

    showScreen('result-screen');
}

// Перезапустить викторину
function restartQuiz() {
    startQuiz();
}

// Обновить прогресс
function updateProgress() {
    const progress = ((currentQuestionIndex + 1) / quizQuestions.length) * 100;
    document.getElementById('progress').style.width = progress + '%';
}

// Показать экран
function showScreen(screenId) {
    document.querySelectorAll('.screen').forEach(screen => {
        screen.classList.add('hidden');
    });
    document.getElementById(screenId).classList.remove('hidden');
}
