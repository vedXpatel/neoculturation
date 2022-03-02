import React,{useContext} from 'react';
import { Redirect } from "react-router-dom";
import { AuthContext } from "./Auth";
import {firebaseConfig} from "../firebase.js";

function Login() {
    const { currentUser } = useContext(AuthContext);
    if (currentUser) {
      return <Redirect to="/Dashboard" />;
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        const { email, password } = e.target.elements;
        try {
          firebaseConfig.auth().signInWithEmailAndPassword(email.value, password.value);
        } catch (error) {
            alert(error);
        }
      };

    return (
        <div className="container">
            <div className="row">
                <div className="col-lg-6 login-left col-sm-12 col-md-12">
                <img src="https://s3-alpha-sig.figma.com/img/d625/27f1/9e3d09482dbf5500d04de445ec0768d2?Expires=1633305600&Signature=Snh00CCDQ6cgiU1XAjYQ3OH5cGqUOcIIRSvB3PjUYDy8yMmzffMWUSi9p5rByoRD8MnJt1q6UIMOgzq7qVlpnJuZ41DQhiMo1WQ0gEowNyupQXCyKAobQxQ7WQpTZ7DVLcmVuN0nMbkyMYTHffi0CaAcTa8~LMDjsD1o4rMRU6ttcwelqodO-tnkoAQBmfi6aRHj42k1Rd1prql-K71Rl2GAar4t8aqLDk0ClaHHDZdj3hRL49VDb56Y0VM7X8c9bt7hBjlmbb3ItQ9pBotQWms4XtwPl2blrtcxe7TQEO1l1fFL6I3loGcIK7U9fEQ6ujOp5sRHY2lSlmVM5dQMFg__&Key-Pair-Id=APKAINTVSUGEWH5XD5UA" className="login-left1" alt="" />
                    <h1 className="login-text-left">Lorem ipsum dolor sit amet consectetur adipisicing elit.</h1>
                    <div className="play-button"></div>
                </div>
                <div className="col-lg-6 col-sm-12 col-md-12">
                    <h1 className="login-text-right">NC</h1>
                    <p className="login-welcome">Welcome Back</p>
                    <h4 className="login-text-1">Login into your account</h4>
                    <form className="login-form" onSubmit={handleSubmit}>
                        <div className="form-group">
                            <label for="inputEmail" className="text-email">Email</label>
                            <input type="email" className="form-control form-email" id="inputEmail" placeholder="Email" name="email" />
                        </div>
                        <div className="form-group">
                            <label for="inputPassword" className="text-password">Password</label>
                            <input type="password" className="form-control form-password" id="inputPassword" placeholder="Password" name="password" />
                        </div>
                        <div className="form-group remember">
                            <label className="form-check-label"><input type="checkbox"/> Remember me</label>
                        </div>
                        <button type="submit" className="btn btn-primary login-button">Login</button>
                        {/* <button type="submit" className="login-button1">Sign in with Google</button> */}
                        <button type="submit" className="login-button1" >SignUp</button>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Login;