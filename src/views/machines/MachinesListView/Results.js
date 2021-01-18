import React, { useState } from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import moment from 'moment';
import PerfectScrollbar from 'react-perfect-scrollbar';

import {
  Avatar,
  Box,
  Link,
  Card,
  Checkbox,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
  Typography,
  makeStyles
} from '@material-ui/core';
import getInitials from 'src/utils/getInitials';
import InfoSafety from "../../util/InfoSafety";
import MoreOptionsIcon from "../../util/MoreOptionsIcon";
import DIR from "../../../utils/dir";
import MachinePopUp from "../../util/MachinePopUp";
import FilterData from "../../../lib/FilterData";


const useStyles = makeStyles((theme) => ({
    root: {},
    avatar: {
      marginRight: theme.spacing(2)
    }
}));

const Results = ({ className, machines,setMachines,setMachineSelected,setIsOneMachineSelected,...rest }) => {

  const classes = useStyles();
  const [selectedMachineIds, setSelectedMachineIds] = useState([]);
  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(0);
  const [open,setOpen] = useState(false);
  const [clickedMachine,setClickedMachine]=useState({});


  const handleSelectAll = (event,setMachineSelected) => {
    let newSelectedMachineIds;

    if (event.target.checked) {
        newSelectedMachineIds = machines.map((machine) => machine.id);
    } else {
        newSelectedMachineIds = [];
    }

    setSelectedMachineIds(newSelectedMachineIds);
    displayOptionMenu(newSelectedMachineIds,setMachineSelected);
  };

  const handleSelectOne = (event, id,setMachineSelected) => {
    const selectedIndex = selectedMachineIds.indexOf(id);
    let newSelectedMachineIds = [];

    if (selectedIndex === -1) {
      newSelectedMachineIds = newSelectedMachineIds.concat(selectedMachineIds, id);
    } else if (selectedIndex === 0) {
      newSelectedMachineIds = newSelectedMachineIds.concat(selectedMachineIds.slice(1));
    } else if (selectedIndex === selectedMachineIds.length - 1) {
      newSelectedMachineIds = newSelectedMachineIds.concat(selectedMachineIds.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelectedMachineIds = newSelectedMachineIds.concat(
        selectedMachineIds.slice(0, selectedIndex),
        selectedMachineIds.slice(selectedIndex + 1)
      );
    }

    setSelectedMachineIds(newSelectedMachineIds);
    displayOptionMenu(newSelectedMachineIds,setMachineSelected);

  };


  const displayOptionMenu=(selectedWorkers,setMachineSelected)=>{

      if(selectedWorkers.length===0)
        setMachineSelected(false);
      else {
        if (selectedWorkers.length === 1)   // if only one worker selected
          setIsOneMachineSelected(true);
        else
          setIsOneMachineSelected(false);
        setMachineSelected(true);
      }

  }

  const noMachineSelected=()=>{
    return selectedMachineIds.length===0;
  }

  const handleLimitChange = (event) => {
    setLimit(event.target.value);
  };

  const handlePageChange = (event, newPage) => {
    setPage(newPage);
  };

  const handleMachineOnClient= (event,machine) => {

    // if(noMachineSelected()){
    setClickedMachine(machine);
    setOpen(true);
    //}
  };

  const handleClosePopup = () => {
    setOpen(false);
  };

  const handleChange = (event) => {
    setClickedMachine({
      ...clickedMachine,
      [event.target.name]: event.target.value
    });
  };


  return (
    <Card
      className={clsx(classes.root, className)}
      {...rest}
    >
      <PerfectScrollbar>
        <Box minWidth={1050}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell padding="checkbox">
                  <Checkbox
                    checked={selectedMachineIds.length === machines.length}
                    color="primary"
                    indeterminate={
                      selectedMachineIds.length > 0
                      && selectedMachineIds.length < machines.length
                    }
                    onChange={(event)=>handleSelectAll(event,setMachineSelected)}
                  />
                </TableCell>
                <TableCell>Nom</TableCell><TableCell>Occupant</TableCell><TableCell>Catégorie</TableCell>

              </TableRow>
            </TableHead>
            <TableBody>
              {machines.slice(0, limit).map((machine) => (
                <TableRow
                  hover
                  key={machine.id}
                  selected={selectedMachineIds.indexOf(machine.id) !== -1}

                >
                  <TableCell padding="checkbox">
                    <Checkbox
                      checked={selectedMachineIds.indexOf(machine.id) !== -1}
                      onChange={(event) => handleSelectOne(event, machine.id,setMachineSelected)}
                      value="true"
                    />
                  </TableCell>

                  <TableCell onClick={(event)=>{handleMachineOnClient(event,machine)}}>
                    <Box
                      alignItems="center"
                      display="flex"
                    >
                      <Avatar
                        className={classes.avatar}
                        src={`${DIR}${machine.photo_url}`}
                      >
                        {getInitials(machine.nom)}
                      </Avatar>
                      <Typography
                        color="textPrimary"
                        variant="body1"
                      >
                        <Link href="#" >{machine.nom}</Link>

                      </Typography>
                    </Box>
                  </TableCell>

                  <TableCell>
                    {FilterData.getOccupantName(machine.employe)}
                  </TableCell>

                  <TableCell>
                    {machine.categorie}
                  </TableCell>

                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Box>
      </PerfectScrollbar>
      <TablePagination
        component="div"
        count={machines.length}
        onChangePage={handlePageChange}
        onChangeRowsPerPage={handleLimitChange}
        page={page}
        rowsPerPage={limit}
        rowsPerPageOptions={[5, 10, 25]}
      />

      <MachinePopUp machine={clickedMachine} setMachines={setMachines} open={open} handleClose={handleClosePopup}/>

    </Card>
  );
};

Results.propTypes = {
  className: PropTypes.string,
  machines: PropTypes.array.isRequired
};

export default Results;
