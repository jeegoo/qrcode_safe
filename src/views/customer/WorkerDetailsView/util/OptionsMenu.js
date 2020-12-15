import React from 'react';
import Button from '@material-ui/core/Button';
import Tooltip from '@material-ui/core/Tooltip';
import Fade from '@material-ui/core/Fade';
import Zoom from '@material-ui/core/Zoom';
import PrintIcon from '@material-ui/icons/Print';
import EditIcon from '@material-ui/icons/Edit';
import ContactMailIcon from '@material-ui/icons/ContactMail';
import EmailIcon from '@material-ui/icons/Email';
export default function OptionMenu() {
  return (
    <div>
      <Tooltip title="Add">
        <Button><EmailIcon/></Button>
      </Tooltip>
      <Tooltip TransitionComponent={Fade} TransitionProps={{ timeout: 600 }} title="Add">
        <Button><EditIcon/></Button>
      </Tooltip>
      <Tooltip TransitionComponent={Zoom} title="Add">
        <Button><PrintIcon/></Button>
      </Tooltip>
    </div>
  );
}
