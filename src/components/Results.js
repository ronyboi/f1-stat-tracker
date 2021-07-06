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

import { Link } from "react-router-dom";
import { Button } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
  table: {
    maxWidth: 1000,
    margin: "auto",
  },
}));

export default function Results() {
  const classes = useStyles();
  const [year, setYear] = React.useState(2008);
  const [gp, setGp] = React.useState({});
  const [info, setInfo] = React.useState([]);
  const [round, setRound] = React.useState(1);
  const [latest, setLatest] = React.useState({});

  const handleYearChange = (event) => {
    setYear(event.target.value);
  };

  const handleRoundChange = (event) => {
    if (event.target.value > latest["round"] && year == latest["season"]) {
      setRound(latest["round"]);
    } else {
      setRound(event.target.value);
    }
  };

  const years = [
    2008, 2009, 2010, 2011, 2012, 2013, 2014, 2015, 2016, 2017, 2018, 2019,
    2020, 2021,
  ];

  const rounds = [
    1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19,
  ];

  React.useEffect(() => {
    fetch("https://ergast.com/api/f1/" + year + "/" + round + "/results.json")
      .then((res) => res.json())
      .then((data) => setInfo(data.MRData.RaceTable.Races[0].Results));
    fetch("https://ergast.com/api/f1/" + year + "/" + round + "/results.json")
      .then((res) => res.json())
      .then((data) => setGp(data.MRData.RaceTable.Races[0]));
    fetch("https://ergast.com/api/f1/current/last/results.json")
      .then((res) => res.json())
      .then((data) => setLatest(data.MRData.RaceTable));
  }, [year, round]);

  return (
    // style={{ backgroundImage: "url(/formula1_image_test.jpeg)" }}
    <div className="App">
      <h1>
        Results: {year} {gp["raceName"]}
      </h1>
      <div className="inputSec">
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
        <FormControl className={classes.formControl}>
          <InputLabel id="demo-simple-select-label">Round</InputLabel>
          <Select
            labelId="round-select-label"
            id="round-select"
            value={round}
            onChange={handleRoundChange}
          >
            {rounds.map((round) => (
              <MenuItem key={round} value={round}>
                {round}
              </MenuItem>
            ))}
          </Select>
          <FormHelperText>Choose the round</FormHelperText>
        </FormControl>
        <Button
          onClick={() => {
            setYear(latest["season"]);
            setRound(latest["round"]);
          }}
          color="inherit"
        >
          Latest
        </Button>
      </div>
      <div>
        <TableContainer component={Paper}>
          <Table
            className={classes.table}
            size="small"
            aria-label="simple table"
          >
            <TableHead>
              <TableRow>
                <TableCell align="center">Name</TableCell>
                <TableCell align="right">Position</TableCell>
                <TableCell align="right">Number</TableCell>
                <TableCell align="right">Time</TableCell>
                <TableCell align="right">Constructor</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {info.map((key) => (
                <TableRow key={key["Driver"]["driverId"]}>
                  <TableCell component="th" scope="row" align="center">
                    <a href={key["Driver"]["url"]}>
                      {key["Driver"]["givenName"]} {key["Driver"]["familyName"]}
                    </a>
                  </TableCell>
                  <TableCell align="right">{key["position"]}</TableCell>
                  <TableCell align="right">{key["number"]}</TableCell>
                  <TableCell align="right">
                    {key["Time"] ? key["Time"]["time"] : key["status"]}
                  </TableCell>
                  <TableCell align="right">
                    {key["Constructor"]["name"]}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    </div>
  );
}
