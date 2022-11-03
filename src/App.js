import React, { } from "react";
import "./App.css";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
// import Stack from '@mui/material/Stack';
import Button from "@mui/material/Button";
import Navbar from "./Navbar";
import { useForm } from "react-hook-form";
import {saveAs} from "file-saver";
function App() {
  
  const { register, handleSubmit } = useForm();
  const submitdata = async (data) => {
    const response = await fetch(
      `https://sohamgitscrapper.herokuapp.com//${data.username}/${data.repo}`,
      {
        method: "GET",
      }
    );

    const resp = await response.json();
    console.log(resp);
    
    const file = new Blob(
      [JSON.stringify(resp)],
      {type: 'application/json'});
      const name = 'Report.json';
      saveAs(file, name);
  };


  const onSubmit = (data) => {
    console.log(data);
    submitdata(data);
  };

  return (
    <div className="App">
      <Navbar />
      <div
        style={{
          minHeight: "100vh",
          minWidth: "100vw",
          backgroundImage: "linear-gradient(#141e30 , #243b55)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexDirection: "column",
        }}
      >
        <form onSubmit={handleSubmit(onSubmit)}>
          <Box
            component="form"
            sx={{
              "& > :not(style)": { m: 1, width: "25ch" },
            }}
            noValidate
            autoComplete="off"
          >
            <TextField
              id="outlined-basic"
              label="GitHub username"
              variant="outlined"
              InputLabelProps={{
                className: "textfield_label",
              }}
              InputProps={{
                className: "textfield_label",
              }}
              {...register("username")}
            />
            <TextField
              id="outlined-basic"
              label="Repository Name"
              variant="outlined"
              InputLabelProps={{
                className: "textfield_label",
              }}
              InputProps={{
                className: "textfield_label",
              }}
              {...register("repo")}
            />
          </Box>
          {/* <Stack direction="row" spacing={2}> */}
          <Button
            className="my-4"
            variant="contained"
            color="success"
            type="submit"
          >
            Find Commits
          </Button>
          {/* </Stack> */}
        </form>
        
        
      </div>
    </div>
  );
}

export default App;
