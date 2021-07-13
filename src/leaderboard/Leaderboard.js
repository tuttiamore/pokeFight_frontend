import axios from "axios";
import { useEffect, useState, useCallback } from "react";

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
    <table class="table">
      <thead>
        <tr>
          <th scope="col">#</th>
          <th scope="col">Pokemon</th>
          <th scope="col">Win</th>
          <th scope="col">Loose</th>
          <th scope="col">Total</th>
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
                <td>{result.lose}</td>
                <td>{result.total}</td>
              </tr>
            );
          })}
      </tbody>
    </table>
  );
}
