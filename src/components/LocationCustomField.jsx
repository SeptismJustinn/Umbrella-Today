import React from "react";
import { TextField, InputAdornment } from "@mui/material";
import styles from "./LocationCustomField.module.css";

function LocationCustomField(props) {
  // Function to handle onChange for longitude input field.
  function handleLongChange(val) {
    if (!Number.isNaN(Number(val)) && val > -180 && val < 180) {
      props.setLongErr(false);
    } else {
      props.setLongErr(true);
    }
  }

  // Function to handle onChange for latitude input field.
  function handleLatChange(val) {
    // Input validation -90 to 90 only
    if (!Number.isNaN(Number(val)) && val > -90 && val < 90) {
      props.setLatErr(false);
    } else {
      props.setLatErr(true);
    }
  }

  return (
    <div className={styles.container}>
      <div>
        <TextField
          error={props.longErr}
          variant="standard"
          label="Longitude"
          sx={{ width: "100%" }}
          defaultValue={props.coords[0]}
          onChange={(event) => handleLongChange(event.target.value)}
          helperText={props.longErr ? "Enter number between -180 and 180" : ""}
          inputRef={props.longRef}
          InputProps={{
            endAdornment: <InputAdornment position="end">&deg;</InputAdornment>,
          }}
        />
      </div>
      <div>
        <TextField
          error={props.latErr}
          variant="standard"
          label="Latitude"
          sx={{ width: "100%" }}
          defaultValue={props.coords[1]}
          onChange={(event) => handleLatChange(event.target.value)}
          helperText={props.latErr ? "Enter number between -90 and 90" : ""}
          inputRef={props.latRef}
          InputProps={{
            endAdornment: <InputAdornment position="end">&deg;</InputAdornment>,
          }}
        />
      </div>
    </div>
  );
}

export default LocationCustomField;
