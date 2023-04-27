# Запуск проекта
`npm i && npm start`

# Структура проекта
- `EnglishVocabularyTrainer/`
    - `public/`
        - `index.html`
            - Основная структура HTML-документа
    - `src/`
        - `model/`
            - `EnglishVocabularyTrainer.ts`
                - Модель, реализует логику тренажера,
                  хранит данные об обучающих вопросах, их состоянии и ответах пользователя, а также предоставляет методы для управления процессом обучения
                - `mock/`
                    - `allTrainingWords.ts`
                      - Заготовленный список слов для тренировки
                - `utils/`
                  - Вспомогательные функции для модели
        - `view/`
          - `Component.ts`
            - Ключевой для view абстрактный класс компонента, все компоненты наследуются от него.
              Реализует методы для рендеринга и удаления элемента, установки и очистки обработчиков событий, 
              а также перерисовки компонента с сохранением обработчиков.
          - `utils/`
              - Вспомогательные функции для представления
          - `components/`
            - `StartScreen.ts`
              - Начальный экран приложения с кнопкой начала тренировки
            - `Training.ts`
              - Основная страница тренировки, 
                отображает текущее задание, кнопки ввода букв, уже отвеченные буквы, количество ошибок и порядковый номер задания
            - `Summary.ts`
              - Страница результатов тренировки, содержит статистику и кнопку возврата к первому экрану
            - `ResumeRequestModal.ts`
              - Модальное окно предложения возобновления предыдущей незаконченной тренировки.
                Имеет две кнопки - продолжить тренировку и начать заново
        - `controller/`
            - `Controller.ts`
                - Контроллер реализует обработку действий пользователя, 
                  изменение состояния модели и перерисовку представления.
            - `utils/`
                - Вспомогательные функции для контроллера
        - `router/`
          - `Router.ts`
            -  Простенький роутер. Умеет переключать страницы, 
               запускает нужный обработчик в зависимости от текущего урла.
               Поддерживает динамические роуты вида `/page/:slug`,
               передавая динамическую часть в функцию-обработчик данной страницы
        - `services/`
          -  `StorageService.ts`
            - Сервис для хранения текущих данных приложения.  
              По умолчанию использует window.localStorage, 
              но может быть переключен на любое другое хранилище
        - `app.ts`
          - Корневой файл приложения.
            Запускает контроллер, передавая ему инстансы модели, хранилища и роутера

# Процесс разработки
Слушайте, спасибо за это тестовое, оно мне действительно понравилось.

Я так давно не писал на чистом JS, это было на самом деле интересно.  
С виду это было так просто, приключение на 5 минут,  
но тз открывает такое неожиданное пространство возможностей для реализации.

Хочется дорабатывать и дорабатывать, еле заставил себя остановиться на текущей реализации.

Можно подключить обзёрвер к модели и сделать реактивное обновление ui при изменении props.  
Можно допилить роутер, добавив для каждого роута коллбэк на unmount.  
Можно доработать вью, добавить методы жизненного цикла компонента.   
Можно докинуть тесты, cypress так и напрашивается.  
Можно заняться вёрсткой и накрутить семантику и доступность.  
Можно подключить сервер и сделать SSR. Сделать авторизацию и хранить результаты пользователей.  
Можно воспользоваться API чата GPT, пусть он генерирует слова для тренировки, а также выводит комментарий после каждого задания и на странице результатов. 
Что-то типа, "Неплохо, ни одной ошибки!", "Могло быть и лучше", "Это твой лучший результат".   
Можно добавить разные уровни сложности.
Можно поработать над контроллером, он сильно разросся, пора делить на подклассы.  

В конце концов это нужно протетестить на чём то более реальном чем я.
