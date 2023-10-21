import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useParams } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import { setHeaders, url } from "../../slices/api";
import { useDispatch } from "react-redux";
import { logoutUser } from "../../slices/authSlice";
import userImg from "../assets/user.jpg";
import moment from "moment";
import 'moment/locale/nl';
import FadeIn from "react-fade-in/lib/FadeIn";
moment.locale('nl');

const UserProfile = () => {
  const params = useParams();
  const dispatch = useDispatch();

  const [toggleSwitch, setToggleSwitch] = useState(false);
  const [repeatPassword, setRepeatPassword] = useState("")
  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
    isCompany: false,
		company: "",
    straat: "",
    huisnummer: "",
    postcode: "",
    stad: "",
    UST: "",
    phoneNumber: "",
    updatedAt: "",
    createdAt: "",
  });

  const [loading, setLoading] = useState(false);
  const [updating, setUpdating] = useState(false);

  const fetchUser = async () => {
    try {
      setLoading(true);
      const res = await axios.get(
        `${url}/users/find/${params.id}`,
        setHeaders()
      );
      setUser(res.data);
      setLoading(false);
    } catch (err) {
      console.log(err);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUser();
  }, [params.id]);

  const handleSubmit = async () => {
    try {
      setUpdating(true);
      if (user.password && repeatPassword) {
        if (user.password === repeatPassword) {
          const res = await axios.put(
            `${url}/users/${params.id}`,
            {
              ...user,
            },
            setHeaders()
          );
          setUser(res.data);
          setUpdating(false);
          fetchUser();
        } else {
          setUpdating(false);
          toast.error("Wachtwoorden komen niet overeen")
        }
      } else {
        const res = await axios.put(
          `${url}/users/${params.id}`,
          {
            ...user,
          },
          setHeaders()
        );
        setUser(res.data);
        setUpdating(false);
        toast.success("Account is bijgewerkt")
        fetchUser();
      }

    } catch (err) {
      console.log(err);
      setUpdating(false);
    }
  };

  const handleSwitch = async () => {
    if(user.isCompany === true) {
      setUser({ ...user, isCompany: false})
			const res = await axios.put(
				`${url}/users/${params.id}`,
          {
            ...user, isCompany: false
          },
          setHeaders()
			)

			if(res.data) {
				fetchUser();
        setUpdating(false);
			}
			// HandleSwitch
    } else if (user.isCompany === false) {
      setUser({ ...user, isCompany: true})
			const res = await axios.put(
				`${url}/users/${params.id}`,
          {
            ...user, isCompany: true
          },
          setHeaders()
			)

			if(res.data) {
				fetchUser();
        setUpdating(false);
			}
    }
  }

  return (
    <section className="profile">
      <div className="profile-info">
        <img src={userImg} alt="Profile Picture" />
        <div>
          {/* Datum der letzten Änderung */}
          <p>Laatst bewerkt op:</p>        
          <p>{moment(user.updatedAt).locale('nl').format('LLL')}</p>
        </div>
        <div>
          <p>Account aangemaakt op:</p>        
          <p>{moment(user.createdAt).locale('nl').format('LL')}</p>
        </div>
        <button onClick={() => {dispatch(logoutUser(null));window.location = "/";}}  className="uitloggen">Uitloggen</button>
      </div>
      <div className="profile-edit">
        <div className="password">
          <div>
            <label>Nieuw Wachtwoord</label>
            <input type="password" value={user.password} onChange={(e) => setUser({ ...user, password: e.target.value })} />
          </div>
          <div>
            <label>Herhaal Wachtwoord</label>
            <input type="password" onChange={(e) => setRepeatPassword(e.target.value)} />
          </div>
        </div>
        <div>
          <label>Volledige Naam</label>
          <input type="text" value={user.name} onChange={(e) => setUser({ ...user, name: e.target.value })} required/>
        </div>
        <div>
          <label>E-Mail</label>
          <input type="text" value={user.email} onChange={(e) => setUser({ ...user, email: e.target.value })} required/>
        </div>
        <div className="firma">
          <label>Bent u een bedrijf?</label>
          <div className="switch" onClick={() => handleSwitch()}>
            <span className={`slider ${user.isCompany ? "showSwitch" : ""}`}></span>
          </div>
        </div>
        {user.isCompany && 
          <section className="companyInformation">
            <FadeIn>
							<div>
                <label>Bedrijfsnaam</label>
                <input type="text" value={user.company} onChange={(e) => setUser({ ...user, company: e.target.value })}/>
              </div>
              <div>
                <label>Straatnaam</label>
                <input type="text" value={user.straat} onChange={(e) => setUser({ ...user, straat: e.target.value })}/>
              </div>
              <div>
                <label>Huisnummer</label>
                <input type="text" value={user.huisnummer} onChange={(e) => setUser({ ...user, huisnummer: e.target.value })}/>
              </div>
              <div>
                <label>Postcode</label>
                <input type="text" value={user.postcode} onChange={(e) => setUser({ ...user, postcode: e.target.value })}/>
              </div>
              <div>
                <label>Stad</label>
                <input type="text" value={user.stad} onChange={(e) => setUser({ ...user, stad: e.target.value })}/>
              </div>
              <div>
                <label>KVK</label>
                <input type="text" value={user.UST} onChange={(e) => setUser({ ...user, UST: e.target.value })}/>
              </div>
              <div>
                <label>Telefoonnummer</label>
                <input type="text" value={user.phoneNumber} onChange={(e) => setUser({ ...user, phoneNumber: e.target.value })}/>
              </div>
            </FadeIn>
          </section>
        }
        <button onClick={() => handleSubmit()}>{updating ? "Updaten..." : "Update"}</button>
      </div>
    </section>
  );

  // return (
  //   <StyledProfile>
  //     <ProfileContainer>
  //       {loading ? (
  //         <p></p>
  //       ) : (
  //         <form onSubmit={handleSubmit}>
  //           <h3>User profile</h3>
	// 					<div>
	// 						<label htmlFor="name">Name:</label>
	// 						<input
	// 							type="text"
	// 							id="name"
	// 							value={user.name}
	// 							onChange={(e) => setUser({ ...user, name: e.target.value })}
	// 							required
	// 						/>
	// 						<label htmlFor="email">E-mail:</label>
	// 						<input
	// 							type="text"
	// 							id="email"
	// 							value={user.email}
	// 							onChange={(e) => setUser({ ...user, email: e.target.value })}
	// 							required
	// 						/>
	// 						<label htmlFor="password">New Password:</label>
	// 						<input
	// 							type="text"
	// 							value={user.password}
	// 							id="password"
	// 							onChange={(e) => setUser({ ...user, password: e.target.value })}
	// 							required
	// 						/>
	// 						<label htmlFor="password">Repeat Password:</label>
	// 						<input
	// 							type="text"
	// 							value={user.password}
	// 							id="password"
	// 							onChange={(e) => setUser({ ...user, password: e.target.value })}
	// 							required
	// 						/>
	// 					</div>
            // <button>{updating ? "Updating..." : "Update"}</button>
            // <button onClick={() => {dispatch(logoutUser(null));window.location = "/";}}  className="uitloggen">Logout</button>
  //         </form>
  //       )}
  //     </ProfileContainer>
  //   </StyledProfile>
  // );
};

