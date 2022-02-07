import { useRef, useState } from "react";
import "./login.scss";
import axios from "axios";
// import { Context } from "../../store/Context";
// import { useContext } from "react";
function Login() {
  // const currentUser = useContext(Context).user;

  const usernameRef = useRef();
  const passwordRef = useRef();
  const [loginStatus, setloginStatus] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const re = await axios.post("http://localhost:5000/api/auth/login", {
        username: usernameRef.current.value,
        password: passwordRef.current.value,
      });
      console.log(re.data);
    } catch (error) {
      if (!error.response.data) setloginStatus(true);
      else {
        console.log(error.response.data);
        window.localStorage.setItem(
          "user",
          JSON.stringify({
            username: error.response.data.username,
            photo: error.response.data.profilePic,
          })
        );
        window.location.replace("/");
      }
    }
  };
  return (
    <div className="login">
      <span className="loginTitle">Login</span>
      <form className="loginForm" onSubmit={handleSubmit}>
        <label>Username</label>
        <input
          className="loginInput"
          type="text"
          placeholder="Enter your username..."
          ref={usernameRef}
        />
        <label>Password</label>
        <input
          className="loginInput"
          type="password"
          placeholder="Enter your password..."
          ref={passwordRef}
        />
        <button className="loginButton" type="submit">
          Login
        </button>
      </form>
      {loginStatus && (
        <span style={{ color: "red", marginTop: "10px" }}>Login falied</span>
      )}
      <button className="loginRegisterButton">Register</button>
    </div>
  );
}

export default Login;
