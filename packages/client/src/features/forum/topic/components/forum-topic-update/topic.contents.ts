import * as yup from 'yup';

const topicSchema = yup.object().shape({
  subject: yup.string().required(),
});

export { topicSchema };
