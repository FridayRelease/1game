import { IComment } from '../api/types';

export const mockComments: IComment[] = [
  {
    id: 1,
    message: 'Куплю мишку',
    user_id: 2,
    comment_id: null,
    nested_comment_count: 3,
    created_at: '2023-05-24T11:27:52.729Z',
    updated_at: '2023-05-24T11:27:52.729Z',
    topic_id: 1,
    user: {
      id: 2,
      first_name: 'Mike',
      last_name: 'Petrov',
      email: 'p@ya.ru',
      display_name: 'Mike',
      avatar:
        'https://ya-praktikum.tech/api/v2/resources//5651bc91-8189-4042-8f92-933c4b8f8415/b5833c66-ce21-446c-b6c9-dc500587f463_avatarki-dlia-vatsapa-49.webp',
      created_at: '2023-05-24T11:27:52.729Z',
      updated_at: '2023-05-24T11:27:52.729Z',
    },
    comments: [
      {
        id: 2,
        message: 'Какого мишку',
        user_id: 4,
        comment_id: 1,
        nested_comment_count: 0,
        created_at: '2023-05-24T11:27:52.729Z',
        updated_at: '2023-05-24T11:27:52.729Z',
        topic_id: 1,
        user: {
          id: 4,
          first_name: 'Lida',
          last_name: 'Fedora',
          email: 'f@ya.ru',
          display_name: 'Lida',
          avatar:
            'https://ya-praktikum.tech/api/v2/resources//9b34f0d7-c858-4385-816d-9fb23954ceab/8f3875fd-6ce1-41dc-aa3b-e16a9dbad6fe_medved.jpg',
          created_at: '2023-05-24T11:27:52.729Z',
          updated_at: '2023-05-24T11:27:52.729Z',
        },
        comments: [
          {
            id: 3,
            message: 'Мягкого, коричневого',
            user_id: 2,
            comment_id: 2,
            nested_comment_count: 0,
            created_at: '2023-05-24T11:27:52.729Z',
            updated_at: '2023-05-24T12:27:52.729Z',
            topic_id: 1,
            user: {
              id: 2,
              first_name: 'Mike',
              last_name: 'Petrov',
              email: 'p@ya.ru',
              display_name: 'Mike',
              avatar:
                'https://ya-praktikum.tech/api/v2/resources//5651bc91-8189-4042-8f92-933c4b8f8415/b5833c66-ce21-446c-b6c9-dc500587f463_avatarki-dlia-vatsapa-49.webp',
              created_at: '2023-05-24T11:27:52.729Z',
              updated_at: '2023-05-24T11:27:52.729Z',
            },
          },
        ],
      },
      {
        id: 4,
        message: 'по три рубля',
        user_id: 5,
        comment_id: 1,
        nested_comment_count: 0,
        created_at: '2023-05-26T13:27:52.729Z',
        updated_at: '2023-05-26T13:27:52.729Z',
        topic_id: 1,
        user: {
          id: 5,
          first_name: 'Vas',
          last_name: 'Sidorov',
          email: 'v@ya.ru',
          display_name: 'Vasya',
          avatar:
            'https://ya-praktikum.tech/api/v2/resources/cd51bcb1-8a34-4acd-92ae-028d3244a650/fc5ef7f8-1107-4015-9b20-8e0c6ccd720e_453544.png',
          created_at: '2023-05-24T11:27:52.729Z',
          updated_at: '2023-05-24T11:27:52.729Z',
        },
      },
    ],
  },
];
