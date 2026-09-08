import { useFormik } from 'formik';
import { Pressable, StyleSheet, TextInput, View } from 'react-native';
import { useNavigate } from 'react-router-native';
import Text from './Text';
import useSignIn from '../hooks/useSignIn';

const styles = StyleSheet.create({
  container: {
    padding: 16,
    gap: 12,
  },
  input: {
    backgroundColor: '#ffffff',
    borderColor: '#d1d5da',
    borderRadius: 4,
    borderWidth: 1,
    padding: 12,
  },
  inputError: {
    borderColor: '#d73a4a',
  },
  error: {
    color: '#d73a4a',
  },
  button: {
    alignItems: 'center',
    backgroundColor: '#0366d6',
    borderRadius: 4,
    padding: 12,
  },
});

export const SignInContainer = ({ onSubmit }) => {
  const formik = useFormik({
    initialValues: {
      username: '',
      password: '',
    },
    onSubmit,
    validate: (values) => {
      const errors = {};

      if (!values.username) {
        errors.username = 'Username is required';
      }

      if (!values.password) {
        errors.password = 'Password is required';
      }

      return errors;
    },
  });

  return (
    <View style={styles.container}>
      <TextInput
        placeholder="Username"
        value={formik.values.username}
        onChangeText={formik.handleChange('username')}
        onBlur={formik.handleBlur('username')}
        autoCapitalize="none"
        style={[
          styles.input,
          formik.touched.username &&
            formik.errors.username &&
            styles.inputError,
        ]}
      />
      {formik.touched.username && formik.errors.username && (
        <Text style={styles.error}>{formik.errors.username}</Text>
      )}
      <TextInput
        placeholder="Password"
        value={formik.values.password}
        onChangeText={formik.handleChange('password')}
        onBlur={formik.handleBlur('password')}
        secureTextEntry
        style={[
          styles.input,
          formik.touched.password &&
            formik.errors.password &&
            styles.inputError,
        ]}
      />
      {formik.touched.password && formik.errors.password && (
        <Text style={styles.error}>{formik.errors.password}</Text>
      )}
      <Pressable style={styles.button} onPress={formik.handleSubmit}>
        <Text color="textLight" fontWeight="bold">
          Sign in
        </Text>
      </Pressable>
    </View>
  );
};

const SignIn = () => {
  const [signIn] = useSignIn();
  const navigate = useNavigate();

  const onSubmit = async (values) => {
    try {
      const result = await signIn({
        username: values.username,
        password: values.password,
      });
      console.log('Authentication result:', result);
      navigate('/');
    } catch (e) {
      console.log(e);
    }
  };

  return <SignInContainer onSubmit={onSubmit} />;
};

export default SignIn;
