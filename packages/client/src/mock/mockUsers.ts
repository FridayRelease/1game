import {IUserDTO} from "@/api/types";

export const Users:IUserDTO[] = [
  {
    id: 1,
    first_name: "Дима",
    second_name: "Петров",
    display_name: "Дима",
    login: 'Dima',
    email: 'dima@ya.ru',
    phone: '+749511111111',
    avatar: '../../mock/currentUser.jpg',
  },{
    id: 2,
    first_name: "Миша",
    second_name: "Иванов",
    display_name: "Миша",
    login: 'Misha',
    email: 'misha@ya.ru',
    phone: '+74952222222',
    avatar: '../../../../mock/face2.png',
  }
  ,{
    id: 3,
    first_name: "Лида",
    second_name: "Сидорова",
    display_name: "Лида",
    login: 'Petr',
    email: 'sidorov@ya.ru',
    phone: '+74953333333',
    avatar: '../../mock/face3.png',
  }
]