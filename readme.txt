АвтоСвет интернет-магазин оптики всех видов для автомобилей.

-Описание проекта:

Проект веб-приложения\сайта  "АвтоСвет" - это онлайн-магазин, 
где осуществляется продажа фар и различных аксессуаров 
для машин. Тему выбрал такую: все про автомобильную оптику.
Проект разработан с использованием React и Vite.

-Использованные технологии:

- React 19
- Vite 6
- ESLint
- TypeScript
- json-server (для локальной разработки и тестирования API)

-Необходимое ПО для запуска:

- Node.js (рекомендуется версия 18 или выше)
- npm

-Процесс установки:

1. Устанавливаете репозиторий:
Переходя по данной ссылке на репозиторий:
"https://github.com/Arsensor/sum_practic_autosvet"
Скачиваем данные проекта и устанавливаем к себе.

2. Установка NPM:
"npm install"

-Запуск проекта:

3. Установка React-Router-Dom:
"npm install react-router-dom"

-Запуск проекта:

1. Запуск json-server

Для запуска локального API-сервера выполните:
"npx json-server --watch db.json --port 3000"

*API будет доступно по адресу: "http://localhost:3000"*


Для запуска проекта в режиме разработки выполните:
"npm run dev"

*Приложение будет доступно по адресу: `http://localhost:5173`*


-Структура проекта:

autosvet_shop/
├── src/           # Исходный код приложения
├── public/        # Статические файлы
├── node_modules/  # Зависимости проекта
├── db.json        # Локальная база данных для json-server
└── vite.config.js # Конфигурация Vite

-API Endpoints:

При запущенном json-server доступны следующие эндпоинты:

- `GET http://localhost:3000/products` - получение списка товаров;
- `GET http://localhost:3000/products/:id` - получение информации о конкретном товаре;
- `POST http://localhost:3000/products` - создание нового товара;
- `PUT http://localhost:3000/products/:id` - обновление товара;
- `DELETE http://localhost:3000/products/:id` - удаление товара.

-Ссылки:
1. Макет проекта - "https://www.figma.com/design/1KrLKRJ4Tjs3OVx6sOuYjI/Summer_Practic_AvtoSvet?node-id=0-1&t=NgRJl16eVKGv0uJG-1"
2. Файлы проекта - "https://github.com/Arsensor/sum_practic_autosvet"