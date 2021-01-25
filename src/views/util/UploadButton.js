import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';


const useStyles = makeStyles((theme) => ({

  input: {
    display: 'none',
  },
}));

export default function UploadButton({handleChange}) {
  const classes = useStyles();

  return (
    <div className={classes.root}

    >
      <label htmlFor="contained-button-file">
        <Button variant="outlined"
                color="secondary" component="span"
                fullWidth
               >
          <input
            name="photo_profil"
            accept="image/*"
            className={classes.input}
            id="contained-button-file"
            onChange={(event)=>{handleChange(event,true)}}
            type="file"
          />
          Téléverser
        </Button>
      </label>


    </div>
  );
}
