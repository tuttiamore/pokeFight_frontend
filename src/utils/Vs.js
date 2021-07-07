import { useHistory, useRouteMatch } from "react-router";
import { useState, useEffect } from "react";

export default function PokemonVs({
  style,
  isFighting,
  setIsFighting,
  fightComments,
  setFightComments,
  players,
}) {
  const [buttonText, setButtonText] = useState();
  const history = useHistory();
  const { url } = useRouteMatch();

  const handlePokemonFight = () => {
    setFightComments(["Let's fight!"]);
    setIsFighting(!isFighting);
    if (url !== "/arena") {
      history.push("/arena");
    }
  };

  useEffect(() => {
    console.log("history push useEff");
    // console.log(!isFighting && url === "/arena");
    console.log(!isFighting);
    console.log(url);
    if (isFighting) {
      setButtonText("Stop fight");
    } else {
      setButtonText("Fight!");
    }
    if (!isFighting && url === "/arena") {
      history.push("/");
      console.log("history push useEff");
    }
  }, [isFighting, history, url]);

  return (
    <div
      style={style}
      className="d-flex flex-column justify-content-center align-items-center"
    >
      {fightComments && (
        <div>
          {fightComments.map((comment) => {
            return <p>{comment}</p>;
          })}
        </div>
      )}
      <h2>VS</h2>

      {players.playerOne && players.playerTwo && (
        <button class="btn btn-primary" onClick={handlePokemonFight}>
          {buttonText}
        </button>
      )}
    </div>
  );
}
