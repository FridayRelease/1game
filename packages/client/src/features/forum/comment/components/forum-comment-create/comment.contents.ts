import * as yup from 'yup';

const commentSchema = yup.object().shape({
  message: yup.string().required(),
});

export { commentSchema };
