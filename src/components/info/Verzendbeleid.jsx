import React from 'react'
import { Link } from "react-router-dom";

const Verzendbeleid = () => {
	return (
		<div className="beleid">
			<h1>Verzend Beleid</h1>
			<div className='regel'>
					<h3>§1 Levering</h3>
					<p>
					RCDriftAuto™ levert de bestelde producten zo snel mogelijk. De levertijd is afhankelijk van de locatie van de klant en de beschikbaarheid van het product. Als de levertijd op de productpagina wordt vermeld, proberen we deze te hanteren.
						<br/><br/>
						Als producten vertraging hebben, kun je contact met ons opnemen via de <Link to="/klantenservice">Klantenservice</Link>.
					</p>
			</div>
			<br/>
			<div className='regel'>
				<h3>§2 Verzendkosten</h3>
				<p>De verzendkosten zijn 100% Gratis</p>
			</div>
			<br/>
			<div className='regel'>
				<h3>§3 Grote Bestellingen</h3>
				<p>Grote bestellingen kunnen via de site worden besteld, echter kunnen we u een korting geven en een goede afspraak maken als u ons via de <Link to="/klantenservice">Klantenservice</Link> een bericht stuurt.</p>
			</div>
		</div>
	)
}

export default Verzendbeleid