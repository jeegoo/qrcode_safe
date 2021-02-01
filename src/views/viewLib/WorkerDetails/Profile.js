import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import moment from 'moment';
import {
  Avatar,
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  Divider,
  Typography,
  makeStyles
} from '@material-ui/core';
import UploadButton from "../../util/UploadButton";
import DIR from "../../../utils/dir";
import Grid from "@material-ui/core/Grid";



const useStyles = makeStyles(() => ({
  root: {},
  avatar: {
    height: 100,
    width: 100
  }
}));

const Profile = ({ className,disabledInput,values, ...rest }) => {
  const classes = useStyles();

  return (
    <Card
      className={clsx(classes.root, className)}
      {...rest}
    >
      <CardContent>
          <Box
            alignItems="center"
            display="flex"
            flexDirection="column"
          >
          <Avatar
            className={classes.avatar}
            src={DIR.STRAPI+values.photo_profil_url}
          />
            {console.log(DIR+values.photo_profil_url)}
          <Typography
            color="textPrimary"
            gutterBottom
            variant="h3"
          >
            {values.nom}
          </Typography>
          <Typography
            color="textSecondary"
            variant="body1"
          >
            {`${values.ville} ${values.pays}`}
          </Typography>
          <Typography
            className={classes.dateText}
            color="textSecondary"
            variant="body1"
          >
            {`${moment().format('hh:mm A')} ${values.timezone}`}
          </Typography>
        </Box>
      </CardContent>

      {!disabledInput ?(
        <span>
            <Divider />

              <Box
                alignItems="center"
                display="flex"
                flexDirection="column"
              >
                <UploadButton/>

              </Box>

          </span>
          ):null}

    </Card>
  );
};

Profile.propTypes = {
  className: PropTypes.string
};

export default Profile;
