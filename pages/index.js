import React from 'react';
import Layout from '../components/Layout';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Link from 'next/link';

const Home = () => {
  return (
    <Layout>
      <Typography variant="h4" gutterBottom>
        Welcome to CreditAI
      </Typography>
      <Typography variant="body1" gutterBottom>
        Apply for a credit card and get instant decisions powered by AI
      </Typography>
      <Link href="/application" passHref>
        <Button variant="contained" color="primary">
          Apply Now
        </Button>
      </Link>
    </Layout>
  );
};

export default Home;
