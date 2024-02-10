import { useEffect, useState } from "react";

import "./App.css";
import axios from "axios";
import { server } from "./utils/constants";

function App() {
  const [jokes, setjokes] = useState([]);

  useEffect(() => {
    axios
      .get(`${server}/jokes`)
      .then((res) => {
        setjokes(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  console.log(jokes);
  return (
    <>
      <div>
        <h1>List of Jokes</h1>
        {jokes.length}
        {jokes.length
          ? jokes.map((joke, index) => {
              return (
                <div key={index}>
                  <h1>{joke.author}</h1>
                  <h2>{joke.jokes}</h2>
                </div>
              );
            })
          : null}
      </div>
    </>
  );
}

export default App;
