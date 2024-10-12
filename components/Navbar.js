import React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Link from 'next/link';
import Button from '@mui/material/Button';

const Navbar = () => {
  return (
    <AppBar position="static">
      <Toolbar>
        <Link href="/" passHref>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            CreditAI
          </Typography>
        </Link>
        <Link href="/login" passHref>
          <Button color="inherit">Login</Button>
        </Link>
        <Link href="/application" passHref>
          <Button color="inherit">Apply</Button>
        </Link>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
