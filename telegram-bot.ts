import TelegramBot from "node-telegram-bot-api";
import * as dotenv from "dotenv";

dotenv.config({ path: ".env.local" });

const token = process.env.TELEGRAM_BOT_TOKEN;
const password = process.env.TELEGRAM_BOT_PASSWORD;

if (!token) {
  throw new Error("TELEGRAM_BOT_TOKEN is not set in the environment variables");
}

if (!password) {
  throw new Error(
    "TELEGRAM_BOT_PASSWORD is not set in the environment variables"
  );
}

const bot = new TelegramBot(token, { polling: true });

const authorizedUsers = new Set<number>();

bot.onText(/\/start/, (msg) => {
  const chatId = msg.chat.id;
  bot.sendMessage(chatId, "Будь ласка, введіть пароль для доступу до меню.");
});

bot.on("message", (msg) => {
  const chatId = msg.chat.id;

  if (msg.text === password) {
    authorizedUsers.add(chatId);
    showMenu(chatId);
  } else if (authorizedUsers.has(chatId)) {
    handleMenuOption(chatId, msg.text);
  } else {
    bot.sendMessage(
      chatId,
      "Невірний пароль. Спробуйте ще раз або використайте /start для початку."
    );
  }
});

function showMenu(chatId: number) {
  bot.sendMessage(chatId, "Оберіть опцію:", {
    reply_markup: {
      keyboard: [[{ text: "Нові тікети" }, { text: "Всі тікети" }]],
      resize_keyboard: true,
      one_time_keyboard: false,
    },
  });
}

function handleMenuOption(chatId: number, option: string | undefined) {
  switch (option) {
    case "Нові тікети":
      bot.sendMessage(chatId, "Ось список нових тікетів:");
      // Тут логіка для отримання та відображення нових тікетів
      break;
    case "Всі тікети":
      bot.sendMessage(chatId, "Ось список всіх тікетів:");
      // Тут логіка для отримання та відображення всіх тікетів
      break;
    default:
      bot.sendMessage(
        chatId,
        "Невідома команда. Будь ласка, використовуйте меню."
      );
  }
}

// Функція для надсилання сповіщення про новий тікет
export function sendNewTicketNotification(ticketInfo: string) {
  authorizedUsers.forEach((chatId: number) => {
    bot.sendMessage(chatId, `Новий тікет:\n${ticketInfo}`);
  });
}

console.log("Telegram bot is running...");
