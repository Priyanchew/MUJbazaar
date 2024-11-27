import * as Yup from 'yup';

const validationSchema = Yup.object({
  type: Yup.string().required('Required'),
  title: Yup.string().required('Required'),
  description: Yup.string(),
  regularPrice: Yup.number().positive('Enter a valid price').required('Required')
});

export default validationSchema;
