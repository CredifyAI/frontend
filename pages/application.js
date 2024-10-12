import React, { useState } from 'react';
import Layout from '../components/Layout';
import { Formik, Form, Field } from 'formik';
import {
  TextField,
  Button,
  MenuItem,
  FormControl,
  InputLabel,
  Select,
  LinearProgress,
  Typography,
  Grid,
} from '@mui/material';
import * as Yup from 'yup';
import api from '../utils/api';

const ApplicationSchema = Yup.object().shape({
  firstName: Yup.string().required('First name is required'),
  lastName: Yup.string().required('Last name is required'),
  dateOfBirth: Yup.string().required('Date of birth is required'),
  email: Yup.string().email('Invalid email').required('Email is required'),
  phone: Yup.string().required('Phone number is required'),
  address1: Yup.string().required('Address 1 is required'),
  city: Yup.string().required('City is required'),
  state: Yup.string().required('State is required'),
  zip: Yup.string().required('ZIP code is required'),
  socialNumber: Yup.string().required('Social Security Number is required'),
  incomeSource: Yup.string().required('Income source is required'),
  income: Yup.number().required('Annual income is required'),
  otherIncomeSource: Yup.string().nullable(),
});

const Application = () => {
  const [showOtherIncomeSource, setShowOtherIncomeSource] = useState(false);

  return (
    <Layout>
      <Typography variant="h5" gutterBottom>
        Credit Card Application
      </Typography>
      <Formik
        initialValues={{
          firstName: '',
          lastName: '',
          dateOfBirth: '',
          email: '',
          phone: '',
          address1: '',
          address2: '',
          city: '',
          state: '',
          zip: '',
          socialNumber: '',
          incomeSource: '',
          otherIncomeSource: '',
          income: '',
        }}
        validationSchema={ApplicationSchema}
        onSubmit={async (values, { setSubmitting }) => {
          try {
            const response = await api.post('/applications', values);
          } catch (error) {
            // Handle error
          } finally {
            setSubmitting(false);
          }
        }}
      >
        {({
          isSubmitting,
          errors,
          touched,
          handleChange,
          values,
          setFieldValue,
        }) => (
          <Form>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <Field
                  as={TextField}
                  name="firstName"
                  label="First Name"
                  fullWidth
                  margin="normal"
                  helperText={touched.firstName && errors.firstName}
                  error={touched.firstName && Boolean(errors.firstName)}
                />
              </Grid>

              <Grid item xs={12} sm={6}>
                <Field
                  as={TextField}
                  name="lastName"
                  label="Last Name"
                  fullWidth
                  margin="normal"
                  helperText={touched.lastName && errors.lastName}
                  error={touched.lastName && Boolean(errors.lastName)}
                />
              </Grid>

              <Grid item xs={12} sm={6}>
                <Field
                  as={TextField}
                  name="dateOfBirth"
                  label="Date of Birth (dd/mm/yyyy)"
                  type="text"
                  fullWidth
                  margin="normal"
                  helperText={touched.dateOfBirth && errors.dateOfBirth}
                  error={touched.dateOfBirth && Boolean(errors.dateOfBirth)}
                  placeholder="dd/mm/yyyy"
                />
              </Grid>

              <Grid item xs={12} sm={6}>
                <Field
                  as={TextField}
                  name="email"
                  label="Email"
                  type="email"
                  fullWidth
                  margin="normal"
                  helperText={touched.email && errors.email}
                  error={touched.email && Boolean(errors.email)}
                />
              </Grid>

              <Grid item xs={12} sm={6}>
                <Field
                  as={TextField}
                  name="phone"
                  label="Phone Number"
                  fullWidth
                  margin="normal"
                  helperText={touched.phone && errors.phone}
                  error={touched.phone && Boolean(errors.phone)}
                />
              </Grid>

              <Grid item xs={12} sm={6}>
                <Field
                  as={TextField}
                  name="socialNumber"
                  label="Social Security Number"
                  fullWidth
                  margin="normal"
                  helperText={touched.socialNumber && errors.socialNumber}
                  error={touched.socialNumber && Boolean(errors.socialNumber)}
                />
              </Grid>

              <Grid item xs={12}>
                <Field
                  as={TextField}
                  name="address1"
                  label="Address 1"
                  fullWidth
                  margin="normal"
                  helperText={touched.address1 && errors.address1}
                  error={touched.address1 && Boolean(errors.address1)}
                />
              </Grid>

              <Grid item xs={12}>
                <Field
                  as={TextField}
                  name="address2"
                  label="Address 2"
                  fullWidth
                  margin="normal"
                  helperText={touched.address2 && errors.address2}
                  error={touched.address2 && Boolean(errors.address2)}
                />
              </Grid>

              <Grid item xs={12} sm={6}>
                <Field
                  as={TextField}
                  name="city"
                  label="City"
                  fullWidth
                  margin="normal"
                  helperText={touched.city && errors.city}
                  error={touched.city && Boolean(errors.city)}
                />
              </Grid>

              <Grid item xs={12} sm={3}>
                <Field
                  as={TextField}
                  name="state"
                  label="State"
                  fullWidth
                  margin="normal"
                  helperText={touched.state && errors.state}
                  error={touched.state && Boolean(errors.state)}
                />
              </Grid>

              <Grid item xs={12} sm={3}>
                <Field
                  as={TextField}
                  name="zip"
                  label="ZIP"
                  fullWidth
                  margin="normal"
                  helperText={touched.zip && errors.zip}
                  error={touched.zip && Boolean(errors.zip)}
                />
              </Grid>

              <Grid item xs={12}>
              <FormControl fullWidth margin="normal">
                <InputLabel>Income Source</InputLabel>
                <Select
                  name="incomeSource"
                  value={values.incomeSource}
                  onChange={(e) => {
                    handleChange(e);  
                    setShowOtherIncomeSource(e.target.value === 'other'); 
                    if (e.target.value !== 'other') {
                      setFieldValue('otherIncomeSource', '');
                    }
                  }}
                >
                  <MenuItem value="employed">Employed</MenuItem>
                  <MenuItem value="retired">Retired</MenuItem>
                  <MenuItem value="self-employed">Self-Employed</MenuItem>
                  <MenuItem value="unemployed">Unemployed</MenuItem>
                  <MenuItem value="military">Military</MenuItem>
                  <MenuItem value="business owner">Business Owner</MenuItem>
                  <MenuItem value="other">Other</MenuItem>
                </Select>
              </FormControl>
              </Grid>

              {showOtherIncomeSource && (
                <Grid item xs={12}>
                  <Field
                    as={TextField}
                    name="otherIncomeSource"
                    label="Specify Other Income Source"
                    fullWidth
                    margin="normal"
                    helperText={touched.otherIncomeSource && errors.otherIncomeSource}
                    error={touched.otherIncomeSource && Boolean(errors.otherIncomeSource)}
                  />
                </Grid>
              )}

              <Grid item xs={12}>
                <Field
                  as={TextField}
                  name="income"
                  label="Annual Income"
                  type="number"
                  fullWidth
                  margin="normal"
                  helperText={touched.income && errors.income}
                  error={touched.income && Boolean(errors.income)}
                />
              </Grid>
            </Grid>

            {isSubmitting && <LinearProgress />}

            <Button
              type="submit"
              variant="contained"
              color="primary"
              disabled={isSubmitting}
              style={{ marginTop: '1rem' }}
            >
              Submit Application
            </Button>
          </Form>
        )}
      </Formik>
    </Layout>
  );
};

export default Application;