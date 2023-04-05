export interface chatMessage {
  chatId: number;
  id: number;
  user: string;
  message: string;
  data: string;
}

export const Chats: chatMessage[] = [
  {
    chatId: 1,
    id: 1,
    user: 'Михаил',
    message: 'Ничего не понятно в этой игре',
    data: '21 января 2023',
  },
  {
    chatId: 1,
    id: 2,
    user: 'Михаил',
    message: 'Кто-нибудь подскажите, как победить',
    data: '22 января 2023',
  },
  {
    chatId: 1,
    id: 3,
    user: 'Михаил',
    message: 'Спасите мой танк, дайте совет!!! А  то катастрофа,,,',
    data: '23 января 2023',
  },
  {
    chatId: 2,
    id: 4,
    user: 'Василий',
    message: 'А я все понял и выигрываю',
    data: '24 января 2023',
  },
  {
    chatId: 2,
    id: 5,
    user: 'Василий',
    message: 'Да я просто герой, 100 побед за сутки!!!',
    data: '25 января 2023',
  },
  {
    chatId: 2,
    id: 6,
    user: 'Василий',
    message: 'А я первый в рейтинге !!!',
    data: '26 января 2023',
  },
  {
    chatId: 3,
    id: 7,
    user: 'Петя',
    message: 'Я тоже выигрываю',
    data: '25 января 2023',
  },
  {
    chatId: 3,
    id: 8,
    user: 'Петя',
    message: 'Сегодня 10 раз выиграл!!!',
    data: '26 января 2023',
  },
  {
    chatId: 3,
    id: 9,
    user: 'Петя',
    message: 'Я седьмой в рейтинге',
    data: '27 января 2023',
  },
  {
    chatId: 4,
    id: 10,
    user: 'Кот Матроскин',
    message: 'А я проигрываю, но не унываю',
    data: '24 января 2023',
  },
  {
    chatId: 4,
    id: 11,
    user: 'Кот Матроскин',
    message: 'А я борюсь, победа будет за нами',
    data: '25 января 2023',
  },
  {
    chatId: 4,
    id: 12,
    user: 'Кот Матроскин',
    message: 'Два раза победил',
    data: '26 января 2023',
  },
  {
    chatId: 5,
    id: 13,
    user: 'Микроб',
    message: 'Ха-Ха, я выигрываю всегда',
    data: '29 января 2023',
  },
  {
    chatId: 5,
    id: 14,
    user: 'Микроб',
    message: 'А я второй в списке',
    data: '30 января 2023',
  },
  {
    chatId: 5,
    id: 15,
    user: 'Микроб',
    message: 'Сегодня третий',
    data: '31 января 2023',
  },
  {
    chatId: 6,
    id: 16,
    user: 'Гена Крокодил',
    message: 'А я бросил играть - ничего не понятно',
    data: '28 января 2023',
  },
  {
    chatId: 6,
    id: 17,
    user: 'Гена Крокодил',
    message: 'Чебурашка вас всех сделает сегодня!!!',
    data: '29 января 2023',
  },
  {
    chatId: 6,
    id: 18,
    user: 'Гена Крокодил',
    message: 'Ага - Чебурека - лучший !!!',
    data: '30 января 2023',
  },
];
