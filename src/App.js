import React, { useState } from "react";

import { ChartContainer } from "./ChartContainer";
import { Table } from "./Table";

import {
  Button,
  Container,
  Typography,
  Grid,
  Card,
  CardHeader,
  CardActions,
  CardContent,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  ButtonGroup,
  Box,
  Item,
  Link,
  Typographys,
} from "@material-ui/core";

function App() {
  const [tab, setTab] = useState(0);
  const [db, setDb] = useState("/keyness.sqlite3");

  const handleChange = (event) => {
    setDb(event.target.value);
  };

  return (
    <Container>
      <Grid container spacing={2}>
        <Grid item xs={6} md={12}>
          <Typography align="center" variant="h2">
            Telegram narrative evolution observatory
          </Typography>
          <CardContent>
            <Typography align="justify">
              This demonstrator offers a tool for exploring narrative signals on
              Telegram. It allows users to examine keyness scores (Log Ratio)
              for words extracted from messages and images in a dataset of 225
              Dutch-speaking far-right and conspiracist Telegram channels
              spanning the period March 2017-March 2022. Data were grouped by
              weekly timestamps, and keyness scores for nouns and verbs for each
              week's worth of data (target corpus) were calculated in relation
              to the combined data in all other weeks (reference corpus). Users
              can use the 'chart' view to create scatterplots of weekly keyness
              scores for selected search terms. The 'table' view presents an
              overview of the n words with the highest and lowest keyness scores
              for a given time period.
            </Typography>
          </CardContent>
          <CardContent>
            <Typography align="justify">
              This demonstrator is part of the{" "}
              <Link href="https://belux.edmo.eu/">EDMO BELUX</Link>{" "}
              Belgium-Luxembourg Digital Media and Disinformation Observatory.
              This project has received funding from the European Union under
              Grant Agreement number INEA/CEF/ICT/A2020/2394296.
            </Typography>
          </CardContent>
        </Grid>
        <Grid item xs={6} md={12}>
          {/* <Container maxWidth="lg" component="main"> */}
          <Box justifyContent="space-between" m={2} pt={3}>
            <ButtonGroup>
              <Button
                disabled={tab === 0}
                variant="contained"
                color="primary"
                onClick={() => setTab(0)}
              >
                Plot
              </Button>
              <Button
                disabled={tab === 1}
                variant="contained"
                color="primary"
                onClick={() => setTab(1)}
              >
                Table
              </Button>
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">Dataset</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={db}
                  onChange={handleChange}
                  label="Dataset"
                >
                  <MenuItem value={"/keyness.sqlite3"}>
                    Aggregated message and image texts in English
                  </MenuItem>
                  <MenuItem value={"/keyness_en_img_w_.sqlite3"}>
                    Image texts in English
                  </MenuItem>
                  <MenuItem value={"/keyness_en_msg_w_.sqlite3"}>
                    Message texts in English
                  </MenuItem>
                  <MenuItem value={"/keyness_nl_comb_w_.sqlite3"}>
                    Aggregated message and image texts in Dutch
                  </MenuItem>
                  <MenuItem value={"/keyness_nl_msg_w_.sqlite3"}>
                    Message texts in Dutch
                  </MenuItem>
                  <MenuItem value={"/keyness_nl_img_w_.sqlite3"}>
                    Image texts in Dutch
                  </MenuItem>
                </Select>
              </FormControl>
            </ButtonGroup>
            <Box justifyContent="space-between" pt={3}>
              {tab === 0 && <ChartContainer db={db} />}
              {tab === 1 && <Table db={db} />}
            </Box>
          </Box>
          {/* </Container> */}
        </Grid>
      </Grid>
    </Container>
  );
}

export default App;
