import React, { useState, useEffect } from "react";
import { createDbWorker } from "sql.js-httpvfs";
import Nouislider from "nouislider-react";
// import "nouislider/dist/nouislider.css";
import "../node_modules/nouislider/dist/nouislider.css";

import "./table.css";
import "./slider.css";

const dates = [
  "2017-03-19",
  "2017-04-09",
  "2018-05-06",
  "2018-08-05",
  "2018-08-12",
  "2018-08-19",
  "2018-08-26",
  "2018-09-02",
  "2018-09-09",
  "2018-09-16",
  "2018-09-23",
  "2018-09-30",
  "2018-10-07",
  "2018-10-14",
  "2018-10-21",
  "2018-10-28",
  "2018-11-04",
  "2018-11-11",
  "2018-11-18",
  "2018-11-25",
  "2018-12-02",
  "2018-12-09",
  "2018-12-16",
  "2018-12-23",
  "2018-12-30",
  "2019-01-06",
  "2019-01-13",
  "2019-01-20",
  "2019-01-27",
  "2019-02-03",
  "2019-02-10",
  "2019-02-17",
  "2019-02-24",
  "2019-03-03",
  "2019-03-10",
  "2019-03-17",
  "2019-03-24",
  "2019-03-31",
  "2019-04-07",
  "2019-04-14",
  "2019-04-21",
  "2019-04-28",
  "2019-05-05",
  "2019-05-12",
  "2019-05-19",
  "2019-05-26",
  "2019-06-02",
  "2019-06-09",
  "2019-06-16",
  "2019-06-23",
  "2019-06-30",
  "2019-07-07",
  "2019-07-14",
  "2019-07-21",
  "2019-07-28",
  "2019-08-04",
  "2019-08-11",
  "2019-08-18",
  "2019-08-25",
  "2019-09-01",
  "2019-09-08",
  "2019-09-15",
  "2019-09-22",
  "2019-09-29",
  "2019-10-06",
  "2019-10-13",
  "2019-10-20",
  "2019-10-27",
  "2019-11-03",
  "2019-11-10",
  "2019-11-17",
  "2019-11-24",
  "2019-12-01",
  "2019-12-08",
  "2019-12-15",
  "2019-12-22",
  "2019-12-29",
  "2020-01-05",
  "2020-01-12",
  "2020-01-19",
  "2020-01-26",
  "2020-02-02",
  "2020-02-09",
  "2020-02-16",
  "2020-02-23",
  "2020-03-01",
  "2020-03-08",
  "2020-03-15",
  "2020-03-22",
  "2020-03-29",
  "2020-04-05",
  "2020-04-12",
  "2020-04-19",
  "2020-04-26",
  "2020-05-03",
  "2020-05-10",
  "2020-05-17",
  "2020-05-24",
  "2020-05-31",
  "2020-06-07",
  "2020-06-14",
  "2020-06-21",
  "2020-06-28",
  "2020-07-05",
  "2020-07-12",
  "2020-07-19",
  "2020-07-26",
  "2020-08-02",
  "2020-08-09",
  "2020-08-16",
  "2020-08-23",
  "2020-08-30",
  "2020-09-06",
  "2020-09-13",
  "2020-09-20",
  "2020-09-27",
  "2020-10-04",
  "2020-10-11",
  "2020-10-18",
  "2020-10-25",
  "2020-11-01",
  "2020-11-08",
  "2020-11-15",
  "2020-11-22",
  "2020-11-29",
  "2020-12-06",
  "2020-12-13",
  "2020-12-20",
  "2020-12-27",
  "2021-01-03",
  "2021-01-10",
  "2021-01-17",
  "2021-01-24",
  "2021-01-31",
  "2021-02-07",
  "2021-02-14",
  "2021-02-21",
  "2021-02-28",
  "2021-03-07",
  "2021-03-14",
  "2021-03-21",
  "2021-03-28",
  "2021-04-04",
  "2021-04-11",
  "2021-04-18",
  "2021-04-25",
  "2021-05-02",
  "2021-05-09",
  "2021-05-16",
  "2021-05-23",
  "2021-05-30",
  "2021-06-06",
  "2021-06-13",
  "2021-06-20",
  "2021-06-27",
  "2021-07-04",
  "2021-07-11",
  "2021-07-18",
  "2021-07-25",
  "2021-08-01",
  "2021-08-08",
  "2021-08-15",
  "2021-08-22",
  "2021-08-29",
  "2021-09-05",
  "2021-09-12",
  "2021-09-19",
  "2021-09-26",
  "2021-10-03",
  "2021-10-10",
  "2021-10-17",
  "2021-10-24",
  "2021-10-31",
  "2021-11-07",
  "2021-11-14",
  "2021-11-21",
  "2021-11-28",
  "2021-12-05",
  "2021-12-12",
  "2021-12-19",
  "2021-12-26",
  "2022-01-02",
  "2022-01-09",
  "2022-01-16",
  "2022-01-23",
  "2022-01-30",
  "2022-02-06",
  "2022-02-13",
  "2022-02-20",
  "2022-02-27",
  "2022-03-06",
  "2022-03-13",
];

