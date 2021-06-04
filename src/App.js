import logo from "./logo.svg";
import "./App.css";
import React from "react";

import { makeStyles } from "@material-ui/core/styles";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormHelperText from "@material-ui/core/FormHelperText";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));

function App() {
  const classes = useStyles();
  const [year, setYear] = React.useState(2008);
  const [gp, setGp] = React.useState();
  const [info, setInfo] = React.useState([]);
  const [round, setRound] = React.useState(1);

  const handleYearChange = (event) => {
    setYear(event.target.value);
  };

  const handleRoundChange = (event) => {
    setRound(event.target.value);
  };

  const years = [
    2008, 2009, 2010, 2011, 2012, 2013, 2014, 2015, 2016, 2017, 2018, 2019,
    2020,
  ];

  const rounds = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15];

  React.useEffect(() => {
    fetch("http://ergast.com/api/f1/" + year + "/" + round + "/results.json")
      .then((res) => res.json())
      .then((data) => setInfo(data.MRData.RaceTable.Races[0].Results));
    fetch("http://ergast.com/api/f1/" + year + "/" + round + "/results.json")
      .then((res) => res.json())
      .then((data) => setGp(data.MRData.RaceTable.Races[0]));
  }, [year, round]);

  return (
    <div className="App">
      <header className="App-header">
        <h1>F1 Tracker - {gp["raceName"]}</h1>
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
        {info.map((key) => (
          <li key={key["Driver"]["driverId"]}>
            {key["position"]} : {key["Driver"]["givenName"]}{" "}
            {key["Driver"]["familyName"]} - {key["number"]}
          </li>
        ))}
      </header>
    </div>
  );
}

export default App;
