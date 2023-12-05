import * as React from "react";
import Avatar from "@mui/material/Avatar";
import CssBaseline from "@mui/material/CssBaseline";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import PRN_LOGO from "../../../public/imgs/PRN_logo.png";
import "./home.scss";

export default function HomePage() {
  return (
    <Grid container component="main" sx={{ height: "100vh" }}>
      <CssBaseline />
      <Grid
        item
        xs={false}
        sm={4}
        md={7}
        className="background-image-overlay"
        sx={{
          backgroundColor: "#80E4BC",
          position: "relative",
        }}
      />
      <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
        <Box className="form-logo-box">
          <Avatar
            className="prn-form-logo"
            alt="Parking Reform Network logo"
            src={PRN_LOGO}
          />
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
        </Box>
      </Grid>
    </Grid>
  );
}
