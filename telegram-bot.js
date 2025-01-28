"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendNewTicketNotification = sendNewTicketNotification;
var node_telegram_bot_api_1 = require("node-telegram-bot-api");
var dotenv = require("dotenv");
dotenv.config({ path: ".env.local" });
var token = process.env.TELEGRAM_BOT_TOKEN;
var password = process.env.TELEGRAM_BOT_PASSWORD;
if (!token) {
    throw new Error("TELEGRAM_BOT_TOKEN is not set in the environment variables");
}
if (!password) {
    throw new Error("TELEGRAM_BOT_PASSWORD is not set in the environment variables");
}
var bot = new node_telegram_bot_api_1.default(token, { polling: true });
var authorizedUsers = new Set();
bot.onText(/\/start/, function (msg) {
    var chatId = msg.chat.id;
    bot.sendMessage(chatId, "Будь ласка, введіть пароль для доступу до меню.");
});
bot.on("message", function (msg) {
    var chatId = msg.chat.id;
    if (msg.text === password) {
        authorizedUsers.add(chatId);
        showMenu(chatId);
    }
    else if (authorizedUsers.has(chatId)) {
        handleMenuOption(chatId, msg.text);
    }
    else {
        bot.sendMessage(chatId, "Невірний пароль. Спробуйте ще раз або використайте /start для початку.");
    }
});
function showMenu(chatId) {
    bot.sendMessage(chatId, "Оберіть опцію:", {
        reply_markup: {
            keyboard: [[{ text: "Нові тікети" }, { text: "Всі тікети" }]],
            resize_keyboard: true,
            one_time_keyboard: false,
        },
    });
}
function handleMenuOption(chatId, option) {
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
            bot.sendMessage(chatId, "Невідома команда. Будь ласка, використовуйте меню.");
    }
}
// Функція для надсилання сповіщення про новий тікет
function sendNewTicketNotification(ticketInfo) {
    authorizedUsers.forEach(function (chatId) {
        bot.sendMessage(chatId, "\u041D\u043E\u0432\u0438\u0439 \u0442\u0456\u043A\u0435\u0442:\n".concat(ticketInfo));
    });
}
console.log("Telegram bot is running...");
