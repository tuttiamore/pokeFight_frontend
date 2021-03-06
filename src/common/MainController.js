import { useState, useEffect, useCallback } from "react";
import { Route, Switch } from "react-router-dom";

import axios from "axios";
import Confetti from "react-confetti";

import List from "../list/List";
import Select from "../select/Select";
import Arena from "../arena/Arena";
import Card from "../details/Card";
import CardBody from "../details/CardBody";
import Vs from "../utils/Vs";
import Leaderboard from "../leaderboard/Leaderboard";

import useGetFight from "../utils/gameLogic";
import Loader from "../utils/Loader";

import "./main.css";

export default function MainController() {
  // set and get  in  preview window
  const [viewId, setViewId] = useState(Math.floor(Math.random() * 800));
  const [viewData, setViewData] = useState();

  // set and get pokekmons in versus window
  const [players, setPlayers] = useState({});
  const [isFighting, setIsFighting] = useState();
  const [fightComments, setFightComments] = useState();
  const [fightResults, setFightResults] = useState();
  const [isCelebrating, setIsCelebrating] = useState();
  // const [pokeUrl, setPokeUrl] = useState(process.env.REACT_APP_POKEURL);
  // POKEURL =https://serene-gorge-52427.herokuapp.com

  const pokeUrl = process.env.REACT_APP_POKEURL;

  // GET  details
  const getPokemon = useCallback(
    async (viewId) => {
      try {
        const { data } = await axios.get(
          `${pokeUrl}/pokemon/details/${viewId}`
        );
        setViewData(data[0]);
      } catch (err) {
        console.log(err);
      }
    },
    [pokeUrl]
  );

  // Helper function for posting fight results to leaderboard
  const postResults = useCallback(
    async (fightResults) => {
      try {
        const { data } = await axios.post(
          `${pokeUrl}/leaderboard/postresult`,
          fightResults
        );
        console.log(data);
      } catch (error) {
        console.log(error);
      }
    },
    [pokeUrl]
  );

  useEffect(() => {
    console.log("useEffect fired");
    let toggleCelebrate;
    getPokemon(viewId);
    if (fightResults) postResults(fightResults);
    if (isCelebrating) {
      toggleCelebrate = setTimeout(() => setIsCelebrating(false), 5000);
    }
    return () => clearInterval(toggleCelebrate);
  }, [getPokemon, viewId, postResults, fightResults, isCelebrating]);

  // Pokemon Fight Logic
  useGetFight(
    players,
    setPlayers,
    setFightComments,
    isFighting,
    setIsFighting,
    setFightResults,
    setIsCelebrating
  );

  return (
    <main class="d-flex containerMain">
      {isCelebrating && <Confetti recycle={false}></Confetti>}
      {!viewData && <Loader></Loader>}
      {viewData && (
        <>
          <Switch>
            <Route path="/leaderboard">
              <Leaderboard></Leaderboard>
            </Route>
            <Route path="/:arena?">
              {/* Upper part of the page: display players in "Arena" view */}
              <Arena>
                <Card details={players.playerOne} style={{ width: "20%" }}>
                  <CardBody
                    details={players.playerOne}
                    isToggleVisibility={true}
                  ></CardBody>
                </Card>
                <Vs
                  isFighting={isFighting}
                  setIsFighting={setIsFighting}
                  fightComments={fightComments}
                  setFightComments={setFightComments}
                  players={players}
                  style={{ width: "20%" }}
                ></Vs>

                <Card details={players.playerTwo} style={{ width: "20%" }}>
                  <CardBody
                    details={players.playerTwo}
                    isToggleVisibility={true}
                  ></CardBody>
                </Card>
              </Arena>
            </Route>
          </Switch>

          <Route path="/" exact={true}>
            <Select>
              <Card details={viewData}>
                <CardBody
                  isPlayerSelect={true}
                  details={viewData}
                  setPlayers={setPlayers}
                  players={players}
                  style={{ width: "50%" }}
                  isToggleVisibility={true}
                ></CardBody>
              </Card>
              <List setViewId={setViewId}></List>
            </Select>
          </Route>
        </>
      )}
    </main>
  );
}
