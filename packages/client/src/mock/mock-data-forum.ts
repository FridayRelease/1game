export interface forumMessage {
  chatId: number;
  user: string;
  message: string;
  data: string;
  quantity: number;
}

export const Messages: forumMessage[] = [
  {
    chatId: 1,
    user: 'Михаил',
    message: 'Ничего не понятно в этой игре',
    data: '23 января 2023',
    quantity: 5,
  },
  {
    chatId: 2,
    user: 'Василий',
    message: 'А я все понял и выигрываю',
    data: '24 января 2023',
    quantity: 2,
  },
  {
    chatId: 3,
    user: 'Петя',
    message: 'Я тоже выигрываю',
    data: '25 января 2023',
    quantity: 3,
  },
  {
    chatId: 4,
    user: 'Кот Матроскин',
    message: 'А я проигрываю, но не унываю',
    data: '24 января 2023',
    quantity: 1,
  },
  {
    chatId: 5,
    user: 'Микроб',
    message: 'Ха-Ха, я выигрываю всегда',
    data: '29 января 2023',
    quantity: 9,
  },
  {
    chatId: 6,
    user: 'Гена Крокодил',
    message: 'А я бросил играть - ничего не понятно',
    data: '28 января 2023',
    quantity: 1,
  },
];
export const currentUser = 'Aslan';
