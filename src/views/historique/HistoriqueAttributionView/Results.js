import React, { useState } from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import moment from 'moment';
import PerfectScrollbar from 'react-perfect-scrollbar';
import ClientEditPopUp from "../../util/ClientEditPopUp";

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

const Results = ({ className, historicsAttribution, setHistoricsAttribution,...rest }) => {

  const classes = useStyles();
  const [selectedMachineIds, setSelectedMachineIds] = useState([]);
  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(0);
  const [open,setOpen] = useState(false);
  const [clickedMachine,setClickedMachine]=useState({});





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
                <TableCell>Chef Attribuant</TableCell> <TableCell>Occupant précedent</TableCell> <TableCell>Employé Attribué</TableCell><TableCell>Machine</TableCell><TableCell>Date d'Attribution</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {historicsAttribution.slice(0, limit).map((historic) => (
                <TableRow
                  hover
                  key={historic.id}
                  selected={selectedMachineIds.indexOf(historic.id) !== -1}
                >

                  <TableCell onClick={(event)=>{handleMachineOnClient(event,historic)}}>
                    <Box
                      alignItems="center"
                      display="flex"
                    >
                      <Avatar
                        className={classes.avatar}
                        src={`${DIR.STRAPI}${historic.employe_attribuant.photo_profil_url}`}
                      >
                        {getInitials(historic.employe_attribuant.nom)}
                      </Avatar>
                      <Typography
                        color="textPrimary"
                        variant="body1"
                      >
                        <Link href="#" >{historic.employe_attribuant.nom}</Link>

                      </Typography>
                    </Box>
                  </TableCell>

                  <TableCell onClick={(event)=>{handleMachineOnClient(event,historic)}}>
                    <Box
                      alignItems="center"
                      display="flex"
                    >

                      <Typography
                        color="textPrimary"
                        variant="body1"
                      >
                        <Link href="#" >{FilterData.getOccupantName(historic.precedent_occupant)}</Link>

                      </Typography>
                    </Box>
                  </TableCell>

                  <TableCell onClick={(event)=>{handleMachineOnClient(event,historic)}}>
                    <Box
                      alignItems="center"
                      display="flex"
                    >
                      <Avatar
                        className={classes.avatar}
                        src={`${DIR}${historic.employe_attribue.photo_profil_url}`}
                      >
                        {getInitials(historic.employe_attribue.nom)}
                      </Avatar>
                      <Typography
                        color="textPrimary"
                        variant="body1"
                      >
                        <Link href="#" >{historic.employe_attribue.nom}</Link>

                      </Typography>
                    </Box>
                  </TableCell>

                  <TableCell>
                    {historic.machine.nom}
                  </TableCell>

                  <TableCell>
                    {historic.data_attribution}
                  </TableCell>

                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Box>
      </PerfectScrollbar>
      <TablePagination
        component="div"
        count={historicsAttribution.length}
        onChangePage={handlePageChange}
        onChangeRowsPerPage={handleLimitChange}
        page={page}
        rowsPerPage={limit}
        rowsPerPageOptions={[5, 10, 25]}
      />



    </Card>
  );
};

Results.propTypes = {
  className: PropTypes.string,
  historicsAttribution: PropTypes.array.isRequired
};

export default Results;
