import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { registerUser } from "../../slices/authSlice";
import { StyledForm } from "./StyledForm";
import { toast } from "react-hot-toast";
import PhoneInput from "react-phone-number-input/input"
import FadeIn from "react-fade-in";

const Register = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const auth = useSelector((state) => state.auth);

  const [toggleSwitch, setToggleSwitch] = useState(false);

  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    isCompany: false,
    straat: "",
    huisnummer: "",
    postcode: "",
    stad: "",
    UST: "",
    phoneNumber: "+31",
  });

  useEffect(() => {
    if (auth._id) {
      navigate("/winkelwagen");
    }
  }, [auth._id, navigate]);

  // {auth.registerStatus === "rejected" ? (
  //   <p>{auth.registerError}</p>
  // ) : null}

  useEffect(() => {
    if(auth.registerStatus === "rejected") {
      toast.error(auth.registerError);
    }
  }, [auth.registerStatus])

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if(user.confirmPassword === user.password) {
      dispatch(registerUser(user));
    } else {
      toast.error("Wachtwoorden komen niet overeen")
    }
  };


  const handleSwitch = () => {
    if(user.isCompany) {
      user.isCompany = false;
      setToggleSwitch(false);
    } else {
      user.isCompany = true;
      setToggleSwitch(true);
    }
  }

  return (
    <StyledForm>
      <div onSubmit={handleSubmit}>
        <h1>Account Registreren</h1>
        <p>
          Of <Link to="/inloggen">Inloggen</Link>
        </p>
        <div>
          <label>Volledige Naam</label>
          <input
            type="text"
            onChange={(e) => setUser({ ...user, name: e.target.value })}
          />
        </div>
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
        <div>
          <label>Wachtwoord Herhalen</label>
          <input
            type="password"
            onChange={(e) => setUser({ ...user, confirmPassword: e.target.value })}
          />
        </div>
        <span className="form-border"></span>
        <div>
          <label>Bent u een Bedrijf?</label>
          <div className="switch" onClick={() => handleSwitch()}>
            <span className={`slider ${toggleSwitch ? "showSwitch" : ""}`}></span>
          </div>
        </div>
        {toggleSwitch && 
          <section className="companyInformation">
            <FadeIn>
              <div>
                <label>Straatnaam</label>
                <input onChange={(e) => setUser({ ...user, straat: e.target.value})} type="text" />
              </div>
              <div>
                <label>Huisnummer</label>
                <input onChange={(e) => setUser({ ...user, huisnummer: e.target.value})} type="text" />
              </div>
              <div>
                <label>Postcode</label>
                <input onChange={(e) => setUser({ ...user, postcode: e.target.value})} type="text" />
              </div>
              <div>
                <label>Stad</label>
                <input onChange={(e) => setUser({ ...user, stad: e.target.value})} type="text" />
              </div>
              <div>
                <label>KVK</label>
                <input onChange={(e) => setUser({ ...user, UST: e.target.value })} value={user.UST} type="text" />
              </div>
              <div>
                <label>Telefoonnummer</label>
                <input onChange={(e) => setUser({ ...user, phoneNumber: e.target.value})} value={user.phoneNumber} type="text" />
              </div>
            </FadeIn>
          </section>
        }
        <button onClick={(e) => handleSubmit(e)}>
          {auth.registerStatus === "pending" ? "Laden..." : "Registreren"}
        </button>
      </div>
    </StyledForm>
  );
};

export default Register;
