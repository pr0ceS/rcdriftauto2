import React, {useState, useEffect} from 'react'


const Statement = () => {
	const [Show, setShow] = useState(false)

	useEffect(() => {
		const status = localStorage.getItem("ShowStatement")
		if(status === "false") {
			setShow(false)
		} else {
			setShow(true);
		}
	}, [])

	const toggleStatement = () => {
		setShow(false)
		localStorage.setItem("ShowStatement", false)
	}

	return (
		<div className={Show ? "statement" : "statement-hide"}>
			<p>Onze voorraad word <b>bijgevuld</b> in 10-15 dagen. Vooraf bestelde word als eerste verzonden.</p>
			<button onClick={() => toggleStatement()}>Sluiten</button>
		</div>
	)
}

export default Statement