import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";

import { createDbWorker } from "sql.js-httpvfs";

const workerUrl = new URL(
  "sql.js-httpvfs/dist/sqlite.worker.js",
  import.meta.url
);
const wasmUrl = new URL("sql.js-httpvfs/dist/sql-wasm.wasm", import.meta.url);

const App = () => {
  const [first, setfirst] = useState(null);

  useEffect(() => {
    async function load() {
      const worker = await createDbWorker(
        [
          {
            from: "inline",
            config: {
              serverMode: "full",
              url: "/example.sqlite3",
              requestChunkSize: 4096,
            },
          },
        ],
        workerUrl.toString(),
        wasmUrl.toString()
      );

      const result = await worker.db.query(`select * from mytable`);
      setfirst(result);
    }

    load();
  }, []);

  return <h1>My React and TypeScript App! {JSON.stringify(first)}</h1>;
};

ReactDOM.render(<App />, document.getElementById("root"));
