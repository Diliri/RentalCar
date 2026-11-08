# 🚗 RentalCar — Сервіс оренди автомобілів

**RentalCar** — це сучасний веб-застосунок для пошуку, фільтрації та бронювання авто. Проєкт розроблений у рамках навчального технічного оцінювання з дотриманням усіх вимог щодо архітектури, дизайну та функціональності.

---

## 🔗 Посилання (Links)

* **Деплой (Live Demo):** [rental-car-eight-mauve.vercel.app](rental-car-eight-mauve.vercel.app) 
* **Репозиторій (GitHub):** [https://github.com/DiLiRi/RentalCar](https://github.com/DiLiRi/RentalCar)

---

## 🛠 Технологічний стек (Tech Stack)

* **Фреймворк:** [Next.js](https://nextjs.org/) (App Router)
* **Мова:** [TypeScript](https://www.typescriptlang.org/)
* **Управління станом та запитами:** [TanStack Query (React Query)](https://tanstack.com/query) (`useInfiniteQuery`)
* **Стилізація:** CSS Modules
* **HTTP-клієнт:** [Axios](https://axios.com/)
* **Сповіщення:** `react-hot-toast`
* **Іконки:** SVG Sprites (`symbol-defs.svg`)

---

## ✨ Основні функції (Features)

* **Home Page (`/`):**
  * Головний банер (Hero Section) із закликом до дії.
  * Швидкий перехід до каталогу за допомогою кнопки *View Catalog*.

* **Catalog Page (`/catalog`):**
  * Відображення списку доступних автомобілів із бекенду.
  * **Пагінація "Load More":** підвантаження сторінок через `useInfiniteQuery` із збереженням активних фільтрів.
  * **Фільтрація на бекенді:**
    * Пошук за брендом автомобіля.
    * Пошук за ціною оренди за годину.
    * Пошук за діапазоном пробігу (від / до).
  * Відкриття сторінки деталей автомобіля у новій вкладці браузера (`target="_blank"`).
  * Анімований Custom Loader під час асинхронних запитів.
  * Обробка порожнього стану ("Нічого не знайдено") зі спеціальним графічним оформленням.

* **Car Details Page (`/catalog/[carId]`):**
  * Повна інформація про автомобіль: артикул, фото, локація, умови оренди, технічні характеристики та особливості.
  * Інтерактивна форма оренди з валідацією полів.
  * Відправка бронювання на endpoint бекенду та виведення toast-сповіщення про успіх.

---

## 📁 Структура проєкту (Project Structure)

```text
RENTALCAR/
├── app/                  # Маршрути (Next.js App Router)
│   ├── catalog/
│   │   ├── [carId]/
│   │   │   ├── page.tsx
│   │   │   └── page.module.css
│   │   ├── page.tsx
│   │   └── page.module.css
│   ├── globals.css
│   ├── layout.tsx
│   ├── page.module.css
│   └── page.tsx
├── components/           # UI-компоненти
│   ├── CarCard/
│   ├── Filters/
│   ├── Header/
│   └── RentalForm/
├── services/             # API запити (api.ts)
├── types/                # TypeScript типи (car.ts)
├── providers/            # React Query Provider (QueryProvider.tsx)
└── public/
```
🚀 Інструкція зі встановлення та використання (Getting Started)
Попередні вимоги
Переконайтеся, що у вас встановлено Node.js (версії 18.x або новішої) та npm.
1. Клонування репозиторію
Bash
git clone [https://github.com/Diliri/RentalCar](https://github.com/DiLiRi/RentalCar)
cd rental-car
2. Встановлення залежностей
Bash
npm install
3. Запуск у режимі розробки
Bash
npm run dev
Відкрийте http://localhost:3000 у своєму браузері, щоб переглянути результат.
4. Збірка проєкту (Production Build)
Bash
npm run build
npm run start
5. Деплой:
Завантажити вихідний код у Git-репозиторій (GitHub/GitLab).
Підключити репозиторій у сервісі Vercel або Netlify — проект збереться та розгорнеться автоматично.

👤 Автор (Author) [Diana Muzhylivska]

GitHub: @DiLiRi

Email: diana.listen@gmail.com
