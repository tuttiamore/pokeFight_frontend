export default function PokemonVs({
  style,
  isFighting,
  setIsFighting,
  getFight,
}) {
  const handlePokemonFight = () => {
    setIsFighting(!isFighting);
    getFight();
  };
  return (
    <div
      style={style}
      className="d-flex flex-column justify-content-center align-items-center"
    >
      <h2>VS</h2>
      <button class="btn btn-primary" onClick={handlePokemonFight}>
        Fight!
      </button>
    </div>
  );
}
