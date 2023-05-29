import {IComment} from "@/api/types";

export const mockComments:IComment[] = [
  { id: 5,
    message: 'User 2 - сообщение 1',
    user_id: 2,
    topic_id: 5,
    comment_id: null,
    created_at: '',
    updated_at: '',
    comments: [
      {
        id: 7,
        message: 'message 2.1',
        user_id: 1,
        topic_id: 5,
        comment_id: 5,
        created_at: '2023-05-24T13:02:54.424Z',
      },
      {
        id: 8,
        message: 'message 2.2',
        user_id: 3,
        topic_id: 5,
        comment_id: 5,
        created_at: '2023-05-24T13:03:09.987Z',
        comments: [
          {
            id: 10,
            message: 'message 2.2.1',
            user_id: 2,
            topic_id: 5,
            comment_id: 5,
            created_at: '2023-05-24T13:02:54.424Z',
          },
          {
            id: 11,
            message: 'message 2.2.2',
            user_id: 2,
            topic_id: 5,
            comment_id: 5,
            created_at: '2023-05-24T13:02:54.424Z',
            comments: [
              {
                id: 10,
                message: 'message 2.2.2.1',
                user_id: 2,
                topic_id: 5,
                comment_id: 5,
                created_at: '2023-05-24T13:02:54.424Z',
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
    ]
  },
  {
    id: 2,
    message: 'User 1 - сообщение 2',
    user_id: 1,
    topic_id: 2,
    comment_id: 1,
    created_at: '',
    updated_at: '',
    comments:[]
  },{
    id: 3,
    message: 'User 3- сообщение 3',
    user_id: 3,
    topic_id: 1,
    comment_id: 1,
    created_at: '',
    updated_at: '',
    comments:[]
  }

]
