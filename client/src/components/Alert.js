import React, { useState, useContext } from "react";
import { gql } from "@apollo/client";
import { Container, Typography } from "@mui/material";
import { Button } from "@mui/material";
import { UserContext } from "../shared/UserContext";

export default function Alert({ processAddAlert }) {
  const { user } = useContext(UserContext);
  const patientId = user.userId;

  const handleSubmit = (e) => {
    e.preventDefault();
    let message = (new Date()).toString();
    const addAlertRequest = {
      patientId,
      message,
    };
    processAddAlert(addAlertRequest);
    console.log('alert sending');
  };

  return (
    <Container maxWidth="md">
      <div>
        <Typography variant="h6" color="textPrimary">
          Patient Id: {patientId}
        </Typography>
        <br />
        <div style={{ display: "flex", width: "100%" }}>
          <form onSubmit={(e) => handleSubmit(e)}>
            <Button type="submit" color="error" variant="contained">
              {" "}
              Send Alert{" "}
            </Button>
          </form>
        </div>
      </div>
    </Container>
  );
}
