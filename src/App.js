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
  const [info, setInfo] = React.useState([]);

  const handleChange = (event) => {
    setYear(event.target.value);
  };

  const years = [
    2008, 2009, 2010, 2011, 2012, 2013, 2014, 2015, 2016, 2017, 2018, 2019,
    2020,
  ];

  React.useEffect(() => {
    fetch("http://ergast.com/api/f1/" + year + "/5/results.json")
      .then((res) => res.json())
      .then((data) => setInfo(data.MRData.RaceTable.Races[0].Results));
  }, [year]);

  return (
    <div className="App">
      <header className="App-header">
        <h1>F1 Tracker</h1>
        <FormControl className={classes.formControl}>
          <InputLabel id="demo-simple-select-label">Age</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={year}
            onChange={handleChange}
          >
            {years.map((year) => (
              <MenuItem value={year}>{year}</MenuItem>
            ))}
          </Select>
          <FormHelperText>Choose the year</FormHelperText>
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
