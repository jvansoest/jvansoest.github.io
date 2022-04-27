import React, { useState } from "react";
import Chart from "./Chart";
import { Button, TextField, Grid, Box } from "@material-ui/core";

const makeQuery = (lst) => {
  //"SELECT * FROM keyness WHERE word=" + ['created','covid'].map((e) => "'" + e + "'").join(' OR word=')
  let where_clause = lst.map((e) => "'" + e + "'").join(" OR word=");
  let query = "SELECT * FROM keyness WHERE word=" + where_clause;
  return query;
};

export const ChartContainer = (props) => {
  const [keywords, setKeywords] = useState("");
  const [query, setQuery] = useState(null);
  const [keywordsList, setKeyWordsList] = useState([]);

  const handleSubmit = (event) => {
    event.preventDefault();
    setKeyWordsList(keywords.split(" "));
    setQuery(makeQuery(keywords.split(" ")));
  };

  return (
    <form onSubmit={handleSubmit}>
      <Grid container>
        <Grid item style={{ width: "300px" }}>
          <TextField
            fullWidth
            value={keywords}
            id="outlined-basic"
            label="space delimited keywords"
            variant="outlined"
            onChange={(e) => setKeywords(e.target.value)}
          />
        </Grid>
        <Grid item alignItems="stretch" style={{ display: "flex" }}>
          <Button
            variant="contained"
            type="submit"
            color="primary"
            value="Plot"
          >
            Plot
          </Button>
        </Grid>
      </Grid>

      {query && <Chart db={props.db} keywords={keywordsList} query={query} />}
    </form>
  );
};
