import React, { useEffect, useState } from "react";

import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import CssBaseline from "@mui/material/CssBaseline";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Link from "@mui/material/Link";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import axios from "axios";
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
        Team 14
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

export default function Form() {
  const [data, setData] = useState(null);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [format, setFormat] = useState([]);
  const [learningStyle, setLearningStyle] = useState([]);
  const [topic, setTopic] = useState("");
  const [level, setLevel] = useState("");
  const [availability, setAvailability] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();

    const prompt = `
We have the following resources for coding:
- freeCodeCamp
- Codecademy
- Coursera
- Udemy
- Khan Academy
- edX
- Pluralsight
- Code.org
- Code School
- Code Avengers
- Treehouse
- CodeHS
- W3Schools
- Mozilla Developer Network
- The Odin Project
- HackerRank
- LeetCode
- GeeksforGeeks
- HackerEarth
- Codewars
- Exercism
- CodeSignal
- TopCoder
- CodeChef
- AtCoder
- SPOJ
- Project Euler
- Advent of Code
- CodinGame
- Codeforces
- CodeAbbey
- URI Online Judge

    Given a learning style of ${learningStyle.join(
      ", "
    )}, I am interested in learning about ${topic} at a level of ${level}. I am available ${availability}. Please provide resources in the format of ${format.join(
      ", "
    )}.
    `;

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
          {/* Name */}
          <TextField
            margin="normal"
            required
            fullWidth
            id="name"
            label="Name"
            name="name"
            autoFocus
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

          {/* Email */}
          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          {/* Preferred Format */}
          <FormControl fullWidth>
            <InputLabel id="format-label">Preferred Format</InputLabel>
            <Select
              labelId="format-label"
              id="format"
              multiple
              value={format}
              onChange={(e) => setFormat(e.target.value)}
            >
              <MenuItem value="text">Text</MenuItem>
              <MenuItem value="audio">Audio</MenuItem>
              <MenuItem value="video">Video</MenuItem>
              <MenuItem value="images">Images</MenuItem>
            </Select>
          </FormControl>

          {/* Preferred Learning Style */}
          <FormControl fullWidth>
            <InputLabel id="learning-style-label">
              Preferred Learning Style
            </InputLabel>
            <Select
              labelId="learning-style-label"
              id="learning-style"
              multiple
              value={learningStyle}
              onChange={(e) => setLearningStyle(e.target.value)}
            >
              <MenuItem value="visual">Visual</MenuItem>
              <MenuItem value="kinesthetic">Kinesthetic</MenuItem>
              <MenuItem value="auditory">Auditory</MenuItem>
              <MenuItem value="reading-writing">Reading/Writing</MenuItem>
            </Select>
          </FormControl>

          {/* Topic of Interest */}
          <TextField
            margin="normal"
            fullWidth
            id="topic"
            label="Topic of Interest"
            name="topic"
            value={topic}
            onChange={(e) => setTopic(e.target.value)}
          />

          {/* Current Level in Topic */}
          <TextField
            margin="normal"
            fullWidth
            id="level"
            label="Current Level in Topic"
            name="level"
            value={level}
            onChange={(e) => setLevel(e.target.value)}
          />

          {/* Time/Availability */}
          <TextField
            margin="normal"
            fullWidth
            id="availability"
            label="Time/Availability"
            name="availability"
            value={availability}
            onChange={(e) => setAvailability(e.target.value)}
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
          <div
            dangerouslySetInnerHTML={{
              __html: window?.marked.parse(data.message),
            }}
          />
        ) : (
          <p>Enter inputs and learning style to request.</p>
        )}
      </div>
      <Copyright sx={{ mt: 8, mb: 4 }} />
    </Container>
  );
}
