import React from 'react';
import Layout from '../components/Layout';
import { Formik, Form, Field } from 'formik';
import {
  TextField,
  Button,
  LinearProgress,
  Typography,
} from '@mui/material';
import * as Yup from 'yup';
import api from '../utils/api';

const LoginSchema = Yup.object().shape({
  email: Yup.string().email('Invalid email').required('Email is required'),
  password: Yup.string().required('Password is required'),
});

const Login = () => {
  return (
    <Layout>
      <Typography variant="h5" gutterBottom>
        Login
      </Typography>
      <Formik
        initialValues={{
          email: '',
          password: '',
        }}
        validationSchema={LoginSchema}
        onSubmit={async (values, { setSubmitting }) => {
          try {
            const response = await api.post('/auth/login', values);
          } catch (error) {
            // Handle error
          } finally {
            setSubmitting(false);
          }
        }}
      >
        {({ isSubmitting, errors, touched, handleChange }) => (
          <Form>
            <Field
              as={TextField}
              name="email"
              label="Email"
              type="email"
              fullWidth
              margin="normal"
              helperText={touched.email && errors.email}
              error={touched.email && Boolean(errors.email)}
              onChange={handleChange}
            />
            <Field
              as={TextField}
              name="password"
              label="Password"
              type="password"
              fullWidth
              margin="normal"
              helperText={touched.password && errors.password}
              error={touched.password && Boolean(errors.password)}
              onChange={handleChange}
            />
            {isSubmitting && <LinearProgress />}
            <Button
              type="submit"
              variant="contained"
              color="primary"
              disabled={isSubmitting}
              style={{ marginTop: '1rem' }}
            >
              Login
            </Button>
          </Form>
        )}
      </Formik>
    </Layout>
  );
};

export default Login;
