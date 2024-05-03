import React, { useEffect, useState } from "react";
import axios from "axios";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { responsiveFontSizes } from "@mui/material";

function Copyright(props) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {"Copyright © "}
      <Link color="inherit" href="https://mui.com/">
        Team 18
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

export default function Form() {
  const [data, setData] = useState(null);
  const [prompt, setPrompt] = useState("");
  const [learningStyle, setLearningStyle] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.get("http://localhost:3001/api", {
        params: { prompt, learningStyle },
      });
      console.log("RES", response);
      setData(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
      setData({ message: "Error fetching data. Please try again later." });
    }
  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Resource Request Engine
        </Typography>
        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="prompt"
            label="Prompt"
            name="prompt"
            autoFocus
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="learning-style"
            label="Learning Style"
            id="learning-style"
            value={learningStyle}
            onChange={(e) => setLearningStyle(e.target.value)}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Request
          </Button>
        </Box>
      </Box>

      <div>
        {data ? (
          <p>{data.message}</p>
        ) : (
          <p>Enter prompt and learning style to request.</p>
        )}
      </div>
      <Copyright sx={{ mt: 8, mb: 4 }} />
    </Container>
  );
}
