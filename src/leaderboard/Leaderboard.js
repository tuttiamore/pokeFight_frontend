import axios from "axios";
import { useEffect, useState, useCallback } from "react";
import "./leaderboard.css";

export default function Leaderboard() {
  const [leaderboardResults, setLeaderboardResults] = useState();

  const pokeUrl = process.env.REACT_APP_POKEURL;

  const getLeaderboard = useCallback(async () => {
    try {
      const { data } = await axios.get(`${pokeUrl}/leaderboard/getresults`);
      console.log(data);
      setLeaderboardResults(data);
    } catch (error) {
      console.log(error.message);
    }
  }, []);

  useEffect(() => {
    getLeaderboard();
  }, []);

  return (
    <div className="leaderboard-container">
      <table class="table">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Pokemon</th>
            <th scope="col">Times won</th>
          </tr>
        </thead>
        <tbody>
          {leaderboardResults &&
            leaderboardResults.map((result, index) => {
              return (
                <tr>
                  <th scope="row">{index + 1}</th>
                  <td>{result.name}</td>
                  <td>{result.win}</td>
                </tr>
              );
            })}
        </tbody>
      </table>
    </div>
  );
}
