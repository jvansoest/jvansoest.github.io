import React, { useState, useEffect } from "react";
import { createDbWorker } from "sql.js-httpvfs";
import Scatterplot from "./Scatterplot";

const workerUrl = new URL(
  "sql.js-httpvfs/dist/sqlite.worker.js",
  import.meta.url
);

const wasmUrl = new URL("sql.js-httpvfs/dist/sql-wasm.wasm", import.meta.url);

export const Chart = (props) => {
  const [res, setRes] = useState(null);
  const [db, setdb] = useState(props.db);

  useEffect(() => {
    console.log(props.db);

    setdb(props.db);
  }, [props.db]);

  useEffect(() => {
    async function load() {
      const worker = await createDbWorker(
        [
          {
            from: "inline",
            config: {
              serverMode: "full",
              url: db,
              requestChunkSize: 1024,
            },
          },
        ],
        workerUrl.toString(),
        wasmUrl.toString()
      );

      const result = await worker.db.query(props.query);
      console.log(db);
      // setRes({ result });
      if (result.length) {
        setRes({ result });
      } else {
        setRes(null);
      }
    }
    load();
  }, [props.query, db]);

  return <>{res && <Scatterplot keywords={props.keywords} data={res} />}</>;
};

export default Chart;
