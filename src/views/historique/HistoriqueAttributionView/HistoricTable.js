import React, {useEffect, useState} from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Collapse from '@material-ui/core/Collapse';
import IconButton from '@material-ui/core/IconButton';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';
import FilterData from "../../../lib/FilterData";
import ImageSlider from "../../util/ImageSlider";
import moment from "moment";

const useRowStyles = makeStyles({
  root: {
    '& > *': {
      borderBottom: 'unset',
    },
  },
});



function Row(props) {

  const { row } = props;
  const [open, setOpen] = React.useState(false);
  const classes = useRowStyles();

  return (
    <React.Fragment>
      <TableRow className={classes.root}>
        <TableCell>
          <IconButton aria-label="expand row" size="small" onClick={() => setOpen(!open)}>
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell component="th" scope="row">
          {row.employe_attribuant}
        </TableCell>
        <TableCell align="center">{row.occupant_precedent}</TableCell>
        <TableCell align="center">{row.employe_attribue}</TableCell>
        <TableCell align="center">{row.machine}</TableCell>
        <TableCell align="center">{row.data_attribution}</TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box margin={1}>
              <Typography variant="h4" gutterBottom component="div">
                Historique
              </Typography>
              <Table size="small" aria-label="purchases">
                <TableHead>
                  <TableRow>
                    <TableCell>Date de création</TableCell>
                    <TableCell>Commentaire</TableCell>
                    <TableCell align="center">Etat de la machine</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {row.history.map((historyRow) => (
                    <TableRow key={historyRow.historic_id}>
                      <TableCell component="th" scope="row">
                        {historyRow.data_attribution}
                      </TableCell>
                      <TableCell>{historyRow.commentaire}</TableCell>
                      <TableCell > <ImageSlider images={historyRow.photos_etat_machine} displayDeleteIcon={true} /> </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
}





export default function HistoricTable({rows,setRows,...rest}) {


  return (
    <TableContainer component={Paper}>
      <Table aria-label="collapsible table">
        <TableHead>
          <TableRow>
            <TableCell />
            <TableCell>Chef Attribuant</TableCell>
            <TableCell align="center">Occupant précedent</TableCell>
            <TableCell align="center">Employé Attribué</TableCell>
            <TableCell align="center">Machine</TableCell>
            <TableCell align="center">Date d'Attribution</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <Row key={row.historic_id} row={row} />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
