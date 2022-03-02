import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "./Auth";

const Home = () => {
  const { currentUser } = useContext(AuthContext);
  return (
    <>
      <h1>Home</h1>
      {currentUser ? (
        <p>
          You are logged - <Link to="/Dashboard">View Dashboard</Link>
        </p>
      ) : (
        <p>
          <Link to="/">Log In</Link> or <Link to="/Signup">Sign Up</Link> or <Link to="/account">Account</Link>
        </p>
      )}
    </>
  );
};

export default Home;