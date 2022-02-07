import "./dropmenu.scss";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { Context } from "../../store/Context";

function Dropmenu({ handleClick }) {
  const logout = () => {
    localStorage.clear();
    window.location.assign("/");
  };
  const currentUser = useContext(Context).user;
  return (
    <div className="dropDown">
      <ul className="menuList">
        <Link to="/setting">
          <li className="menuListItem" onClick={handleClick}>
            Setting
          </li>
        </Link>
        <Link to={`/mypost?user=${currentUser}`}>
          <li className="menuListItem">My posts</li>
        </Link>

        <li className="menuListItem" onClick={logout}>
          Log out
        </li>
      </ul>
    </div>
  );
}
export default Dropmenu;
