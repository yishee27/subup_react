import * as React from 'react';
import { styled, Theme, CSSObject } from '@mui/material/styles';
import Box from '@mui/material/Box';
import MuiDrawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import SettingsIcon from '@mui/icons-material/Settings';

import LogoutIcon from '@mui/icons-material/Logout';
import { useRouter } from 'next/router';
import Link from 'next/link';
import HomeIcon from '@mui/icons-material/Home';
import ProjectIcon from '@mui/icons-material/Dashboard';
import UserIcon from '@mui/icons-material/EmojiEmotions';
import ArchiveIcon from '@mui/icons-material/Archive';

const drawerWidth = 240;


const closedMixin = (theme: Theme): CSSObject => ({
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: 'hidden',
  width: `calc(${theme.spacing(8)} + 1px)`,
  fontSize:10,
  [theme.breakpoints.up('lg')]: {
    width: `calc(${theme.spacing(11)} + 100px)`,
    fontSize:20,
  },
});

const MaterialDrawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: 'nowrap',
    boxSizing: 'border-box',
    ...(!open && {
      ...closedMixin(theme),
      '& .MuiDrawer-paper': closedMixin(theme),
    }),
  }),
);

interface DrawerProps {
  children: JSX.Element;
}

export default function Drawer(props: DrawerProps) {
  const router = useRouter();

  const isCurrentRoute = (pathName: string): boolean => {
    return router.pathname.slice(1) === pathName.toLowerCase();
  }

  return (
 
    <Box sx={{ display: 'flex'}}>
      <CssBaseline />
      <MaterialDrawer variant="permanent" open={false}>
        <img src = "subup_logo_1.jpg"></img>

        <Divider />
        <Box sx={{ 
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          height: '100%' }}>
          <List>
            {['Home', 'Projects', 'Users', 'Archive', 'Settings'].map((text, index) => (
              <ListItem key={text} disablePadding sx={{ display: 'block' }}>
                <Link href={text.toLowerCase()}>
                  <ListItemButton
                    selected={isCurrentRoute(text) ? true : false}
                  >
                    <ListItemIcon
                      sx={{
                        color: isCurrentRoute(text) ? '#1C4BFE' : 'rgba(0, 0, 0, 0.54)',
                      }}
                    >
                      {index === 0 ? <HomeIcon />
                        : index === 1 ? <ProjectIcon />
                        : index === 2 ? <UserIcon />
                        : index === 3 ? <ArchiveIcon />
                        : index === 4 ? <SettingsIcon />
                        : null
                      }
                    </ListItemIcon>
                    <ListItemText 
                       sx={{      
                        color: isCurrentRoute(text) ? '#212661' : 'rgba(0, 0, 0, 0.54)',
                       }}
                      primary={text}
                      primaryTypographyProps={{ 
                        fontSize: "1em",
                        fontWeight: "bold",
                        color: router.pathname.slice(1) === text.toLowerCase() ? '#212661' : 'rgba(0, 0, 0, 0.54)',
                      }}
                    />
                  </ListItemButton>
                </Link>
              </ListItem>
            ))}
          </List>
          <Divider />
          <List>
            <ListItem key={'Logout'} disablePadding sx={{ display: 'block' }}>
              <Link href='logout'>
                <ListItemButton
                  selected={isCurrentRoute('logout') ? true : false}
                >
                  <ListItemIcon
                    sx={{
                      color: isCurrentRoute('logout') ? '#1C4BFE' : 'rgba(0, 0, 0, 0.54)',
                    }}
                  >
                    <LogoutIcon />
                  </ListItemIcon>
                  <ListItemText
                   primary={'Logout'}
                   primaryTypographyProps={{ 
                    fontSize: "1em",
                    fontWeight: "bold",
                    color: isCurrentRoute('logout') ? '#212661' : 'rgba(0, 0, 0, 0.54)',
                    }}
                  />
                </ListItemButton>
              </Link>
            </ListItem>
          </List>
        </Box>
      </MaterialDrawer>
      <Box component="main" sx={{ flexGrow: 1, p: '0 5rem', backgroundColor: '#F1F5FE' }}>
        {props.children}
      </Box>
    </Box>
  );
}
