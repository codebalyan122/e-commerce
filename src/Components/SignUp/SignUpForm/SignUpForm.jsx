import { useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useNavigate } from "react-router-dom";
import { googleIcon } from "src/Assets/Images/Images";
import { newSignUp, setLoginData } from "src/Features/userSlice";
import { simpleValidationCheck } from "src/Functions/componentsFunctions";
import {
  compareDataToObjValue,
  getUniqueArrayByObjectKey,
} from "src/Functions/helper";
import { jwtDecode } from "jwt-decode";
// import { openSignWithGooglePopUp } from "../SignUpWithGoogle/SignUpWithGooglePopup";
import s from "./SignUpForm.module.scss";
import { useGoogleLogin } from "@react-oauth/google";
import axios from "axios";

const SignUpForm = () => {
  const login = useGoogleLogin({
    onSuccess: async (response) => {
      console.log(response);

      try {
        const res = await axios.get(
          "https://www.googleapis.com/oauth2/v3/userinfo",
          {
            headers: {
              Authorization: `Bearer ${response.access_token}`,
            },
          }
        );
        console.log(res);
        dispatch(setLoginData(res));
        navigateTo("/");
      } catch (error) {
        console.log(error);
      }
    },
  });

  const dispatch = useDispatch();
  const navigateTo = useNavigate();
  const { signedUpUsers } = useSelector((state) => state.user);
  const username = useRef("");
  const emailOrPhone = useRef("");
  const password = useRef("");
  // let isSignUpWithGooglePressed = false;

  function signUp(e) {
    e.preventDefault();
    const inputs = e.target.querySelectorAll("input");
    // console.log(inputs);
    const formDataObj = new FormData();

    const formData = {};

    // Set keys and values from formDataObj to formData
    for (let pair of formDataObj.entries()) formData[pair[0]] = pair[1];

    const isFormValid = simpleValidationCheck(inputs);
    console.log(isFormValid);
    if (isFormValid) {
      const isUserAlreadySignedUp = compareDataToObjValue(
        signedUpUsers,
        formData,
        "emailOrPhone"
      );
      console.log(isFormValid);
      if (isUserAlreadySignedUp) {
        navigateTo("/");
      }

      const uniqueSignedUpUsers = getUniqueArrayByObjectKey({
        arr: signedUpUsers,
        newArr: [formData],
        key: "emailOrPhone",
      });

      dispatch(newSignUp(uniqueSignedUpUsers));
      setLoginData(formData);
      navigateTo("/", { replace: true });
    }
  }

  // function handleSignUpWithGoogle() {
  //   if (isSignUpWithGooglePressed) return;
  //   isSignUpWithGooglePressed = true;

  //   openSignWithGooglePopUp();
  //   setDefaultSignUpData();
  // }

  // function setDefaultSignUpData() {
  //   const defaultLoginData = {
  //     username: "Lily Watson",
  //     emailOrPhone: "lily.wastons@gmail.com",
  //     password: "random-password1234",
  //     isSignIn: true,
  //   };

  //   setTimeout(() => {
  //     navigateTo("/");
  //     isSignUpWithGooglePressed = false;

  //     setTimeout(() => dispatch(setLoginData(defaultLoginData)), 500);
  //   }, 2500);
  // }
  // const onSuccess = (res) => {
  //   console.log("Login Success: currentUser:", res.profileObj);
  //   // Handle the successful login response
  // };
  // const onFailure = (res) => {
  //   console.log("Login failed: res:", res);
  //   // Handle the login failure
  // };

  return (
    <form action="GET" className={s.form} onSubmit={signUp}>
      <h2>Create an account</h2>
      <p>Enter your details below</p>

      <div className={s.inputs}>
        <input
          type="text"
          name="username"
          placeholder="Full Name"
          onChange={(e) => (username.current = e.target.value)}
          required
        />
        <input
          type="text"
          name="emailOrPhone"
          placeholder="Email or Phone Number"
          onChange={(e) => (emailOrPhone.current = e.target.value)}
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          onChange={(e) => (password.current = e.target.value)}
          required
        />
      </div>

      <div className={s.buttons}>
        <button type="submit" className={s.createAccBtn}>
          Create Account
        </button>

        <button type="button" className={s.signUpBtn} onClick={login}>
          {/* <GoogleLogin
          onSuccess={(credentialResponse) => {
            console.log(credentialResponse);
          }}
          onError={() => {
            console.log("Login Failed");
          }}
          useOneTap
        /> */}

          <img src={googleIcon} alt="Colored Google icon" />
          <span>Sign up with Google</span>
        </button>
        <p>
          <span>Already have account?</span>
          <NavLink to="/login">Log in</NavLink>
        </p>
      </div>
    </form>
  );
};
export default SignUpForm;
