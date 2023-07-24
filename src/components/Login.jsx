import React, { useState } from "react";
import { LoginBg } from "../img";
import { LoginInput } from "../components";
import { FaEnvelope, FaLock } from "react-icons/fa";
import { motion } from "framer-motion";
import { buttonClick } from "../animations";
import { FcGoogle } from "react-icons/fc";

import { getAuth,
   signInWithPopup,
    GoogleAuthProvider,
     createUserWithEmailAndPassword,
      signInWithEmailPass
     } from "firebase/auth";
import { app } from "../firebase.config";
import { validateUserJWTToken} from "../api"
import { useNavigate} from "react-router-dom"

const Login = () => {
  const [userEmail, setUserEmail] = useState("");
  const [isSignUp, setIsSignUp] = useState(false);
  const [password, setPassword] = useState("");
  const [confirm_password, setConfirm_password] = useState("");

  const firebaseAuth = getAuth(app);
  const provider = new GoogleAuthProvider();
  const navigate = useNavigate();

  const loginwithGoogle = async () => {
    await signInWithPopup(firebaseAuth, provider).then((userCred) => {
      firebaseAuth.onAuthStateChanged((cred) => {
        if (cred) {
          cred.getIdToken().then((token) => {
            validateUserJWTToken(token).then((data) => {
              console.log(data);
            });
            navigate("/", { replace: true });
          });
        }
      });
    });
  };

  const signUpWithEmailPass = () => {
    if (userEmail === "" || password === "" || confirm_password === "")  {
     //alert message 
    }else{
      if(password === confirm_password){
        setUserEmail("");
        setConfirm_password("");
        setPassword("");
        await createUserWithEmailAndPassword(
          firebaseAuth,
          userEmail,
          password).then(userCred => {
          firebaseAuth.onAuthStateChanged((cred) => {
            if (cred) {
              cred.getIdToken().then((token) => {
                validateUserJWTToken(token).then((data) => {
                  console.log(data);
                });
                navigate("/", { replace: true });
              });
            }
          });
        })

      }else{
        //alert message
      }
    }
  };

  //actions

  //reducer

  //store -> globalized

  //dispatch

  const signInWithEmailPass = async () =>{
    if (userEmail !== "" && password !== ""){
      await signInWithEmailPass(firebaseAuth, userEmail, password).then(userCred =>{
        firebaseAuth.onAuthStateChanged((cred) => {
          if (cred) {
            cred.getIdToken().then((token) => {
              validateUserJWTToken(token).then((data) => {
                console.log(data);
              });
              navigate("/", { replace: true });
            });
          }
        }); 
      })
    }else{
      //allert message
    }
  }

  return (
    <div className="w-screen relative overflow-hidden flex">
      {/* background image */}
      <img
        src={LoginBg}
        className="w-full h-full object-cover absolute top-0 left-0"
        alt=""
      />
      {/*content box*/}
      <div className="flex flex-col items-center bg-lightOverlay w-[80%] md:w-508 h-full z-10 backdrop-blur-md p-4 px-4 py-12 gap-6"></div>
      {/*top logo section*/}
      <div className="flex items-center justify-start gap-4 w-full">
        <img src={Logo} className="w-8" alt="" />
        <p className="text-headingColor font-semibold text-2xl">
          Nilwala Breeze Hotel
        </p>
      </div>

      {/*welcome text */}
      <p className="text-3xl font-semibold text-headingColor">Welcome Back</p>
      <p className="text-xl  text-textColor -mt-6">
        {isSignUp ? "Sign Up" : "Sign In"} with following
      </p>

      {/* input section */}
      <div className="w-full flex flex-col items-cnter justify-center gap-6 px-4 md:px-12 py-4">
        <LoginInput
          placeHolder={"Email Here"}
          icon={<FaEnvelope class="text-xl text-textColor" />}
          inputState={userEmail}
          inputStateFunc={setuserEmail}
          type="email"
          isSignUp={isSignUp}
        />

        <LoginInput
          placeHolder={"Password Here"}
          icon={<FaLock class="text-xl text-textColor" />}
          inputState={password}
          inputStateFunc={setPassword}
          type="password"
          isSignUp={isSignUp}
        />
        {isSignUp && (
          <LoginInput
            placeHolder={"Confirm Password Here"}
            icon={<FaLock class="text-xl text-textColor" />}
            inputState={confirm_password}
            inputStateFunc={setConfirm_password}
            type="password"
            isSignUp={isSignUp}
          />
        )}

        {!isSignUp ? (
          <p>
            Doesn't have an account:{" "}
            <motion.button
              {...buttonClick}
              className="text-red-400 underline cursor-pointer bg-transparent"
              onClick={() => setIsSignUp(true)}
            >
              Create one
            </motion.button>
          </p>
        ) : (
          <p>
            Already have an account:{" "}
            <motion.button
              {...buttonClick}
              className="text-red-400 underline cursor-pointer bg-transparent"
              onClick={() => setIsSignUp(false)}
            >
              Sign in here
            </motion.button>
          </p>
        )}

        {/*button section*/}
        {isSignUp ? (
          <motion.button
            {...buttonClick}
            onClick={signUpWithEmailPass}
            className="w-full px-4 py-2 rounded-md bg-red-400 cursor-pointer text-xl capitalize hover:bg-red-500 transition-all duration-150"
          >
            Sign Up
          </motion.button>
        ) : (
          <motion.button
            {...buttonClick}
            onClick={signInWithEmailPass}
            className="w-full px-4 py-2 rounded-md bg-red-400 cursor-pointer text-xl capitalize hover:bg-red-500 transition-all duration-150"
           
          >
            Sign in
          </motion.button>
        )}
      </div>

      <div className="flex items-center fustify-between gap-16">
        <div className="w-24 h-[1px] rounded-md bg-white"></div>
        <p className="text-white">or</p>
        <div className="w-24 h-[1px] rounded-md bg-white"></div>
      </div>

      <motion.div
        {...buttonClick}
        className="flex items-center justify-center px-20 py-2 bg-lightoverlay backdrop-blur-md cursor-pointer roundd-3xl gap-4"
        onClick={loginwithGoogle}
      >
        <FcGoogle className="" />
        <p className="capitalize text-base text-headingColor">
          sign in with google
        </p>
      </motion.div>
    </div>
  );
};

export default Login;
