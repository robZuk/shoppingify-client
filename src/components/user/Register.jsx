import { useState, useEffect, useRef, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { BsQuestionCircle } from "react-icons/bs";
import { useSelector, useDispatch } from "react-redux";
import { register, reset } from "../../features/auth/authSlice";
import Spinner from "../Spinner";
import ReactTooltip from "react-tooltip";

import Logo from "../../assets/logo.svg";
import { useSpring, useTransition, animated } from "@react-spring/web";
import { AiFillEyeInvisible } from "react-icons/ai";
import { AiFillEye } from "react-icons/ai";
import ConfirmButton from "../atoms/ConfirmButton";

function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const props = useSpring({
    from: { opacity: 0 },
    to: { opacity: 1 },
    config: { duration: 700 },
  });

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { user, isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.auth
  );

  const passwordRef = useRef();
  const passwordConfirmRef = useRef();

  const validatePassword = useCallback(() => {
    if (password !== password2) {
      passwordRef.current.setCustomValidity("password do not match");
      passwordConfirmRef.current.setCustomValidity("password do not match");
    } else {
      passwordRef.current.setCustomValidity("");
      passwordConfirmRef.current.setCustomValidity("");
    }
  }, [password, password2]);

  useEffect(() => {
    if (isError) {
      toast.error(message, {
        toastId: "error1",
        position: "top-center",
        theme: "colored",
      });
    }

    showPassword
      ? (passwordRef.current.type = "text")
      : (passwordRef.current.type = "password");

    showConfirmPassword
      ? (passwordConfirmRef.current.type = "text")
      : (passwordConfirmRef.current.type = "password");

    // Redirect when logged in
    isSuccess && user && navigate("/");
    validatePassword();
    // setIsVisible(true);

    dispatch(reset());
  }, [
    isError,
    isSuccess,
    user,
    message,
    navigate,
    dispatch,
    showPassword,
    showConfirmPassword,
    validatePassword,
  ]);

  const onSubmit = (e) => {
    e.preventDefault();
    const userData = {
      name,
      email,
      password,
    };
    password === password2 && dispatch(register(userData));
  };

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <div className="modal-user-container">
      <animated.div style={props}>
        <div className="modal-user">
          <div className="modal-user-left">
            <div className="modal-user-left-header">
              <img src={Logo} alt="logo" />
              <p>
                <span className="first-word">Shoppingify</span> allows you take
                your shopping list wherever you go
              </p>
            </div>
            <p className="modal-user-left-title">Create New Account</p>

            <form onSubmit={onSubmit}>
              <input
                type="text"
                id="name"
                name="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter your name"
                required
                minLength={3}
                maxLength={12}
              />

              <input
                type="email"
                id="email"
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                required
              />

              <input
                ref={passwordRef}
                type="password"
                id="password"
                name="password"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
                placeholder="Enter password"
                required
              />

              <AiFillEye
                className="modal-user-left-eye-icon-register"
                style={{
                  display: `${showPassword ? "none" : "block"}`,
                }}
                onClick={() => {
                  setShowPassword(true);
                }}
              />
              <AiFillEyeInvisible
                className="modal-user-left-eye-icon-register"
                style={{
                  display: `${showPassword ? "block" : "none"}`,
                }}
                onClick={() => {
                  setShowPassword(false);
                }}
              />

              <input
                ref={passwordConfirmRef}
                type="password"
                id="password2"
                name="password2"
                value={password2}
                onChange={(e) => {
                  setPassword2(e.target.value);
                }}
                placeholder="Confirm password"
                required
              />
              <AiFillEye
                className="modal-user-left-eye-icon-register-second"
                style={{
                  display: `${showConfirmPassword ? "none" : "block"}`,
                }}
                onClick={() => {
                  setShowConfirmPassword(true);
                }}
              />
              <AiFillEyeInvisible
                className="modal-user-left-eye-icon-register-second"
                style={{
                  display: `${showConfirmPassword ? "block" : "none"}`,
                }}
                onClick={() => {
                  setShowConfirmPassword(false);
                }}
              />
              <ConfirmButton text="Register" />
            </form>
          </div>
          <div className="modal-user-right">
            <p className="modal-user-right-title">Already have an account ?</p>
            <p className="modal-user-right-description">
              Sign Up and discover a great amount of new opportunities!
            </p>
            <button
              onClick={() => {
                navigate("/login");
              }}
            >
              Login
            </button>
          </div>
        </div>
      </animated.div>
      <ReactTooltip
        backgroundColor="#454545"
        effect="solid"
        place="right"
        padding="0px 8px 1px 8px"
        offset={{ right: 20 }}
        arrowRadius="2"
      />
    </div>
  );
}

export default Register;
