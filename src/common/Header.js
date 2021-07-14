import { Link } from "react-router-dom";
import "./header.css";
export default function Header() {
  return (
    <header>
      <nav class="navbar navbar-expand-lg navbar-light ">
        <div class="container-fluid justify-content-between">
          <div className="navbar-text ">
            <Link to="/leaderboard">
              <p>Highscore</p>
            </Link>
          </div>
          <div className="navbar-brand">
            <Link to="/">
              <img
                src="https://upload.wikimedia.org/wikipedia/commons/9/98/International_Pok%C3%A9mon_logo.svg"
                alt="pokemon logo"
              ></img>
            </Link>
          </div>
          <div className="navbar-text">
            <Link to="/leaderboard">
              <p>Login</p>
            </Link>
          </div>
        </div>
      </nav>
    </header>
  );
}
