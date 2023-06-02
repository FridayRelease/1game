const mockCommentsGETByIdTopic5 = JSON.stringify({
  id: 5,
  message: 'message 2',
  user_id: 2,
  comment_id: null,
  created_at: '2023-05-24T13:01:28.783Z',
  updated_at: '2023-05-24T13:01:28.783Z',
  topic_id: 5,
  user: {
    id: 2,
    first_name: 'Mike',
    last_name: 'Mike_Big',
    email: 'davidjoe@email.com',
    display_name: null,
    avatar: null,
    created_at: '2023-05-24T11:31:21.229Z',
    updated_at: '2023-05-24T11:31:21.229Z',
  },
  comments: null,
  /*comments: [
    {
      id: 7,
      message: 'message 2.1',
      user_id: 1,
      topic_id: 5,
      comment_id: 5,
      created_at: '2023-05-24T13:02:54.424Z',
      user: {
        id: 2,
        first_name: 'Mike',
        last_name: 'Mike_Big',
        email: 'davidjoe@email.com',
        display_name: null,
        avatar: null,
        created_at: '2023-05-24T11:31:21.229Z',
        updated_at: '2023-05-24T11:31:21.229Z',
      },
    },
    {
      id: 8,
      message: 'message 2.2',
      user_id: 3,
      topic_id: 5,
      comment_id: 5,
      created_at: '2023-05-24T13:03:09.987Z',
      user: {
        id: 2,
        first_name: 'Mike',
        last_name: 'Mike_Big',
        email: 'davidjoe@email.com',
        display_name: null,
        avatar: null,
        created_at: '2023-05-24T11:31:21.229Z',
        updated_at: '2023-05-24T11:31:21.229Z',
      },
      comments: [
        {
          id: 10,
          message: 'message 2.2.1',
          user_id: 2,
          topic_id: 5,
          comment_id: 5,
          created_at: '2023-05-24T13:02:54.424Z',
          user: {
            id: 2,
            first_name: 'Mike',
            last_name: 'Mike_Big',
            email: 'davidjoe@email.com',
            display_name: null,
            avatar: null,
            created_at: '2023-05-24T11:31:21.229Z',
            updated_at: '2023-05-24T11:31:21.229Z',
          },
        },
        {
          id: 11,
          message: 'message 2.2.2',
          user_id: 2,
          topic_id: 5,
          comment_id: 5,
          created_at: '2023-05-24T13:02:54.424Z',
          user: {
            id: 2,
            first_name: 'Mike',
            last_name: 'Mike_Big',
            email: 'davidjoe@email.com',
            display_name: null,
            avatar: null,
            created_at: '2023-05-24T11:31:21.229Z',
            updated_at: '2023-05-24T11:31:21.229Z',
          },
          comments: [
            {
              id: 10,
              message: 'message 2.2.2.1',
              user_id: 2,
              topic_id: 5,
              comment_id: 5,
              created_at: '2023-05-24T13:02:54.424Z',
              user: {
                id: 2,
                first_name: 'Mike',
                last_name: 'Mike_Big',
                email: 'davidjoe@email.com',
                display_name: null,
                avatar: null,
                created_at: '2023-05-24T11:31:21.229Z',
                updated_at: '2023-05-24T11:31:21.229Z',
              },
            },
          ],
        },
      ],
    },
    {
      id: 9,
      message: 'message 2.3',
      user_id: 2,
      topic_id: 5,
      comment_id: 5,
      created_at: '2023-05-24T13:03:18.533Z',
    },
  ],
  */
});

export { mockCommentsGETByIdTopic5 };

/*
commentGETById - это пример строки json-a рекурсивных комментариев.


Так данные выглядят в БД:

postgres=# select * from users;
 id | first_name | last_name |       email        |         created_at         |         updated_at         | display_name | avatar
----+------------+-----------+--------------------+----------------------------+----------------------------+--------------+--------
  1 | John       | Doe       | johndoe@email.com  | 2023-05-24 11:27:52.729+00 | 2023-05-24 11:27:52.729+00 |              |
  2 | David      | Joe       | davidjoe@email.com | 2023-05-24 11:31:21.229+00 | 2023-05-24 11:31:21.229+00 |              |
(2 rows)

postgres=# select * from topics;
 id |   subject   | user_id |         created_at         |         updated_at
----+-------------+---------+----------------------------+----------------------------
  4 | First topic |       2 | 2023-05-24 12:22:58.303+00 | 2023-05-24 12:22:58.303+00
  5 | topic 2     |       2 | 2023-05-24 12:25:40.192+00 | 2023-05-24 12:25:40.192+00
  6 | topic 3     |       2 | 2023-05-24 12:26:18.536+00 | 2023-05-24 12:26:18.536+00
  7 | topic 3     |       2 | 2023-05-24 12:28:03.644+00 | 2023-05-24 12:28:03.644+00
  8 | topic 3     |       2 | 2023-05-24 12:29:00.397+00 | 2023-05-24 12:29:00.397+00
(5 rows)

postgres=# select * from comments;
 id |    message    | user_id | topic_id | comment_id |         created_at         |         updated_at
----+---------------+---------+----------+------------+----------------------------+----------------------------
  4 | message 1     |       2 |        5 |            | 2023-05-24 12:55:58.762+00 | 2023-05-24 12:55:58.762+00
  5 | message 2     |       2 |        5 |            | 2023-05-24 13:01:28.783+00 | 2023-05-24 13:01:28.783+00
  6 | message 3     |       2 |        5 |            | 2023-05-24 13:01:43.156+00 | 2023-05-24 13:01:43.156+00
  7 | message 2.1   |       2 |        5 |          5 | 2023-05-24 13:02:54.424+00 | 2023-05-24 13:02:54.424+00
  8 | message 2.2   |       2 |        5 |          5 | 2023-05-24 13:03:09.987+00 | 2023-05-24 13:03:09.987+00
  9 | message 2.3   |       2 |        5 |          5 | 2023-05-24 13:03:18.533+00 | 2023-05-24 13:03:18.533+00
 10 | message 2.2.1 |       2 |        5 |          8 | 2023-05-24 13:04:00.082+00 | 2023-05-24 13:04:00.082+00
 11 | message 2.2.2 |       2 |        5 |          8 | 2023-05-24 13:04:14.563+00 | 2023-05-24 13:04:14.563+00
(8 rows)

*/
