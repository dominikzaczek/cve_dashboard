import React from "react";
import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";
import FormLabel from "@material-ui/core/FormLabel";
import FormControl from "@material-ui/core/FormControl";
import FormGroup from "@material-ui/core/FormGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: "flex",
    },
    formControl: {
      margin: theme.spacing(3),
    },
  })
);

export default function Severity(props: {
  selectedSeverity: { low: boolean; medium: boolean; high: boolean };
  onChange: (value: "high" | "medium" | "low") => void;
}) {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <FormControl
        component="fieldset"
        className={classes.formControl}
        onChange={(e: any) =>
          props.onChange(e.target.value as "high" | "medium" | "low")
        }
      >
        <FormLabel component="legend">Select Severity</FormLabel>
        <FormGroup>
          <FormControlLabel
            control={
              <Checkbox checked={props.selectedSeverity.low} value="low" />
            }
            label="Low"
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={props.selectedSeverity.medium}
                value="medium"
              />
            }
            label="Medium"
          />
          <FormControlLabel
            control={
              <Checkbox checked={props.selectedSeverity.high} value="high" />
            }
            label="High"
          />
        </FormGroup>
      </FormControl>
    </div>
  );
}
