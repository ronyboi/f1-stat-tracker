import React from "react";

import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormHelperText from "@material-ui/core/FormHelperText";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";

import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";

import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
  table: {
    minWidth: 400,
  },
}));

export default function Schedule() {
  const classes = useStyles();
  const [year, setYear] = React.useState(2008);
  const [info, setInfo] = React.useState([]);

  const handleYearChange = (event) => {
    setYear(event.target.value);
  };

  const years = [
    2008, 2009, 2010, 2011, 2012, 2013, 2014, 2015, 2016, 2017, 2018, 2019,
    2020, 2021,
  ];

  React.useEffect(() => {
    fetch("http://ergast.com/api/f1/" + year + ".json")
      .then((res) => res.json())
      .then((data) => setInfo(data.MRData.RaceTable.Races));
  }, [year]);

  return (
    <div className="App">
      <header className="App-header">
        <h1>F1 Tracker - {year}</h1>
        <div>
          <FormControl className={classes.formControl}>
            <InputLabel id="demo-simple-select-label">Year</InputLabel>
            <Select
              labelId="year-select-label"
              id="year-select"
              value={year}
              onChange={handleYearChange}
            >
              {years.map((year) => (
                <MenuItem key={year} value={year}>
                  {year}
                </MenuItem>
              ))}
            </Select>
            <FormHelperText>Choose the year</FormHelperText>
          </FormControl>
        </div>
        <TableContainer component={Paper}>
          <Table className={classes.table} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell align="center">Name</TableCell>
                <TableCell align="right">Circuit Name</TableCell>
                <TableCell align="right">Country</TableCell>
                <TableCell align="right">City</TableCell>
                <TableCell align="right">Date</TableCell>
                <TableCell align="right">Round</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {info.map((key) => (
                <TableRow key={key["raceName"]}>
                  <TableCell component="th" scope="row" align="center">
                    {key["raceName"]}
                  </TableCell>
                  <TableCell align="right">
                    {key["Circuit"]["circuitName"]}
                  </TableCell>
                  <TableCell align="right">
                    {key["Circuit"]["Location"]["country"]}
                  </TableCell>
                  <TableCell align="right">
                    {key["Circuit"]["Location"]["locality"]}
                  </TableCell>
                  <TableCell align="right">{key["date"]}</TableCell>
                  <TableCell align="right">{key["round"]}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </header>
    </div>
  );
}
