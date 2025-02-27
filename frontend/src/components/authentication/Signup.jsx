import styles from "./Signup.module.css";
import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { useState, useRef } from "react";
import videoStore from "../../store/store";
import axios from "axios";
const Signup = () => {
  const navigate = useNavigate();

  const [avatar, setAvatar] = useState(null);
  const [avatarPreview, setAvatarPreview] = useState(null);

  const [coverImage, setCoverImage] = useState(null);
  const [coverPreview, setCoverPreview] = useState(null);

  const fullNameElement = useRef(null);
  const usernameElement = useRef(null);
  const emailElement = useRef(null);
  const passwordElement = useRef(null);

  const registerUser = async (e) => {
    e.preventDefault();

    const username = usernameElement.current.value;
    const fullName = fullNameElement.current.value;
    const email = emailElement.current.value;
    const password = passwordElement.current.value;

    const formData = new FormData();
    formData.append("fullName", fullName);
    formData.append("username", username);
    formData.append("email", email);
    formData.append("password", password);

    // Append avatar image if exists
    if (avatar) {
      formData.append("avatar", avatar);
    }

    // Append cover image if exists
    if (coverImage) {
      formData.append("coverImage", coverImage);
    }
    try {
      const response = await axios.post("/api/v1/users/register", formData);
      if (response.status >= 200 && response.status < 300) {
        console.log("User registered Successfully");

        navigate("/login");
      } else {
        console.log("Error creating User");
      }
    } catch (err) {
      console.log("Err:", err);
    }
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.container}>
        <div className={styles.leftContainer}>
          <div className={styles.contentContainer}>
            <form>
              <label>Full Name</label>
              <input
                ref={fullNameElement}
                type="text"
                placeholder="Full Name"
              />

              <label>Username</label>
              <input ref={usernameElement} type="text" placeholder="Username" />

              <label>Email</label>
              <input ref={emailElement} type="text" placeholder="Email" />

              <label>Password</label>
              <input
                ref={passwordElement}
                type="password"
                placeholder="********"
              />

              <label>Upload your Avatar</label>
              {avatarPreview && (
                <img
                  src={avatarPreview}
                  alt="Avatar Preview"
                  className={styles.avatarPreview}
                />
              )}
              <input
                type="file"
                accept="image/*"
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  if (file) {
                    setAvatar(file);
                    const reader = new FileReader();
                    reader.onload = () => {
                      setAvatarPreview(reader.result);
                    };
                    reader.readAsDataURL(file);
                  }
                }}
              />

              <label>Upload your Cover Image</label>
              {coverPreview && (
                <img
                  src={coverPreview}
                  alt="Cover Image Preview"
                  className={styles.coverPreview}
                />
              )}
              <input
                type="file"
                accept="image/*"
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  if (file) {
                    setCoverImage(file);
                    const reader = new FileReader();
                    reader.onload = () => {
                      setCoverPreview(reader.result);
                    };
                    reader.readAsDataURL(file);
                  }
                }}
              />
            </form>
            <button onClick={registerUser} className={styles.signUpButton}>
              Create Account
            </button>
          </div>
        </div>
        <div className={styles.rightContainer}></div>
      </div>
    </div>
  );
};

export default Signup;
