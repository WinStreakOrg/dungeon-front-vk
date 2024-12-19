# Базовый образ с Node.js (подходит для Next.js)
FROM node:18

# Устанавливаем рабочую директорию
WORKDIR /usr/src/app

# Копируем package.json и package-lock.json
COPY package.json yarn.lock ./

# Устанавливаем зависимости
RUN yarn install --frozen-lockfile

# Копируем исходный код проекта
COPY . .

# Собираем приложение
RUN yarn build

# Указываем порт, который будет использоваться
EXPOSE 5000

# Запускаем Next.js в продакшн-режиме
CMD ["yarn", "start"]
