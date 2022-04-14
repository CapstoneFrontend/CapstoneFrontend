import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Stack from '@mui/material/Stack';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { ThemeProvider, createTheme } from '@mui/material/styles';

function appBarLabel(label) {
  return (
    <Toolbar>
      <Typography variant="h6" noWrap component="div" sx={{ flexGrow: 1 }}>
        {label}
      </Typography>
    </Toolbar>
  );
}

const darkTheme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#316B83',
    },
    secondary: {
      main: '#316B83',
      contrastText: '#ffffff',
    },
  },
});

export default function EnableColorOnDarkAppBar() {
  return (
    <Stack
      spacing={2}
      sx={{ flexGrow: 1, textAlign: 'center' }}
    >
      <ThemeProvider theme={darkTheme}>
        <AppBar position="static" color="secondary">
          {appBarLabel('Everline')}
        </AppBar>
      </ThemeProvider>
    </Stack>
  );
}
