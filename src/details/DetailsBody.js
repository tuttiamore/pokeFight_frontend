import { useState } from "react";
import { Line } from "rc-progress";

export default function DetailsBody({
  setPlayerOne,
  setPlayerTwo,
  isPlayerSelect,
  details,
  isToggleVisibility,
}) {
  console.log(`HP in details is ${details.base.HP}`);
  const [isVisible, setIsVisible] = useState(!isToggleVisibility);

  const handleToggleVisibility = (e) => {
    setIsVisible(!isVisible);
  };
  return (
    <div>
      {isToggleVisibility && (
        <div class="form-check form-switch d-flex flex-column justify-content-center align-items-center">
          <input
            class="form-check-input"
            type="checkbox"
            id="flexSwitchCheckDefault"
            onChange={handleToggleVisibility}
          />
        </div>
      )}

      {isPlayerSelect && (
        <div class="d-flex flex-row justify-content-center">
          <button
            class="btn btn-primary d-block m-3"
            onClick={() => setPlayerOne(details)}
          >
            Set Player One
          </button>
          <button
            class="btn btn-primary d-block m-3"
            onClick={() => setPlayerTwo(details)}
          >
            Set PlayerTwo
          </button>
        </div>
      )}

      {isVisible && (
        <div class="card-body">
          <h6>Type</h6>
          <ul class="d-flex flex-row list-inline ">
            {details.type.map((type) => {
              return <li className="pe-4">{type}</li>;
            })}
          </ul>

          <h6>Base</h6>
          <ul className="list-unstyled">
            {Object.keys(details.base).map((key) => {
              return (
                <li className="mb-3">
                  <p className="m-0">{key}</p>
                  <Line
                    percent={String(details.base[key])}
                    strokeWidth="4"
                    strokeColor="#D3D3D3"
                  />
                </li>
              );
            })}
          </ul>
        </div>
      )}
    </div>
  );
}
