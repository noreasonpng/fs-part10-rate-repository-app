import { View, TextInput, Pressable, StyleSheet } from 'react-native';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { useNavigate } from 'react-router-native';
import Text from './Text';
import useCreateReview from '../hooks/useCreateReview';

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: 'white',
  },
  fieldContainer: {
    marginBottom: 12,
  },
  input: {
    borderWidth: 1,
    borderColor: '#e1e4e8',
    borderRadius: 4,
    padding: 10,
  },
  inputError: {
    borderColor: '#d73a4a',
  },
  multiline: {
    minHeight: 100,
    textAlignVertical: 'top',
  },
  errorText: {
    color: '#d73a4a',
    marginTop: 4,
  },
  button: {
    alignItems: 'center',
    backgroundColor: '#0366d6',
    borderRadius: 4,
    padding: 12,
    marginTop: 4,
  },
});

const initialValues = {
  ownerName: '',
  repositoryName: '',
  rating: '',
  text: '',
};

const validationSchema = yup.object().shape({
  ownerName: yup
    .string()
    .required('Repository owner name is required'),
  repositoryName: yup
    .string()
    .required('Repository name is required'),
  rating: yup
    .number()
    .typeError('Rating must be a number')
    .integer('Rating must be an integer')
    .min(0, 'Rating must be between 0 and 100')
    .max(100, 'Rating must be between 0 and 100')
    .required('Rating is required'),
  text: yup
    .string(),
});

export const ReviewFormContainer = ({ onSubmit }) => {
  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit,
  });

  const getFieldError = (field) =>
    formik.touched[field] && formik.errors[field];

  return (
    <View style={styles.container}>
      <View style={styles.fieldContainer}>
        <TextInput
          style={[styles.input, getFieldError('ownerName') && styles.inputError]}
          placeholder="Repository owner name"
          value={formik.values.ownerName}
          onChangeText={formik.handleChange('ownerName')}
          onBlur={formik.handleBlur('ownerName')}
          autoCapitalize="none"
          testID="ownerName"
        />
        {getFieldError('ownerName') && (
          <Text style={styles.errorText}>{formik.errors.ownerName}</Text>
        )}
      </View>
      <View style={styles.fieldContainer}>
        <TextInput
          style={[styles.input, getFieldError('repositoryName') && styles.inputError]}
          placeholder="Repository name"
          value={formik.values.repositoryName}
          onChangeText={formik.handleChange('repositoryName')}
          onBlur={formik.handleBlur('repositoryName')}
          autoCapitalize="none"
          testID="repositoryName"
        />
        {getFieldError('repositoryName') && (
          <Text style={styles.errorText}>{formik.errors.repositoryName}</Text>
        )}
      </View>
      <View style={styles.fieldContainer}>
        <TextInput
          style={[styles.input, getFieldError('rating') && styles.inputError]}
          placeholder="Rating between 0 and 100"
          value={formik.values.rating}
          onChangeText={formik.handleChange('rating')}
          onBlur={formik.handleBlur('rating')}
          keyboardType="numeric"
          testID="rating"
        />
        {getFieldError('rating') && (
          <Text style={styles.errorText}>{formik.errors.rating}</Text>
        )}
      </View>
      <View style={styles.fieldContainer}>
        <TextInput
          style={[styles.input, styles.multiline, getFieldError('text') && styles.inputError]}
          placeholder="Review"
          value={formik.values.text}
          onChangeText={formik.handleChange('text')}
          onBlur={formik.handleBlur('text')}
          multiline
          testID="text"
        />
        {getFieldError('text') && (
          <Text style={styles.errorText}>{formik.errors.text}</Text>
        )}
      </View>
      <Pressable style={styles.button} onPress={formik.handleSubmit}>
        <Text color="textLight" fontWeight="bold">
          Create review
        </Text>
      </Pressable>
    </View>
  );
};

const ReviewForm = () => {
  const [createReview] = useCreateReview();
  const navigate = useNavigate();

  const onSubmit = async (values) => {
    const { ownerName, repositoryName, rating, text } = values;

    try{
      const data = await createReview({
        ownerName,
        repositoryName,
        rating: Number(rating),
        text,
      });

      const repositoryId = data.createReview.repositoryId;
      navigate(`/repositories/${repositoryId}`);
    }catch (e){
      console.log(e);
    }
  };

  return <ReviewFormContainer onSubmit={onSubmit}/>;
};

export default ReviewForm;