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


const useStyles = makeStyles((theme) => ({
  root: {},
  avatar: {
    marginRight: theme.spacing(2)
  }
}));

const Results = ({ className, customers,setworkerselected,setIsOneWorkerSelected,...rest }) => {

  const classes = useStyles();
  const [selectedCustomerIds, setSelectedCustomerIds] = useState([]);
  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(0);
  const [open,setOpen] = useState(false);
  const [clickedWorker,setClickedWorker]=useState({});


  const handleSelectAll = (event,setWorkerSelected) => {
    let newSelectedCustomerIds;

    if (event.target.checked) {
      newSelectedCustomerIds = customers.map((customer) => customer.id);
    } else {
      newSelectedCustomerIds = [];
    }

    setSelectedCustomerIds(newSelectedCustomerIds);
    displayOptionMenu(newSelectedCustomerIds,setWorkerSelected);
  };

  const handleSelectOne = (event, id,setWorkerSelected) => {
    const selectedIndex = selectedCustomerIds.indexOf(id);
    let newSelectedCustomerIds = [];

    if (selectedIndex === -1) {
      newSelectedCustomerIds = newSelectedCustomerIds.concat(selectedCustomerIds, id);

    } else if (selectedIndex === 0) {
      newSelectedCustomerIds = newSelectedCustomerIds.concat(selectedCustomerIds.slice(1));
    } else if (selectedIndex === selectedCustomerIds.length - 1) {
      newSelectedCustomerIds = newSelectedCustomerIds.concat(selectedCustomerIds.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelectedCustomerIds = newSelectedCustomerIds.concat(
        selectedCustomerIds.slice(0, selectedIndex),
        selectedCustomerIds.slice(selectedIndex + 1)
      );
    }

    setSelectedCustomerIds(newSelectedCustomerIds);
    displayOptionMenu(newSelectedCustomerIds,setWorkerSelected);

  };


  const displayOptionMenu=(selectedWorkers,setWorkerSelected)=>{
    if(selectedWorkers.length===0)
      setWorkerSelected(false);
    else {
      if (selectedWorkers.length === 1)   // if only one worker selected
        setIsOneWorkerSelected(true);
      else
        setIsOneWorkerSelected(false);
      setWorkerSelected(true);
    }
  }

  const noClientSelected=()=>{
    return selectedCustomerIds.length===0;
  }

  const handleLimitChange = (event) => {
    setLimit(event.target.value);
  };

  const handlePageChange = (event, newPage) => {
    setPage(newPage);
  };

  const handleClickOnClient= (event,customer) => {

    // if(noClientSelected()){
    setClickedWorker(customer);
    setOpen(true);
    //}
  };

  const handleClosePopup = () => {
    setOpen(false);
  };

  const handleChange = (event) => {
    setClickedWorker({
      ...clickedWorker,
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
                    checked={selectedCustomerIds.length === customers.length}
                    color="primary"
                    indeterminate={
                      selectedCustomerIds.length > 0
                      && selectedCustomerIds.length < customers.length
                    }
                    onChange={(event)=>handleSelectAll(event,setworkerselected)}
                  />
                </TableCell>
                <TableCell>Nom</TableCell><TableCell>Prénom</TableCell><TableCell>Adresse</TableCell><TableCell>Téléphone</TableCell><TableCell>Date de création</TableCell>
                <TableCell>
                  Apte
                </TableCell>

              </TableRow>
            </TableHead>
            <TableBody>
              {customers.slice(0, limit).map((customer) => (
                <TableRow
                  hover
                  key={customer.id}
                  selected={selectedCustomerIds.indexOf(customer.id) !== -1}

                >
                  <TableCell padding="checkbox">
                    <Checkbox
                      checked={selectedCustomerIds.indexOf(customer.id) !== -1}
                      onChange={(event) => handleSelectOne(event, customer.id,setworkerselected)}
                      value="true"
                    />
                  </TableCell>

                  <TableCell onClick={(event)=>{handleClickOnClient(event,customer)}}>
                    <Box
                      alignItems="center"
                      display="flex"
                    >
                      <Avatar
                        className={classes.avatar}
                        src={`${DIR.STRAPI}${customer.photo_profil_url}`}
                      >
                        {getInitials(customer.nom)}
                      </Avatar>
                      <Typography
                        color="textPrimary"
                        variant="body1"
                      >
                        <Link href="#" >{customer.nom}</Link>

                      </Typography>
                    </Box>
                  </TableCell>
                  <TableCell>
                    {customer.prenom}
                  </TableCell>
                  <TableCell>
                    {`${customer.ville}, ${customer.region}, ${customer.pays}`}
                  </TableCell>
                  <TableCell>
                    {customer.telephone}
                  </TableCell>
                  <TableCell>
                    {moment(customer.published_at).format('DD/MM/YYYY')}
                  </TableCell>
                  <TableCell>
                    <InfoSafety safety={customer.apte} message={customer.apte} />
                  </TableCell>

                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Box>
      </PerfectScrollbar>
      <TablePagination
        component="div"
        count={customers.length}
        onChangePage={handlePageChange}
        onChangeRowsPerPage={handleLimitChange}
        page={page}
        rowsPerPage={limit}
        rowsPerPageOptions={[5, 10, 25]}
      />

      <ClientEditPopUp open={open} handleClose={handleClosePopup} worker={clickedWorker}  handleChange={handleChange}/>

    </Card>
  );
};

Results.propTypes = {
  className: PropTypes.string,
  customers: PropTypes.array.isRequired
};

export default Results;
