import { useCallback, useEffect } from "react";

const useGetFight = (
  players,
  setPlayers,
  setFightComments,
  isFighting,
  setIsFighting,
  setFightResults
) => {
  // fight game logic
  const getFight = useCallback(() => {
    // set empty comments array:
    let comments = [];

    // Game logic: 1. pick attacker
    const attackerRandom = `player${
      ["One", "Two"][Math.floor(Math.random() * 2)]
    }`;
    const attacker = Object.keys(players).find((key) => key === attackerRandom);
    const defendant = Object.keys(players).find(
      (key) => key !== attackerRandom
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

    comments.push(` ${players[attacker].name.english} attacked with
      ${attack.attack === "Attack" ? "normal" : "special"} attack!`);

    // 3. compare with defend of defendant, if attacker wins, substract diff from HP
    const damage =
      players[attacker].base[attack.attack] -
      players[defendant].base[attack.defense];

    // Only update if attack successful, i.e. damage > 0
    if (damage > 0) {
      setPlayers((prevData) => {
        prevData[defendant].base.HP -= damage;
        return { ...prevData };
      });
      comments.push(
        `${players[defendant].name.english} suffered ${damage} damage!`
      );
    } else {
      setPlayers((prevData) => {
        return { ...prevData };
      });
      comments.push(`${players[defendant].name.english} defended!`);
    }

    if (players[defendant].base.HP - damage <= 0) {
      comments.push(`${players[attacker].name.english} won!`);
      setFightComments(comments);
      const fightResults = {
        id: players[attacker].id,
        opponentId: players[defendant].id,
      };
      setFightResults(fightResults);
      setIsFighting(false);
    } else {
      setFightComments(comments);
    }
    // If speed of defendant superior, make attack randomly fail
  }, [players]);

  useEffect(() => {
    let intervalId;
    if (players.playerOne && players.playerTwo && isFighting) {
      console.log("interval called");

      intervalId = setInterval(() => {
        getFight();
      }, 2500);
    }
    return () => clearInterval(intervalId);
  }, [players, isFighting, getFight]);
};

export default useGetFight;
