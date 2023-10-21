import React, { useState } from "react";
import { Breadcrumbs } from "@mui/material";
import { Link } from "react-router-dom";
import { BiHome } from "react-icons/bi";
import { FaAngleDown, FaHome } from "react-icons/fa"

const vragen = [
	"What is a Tesla Coil Speaker?",
	"Are Tesla coil speakers safe to use?",
	"How does a Tesla Coil speaker work?",
	"Does it hurt when you touch the Tesla Coil electricity?",
	"Does the Tesla Coil Speaker sync with music?",
	"How high do the Tesla Coil Speaker sparks go up?",
]

const antwoorden = [
	"A Tesla Coil Speaker is an electromagnetically powered speaker that uses a high-voltage electrical current to generate sound. It utilizes a Tesla Coil, a special type of induction coil, to generate the voltage necessary to make sound. The frequency of the electricity produced by the Tesla Coil Speaker can reach up to several hundred kilohertz (kHz).",
	"Yes, Tesla Coil Speakers are safe to use. They generate low-level electrical current and do not produce any hazardous radiation. However, it is important to take care when handling the speaker and its components, as high-voltage electricity is involved.",
	"A Tesla Coil Speaker works by using a high-voltage electrical current to create an electromagnetic field. This field interacts with the speaker's diaphragm, which vibrates and produces sound. The frequency of the field is determined by the frequency of the electrical current.",
	"No, it does not hurt when you touch the electricity produced by a Tesla Coil Speaker.",
	"Yes, a Tesla Coil Speaker can be synced with music. When connected to an amplifier, the speaker can be used to reproduce sound in sync with the music.",
	"The sparks produced by a Tesla Coil Speaker can reach heights of 5-8 centimeter or 2-3.5 inches."
]

const FAQ = () => {

	const [One, setOne] = useState(false);
	const [Two, setTwo] = useState(false);
	const [Three, setThree] = useState(false);
	const [Four, setFour] = useState(false);
	const [Five, setFive] = useState(false);
	const [Six, setSix] = useState(false);
	const [Seven, setSeven] = useState(false);
	const [Eight, setEight] = useState(false);

  return (
    <div className="faq">
			<Breadcrumbs className="breadcrumbs">
				<Link to="/"><BiHome/></Link>
				<Link to="/faq" className="breadcrumbs-a">FAQ</Link>
			</Breadcrumbs>
      <h1>Frequently Asked Questions</h1>
      <div>
				<h1 onClick={() => setOne(!One)}>{vragen[0]}</h1>
				<FaAngleDown className={`${One && "active"} arrow`} />
				<p className={`${One && "active-p"}`}>{antwoorden[0]}</p>
			</div>
      <div>
				<h1 onClick={() => setTwo(!Two)}>{vragen[1]}</h1>
				<FaAngleDown className={`${Two && "active"} arrow`} />
				<p className={`${Two && "active-p"}`}>{antwoorden[1]}</p>
			</div>
      <div>
				<h1 onClick={() => setThree(!Three)}>{vragen[2]}</h1>
				<FaAngleDown className={`${Three && "active"} arrow`} />
				<p className={`${Three && "active-p"}`}>{antwoorden[2]}</p>
			</div>
      <div>
				<h1 onClick={() => setFour(!Four)}>{vragen[3]}</h1>
				<FaAngleDown className={`${Four && "active"} arrow`} />
				<p className={`${Four && "active-p"}`}>{antwoorden[3]}</p>
			</div>
      <div>
				<h1 onClick={() => setFive(!Five)}>{vragen[4]}</h1>
				<FaAngleDown className={`${Five && "active"} arrow`} />
				<p className={`${Five && "active-p"}`}>{antwoorden[4]}</p>
			</div>
      <div>
				<h1 onClick={() => setSix(!Six)}>{vragen[5]}</h1>
				<FaAngleDown className={`${Six && "active"} arrow`} />
				<p className={`${Six && "active-p"}`}>{antwoorden[5]}</p>
			</div>
    </div>
  );
};

export default FAQ;
