import { Breadcrumbs } from "@mui/material";
import axios from "axios";
import React from "react";
import { useEffect, useState } from "react";
import { BiHome } from "react-icons/bi";
import { Link } from "react-router-dom";
import styled from 'styled-components'
import { url } from "../slices/api";
import toast from "react-hot-toast";
import envelope from "./svg/envelope.svg"

const Klantenservice = () => {
	const [email, setEmail] = useState("");
	const [name, setName] = useState("");
	const [message, setMessage] = useState("");
	const [isOnline, setIsOnline] = useState(true);

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

	const handleSubmit = async () => {
		try {
			await axios({
				method: "post",
				url: `${url}/contact`,
				data: {
					email: email,
					name: name,
					message: message
				}
			})
			.then(() => {
				toast.success("Bericht verzonden")
			})
		} catch (error) {
			console.log(error);
		}
	}

	return (
		<Container style={{"textAlign": "center"}}>
			<div className="breadcrumbs-container singleproduct">
				<Breadcrumbs className="breadcrumbs">
					<Link to="/"><BiHome/></Link>
					<Link to="/klantenservice" className="breadcrumbs-a">Klantenservice</Link>
				</Breadcrumbs>
			</div>
			<div className="contact-text">
				<h1>Klantenservice</h1>
					<p className="kundenservice" to="/kundenservice">
						<div className="kundenservice-wrapper">
							{
								isOnline ? <div className="status"><p>ONLINE</p><span className="pulse grun"></span></div>
								: <div className="status"><p>OFFLINE</p><span className="pulse rot"></span></div>
							}
						</div>
					</p>
				<p>Onze klantenservice is bereikbaar van maandag tot en met zaterdag van 08:00-22:00 uur.</p>
				<br/>
				<p>Whatsapp: <a href="https://wa.me/31687026464">+31 6 87026464</a></p>
				<br/>
				<p>E-Mail: <a href="mailto:rcdriftauto@gmail.com">rcdriftauto@gmail.com</a></p>
				<br/>
				<p>Je kunt ook contact met ons opnemen via onderstaand contactformulier. Wij zullen u per e-mail antwoorden.</p>
			</div>
			<div className="contact-form">
				<div className="contact-wrapper">
					<div className="contact-input">
						<label>E-Mail <b style={{"color": "#dc3545"}}>*</b></label>
						<input type="email" id="email" onChange={(e) => setEmail(e.target.value)} required/>
					</div>
					<div className="contact-input">
						<label>Naam <b style={{"color": "#dc3545"}}>*</b></label>
						<input type="text" id="name" onChange={(e) => setName(e.target.value)} required/>
					</div>
				</div>
				<div className="contact-textarea">
					<label>Bericht <b style={{"color": "#dc3545"}}>*</b></label>
					<textarea rows={6} name="message" id="message" onChange={(e) => setMessage(e.target.value)} required />
				</div>
				<button onClick={() => handleSubmit()} className="contact-button">Versturen</button>
			</div>

		</Container>
	)
}

const Container = styled.div`
	padding: 0 calc((100vw - 1200px) / 2);
`

export default Klantenservice
