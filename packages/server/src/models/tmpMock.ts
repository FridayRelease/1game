// Get Comment
// app.get(`${v1}/comments/:id`, [commentRead]);
// curl -X GET -H "Content-Type: application/json" http://localhost:3001/api/v1/comments/5
const commentGETById = JSON.stringify({
  id: 5,
  message: 'message 2',
  user_id: 2,
  comment_id: null,
  created_at: '2023-05-24T13:01:28.783Z',
  updated_at: '2023-05-24T13:01:28.783Z',
  topic_id: 5,
  user: {
    id: 2,
    first_name: 'David',
    last_name: 'Joe',
    email: 'davidjoe@email.com',
    display_name: null,
    avatar: null,
    created_at: '2023-05-24T11:31:21.229Z',
    updated_at: '2023-05-24T11:31:21.229Z',
  },
  comments: [
    {
      id: 7,
      message: 'message 2.1',
      user_id: 2,
      comment_id: 5,
      created_at: '2023-05-24T13:02:54.424Z',
      updated_at: '2023-05-24T13:02:54.424Z',
      topic_id: 5,
      user: {
        id: 2,
        first_name: 'David',
        last_name: 'Joe',
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
      user_id: 2,
      comment_id: 5,
      created_at: '2023-05-24T13:03:09.987Z',
      updated_at: '2023-05-24T13:03:09.987Z',
      topic_id: 5,
      user: {
        id: 2,
        first_name: 'David',
        last_name: 'Joe',
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
          comment_id: 8,
          created_at: '2023-05-24T13:04:00.082Z',
          updated_at: '2023-05-24T13:04:00.082Z',
          topic_id: 5,
          user: {
            id: 2,
            first_name: 'David',
            last_name: 'Joe',
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
          comment_id: 8,
          created_at: '2023-05-24T13:04:14.563Z',
          updated_at: '2023-05-24T13:04:14.563Z',
          topic_id: 5,
          user: {
            id: 2,
            first_name: 'David',
            last_name: 'Joe',
            email: 'davidjoe@email.com',
            display_name: null,
            avatar: null,
            created_at: '2023-05-24T11:31:21.229Z',
            updated_at: '2023-05-24T11:31:21.229Z',
          },
        },
        {
          id: 12,
          message: 'message 2.2.3',
          user_id: 1,
          comment_id: 8,
          created_at: '2023-05-25T17:00:20.362Z',
          updated_at: '2023-05-25T17:00:20.362Z',
          topic_id: 5,
          user: {
            id: 1,
            first_name: 'John',
            last_name: 'Doe',
            email: 'johndoe@email.com',
            display_name: null,
            avatar: null,
            created_at: '2023-05-24T11:27:52.729Z',
            updated_at: '2023-05-24T11:27:52.729Z',
          },
        },
      ],
    },
    {
      id: 9,
      message: 'message 2.3',
      user_id: 2,
      comment_id: 5,
      created_at: '2023-05-24T13:03:18.533Z',
      updated_at: '2023-05-24T13:03:18.533Z',
      topic_id: 5,
      user: {
        id: 2,
        first_name: 'David',
        last_name: 'Joe',
        email: 'davidjoe@email.com',
        display_name: null,
        avatar: null,
        created_at: '2023-05-24T11:31:21.229Z',
        updated_at: '2023-05-24T11:31:21.229Z',
      },
    },
  ],
});

// Get all Comments for Topic.
// app.get(`${v1}/comments/topic/:topic_id`, [commentGet]);
// curl -X GET -H "Content-Type: application/json" http://localhost:3001/api/v1/comments/topic/5
const commentAllForTopicId = JSON.stringify([
  {
    id: 7,
    message: 'message 2.1',
    user_id: 2,
    comment_id: 5,
    nested_comment_count: 0,
    created_at: '2023-05-24T13:02:54.424Z',
    updated_at: '2023-05-24T13:02:54.424Z',
    topic_id: 5,
  },
  {
    id: 8,
    message: 'message 2.2',
    user_id: 2,
    comment_id: 5,
    nested_comment_count: 0,
    created_at: '2023-05-24T13:03:09.987Z',
    updated_at: '2023-05-24T13:03:09.987Z',
    topic_id: 5,
  },
  {
    id: 9,
    message: 'message 2.3',
    user_id: 2,
    comment_id: 5,
    nested_comment_count: 0,
    created_at: '2023-05-24T13:03:18.533Z',
    updated_at: '2023-05-24T13:03:18.533Z',
    topic_id: 5,
  },
  {
    id: 10,
    message: 'message 2.2.1',
    user_id: 2,
    comment_id: 8,
    nested_comment_count: 0,
    created_at: '2023-05-24T13:04:00.082Z',
    updated_at: '2023-05-24T13:04:00.082Z',
    topic_id: 5,
  },
  {
    id: 11,
    message: 'message 2.2.2',
    user_id: 2,
    comment_id: 8,
    nested_comment_count: 0,
    created_at: '2023-05-24T13:04:14.563Z',
    updated_at: '2023-05-24T13:04:14.563Z',
    topic_id: 5,
  },
  {
    id: 12,
    message: 'message 2.2.3',
    user_id: 1,
    comment_id: 8,
    nested_comment_count: 0,
    created_at: '2023-05-25T17:00:20.362Z',
    updated_at: '2023-05-25T17:00:20.362Z',
    topic_id: 5,
  },
]);

// Create Comment
// app.post(`${v1}/comments`, [commentCreate]);
// curl -X POST -H "Content-Type: application/json" -d '{"message":"message 4","user_id":1,"topic_id":4}' http://localhost:3001/api/v1/comments
// curl -X POST -H "Content-Type: application/json" -d '{"message":"message 4.1","user_id":2,"topic_id":4,"comment_id":14}' http://localhost:3001/api/v1/comments
const commentCreate = JSON.stringify({
  nested_comment_count: 0,
  id: 14,
  message: 'message 4',
  user_id: 1,
  topic_id: 4,
  updated_at: '2023-05-30T17:33:30.108Z',
  created_at: '2023-05-30T17:33:30.108Z',
  comment_id: null,
});

// Update Comment
// app.put(`${v1}/comments/:id`, [commentUpdate]);
// curl -X PUT -H "Content-Type: application/json" -d '{"message":"message 4 (updated)","user_id":1,"topic_id":4}' http://localhost:3001/api/v1/comments/14
const commentUpdate = JSON.stringify({
  id: 14,
  message: 'message 4 (updated)',
  user_id: 1,
  comment_id: null,
  nested_comment_count: 1,
  created_at: '2023-05-30T17:33:30.108Z',
  updated_at: '2023-05-30T17:57:17.635Z',
  topic_id: 4,
});

// Delete Comment
// app.delete(`${v1}/comments/:id`, [commentDelete]);
// curl -X DELETE -H "Content-Type: application/json" http://localhost:3001/api/v1/comments/15
const commentDelete = JSON.stringify({ message: 'Comment deleted' });

// Get Topic
// app.get(`${v1}/topics/:id`, [topicRead]);
// curl -X GET -H "Content-Type: application/json" http://localhost:3001/api/v1/topics/5
const topicGETById = JSON.stringify({
  id: 5,
  subject: 'topic 2',
  created_at: '2023-05-24T12:25:40.192Z',
  updated_at: '2023-05-24T12:25:40.192Z',
  user_id: 2,
  user: {
    id: 2,
    first_name: 'David',
    last_name: 'Joe',
    display_name: null,
    email: 'davidjoe@email.com',
    avatar: null,
  },
  comments: [
    {
      id: 4,
      message: 'message 1',
      user_id: 2,
      topic_id: 5,
      comment_id: null,
      created_at: '2023-05-24T12:55:58.762Z',
      user: {
        id: 2,
        first_name: 'David',
        last_name: 'Joe',
        display_name: null,
        email: 'davidjoe@email.com',
        avatar: null,
      },
    },
    {
      id: 5,
      message: 'message 2',
      user_id: 2,
      topic_id: 5,
      comment_id: null,
      created_at: '2023-05-24T13:01:28.783Z',
      user: {
        id: 2,
        first_name: 'David',
        last_name: 'Joe',
        display_name: null,
        email: 'davidjoe@email.com',
        avatar: null,
      },
    },
    {
      id: 6,
      message: 'message 3',
      user_id: 2,
      topic_id: 5,
      comment_id: null,
      created_at: '2023-05-24T13:01:43.156Z',
      user: {
        id: 2,
        first_name: 'David',
        last_name: 'Joe',
        display_name: null,
        email: 'davidjoe@email.com',
        avatar: null,
      },
    },
    {
      id: 7,
      message: 'message 2.1',
      user_id: 2,
      topic_id: 5,
      comment_id: 5,
      created_at: '2023-05-24T13:02:54.424Z',
      user: {
        id: 2,
        first_name: 'David',
        last_name: 'Joe',
        display_name: null,
        email: 'davidjoe@email.com',
        avatar: null,
      },
    },
    {
      id: 8,
      message: 'message 2.2',
      user_id: 2,
      topic_id: 5,
      comment_id: 5,
      created_at: '2023-05-24T13:03:09.987Z',
      user: {
        id: 2,
        first_name: 'David',
        last_name: 'Joe',
        display_name: null,
        email: 'davidjoe@email.com',
        avatar: null,
      },
    },
    {
      id: 9,
      message: 'message 2.3',
      user_id: 2,
      topic_id: 5,
      comment_id: 5,
      created_at: '2023-05-24T13:03:18.533Z',
      user: {
        id: 2,
        first_name: 'David',
        last_name: 'Joe',
        display_name: null,
        email: 'davidjoe@email.com',
        avatar: null,
      },
    },
    {
      id: 10,
      message: 'message 2.2.1',
      user_id: 2,
      topic_id: 5,
      comment_id: 8,
      created_at: '2023-05-24T13:04:00.082Z',
      user: {
        id: 2,
        first_name: 'David',
        last_name: 'Joe',
        display_name: null,
        email: 'davidjoe@email.com',
        avatar: null,
      },
    },
    {
      id: 11,
      message: 'message 2.2.2',
      user_id: 2,
      topic_id: 5,
      comment_id: 8,
      created_at: '2023-05-24T13:04:14.563Z',
      user: {
        id: 2,
        first_name: 'David',
        last_name: 'Joe',
        display_name: null,
        email: 'davidjoe@email.com',
        avatar: null,
      },
    },
    {
      id: 12,
      message: 'message 2.2.3',
      user_id: 1,
      topic_id: 5,
      comment_id: 8,
      created_at: '2023-05-25T17:00:20.362Z',
      user: {
        id: 1,
        first_name: 'John',
        last_name: 'Doe',
        display_name: null,
        email: 'johndoe@email.com',
        avatar: null,
      },
    },
  ],
});

// Get all Topics
// app.get(`${v1}/topics/:id`, [topicRead]);
// curl -X GET -H "Content-Type: application/json" http://localhost:3001/api/v1/topics
const topicAll = JSON.stringify({
  count: 5,
  rows: [
    {
      id: 4,
      subject: 'First topic',
      created_at: '2023-05-24T12:22:58.303Z',
      updated_at: '2023-05-24T12:22:58.303Z',
      user_id: 2,
      user: {
        id: 2,
        first_name: 'David',
        last_name: 'Joe',
        display_name: null,
        email: 'davidjoe@email.com',
        avatar: null,
      },
    },
    {
      id: 5,
      subject: 'topic 2',
      created_at: '2023-05-24T12:25:40.192Z',
      updated_at: '2023-05-24T12:25:40.192Z',
      user_id: 2,
      user: {
        id: 2,
        first_name: 'David',
        last_name: 'Joe',
        display_name: null,
        email: 'davidjoe@email.com',
        avatar: null,
      },
    },
    {
      id: 6,
      subject: 'topic 3',
      created_at: '2023-05-24T12:26:18.536Z',
      updated_at: '2023-05-24T12:26:18.536Z',
      user_id: 2,
      user: {
        id: 2,
        first_name: 'David',
        last_name: 'Joe',
        display_name: null,
        email: 'davidjoe@email.com',
        avatar: null,
      },
    },
    {
      id: 7,
      subject: 'topic 3',
      created_at: '2023-05-24T12:28:03.644Z',
      updated_at: '2023-05-24T12:28:03.644Z',
      user_id: 2,
      user: {
        id: 2,
        first_name: 'David',
        last_name: 'Joe',
        display_name: null,
        email: 'davidjoe@email.com',
        avatar: null,
      },
    },
    {
      id: 8,
      subject: 'topic 3',
      created_at: '2023-05-24T12:29:00.397Z',
      updated_at: '2023-05-24T12:29:00.397Z',
      user_id: 2,
      user: {
        id: 2,
        first_name: 'David',
        last_name: 'Joe',
        display_name: null,
        email: 'davidjoe@email.com',
        avatar: null,
      },
    },
  ],
  offset: 0,
  elementCount: 5,
});

// Create Topic
// app.post(`${v1}/topics`, [topicCreate]);
// curl -X POST -H "Content-Type: application/json" -d '{"subject":"subject 1","user_id":1}' http://localhost:3001/api/v1/topics
const topicCreate = JSON.stringify({
  id: 9,
  subject: 'subject 1',
  user_id: 1,
  updated_at: '2023-05-30T21:31:39.584Z',
  created_at: '2023-05-30T21:31:39.584Z',
});

// Update Topic
// app.put(`${v1}/topics/:id`, [topicUpdate]);
// curl -X PUT -H "Content-Type: application/json" -d '{"subject":"subject 1 updated","user_id":1}' http://localhost:3001/api/v1/topics/9
const topicUpdate = JSON.stringify({
  id: 9,
  subject: 'subject 1 updated',
  created_at: '2023-05-30T21:31:39.584Z',
  updated_at: '2023-05-30T21:34:18.016Z',
  user_id: 1,
});

// Delete Topic
// app.delete(`${v1}/topics/:id`, [topicDelete]);
// curl -X DELETE -H "Content-Type: application/json" http://localhost:3001/api/v1/topics/8
const topicDelete = JSON.stringify({ message: 'Topic deleted' });

// Get User
// app.get(`${v1}/users`, [userGet]);
// curl -X GET -H "Content-Type: application/json" http://localhost:3001/api/v1/users/1
const userGETById = JSON.stringify({
  id: 1,
  first_name: 'John',
  last_name: 'Doe',
  email: 'johndoe@email.com',
  display_name: null,
  avatar: null,
  created_at: '2023-05-24T11:27:52.729Z',
  updated_at: '2023-05-24T11:27:52.729Z',
});

// Get all Users
// app.get(`${v1}/users`, [userGet]);
// curl -X GET -H "Content-Type: application/json" http://localhost:3001/api/v1/users
const userAll = JSON.stringify([
  {
    id: 1,
    first_name: 'John',
    last_name: 'Doe',
    email: 'johndoe@email.com',
    display_name: null,
    avatar: null,
    created_at: '2023-05-24T11:27:52.729Z',
    updated_at: '2023-05-24T11:27:52.729Z',
  },
  {
    id: 2,
    first_name: 'David',
    last_name: 'Joe',
    email: 'davidjoe@email.com',
    display_name: null,
    avatar: null,
    created_at: '2023-05-24T11:31:21.229Z',
    updated_at: '2023-05-24T11:31:21.229Z',
  },
]);

// Create User
// app.post(`${v1}/users`, [userCreate]);
// eslint-disable-next-line max-len
// curl -X POST -H "Content-Type: application/json" -d '{"first_name":"Василий","last_name":"Пупкин","email":"vasyapupkin@email.com","avatar":"https://ya-praktikum.tech/api/v2/resources/5651bc91-8189-4042-8f92-933c4b8f8415/b5833c66-ce21-446c-b6c9-dc500587f463_avatarki-dlia-vatsapa-49.webp","display_name":"Вася"}' http://localhost:3001/api/v1/users
const userCreate = JSON.stringify({ id: '9' });

// Update User
// app.put(`${v1}/users/:id`, [userUpdate]);
// curl -X PUT -H "Content-Type: application/json" -d '{"last_name":"Pupkin","display_name":"Васяныч"}' http://localhost:3001/api/v1/users/11
const userUpdate = JSON.stringify({
  id: 11,
  first_name: 'Василий',
  last_name: 'Pupkin',
  email: 'vasyapupkin2@email.com',
  display_name: 'Васяныч',
  avatar:
    'https://ya-praktikum.tech/api/v2/resources/5651bc91-8189-4042-8f92-933c4b8f8415/b5833c66-ce21-446c-b6c9-dc500587f463_avatarki-dlia-vatsapa-49.webp',
  created_at: '2023-05-30T22:00:21.387Z',
  updated_at: '2023-05-30T22:05:18.773Z',
});

// Delete User
// app.delete(`${v1}/users/:id`, [userDelete]);
// curl -X DELETE -H "Content-Type: application/json" http://localhost:3001/api/v1/users/11
const userDelete = JSON.stringify({ message: 'User deleted' });

export {
  commentGETById,
  commentAllForTopicId,
  commentCreate,
  commentUpdate,
  commentDelete,
  topicGETById,
  topicAll,
  topicCreate,
  topicUpdate,
  topicDelete,
  userGETById,
  userAll,
  userCreate,
  userUpdate,
  userDelete,
};

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
