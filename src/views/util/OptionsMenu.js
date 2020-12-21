import React from 'react';
import Button from '@material-ui/core/Button';
import Tooltip from '@material-ui/core/Tooltip';
import Fade from '@material-ui/core/Fade';
import Zoom from '@material-ui/core/Zoom';
import PrintIcon from '@material-ui/icons/Print';
import EditIcon from '@material-ui/icons/Edit';
import ContactMailIcon from '@material-ui/icons/ContactMail';
import EmailIcon from '@material-ui/icons/Email';
import SaveIcon from '@material-ui/icons/Save';

export default function OptionMenu({disabledInput,setDisabledInput,handleOnFormSubmit}) {

  const handleOnClickEditButton=()=>{
       setDisabledInput(false);
  }

  return (
    <div>
        {!disabledInput ? (
          <Tooltip TransitionComponent={Zoom} title="Enregister les modifications">
            <Button
            onClick={handleOnFormSubmit}
            ><SaveIcon/></Button>
          </Tooltip>
        ) : null
        }

        <Tooltip TransitionComponent={Fade} TransitionProps={{ timeout: 600 }} title="Modifier">
            <Button
            onClick={handleOnClickEditButton}
            ><EditIcon/></Button>
        </Tooltip>


      <Tooltip title="Envoyer un mail">
        <Button><EmailIcon/></Button>
      </Tooltip>
      <Tooltip TransitionComponent={Zoom} title="Imprimer la fiche">
        <Button><PrintIcon/></Button>
      </Tooltip>
    </div>
  );
}
