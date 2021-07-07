import { Line } from "rc-progress";
import Loader from "../utils/Loader";

export default function Card({ details, style, children }) {
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
            <div className="d-flex flex-row my-4">
              <p className="p-0 me-2 m-0 lh-1">HP</p>
              <Line
                percent={details.base.HP < 0 ? "0" : String(details.base.HP)}
                strokeWidth="4"
                strokeColor="#D3D3D3"
              />
            </div>

            {/* render child components */}
            {children}
          </>
        )}
      </div>
    </>
  );
}
