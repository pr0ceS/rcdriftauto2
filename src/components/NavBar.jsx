import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import styled from "styled-components";
import React, { useEffect, useRef, useState } from "react";
import logo from "./assets/Logo2.png";
import { animateScroll, scroller as scroll } from "react-scroll";
import { Rating } from "@mui/material";
import klarna from "./assets/Klarna.png"

const NavBar = () => {
  const dispatch = useDispatch();
	const [show, setShow] = useState(false);
	const [isOnline, setIsOnline] = useState(true);
	const [scrollPosition, setScrollPosition] = useState(0);
  const { cartTotalQuantity } = useSelector((state) => state.cart);
  const auth = useSelector((state) => state.auth);
	const userId = useSelector((state) => state.auth._id); 

	const scrollToTop = () => {
		animateScroll.scrollToTop({duration: 200});
	}

	const handleScroll = () => {
		const position = window.pageYOffset;
		setScrollPosition(position);
	};

	useEffect(() => {
    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
			window.removeEventListener('scroll', handleScroll);
    };
	}, []);

	const showDropdown = () => {
		setShow(!show);
	}

	const ref = useRef(null);

	useEffect(() => {
		const checkSupportStatus = () => {
			const supportOpen = 8 * 60;
			const supportClosed = 22 * 60;
			let now = new Date();
			let currentTime = now.getHours() * 60 + now.getMinutes();
			let dayOfWeek = now.getDay();

			if(currentTime > supportOpen && currentTime < supportClosed) {
				if(dayOfWeek === 0) {
					setIsOnline(false);
				}
				else {
					setIsOnline(true);
				}
			} else {
				setIsOnline(false);
			}
		}

		checkSupportStatus();
	}, [])

	// useEffect(() => {
	// 	let texts = ref?.current?.children;
	// 	let prev = null;
	// 	const loopText = (curr, currIndex) => {
	// 		let index = (currIndex + 1) % texts.length;
	// 		setTimeout(() => {
	// 			if(prev) {
	// 				prev.className = "";
	// 			}
	// 			curr.className = "show";
	// 			prev = curr;
	// 			loopText(texts[index], index)	
	// 		}, 5000)
	// 	}

	// 	loopText(texts[0], 0);
	// }, [])

	// const [time, setTime] = useState(() => {
  //   const storedCountdown = sessionStorage.getItem('countdownDuration');
  //   return storedCountdown ? parseInt(storedCountdown) : 900; // 900 seconds = 15 minutes
  // });

  // useEffect(() => {
  //   const countdown = setInterval(() => {
  //     setTime((prevTime) => {
  //       if (prevTime === 0) {
  //         return 500; // Restart at 5 minutes if reached 00:00
  //       } else {
  //         return prevTime - 1; // Decrement the time by 1 second
  //       }
  //     });
  //   }, 1000);

  //   return () => clearInterval(countdown); // Clear interval on component unmount
  // }, [time]);

  // const minutes = Math.floor(time / 60);
  // const seconds = time % 60; 

	const initialTime = 15 * 60; // 15 minutes in seconds
  const [seconds, setSeconds] = useState(initialTime);

  useEffect(() => {
    const broadcastChannel = new BroadcastChannel('countdown_channel');

    const interval = setInterval(() => {
      if (seconds > 0) {
        setSeconds((prevSeconds) => prevSeconds - 1);
      } else {
        // Add 15 minutes when the countdown reaches 00:00
        setSeconds(initialTime);
      }
    }, 1000);

    // Update localStorage and broadcast the countdown value
    const updateCountdown = () => {
      localStorage.setItem('countdown', seconds.toString());
      broadcastChannel.postMessage(seconds.toString());
    };

    // Listen for countdown value changes from other tabs or windows
    broadcastChannel.onmessage = (event) => {
      const receivedSeconds = parseInt(event.data, 10);
      setSeconds(receivedSeconds);
    };

    updateCountdown(); // Initial update

    const cleanup = () => {
      clearInterval(interval);
      broadcastChannel.close();
    };

    return cleanup;
  }, [seconds, initialTime]);

  // Format the countdown as MM:SS
  const formatCountdown = () => {
    const minutes = Math.floor(seconds / 60).toString().padStart(2, '0');
    const remainingSeconds = (seconds % 60).toString().padStart(2, '0');
    return `${minutes}:${remainingSeconds}`;
  };

  return (
		<>
		{/* MOBILE NAVBAR */}
		<nav className="mobile-bar">
			{
				show ? (
					<button onClick={() => showDropdown()}><svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg></button>
					) : (
						<button onClick={() => showDropdown()}><svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="3" y1="12" x2="21" y2="12"></line><line x1="3" y1="6" x2="21" y2="6"></line><line x1="3" y1="18" x2="21" y2="18"></line></svg></button>
				)
			}
			<Link to="/">
        <img className="logo" src={logo} alt="RCDriftAuto.nl" />
      </Link>
			<div className="mobile-standard">
			<Link to="/winkelwagen">
        <div className="nav-bag">
				<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"></path><line x1="3" y1="6" x2="21" y2="6"></line><path d="M16 10a4 4 0 0 1-8 0"></path></svg>
          <span className="bag-quantity">
            <span>{cartTotalQuantity}</span>
          </span>
        </div>
      </Link>
			</div>
		</nav>
		<div className={`mobile-links ${show ? "show" : null}`}>
			{auth._id ? (
				<MobileLinks>
					<Link onClick={() => showDropdown()} to="/">
						Home
					</Link>
					<Link onClick={() => showDropdown()} to="/autos">
						RCDriftAuto™ Garage
					</Link>
					{userId && (
						<Link onClick={() => showDropdown()} to="/bestellingen">Bestellingen</Link>
					)}
					{userId ? (
					<Link onClick={() => showDropdown()} to={"/account/" + userId}>
						Mijn Account
					</Link>
					) : (
					<Link onClick={() => showDropdown()} to={"/inloggen"}>
						Inloggen
					</Link>
					)}
					<Link onClick={() => showDropdown()} to="/klantenservice">
						Klantenservice
					</Link>
					{auth.isAdmin ? (
							<Link onClick={() => showDropdown()} to="/admin/summary">Admin</Link>
					) : ""}
					{/* <div
						onClick={() => {
							dispatch(logoutUser(null));
						}}
					>
						Logout
					</div> */}
				</MobileLinks>
			) : (
				<MobileAuthLinks>
					<Link onClick={() => showDropdown()} to="/">
						Home
					</Link>
					<Link onClick={() => showDropdown()} to="/autos">
						RCDriftAuto™ Garage
					</Link>
					<Link onClick={() => showDropdown()} to={"/inloggen"}>
						Inloggen
					</Link>
					<Link onClick={() => showDropdown()} to="/klantenservice">
						Klantenservice
					</Link>
				</MobileAuthLinks>
			)}
		</div>

		{/* PC NAVBAR */}
		<nav className="info-bar">
			<p>Koop 2, krijg 10% korting</p><b className="info-divider"> | </b><p>Gratis Verzendkosten</p> 
		</nav>
    <nav className="nav-bar">
			<div className="nav-bar-bovenkant">
				<p>Shop nu. Betaal later. <img src={klarna} alt="Klarna" width="50px" style={{marginLeft: "8px"}}/></p>
				<div className="nav-bar-bovenkant-links">
					{userId ? (
					<Link to={"/account/" + userId}>
						Mijn Account
					</Link>
					) : (
					<Link to={"/inloggen"}>
						Mijn Account
					</Link>
					)}
					<Link to="/klantenservice">Klantenservice</Link>
				</div>
			</div>
			<div className="nav-bar-onderkant">
				<Link to="/">
        	<img className="logo" src={logo} alt="ErgotronKaufen.de" />
				</Link>
				<div>
					<Link className="kundenservice" to="/klantenservice">
						<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M448 64H64C28.65 64 0 92.65 0 128v256c0 35.35 28.65 64 64 64h384c35.35 0 64-28.65 64-64V128C512 92.65 483.3 64 448 64zM64 112h384c8.822 0 16 7.178 16 16v22.16l-166.8 138.1c-23.19 19.28-59.34 19.27-82.47 .0156L48 150.2V128C48 119.2 55.18 112 64 112zM448 400H64c-8.822 0-16-7.178-16-16V212.7l136.1 113.4C204.3 342.8 229.8 352 256 352s51.75-9.188 71.97-25.98L464 212.7V384C464 392.8 456.8 400 448 400z"/></svg>
						<div className="kundenservice-wrapper">
							<p className="kundenservice-titel">KLANTENSERVICE:</p>
							{
								isOnline ? <div className="status"><p>ONLINE</p><span className="pulse grun"></span></div>
								: <div className="status"><p>OFFLINE</p><span className="pulse rot"></span></div>
							}
						</div>
					</Link>
					<Link className="warenkorb" to="/winkelwagen">
						<div className="nav-bag">
							<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512"><path d="M175.1 416c-26.51 0-47.1 21.49-47.1 48S149.5 512 175.1 512s47.1-21.49 47.1-48S202.5 416 175.1 416zM463.1 416c-26.51 0-47.1 21.49-47.1 48s21.49 48 47.1 48s47.1-21.49 47.1-48S490.5 416 463.1 416zM569.5 44.73c-6.109-8.094-15.42-12.73-25.56-12.73H121.1L119.6 19.51C117.4 8.189 107.5 0 96 0H23.1C10.75 0 0 10.74 0 23.1C0 37.25 10.75 48 23.1 48h52.14l60.28 316.5C138.6 375.8 148.5 384 160 384H488c13.25 0 24-10.75 24-23.1C512 346.7 501.3 336 488 336H179.9L170.7 288h318.4c14.28 0 26.84-9.479 30.77-23.21l54.86-191.1C577.5 63.05 575.6 52.83 569.5 44.73zM477 240H161.6l-30.47-160h391.7L477 240z"/></svg>
							<span className="bag-quantity">
								<span>{cartTotalQuantity}</span>
							</span>
							<p>Winkelwagen</p>
						</div>
					</Link>
				</div>
			</div>
    </nav>
		<nav className="link-bar">
			{auth._id ? (
				<div>
					<Link to="/">
						Home
					</Link>
					<Link to="/autos">
						RCDriftAuto™ Garage
					</Link>
					{userId && (
						<Link to="/bestellingen">Bestellingen</Link>
					)}
					{auth.isAdmin ? (
							<Link to="/admin/summary">Admin</Link>
					) : null}
					{/* <a style={{cursor: "pointer"}}
						onClick={() => {
							dispatch(logoutUser(null));
							window.location = "/";
						}}
					>
						Logout
					</a> */}
				</div>
			) : (
				<div>
					<Link to="/">
						Home
					</Link>
					<Link to="/autos">
						RCDriftAuto™ Garage
					</Link>
				</div>
			)}
		</nav>

		{/* Scroll NAVBAR */}
		<div className={`scroll-bar ${scrollPosition > 175 ? "scroll-bar-show" : null}`}>
			<Link to="/">
				<img className="logoscroll" src={logo} alt="RCDriftAuto.nl" />
      </Link>
			{auth._id ? (
				<div>
					<Link to="/">
						Home
					</Link>
					<Link to="/autos">
						RCDriftAuto™ Garage
					</Link>
					{userId && (
						<Link to="/bestellingen">Bestellingen</Link>
					)}
					{auth.isAdmin ? (
							<Link to="/admin/summary">Admin</Link>
					) : null}
					{/* <a style={{cursor: "pointer"}}
						onClick={() => {
							dispatch(logoutUser(null));
							window.location = "/";
						}}
					>
						Logout
					</a> */}
				</div>
			) : (
				<div>
					<Link to="/">
						Home
					</Link>
					<Link to="/autos">
						RCDriftAuto™ Garage
					</Link>
				</div>
			)}
			<Link className="warenkorb" to="/winkelwagen">
				<div className="nav-bag">
					<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512"><path d="M175.1 416c-26.51 0-47.1 21.49-47.1 48S149.5 512 175.1 512s47.1-21.49 47.1-48S202.5 416 175.1 416zM463.1 416c-26.51 0-47.1 21.49-47.1 48s21.49 48 47.1 48s47.1-21.49 47.1-48S490.5 416 463.1 416zM569.5 44.73c-6.109-8.094-15.42-12.73-25.56-12.73H121.1L119.6 19.51C117.4 8.189 107.5 0 96 0H23.1C10.75 0 0 10.74 0 23.1C0 37.25 10.75 48 23.1 48h52.14l60.28 316.5C138.6 375.8 148.5 384 160 384H488c13.25 0 24-10.75 24-23.1C512 346.7 501.3 336 488 336H179.9L170.7 288h318.4c14.28 0 26.84-9.479 30.77-23.21l54.86-191.1C577.5 63.05 575.6 52.83 569.5 44.73zM477 240H161.6l-30.47-160h391.7L477 240z"/></svg>
					<span className="bag-quantity">
						<span>{cartTotalQuantity}</span>
					</span>
					<p>Winkelwagen</p>
				</div>
			</Link>
		</div>
		{/* <div onClick={() => scrollToTop()} className={`scrollToTop ${scrollPosition > 175 ? "scroll-bar-show" : null}`}>
				<img src={angleUp} alt="Angle Up" />
			</div> */}
		</>
  );
};

export default NavBar;

const AuthLinks = styled.div`
  a {
		margin-left: 1.5rem;
		
		&:last-child {
			margin-right: 40px;
		}
  }
`;

const Links = styled.div`
	color: black;
	display: flex;
	justify-content: center;

	div {
		cursor: pointer;
		margin-left: 1.5rem;
		margin-right: 20px;
	}

  a {
		margin-left: 1rem;
	}
`;

const MobileAuthLinks = styled.div`
	display: flex;
	flex-direction: column;
`

const MobileLinks = styled.div`
	display: flex;
	flex-direction: column;

	div {
		color: #202020;
		font-size: 1.5rem;
		padding: 20px 0;
		text-decoration: none;
	}
`
