import * as Yup from 'yup';

const validationSchema = Yup.object({
  type: Yup.string().required('Required'),
  title: Yup.string().required('Required'),
  description: Yup.string(),
  regularPrice: Yup.number().positive('Enter a valid price').required('Required'),
  images: Yup.mixed().required('You must upload atleast one image')
});

export default validationSchema;
