import axios from "axios";
import React from "react";
import { useNavigate } from "react-router-dom";
import videoStore from "../store/store";
const Home = () => {
  const navigate = useNavigate();
  const setLoggedIn = videoStore((state) => state.setLoggedIn);
  const setAccessToken = videoStore((state) => state.setAccessToken);
  const accessToken = videoStore((state) => state.accessToken);

  const logout = async () => {
    try {
      const response = await axios.post("/api/v1/users/logout");
      if (response.status >= 200 && response.status < 300) {
        console.log("loggedOut successfully");
        navigate("/login");
        setLoggedIn();
        setAccessToken("");
      }
    } catch (err) {
      console.log("Error Logging out:", err);
    }
  };
  return (
    <div>
      <button onClick={logout}>Logout</button>
    </div>
  );
};

export default Home;
