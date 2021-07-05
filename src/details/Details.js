import Loader from "../utils/Loader";

export default function Details({ details, style, children }) {
  return (
    <>
      <div class="card m-3 p-3" style={style}>
        {!details && <Loader></Loader>}

        {details && (
          <>
            <h5 class="card-title text-center">{details.name.english}</h5>
            <div>
              <img src={details.picUrl} class="card-img-top" alt="..." />
            </div>
            {/* render child components */}
            {children}
          </>
        )}
      </div>
    </>
  );
}
