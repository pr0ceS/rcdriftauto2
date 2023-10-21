import React from 'react';
import { Link } from "react-router-dom";

const Retourbeleid = () => {
	return (
		<div className="beleid">
			<h1>Retour Beleid</h1>
			<div className="regel">
				<h3>§1 Herroepingsrecht</h3>
				<p>
				Je kunt aangekochte producten binnen 14 dagen na aankoop zonder opgaaf van reden retourneren en je geld terugkrijgen.
				<br/>
				<br/>
				Als u uw geld terug wilt, neem dan contact met ons op via <Link to="/klantenservice">Klantenservice</Link>.
				<br/>
				<br/>
				</p>
			</div>
			<div className='regel'>
				<h3>§2 Defect product</h3>
				<p>
					Ons retourbeleid biedt een volledige terugbetaling of productruil als het product defect is.
					<br/>
					<br/>
					Als je een defect product hebt ontvangen, neem dan contact met ons op via de <Link to="/klantenservice">Klantenservice</Link>.
					<br/>
					<br/>
					Als we hebben vastgesteld dat het product defect is geleverd, bieden we je een volledige terugbetaling of vervanging van het product aan.
					<br/>
					<br/>
					De terugbetaling wordt gedaan via de betalingsmethode die je hebt gebruikt om te betalen.
				</p>
			</div>
			<br/>
			<div className='regel'>
				<h3>§3 Schade door persoonlijk gebruik</h3>
				<p>
					We begrijpen dat producten soms beschadigd kunnen raken door eigen gebruik.
					<br/>
					<br/>
					We proberen een oplossing te vinden, maar behouden ons het recht voor om retourzendingen te weigeren als we vaststellen dat het probleem is veroorzaakt door ons eigen gebruik.
					<br/>
					<br/>
					We hopen dat dit beleid ertoe bijdraagt dat onze klanten tevreden en gelukkig zijn. Als je nog vragen hebt, aarzel dan niet om contact met ons op te nemen via de <Link to="/klantenservice">Klantenservice</Link>.
				</p>
			</div>
		</div>
	)
}

export default Retourbeleid