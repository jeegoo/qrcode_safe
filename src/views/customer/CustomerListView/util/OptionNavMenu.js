import React from 'react';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import DeleteIcon from '@material-ui/icons/Delete';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import Icon from '@material-ui/core/Icon';
import SaveIcon from '@material-ui/icons/Save';
import EditIcon from '@material-ui/icons/Edit';
import ContactsIcon from '@material-ui/icons/Contacts';
import {Link} from "react-router-dom";
import MoreOptionsIcon from "./MoreOptionsIcon";

const useStyles = makeStyles((theme) => ({
  button: {
    margin: theme.spacing(1),
  }
}));


const displayOneWorkerMenuOptions=(isOneWorkerSelected,classes,selectedWorker) =>{

       if(isOneWorkerSelected)
         return (
           <span>
                  <Link  to={`/app/customers/123`}>
                    <Button
                          variant="contained"
                          color="primary"
                          className={classes.button}
                          startIcon={<ContactsIcon/>}
                        >
                        Fiche salarié
                   </Button>
                    </Link>


                    <Button
                      variant="contained"
                      color="default"
                      className={classes.button}
                      startIcon={<EditIcon/>}

                    >
                      Modifier
                    </Button>
         </span>);

}


const handleClickOnUpdateButton=(id)=>{

}



const handleClickOnDeleteButton=(id)=>{

}



export default function OptionNavMenu(props) {
  const classes = useStyles();

  return (
    <div >

      {/* This Button uses a Font Icon, see the installation instructions in the Icon component docs. */}


      {displayOneWorkerMenuOptions(props.isoneworkerselected,classes)}
      <span>
        <Button
          variant="contained"
          color="secondary"
          className={classes.button}
          startIcon={<DeleteIcon/>}
        >
          Supprimer
        </Button>
      </span>




    </div>
  );
}
