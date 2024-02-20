
//Функция для добавления элементов вопроса
function addQuestion(item) {
    let questionId = item.questionId;
    let textquestion = item.textquestion;
    let textDescription = item.textDescription;
    let textoption1 = item.textoption1;
    let textoption2 = item.textoption2;
    let textoption3 = item.textoption3;
    let textoption4 = item.textoption4;

    let newQuestion = document.createElement('div');
    newQuestion.classList.add('question');
    newQuestion.id = questionId;
    let questionTitle = document.createElement('h2');
    questionTitle.textContent = textquestion;
    let questionDescription = document.createElement('p');
    questionDescription.classList.add('description');
    questionDescription.textContent = textDescription;

    // Добавляем заголовок и описание вопроса к новому элементу
    newQuestion.appendChild(questionTitle);
    newQuestion.appendChild(questionDescription);

    // Создаем контейнер для вариантов ответа
    var optionsContainer = document.createElement('div');
    optionsContainer.classList.add('options');

    // Создаем варианты ответов
    var option1 = document.createElement('div');
    option1.classList.add('option');
    option1.textContent = textoption1;

    var option2 = document.createElement('div');
    option2.classList.add('option');
    option2.textContent = textoption2;

    var option3 = document.createElement('div');
    option3.classList.add('option');
    option3.textContent = textoption3;

    var option4 = document.createElement('div');
    option4.classList.add('option');
    option4.textContent = textoption4;

    // Добавляем варианты ответов в контейнер
    optionsContainer.appendChild(option1);
    optionsContainer.appendChild(option2);
    optionsContainer.appendChild(option3);
    optionsContainer.appendChild(option4);

    // Добавляем контейнер с вариантами ответов к вопросу
    newQuestion.appendChild(optionsContainer);

    // Добавляем новый вопрос на страницу
    document.body.appendChild(newQuestion);

};

function initQuestions() {

    //Salu server
    fetch('http://87.241.142.231:45678/Word/hs/API/test', {
        method: 'GET',
        headers: {
            'deviceId': getDeviceId()
        }
    })
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            data.forEach((item) => addQuestion(item))

        })
        .finally(() => {
            // Получаем все вопросы
            let questions = document.querySelectorAll('.question');
            // Добавляем обработчик события клика для каждого вопроса
            questions.forEach(function (question) {
                var options = question.querySelectorAll('.option');
                options.forEach(function (option) {
                    option.addEventListener('click', function () {
                        // Удаляем класс 'selected' у всех вариантов ответа в текущем вопросе
                        options.forEach(function (opt) {
                            opt.classList.remove('selected');
                        });
                        // Добавляем класс 'selected' к выбранному варианту ответа в текущем вопросе
                        this.classList.add('selected');
                    });
                });
            })
        });
};

// Функция для сбора ответов в JSON
function collectAnswers() {
    var answers = [];
    let questions = document.querySelectorAll('.question');
    questions.forEach(function (question, index) {
        var selectedOption = question.querySelector('.selected');
        if (selectedOption) {
            var answer = {
                question: question.id,
                response: selectedOption.textContent.trim()
            };
            answers.push(answer);
        }
    });
    return JSON.stringify(answers);
}

// Функция для отправки ответов на сервер POST-запросом
function sendAnswers() {
    var data = collectAnswers();
    // Отправка ответов на сервер
    // В этом примере отправка просто выполняется асинхронно, но реальный код может отличаться
    fetch('http://87.241.142.231:45678/Word/hs/API/test', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Deviceid': getDeviceId()
           },
        body: data
    })
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            console.log('Response received:', data);
            // Перенаправление пользователя на другой сайт
            if (data.redirectUrl) {
                window.location.href = data.redirectUrl; // Перенаправление на URL, полученный от сервера
            } else {
                console.error('No redirect URL found in server response');
            }
        })
        .catch(error => {
            console.error('Error occurred:', error);
        });
}

// Функция для создания уникального идентификатора устройства
function generateDeviceId() {
    // Генерируем случайное число и преобразуем его в строку
    return Math.random().toString(36).substr(2, 10);
}

// Функция для получения идентификатора устройства из куки
function getDeviceId() {
    // Пытаемся получить значение идентификатора устройства из куки
    var deviceId = document.cookie.replace(/(?:(?:^|.*;\s*)deviceId\s*\=\s*([^;]*).*$)|^.*$/, "$1");
    
    // Если идентификатор устройства отсутствует в куки, создаем новый
    if (!deviceId) {
        deviceId = generateDeviceId();
        // Устанавливаем идентификатор устройства в куки сроком на 365 дней
        document.cookie = "deviceId=" + deviceId;
    }
    
    return deviceId;
}


//addQuestion();
initQuestions();

// Добавляем обработчик клика для кнопки отправки ответов
var submitBtn = document.querySelector('.submit-btn');
submitBtn.addEventListener('click', sendAnswers);
