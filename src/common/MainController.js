import { useState, useEffect, useCallback } from "react";
import { Switch, Route } from "react-router-dom";
import axios from "axios";
import "./main.css";

import List from "../list/List";
import Select from "../select/Select";
import Arena from "../arena/Arena";
import Details from "../details/Details";
import Vs from "../utils/Vs";
import DetailsBody from "../details/DetailsBody";

export default function MainController() {
  // set and get  in  preview view
  const [displayId, setDisplayId] = useState(Math.floor(Math.random() * 800));
  const [details, setDetails] = useState();

  // set and get pokekmons in versus view
  const [playerOne, setPlayerOne] = useState();
  const [playerTwo, setPlayerTwo] = useState();
  const [isFighting, setIsFighting] = useState();

  // GET  details
  const getDetails = useCallback(async () => {
    console.log(" Details");
    try {
      const { data } = await axios.get(
        `http://localhost:3001/pokemon/details/${displayId}`
      );
      setDetails(data[0]);
      setPlayerOne(data[0]);
    } catch (err) {
      console.log(err.response.data);
    }
  }, [displayId]);

  useEffect(() => {
    getDetails();
  }, [getDetails]);

  //  Fight
  const getFight = () => {
    console.log("getFight called");

    // Game logic: 1. pick attacker
    const players = [playerOne, playerTwo];
    const attackerRandom = Math.floor(Math.random() * 2);
    const attacker = players.find((player, index) => index === attackerRandom);
    const defendant = players.find((player, index) => index !== attackerRandom);
    console.log(
      `attacker is ${attacker.name.english} with ${attacker.base.HP} HP `
    );
    console.log(
      `defendant is ${defendant.name.english} with ${defendant.base.HP} HP`
    );
    // 2. randomly pick from normal or special attack
    const attackDefenses = [
      {
        attack: "Attack",
        defense: "Defense",
      },
      {
        attack: "Sp. Attack",
        defense: "Sp. Defense",
      },
    ];
    const attackRandom = Math.floor(Math.random() * 2);
    const attack = attackDefenses.find(
      (attack, index) => index === attackRandom
    );

    // 3. compare with defend of defendant, if attacker wins, substract diff from HP
    const damage =
      attacker.base[attack.attack] - defendant.base[attack.defense];

    console.log(`attacker was ${attack.attack},causing ${damage} damage`);

    if (damage > 0) {
      defendant.base.HP -= damage;
      console.log(`defedant HP after attack is ${defendant.base.HP} `);

      if (defendant.name.english === playerOne.name.english) {
        setPlayerOne(defendant);
      } else {
        setPlayerTwo(defendant);
      }
    }
    // If speed of defendant superior, make attack randomly fail
  };

  // TRY: get fight  with intervall
  // const getFightInt = useCallback(() => {
  //   const fightInt = setInterval(() => {
  //     console.log("fight!");
  //     setPlayerOne((playerOne) => {
  //       playerOne.base.HP -= 20;
  //       return playerOne;
  //     });
  //   }, 1000);
  //   return () => clearInterval(fightInt);
  // }, [playerOne]);

  useEffect(() => {
    console.log("use effect fight!");
    const fightInt = setInterval(() => {
      console.log("fight!");
      setPlayerOne((playerOne) => {
        playerOne.base.HP -= 20;
        return playerOne;
      });
    }, 1000);

    return () => clearInterval(fightInt);
  }, [playerOne]);

  console.log("main rendered");
  playerOne && console.log(`player One HP is ${playerOne.base.HP}`);

  return (
    <main class="d-flex containerMain">
      <Route path="/:arena?">
        <Arena>
          {/* {isFighting && <Announcement></Announcement>} */}
          <Details details={playerOne} style={{ width: "20%" }}>
            <DetailsBody
              details={playerOne}
              isToggleVisibility={true}
            ></DetailsBody>
          </Details>
          <Vs
            isFighting={isFighting}
            setIsFighting={setIsFighting}
            getFight={getFight}
            style={{ width: "20%" }}
          ></Vs>

          <Details details={playerTwo} style={{ width: "20%" }}>
            <DetailsBody
              details={playerTwo}
              isToggleVisibility={true}
            ></DetailsBody>
          </Details>
        </Arena>
      </Route>

      <Route path="/" exact={true}>
        <Select>
          <Details details={details}>
            <DetailsBody
              details={details}
              setPlayerOne={setPlayerOne}
              setPlayerTwo={setPlayerTwo}
              isPlayerSelect={true}
              style={{ width: "50%" }}
            ></DetailsBody>
          </Details>
          <List setDisplayId={setDisplayId}></List>
        </Select>
      </Route>
    </main>
  );
}