const workerUrl = new URL(
  "sql.js-httpvfs/dist/sqlite.worker.js",
  import.meta.url
);

const wasmUrl = new URL("sql.js-httpvfs/dist/sql-wasm.wasm", import.meta.url);

export const Table = (props) => {
  const [resList, setResList] = useState({});
  const [resListMin, setResListMin] = useState({});
  const [word, setWord] = useState(null);
  const [leftHandle, setLeftHandle] = useState(0);
  const [rightHandle, setRightHandle] = useState(7);
  const [db, setdb] = useState(props.db);

  const handleSlider = (sliderVal) => {
    setLeftHandle(parseInt(sliderVal[0]));
    setRightHandle(parseInt(sliderVal[1]));
  };

  useEffect(() => {
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

      // for each week in range
      //   retrieve top 10 values

      for (let i = leftHandle; i < rightHandle; i++) {
        // if (!(dates[i] in resList)) {
        let data = await worker.db.query(
          `SELECT * from keyness where date='` +
            dates[i] +
            `' ORDER BY keyness DESC LIMIT 20`
        );
        let temp = { [dates[i]]: data };
        setResList((resList) => ({ ...resList, ...temp }));
        // }
      }
      // for each week in range
      //   retrieve least 10 values
      for (let i = leftHandle; i < rightHandle; i++) {
        // if (!(dates[i] in resListMin)) {
        let data = await worker.db.query(
          `SELECT * from keyness where date='` +
            dates[i] +
            `' ORDER BY keyness ASC LIMIT 20`
        );
        let temp = { [dates[i]]: data };
        setResListMin((resListMin) => ({ ...resListMin, ...temp }));
        // }
      }
    }
    load();
  }, [leftHandle, rightHandle, db]);

  const tableCelClicked = (word) => {
    setWord(word);
  };

  return (
    <>
      <Nouislider
        step={1}
        onChange={handleSlider}
        range={{ min: 0, max: dates.length }}
        start={[leftHandle, rightHandle]}
        behaviour="drag"
        connect
      />
      <p>{dates[leftHandle] + " to " + dates[rightHandle]}</p>

      <table>
        <tbody>
          {dates.map(function (date, i) {
            if (i >= leftHandle && i < rightHandle) {
              return (
                <tr key={i}>
                  <th>{resList[date] && <>{date}</>}</th>
                  {resList[date] &&
                    resList[date].map((e, i) => (
                      <td
                        key={i}
                        style={{
                          background: e.word === word ? "#3f50b5" : "#dbe3ff",
                          color: e.word === word ? "white" : "black",
                        }}
                        onClick={() => tableCelClicked(e.word)}
                      >
                        {e.word + ": " + parseFloat(e.keyness).toFixed(2)}
                      </td>
                    ))}
                  {resList[date] &&
                    [...Array(20 - resList[date].length).keys()].map((e) => (
                      <td key={e + "9287346"} style={{ color: "#CCCCCC" }}>
                        -
                      </td>
                    ))}
                  {resListMin[date] &&
                    resListMin[date].map((e, i) => (
                      <td
                        key={i + "878762"}
                        style={{
                          background: e.word === word ? "#d66f47" : "#ffe5db",
                          color: e.word === word ? "white" : "black",
                        }}
                        onClick={() => tableCelClicked(e.word)}
                      >
                        {e.word + ": " + parseFloat(e.keyness).toFixed(2)}
                      </td>
                    ))}
                </tr>
              );
            } else {
              return null;
            }
          })}
        </tbody>
      </table>
    </>
  );
};

export default Table;
