import {IUser} from "../api/types";

export const Users:IUser[] = [
  {
    id: 1,
    first_name: "Дима",
    last_name: "Петров",
    display_name: "Дима",
    email: 'dima@ya.ru',
    created_at:"2023-05-24T11:27:52.729Z",
    updated_at:"2023-05-24T11:27:52.729Z",
    avatar: 'https://ya-praktikum.tech/api/v2/resources//5651bc91-8189-4042-8f92-933c4b8f8415/b5833c66-ce21-446c-b6c9-dc500587f463_avatarki-dlia-vatsapa-49.webp',
  },{
    id: 2,
    first_name: "Миша",
    last_name: "Иванов",
    display_name: "Миша",
    created_at:"2023-05-24T11:27:52.729Z",
    updated_at:"2023-05-24T11:27:52.729Z",
    email: 'misha@ya.ru',
    avatar: 'https://ya-praktikum.tech/api/v2/resources/cd51bcb1-8a34-4acd-92ae-028d3244a650/fc5ef7f8-1107-4015-9b20-8e0c6ccd720e_453544.png',
  }
  ,{
    id: 3,
    first_name: "Лида",
    last_name: "Сидорова",
    display_name: "Лида",
    created_at:"2023-05-24T11:27:52.729Z",
    updated_at:"2023-05-24T11:27:52.729Z",
    email: 'sidorov@ya.ru',
    avatar: 'https://ya-praktikum.tech/api/v2/resources//9b34f0d7-c858-4385-816d-9fb23954ceab/8f3875fd-6ce1-41dc-aa3b-e16a9dbad6fe_medved.jpg'
  }
]