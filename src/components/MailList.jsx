import axios from 'axios';
import React, {useState} from 'react'
import { toast } from 'react-hot-toast';
import { url } from '../slices/api';

const MailList = () => {
	const [mail, setMail] = useState("");

	const handleMailSubmit = () => {
		const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
		const isValidEmail = emailRegex.test(mail)
		if (!mail) {
			toast.error("Voer uw e-mailadres in")
		} else if (mail.length > 100) {
			toast.error("Uw e-mail heeft de tekenlimiet overschreden")
		} else if(isValidEmail) {
			axios({
				method: "post",
				url: `${url}/mail`,
				headers: {},
				data: {
					email: mail
				}
			})
			.then(() => toast.success("Geabonneerd"))
		}
		else {
			toast.error("E-mailadres is ongeldig")
		}
	}

	return 	(
		<section className="mail-list">
			<h1>Abonneer u op onze mailinglijst</h1>
			<div>
				<input onChange={(e) => setMail(e.target.value)} placeholder="Email" type="text" required/>
				<button onClick={() => handleMailSubmit()}>Abonneren</button>
			</div>
		</section>
	)
}
	
export default MailList