export default UserProfile;

const StyledProfile = styled.div`
  margin: 3rem;
  display: flex;
  justify-content: center;
`;

const ProfileContainer = styled.div`
  max-width: 400px;
  width: 100%;
  height: auto;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 30px;

  form {
    display: flex;
    flex-direction: column;
    align-items: flex-start;

    button {
      margin-top: 10px;
    }

    .uitloggen {
      background: crimson;
      width: 100%;
    }

    h3 {
      margin-bottom: 0.5rem;
    }

    label {
      margin-bottom: 0.2rem;
			font-size: 15px;
      color: gray;
    }
    input {
      margin-bottom: 1rem;
      border-bottom: 1px solid gray;
      width: 100%;
			padding: 7px 8px;
			font-size: 1.2rem;
			border: 1px solid #d4d4d4;
			border-radius: 5px;
			margin-bottom: 5px;
			&:focus {
				border-color: white;
				outline: 2px solid var(--action);
			}
    }
  }
`;

const Admin = styled.div`
  color: rgb(253, 181, 40);
  background: rgb(253, 181, 40, 0.12);
  padding: 3px 5px;
  border-radius: 3px;
  font-size: 14px;
  margin-bottom: 1rem;
`;
const Customer = styled.div`
  color: rgb(38, 198, 249);
  background-color: rgb(38, 198, 249, 0.12);
  padding: 3px 5px;
  border-radius: 3px;
  font-size: 14px;
  margin-bottom: 1rem;
`;
