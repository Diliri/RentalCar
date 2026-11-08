```
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

Інструкції з інсталяції та деплою Ініціалізувати проєкт та встановити залежності:

Bash

```
npx create-next-app@latest rental-car --typescript --eslint --app
cd rental-car
npm install @tanstack/react-query axios react-hot-toast react-icons
```

Деплой:

Завантажити вихідний код у Git-репозиторій (GitHub/GitLab).

Підключити репозиторій у сервісі Vercel або Netlify — проект зберуться та розгорнеться автоматично.
