import React, {useEffect, useState} from 'react';
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
import LocalShippingIcon from '@material-ui/icons/LocalShipping';
import Session from "../../../lib/Session";
import DIR from "../../../utils/dir";


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
  {
    href: '/app/machines',
    icon: LocalShippingIcon,
    title: 'Outils'
  },
  {
    href: `/app/mesMachines`,   //les machines du user connecté
    icon: LocalShippingIcon,
    title: 'Mes Outils'
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

  /**
  {
    href: '/register',
    icon: UserPlusIcon,
    title: 'Compte Admin'
  },
   **/
  /**
  {
    href: '/404',
    icon: AlertCircleIcon,
    title: 'Error'
  },

  {
    href: '/login',
    icon: LockIcon,
    title: 'Se deconnecter'
  }
   **/
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

  const [user,setUser] = useState(Session.getUser());


  const handleDisconnectClick=()=>{
       Session.logOut();
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
          src={DIR+user.photo_profil_url}
          to="/app/account"
        />
        <Typography
          className={classes.name}
          color="textPrimary"
          variant="h5"
        >
          {user.nom+" "+user.prenom}
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

          ))
          }

          <Button
            key="Se deconnecter"
            title="Se deconnecter"
            icon={<LockIcon/>}
            onClick={handleDisconnectClick}
          >
            Se déconnecter
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
