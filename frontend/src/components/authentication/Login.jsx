import styles from "./Login.module.css";
import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { useRef } from "react";
import videoStore from "../../store/store.js";
import axios from "axios";
const Login = () => {
  const navigate = useNavigate();
  const usernameElement = useRef(null);
  const emailElement = useRef(null);
  const passwordElement = useRef(null);
  const setLoggedIn = videoStore((state) => state.setLoggedIn);
  const setAccessToken = videoStore((state) => state.setAccessToken);

  const loginUser = async () => {
    const username = usernameElement.current.value;
    const email = emailElement.current.value;
    const password = passwordElement.current.value;

    const userData = {
      username,
      email,
      password,
    };

    try {
      const response = await axios.post("/api/v1/users/login", userData);
      if (response.status >= 200 && response.status < 300) {
        const userData = response.data.data;
        console.log(userData.user);
        console.log(userData.accessToken);
        setLoggedIn();
        setAccessToken(userData.accessToken);
        console.log("successful Login");
        navigate("/");
      }
    } catch (err) {
      console.log("Error logging in: ", err);
    }
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.container}>
        <div className={styles.leftContent}></div>
        <div className={styles.rightContent}>
          <div className={styles.heading}>Login to your Account</div>
          <div className={styles.authButtons}>
            <button>
              <FcGoogle />
              Google
            </button>
            <button>
              <FaGithub />
              GitHub
            </button>
          </div>
          <div className={styles.authFormDiv}>
            <form className={styles.authForm}>
              <label>Username</label>
              <input type="text" placeholder="Username" ref={usernameElement} />
              <label>Email</label>
              <input type="mail" placeholder="Email" ref={emailElement} />
              <label>Password</label>
              <input
                type="password"
                placeholder="********"
                ref={passwordElement}
              />
            </form>
          </div>
          <div className={styles.loginButton}>
            <button onClick={loginUser}>Login</button>
          </div>
          <div className={styles.createOne}>
            <p className={styles.createText}>Don't have an account?</p>
            <Link to={"/signup"}>Create One</Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
