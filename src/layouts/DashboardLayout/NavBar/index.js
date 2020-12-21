import React, { useEffect } from 'react';
import {Link as RouterLink, useLocation, useNavigate} from 'react-router-dom';
import PropTypes from 'prop-types';
import {
  Avatar,
  Box,
  Button,
  Divider,
  Drawer,
  Hidden,
  List,
  Typography,
  makeStyles
} from '@material-ui/core';
import {
  AlertCircle as AlertCircleIcon,
  BarChart as BarChartIcon,
  Lock as LockIcon,
  Settings as SettingsIcon,
  ShoppingBag as ShoppingBagIcon,
  User as UserIcon,
  UserPlus as UserPlusIcon,
  Users as UsersIcon
} from 'react-feather';
import NavItem from './NavItem';
import Session from "../../../lib/Session";

const user = {
  avatar: '/static/images/avatars/avatar_6.png',
  jobTitle: 'Senior Developer',
  name: 'Katarina Smith'
};

const items = [
  {
    href: '/app/dashboard',
    icon: BarChartIcon,
    title: 'Tableau de bord'
  },
  {
    href: '/app/customers',
    icon: UsersIcon,
    title: 'Ouvriers'
  },
  /**
  {
    href: '/app/products',
    icon: ShoppingBagIcon,
    title: 'Products'
  },
   **/
  {
    href: '/app/account',
    icon: UserIcon,
    title: 'Mon Compte'
  },
  {
    href: '/app/settings',
    icon: SettingsIcon,
    title: 'Paramètres'
  },
  /**
  {
    href: '/login',
    icon: LockIcon,
    title: 'Login'
  },
   **/
  {
    href: '/register',
    icon: UserPlusIcon,
    title: 'Compte Admin'
  },
  /**
  {
    href: '/404',
    icon: AlertCircleIcon,
    title: 'Error'
  },
   **/
  {
    href: '/login',
    icon: LockIcon,
    title: 'Se deconnecter'
  }
];

const useStyles = makeStyles(() => ({
  mobileDrawer: {
    width: 256
  },
  desktopDrawer: {
    width: 256,
    top: 64,
    height: 'calc(100% - 64px)'
  },
  avatar: {
    cursor: 'pointer',
    width: 64,
    height: 64
  }
}));

const NavBar = ({ onMobileClose, openMobile }) => {
  const classes = useStyles();
  const location = useLocation();
  const navigate = useNavigate();


  const handleDisconnectClick=()=>{
       Session.removeUser();
       Session.removeJwt();
       navigate('/login');
  }

  useEffect(() => {
    if (openMobile && onMobileClose) {
      onMobileClose();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.pathname]);

  const content = (
    <Box
      height="100%"
      display="flex"
      flexDirection="column"
    >
      <Box
        alignItems="center"
        display="flex"
        flexDirection="column"
        p={2}
      >
        <Avatar
          className={classes.avatar}
          component={RouterLink}
          src={user.avatar}
          to="/app/account"
        />
        <Typography
          className={classes.name}
          color="textPrimary"
          variant="h5"
        >
          {user.name}
        </Typography>
        <Typography
          color="textSecondary"
          variant="body2"
        >
          {user.jobTitle}
        </Typography>
      </Box>
      <Divider />
      <Box p={2}>
        <List>
          {items.map((item) => (
            <NavItem
              href={item.href}
              key={item.title}
              title={item.title}
              icon={item.icon}
            />

          ))}

          <Button
            key="Se deconnecter"
            title="Se deconnecter"
            icon={<LockIcon/>}
            onClick={handleDisconnectClick}
          >
            Se deconnecter
          </Button>


        </List>

      </Box>
      <Box flexGrow={1} />

    </Box>
  );

  return (
    <>
      <Hidden lgUp>
        <Drawer
          anchor="left"
          classes={{ paper: classes.mobileDrawer }}
          onClose={onMobileClose}
          open={openMobile}
          variant="temporary"
        >
          {content}
        </Drawer>
      </Hidden>
      <Hidden mdDown>
        <Drawer
          anchor="left"
          classes={{ paper: classes.desktopDrawer }}
          open
          variant="persistent"
        >
          {content}
        </Drawer>
      </Hidden>
    </>
  );
};

NavBar.propTypes = {
  onMobileClose: PropTypes.func,
  openMobile: PropTypes.bool
};

NavBar.defaultProps = {
  onMobileClose: () => {},
  openMobile: false
};

export default NavBar;
