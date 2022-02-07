import "./register.scss";
import { useRef, useState } from "react";
import axios from "axios";
function Register() {
  const userRef = useRef();
  const passRef = useRef();
  const repassRef = useRef();
  const [er, seter] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (passRef.current.value !== repassRef.current.value) seter(true);
    else {
      try {
        const res = await axios.post(
          "http://localhost:5000/api/auth/register",
          {
            username: userRef.current.value,
            password: passRef.current.value,
          }
        );
        if (res.data === "have been existed") alert("user already exist");
        else {
          alert("resigter successfully");
          window.location.assign("/login");
        }
      } catch (error) {
        console.log(error);
      }
    }
  };
  return (
    <div className="register">
      <span className="registerTitle">Register</span>
      <form className="registerForm" onSubmit={handleSubmit}>
        <label>Username</label>
        <input
          className="registerInput"
          type="text"
          placeholder="Enter your username..."
          ref={userRef}
        />
        <label>Email</label>
        <input
          className="registerInput"
          type="text"
          placeholder="Enter your password..."
          ref={passRef}
        />
        <label>Password</label>
        <input
          className="registerInput"
          type="password"
          placeholder="Confirm your password..."
          ref={repassRef}
        />
        <button className="registerButton" type="submit">
          Register
        </button>
      </form>
      {er && <span>something was wrong!</span>}

      <button className="registerLoginButton">Login</button>
    </div>
  );
}

export default Register;
