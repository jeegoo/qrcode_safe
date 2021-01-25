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

const useRowStyles = makeStyles({
  root: {
    '& > *': {
      borderBottom: 'unset',
    },
  },
});

function createData(employe_attribuant, occupant_precedent, employe_attribue, machine, date_creation,commentaire) {
  return {
    employe_attribuant,
    occupant_precedent,
    employe_attribue,
    machine,
    date_creation,
    history: [
      {date_creation, commentaire, etat_machine_images:[] },
    ],
  };
}

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
        <TableCell align="right">{row.occupant_precedent}</TableCell>
        <TableCell align="right">{row.employe_attribue}</TableCell>
        <TableCell align="right">{row.machine}</TableCell>
        <TableCell align="right">{row.date_creation}</TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box margin={1}>
              <Typography variant="h6" gutterBottom component="div">
                History
              </Typography>
              <Table size="small" aria-label="purchases">
                <TableHead>
                  <TableRow>
                    <TableCell>Date de création</TableCell>
                    <TableCell>Commentaire</TableCell>
                    <TableCell align="right">Etat de la machine</TableCell>

                  </TableRow>
                </TableHead>
                <TableBody>
                  {row.history.map((historyRow) => (
                    <TableRow key={historyRow.date_creation}>
                      <TableCell component="th" scope="row">
                        {historyRow.date_creation}
                      </TableCell>
                      <TableCell>{historyRow.commentaire}</TableCell>
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

Row.propTypes = {
  row: PropTypes.shape({
    calories: PropTypes.number.isRequired,
    carbs: PropTypes.number.isRequired,
    fat: PropTypes.number.isRequired,
    history: PropTypes.arrayOf(
      PropTypes.shape({
        amount: PropTypes.number.isRequired,
        customerId: PropTypes.string.isRequired,
        date: PropTypes.string.isRequired,
      }),
    ).isRequired,
    name: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    protein: PropTypes.number.isRequired,
  }).isRequired,
};



export default function HistoricTable({rows_data,...rest}) {

  console.log("rows_data")
  console.log(rows_data)
  const [rows,setRows]=useState([]);

    useEffect(()=>{
           setRows((prev)=>{
                 let data=[];
                 rows_data.map(r=>{
                   data.push(createData(rows_data.employe_attribuant,
                     rows_data.occupant_precedent,
                     rows_data.employe_attribue,
                     rows_data.machine,
                     rows_data.date_creation))
                 })
             return data;
           })
    })

  return (
    <TableContainer component={Paper}>
      <Table aria-label="collapsible table">
        <TableHead>
          <TableRow>
            <TableCell />
            <TableCell>Chef Attribuant</TableCell>
            <TableCell align="right">Occupant précedent</TableCell>
            <TableCell align="right">Employé Attribué</TableCell>
            <TableCell align="right">Machine</TableCell>
            <TableCell align="right">Date d'Attribution</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <Row key={row.name} row={row} />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
