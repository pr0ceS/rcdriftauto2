import axios from 'axios';
import React, {useState, useEffect} from 'react';
import { url } from '../slices/api';
import Rating from '@mui/material/Rating';
import moment from 'moment';
import FadeIn from 'react-fade-in/lib/FadeIn';

const Reviews = (id) => {
	const [name, setName] = useState("");
	const [email, setEmail] = useState("");
	const [stars, setStars] = useState("");
	const [title, setTitle] = useState("");
	const [message, setMessage] = useState("");
	const [toggleInput, setToggleInput] = useState(false);

	const [reviews, setReviews] = useState({});
  const [loading, setLoading] = useState(false);
	
	const fetchReviews = async () => {
		try {
			setLoading(true);
			const res = await axios.get(`${url}/products/review/${id.id}`);

			setReviews(Array.from(res.data));
			setLoading(false);
		} catch (error) {
			console.log(error);
		}
	}

	useEffect(() => {
		fetchReviews();
	}, [id.id]);

	async function handleSubmit() {
		try {
			if(name || email || stars || title || message) {
				const res = await axios.post(`${url}/products/review/${id.id}`, {
					name: name,
					email: email,
					stars: stars,
					title: title,
					message: message,
					productUrl: id.id,
				})
				fetchReviews();
			}
		} catch (error) {
			console.log(error);
		}
	}
	
	return (
		<div className='reviews-wrapper'>
			<h1>Reviews van Klanten</h1>
			<div className="reviews">

			{loading ? (
				<p></p>
			) : (
				<div className="reviews-customer">
					{reviews[0] ? reviews?.map((review, index) => (
						<div key={index}>
							<div className='review-info'>
								<div>
									<h2>{review.title}</h2>
									<p><b>{review.name}</b> Om {moment(review.createdAt).format("L")}</p>
								</div>
								<Rating className="reviews-rating" name="read-only" precision={0.5} value={review.stars} readOnly />
							</div>
							<p className='review-message'>{review.message}</p>
						</div>
					)) : "0 Reviews"}
				</div>
			)}
			<div className="write-review">
				<button onClick={() => setToggleInput(!toggleInput)}>Schrijf een Review</button>
				{toggleInput && 
				<FadeIn>
				<div className='review-form'>
					<h2>Schrijf een Review</h2>
					<div>
						<label htmlFor="name">Naam</label>
						<input type="text" name="name" id="name" value={name} onChange={(e) => setName(e.target.value)} required />
					</div>
					<div>
						<label htmlFor="email">E-Mail</label>
						<input type="email" name="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
					</div>
					<Rating className="review-rating" name="half-rating" value={parseInt(stars)} onChange={(e) => setStars(e.target.value)} precision={0.5} />
					<div>
						<label htmlFor="title">Titel</label>
						<input type="text" name="title" id="title" value={title} onChange={(e) => setTitle(e.target.value)} required />
					</div>
					<div>
						<label htmlFor="message">Tekst</label>
						<textarea rows={3} name="message" id="message" value={message} onChange={(e) => setMessage(e.target.value)} required />
					</div>
					<button onClick={() => handleSubmit()}>Review Publiceren</button>
				</div>
				</FadeIn>
				}
			</div>
		</div>
		</div>
	)
}

export default Reviews