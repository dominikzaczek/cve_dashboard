import React from "react";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    formControl: {
      margin: theme.spacing(1),
      width: "80%",
    },
    selectEmpty: {
      marginTop: theme.spacing(2),
    },
  })
);
// new Map as number() =
export default function SelectYear(props: {
  years: number[];
  onChange: (year: number) => void;
  selectedYear: number;
}) {
  const classes = useStyles();
  return (
    <div>
      <FormControl variant="outlined" className={classes.formControl}>
        <InputLabel id="demo-simple-select-outlined-label">Year</InputLabel>
        <Select
          labelId="demo-simple-select-outlined-label"
          id="demo-simple-select-outlined"
          value={props.selectedYear}
          onChange={(e) => props.onChange(e.target.value as number)}
          label="Year"
        >
          <MenuItem value={0}>
            <em>None</em>
          </MenuItem>
          {props.years?.sort().map(function (year: any) {
            return (
              <MenuItem value={year} key={year}>
                {year}
              </MenuItem>
            );
          })}
        </Select>
      </FormControl>
    </div>
  );
}
