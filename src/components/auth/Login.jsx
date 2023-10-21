import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../../slices/authSlice";
import { Link, useNavigate } from "react-router-dom";
import { StyledForm } from "./StyledForm";
import { toast } from "react-hot-toast";
import { tableSortLabelClasses } from "@mui/material";

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);

  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  useEffect(() => {
    if (auth._id) {
      navigate("/winkelwagen");
    }
  }, [auth._id, navigate]);

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
  
      dispatch(loginUser(user));
    } catch (error) {
      toast.error("E-mail en/of wachtwoord zijn onjuist");
    }
  };

  useEffect(() => {
    if(auth.loginStatus === "rejected") {
      toast.error(auth.loginError);
    }
  }, [auth.loginStatus])


  return (
    <>
      <StyledForm onSubmit={handleSubmit}>
        <h1>Inloggen bij uw account </h1>
        <p>
          Of <Link to="/registreren">Registreren</Link>
        </p>
        <div>
          <label>E-mail</label>
          <input
            type="email"
            onChange={(e) => setUser({ ...user, email: e.target.value })}
          />
        </div>
        <div>
          <label>Wachtwoord</label>
          <input
            type="password"
            onChange={(e) => setUser({ ...user, password: e.target.value })}
          />
        </div>
        <button onClick={(e) => handleSubmit(e)}>
          Inloggen
        </button>
      </StyledForm>
    </>
  );
};

export default Login;
