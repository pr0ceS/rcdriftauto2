import axios from 'axios'
import React, { useState, useEffect } from 'react'
import { setHeaders, url } from '../../slices/api'
import CircularProgress from '@mui/material/CircularProgress';
import moment from 'moment';
moment.locale('nl')

const Server = () => {
	const [info, setInfo] = useState([]);

	async function fetchInfo() {
		const res = await axios.get(`${url}/info`, setHeaders());
		setInfo(res.data)
	}

	useEffect(() => {
		fetchInfo();
	}, [])

	useEffect(() => {
		const interval = setInterval(async () => {
			const res = await axios.get(`${url}/info`, setHeaders());
			setInfo(res.data);
		}, 5000)

		return () => clearInterval(interval);
	}, [])
	

	return (
		<div>
			<h1>Server Informatie</h1>
			<h2>{info[0] ? info[0].os : <CircularProgress disableShrink />}</h2>
			<h2>{info[0] ? ("Beschikbare RAM: " + Math.floor((info[0].memory / 1000000000) * 100) / 100 + "GB") : <CircularProgress disableShrink />}</h2>
			<h2>{info[0] ? ("Uptime: " + moment.utc(info[0].uptime * 1000).format("HH:mm:ss") ) : <CircularProgress disableShrink />}</h2>
		</div>
		
	)
}

export default Server