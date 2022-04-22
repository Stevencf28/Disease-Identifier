import React, { useState } from "react";
import { gql } from "@apollo/client";
import { useLocation } from "react-router-dom";
import { Container, Typography } from "@mui/material";
import { Button } from "@mui/material";

export default function Alert({ processAddAlert }) {
  const { state } = useLocation();
  const patientId = "62603c330bbc2a5bee4ec5a0"; // todo: get from login
  const now = new Date();
  const message = "Alerting for patient " + patientId + "at " + now;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (message.length > 0) {
      const addAlertRequest = {
        patientId,
        message,
      };
      processAddAlert(addAlertRequest);
    }
  };

  return (
    <Container maxWidth="md">
      <div>
        <Typography variant="h6" color="textPrimary">
          Patient Id: {patientId}
        </Typography>
        <br />
        <div style={{ display: "flex", width: "100%" }}>
          <form onSubmit={handleSubmit}>
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
