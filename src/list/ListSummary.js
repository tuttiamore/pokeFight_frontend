export default function ListSummary({ pokemon, setViewId }) {
  return (
    <div
      class="card mb-3"
      style={{ width: "auto" }}
      onClick={() => setViewId(pokemon.id)}
    >
      <div class="row g-0">
        <div class="col-md-4">
          <img src={pokemon.picUrl} class="img-fluid rounded-start" alt="..." />
        </div>
        <div class="col-md-8">
          <div class="card-body">
            <h5 class="card-title">{pokemon.name.english}</h5>
          </div>
        </div>
      </div>
    </div>
  );
}
