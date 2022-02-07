import { Link } from "react-router-dom";
import "./topbar.scss";
import { useContext, useState } from "react";
import { Context } from "../../store/Context";
import Dropmenu from "../dropmenu/Dropmenu";
function Topbar() {
  const [dropdown, setDropdown] = useState(false);
  const currentUser = useContext(Context);

  const handleClick = () => {
    setDropdown(!dropdown);
  };

  return (
    <div className="top">
      <div className="topLeft">
        <i className="topIcon fab fa-facebook-square"></i>
        <i className="topIcon fab fa-instagram-square"></i>
        <i className="topIcon fab fa-pinterest-square"></i>
        <i className="topIcon fab fa-twitter-square"></i>
      </div>
      <div className="topCenter">
        <ul className="topList">
          <li className="topListItem">
            <Link to="/">Home</Link>
          </li>
          <li className="topListItem">ABOUT</li>
          <li className="topListItem">CONTACT</li>
          <li className="topListItem">
            <Link
              to={currentUser ? "/write" : "/login"}
              onClick={() => {
                if (!currentUser) alert("Login first please");
              }}
            >
              Write
            </Link>
          </li>
        </ul>
      </div>
      <div className="topRight">
        <span>{currentUser ? currentUser.username : null}</span>
        {currentUser && (
          <div
            className="profilePhoto"
            onClick={handleClick}
            style={{ position: "relative" }}
          >
            <img className="topImg" src={currentUser.photo} alt="" />
            <i className="fas fa-caret-down" />
            {dropdown && <Dropmenu handleClick={handleClick} />}
          </div>
        )}

        {currentUser ? (
          true
        ) : (
          <ul className="topList">
            <li className="topListItem">
              <Link to="/login">Login</Link>
            </li>
            <li className="topListItem">
              <Link to="/register">Register</Link>
            </li>
          </ul>
        )}

        {/* <i className="topSearchIcon fas fa-search"></i> */}
      </div>
    </div>
  );
}

export default Topbar;
