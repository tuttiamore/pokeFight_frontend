import { useState, useEffect, useCallback } from "react";
import { Route } from "react-router-dom";
import axios from "axios";
import "./main.css";

import List from "../list/List";
import Select from "../select/Select";
import Arena from "../arena/Arena";
import Card from "../details/Card";
import CardBody from "../details/CardBody";
import Vs from "../utils/Vs";

import useGetFight from "../utils/gameLogic";
import Loader from "../utils/Loader";

export default function MainController() {
  // set and get  in  preview window
  const [viewId, setViewId] = useState(Math.floor(Math.random() * 800));
  const [viewData, setViewData] = useState();

  // set and get pokekmons in versus window
  const [players, setPlayers] = useState({});
  const [isFighting, setIsFighting] = useState();
  const [fightComments, setFightComments] = useState();

  // GET  details
  const getPokemon = useCallback(async () => {
    try {
      const { data } = await axios.get(
        `https://serene-gorge-52427.herokuapp.com/pokemon/details/${viewId}`
      );
      setViewData(data[0]);
    } catch (err) {
      console.log(err);
    }
  }, [viewId]);

  useEffect(() => {
    getPokemon();
  }, [getPokemon]);

  // Pokemon Fight Logic
  useGetFight(players, setPlayers, setFightComments, isFighting, setIsFighting);

  return (
    <main class="d-flex containerMain">
      {!viewData && <Loader></Loader>}
      {viewData && (
        <>
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

          <Route path="/" exact={true}>
            <Select>
              <Card details={viewData}>
                <CardBody
                  isPlayerSelect={true}
                  details={viewData}
                  setPlayers={setPlayers}
                  players={players}
                  style={{ width: "50%" }}
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
