import React from 'react'
import { Link } from 'react-router-dom'
import {FaRegEnvelope} from "react-icons/fa"

const MailTo = ({ mailto, label}) => {
	return (
		<Link
			to="#"
			onClick={(e) => {
				window.location.href = mailto;
				e.preventDefault()
			}}
		>
		{FaRegEnvelope}
		</Link>
	)
}

export default MailTo