import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { Link } from "react-router-dom";
import { url } from "../slices/api";
import { addToCart, getTotals } from "../slices/cartSlice";
import FadeIn from "react-fade-in";
import slugify from "react-slugify";
import { toast } from "react-hot-toast";
import gif2 from "./assets/gif2.gif"
import Satisfied from "./assets/Satisfied.webp";
import Returns from "./assets/Returns.webp";
import Service from "./assets/Service.webp";
import MailList from "./MailList";
import reviewsData from "./json/reviews.json";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/autoplay";
import { Rating } from "@mui/material";
// import { useGetAllProductsQuery } from "../slices/productsApi";

const Home = () => {
  const { items: data, status } = useSelector((state) => state.products);
  const cart = useSelector((state) => state.cart);
	const [popularProducts, setPopularProducts] = useState([]);
	const [newProducts, setNewProducts] = useState([]);
	const [accessoires, setAccessoires] = useState([]);
	const dispatch = useDispatch();
  const navigate = useNavigate();	
	const element = useRef(null);

	useEffect(() => {
    dispatch(getTotals());
  }, [cart, dispatch]);

	useEffect(() => {
		const incrementVisitor = async () => {
			try {
				await axios.post(`${url}/visitor`);
	
				sessionStorage.setItem("visitor", true);
			} catch (error) {
				console.log(error)	
			}
		}
		
		if(sessionStorage.visitor !== 'true') {
			incrementVisitor();
		}
	}, []);

	useEffect(() => {
		const fetchPopularProducts = async () => {
			try {
				const res = await axios.get(`${url}/products/bestseller`);

				res.data.length = 3;
				setPopularProducts(res.data);
			} catch (error) {
				console.log(error);
			}
		}

		fetchPopularProducts();
	}, [])
	
  // const { data, error, isLoading } = useGetAllProductsQuery();

  const handleAddToCart = (product) => {
    dispatch(addToCart(product));
		toast.success("Toegevoegd aan Winkelwagen")
	};

	// const closePopup = () => {
	// 	setShowPopup(false);
	// 	document.body.classList.remove('no-scroll');
	// };

	// const fetchAverageRating = async (productId) => {
	// 	try {
	// 		const response = await axios.get(`${url}/products/review/${productId}/average`);
	// 		return response.data;
	// 	} catch (error) {
	// 		console.error(`Error fetching average rating for product ${productId}:`, error);
	// 		return null;
	// 	}
	// };
	
	// const getProductsWithAverageRating = async () => {
	// 	const productsWithRating = [];

	// 	for (const product of popularProducts) {
	// 		const averageRating = await fetchAverageRating(product.url);

	// 		if (averageRating !== null) {
	// 			productsWithRating.push({
	// 				...product,
	// 				averageRating: averageRating,
	// 			});
	// 		}
	// 	}

	// 	return productsWithRating;
	// };

	// useEffect(() => {
	// 	getProductsWithAverageRating().then((productsWithRating) => {
	// 		setPopularProducts(productsWithRating);
	// 	});
	// }, [popularProducts]);

	// const getZubehorProductsWithAverageRating = async () => {
	// 	const accessoiresWithRating = [];

	// 	for (const product of accessoires) {
	// 		const averageRating = await fetchAverageRating(product.url);

	// 		if (averageRating !== null) {
	// 			accessoiresWithRating.push({
	// 				...product,
	// 				averageRating: averageRating,
	// 			});
	// 		}
	// 	}

	// 	return accessoiresWithRating;
	// };

	// useEffect(() => {
	// 	getZubehorProductsWithAverageRating().then((accessoiresWithRating) => {
	// 		setAccessoires(accessoiresWithRating);
	// 	});
	// }, [accessoires]);
	
	const totalItems = reviewsData.Reviews.length;
	const chunkSize = Math.ceil(totalItems / 5);
  const array1 = reviewsData.Reviews.slice(0, chunkSize);
  const array2 = reviewsData.Reviews.slice(chunkSize, chunkSize * 2);
  const array3 = reviewsData.Reviews.slice(chunkSize * 2, chunkSize * 3);
  const array4 = reviewsData.Reviews.slice(chunkSize * 3, chunkSize * 4);
  const array5 = reviewsData.Reviews.slice(chunkSize * 4);

	// Calculate sale percentage
	const calculateSalePercentage = (oldPrice, newPrice) => {
    const percentage = ((oldPrice - newPrice) / oldPrice) * 100;
    return Math.round(percentage);
  };

  return (
		<>
			{/* <span className={`backdrop ${showPopup ? "show" : "hide"}`}></span>
			<div className={`popup ${showPopup ? "show" : "hide"}`}>
				<p className="closebutton" onClick={() => closePopup()}>X</p>
				<h1 className="popuptitle">20% RABATT & Kostenloser DHL-Versand</h1>
				<p className="popuptext">Wenn Sie Ihre Bestellung in...</p>
				<h1 className="popuptimer"><Countdown /></h1>
				<button className="popupbutton" onClick={() => closePopup()}>Holen Sie sich meine 20% RABATT!</button>
				<p className="closetext" onClick={() => closePopup()}>Nein danke, ich zahle lieber den vollen Preis</p>
			</div> */}
			<div className="banner">
			<video autoPlay playsInline muted loop>
				<source src="https://res.cloudinary.com/dwkzjfa1m/video/upload/v1697713605/RCDriftAuto_Website_Video_2_bbixpu.mp4" type="video/mp4" />
			</video>
				{/* <div className="banner-wrapper">
					<Swiper autoplay={{delay: 5000, disableOnInteraction: false}} navigation={true} modules={[Autoplay, Navigation]} className="mySwiper">
						<SwiperSlide className="carousel carousel2"><Link className="a-button" to="/produkt/ergotron-lx-arm-monitor-durchtischbefestigung-(45-241-026)">Jetzt entdecken</Link></SwiperSlide>
						<SwiperSlide className="carousel carousel1"><Link className="a-button" to="/produkt/ergotron-lx-dual-direct-monitor-arm-weiss-(45-489-216)">Jetzt entdecken</Link></SwiperSlide>
						<SwiperSlide className="carousel carousel3"><Link className="a-button" to="/produkt/ergotron-neo-flex-(45-174-300)">Jetzt entdecken</Link></SwiperSlide>
					</Swiper>
				</div> */}
				<div className="banner-wrapper">
					<h1 className="banner-title">RCDriftAuto™</h1>
					<p className="banner-description">
						Klaar om te driften?
					</p>
					<Link to="/autos" className="a-button banner-button">Auto's Bekijken</Link>
				</div>
			</div>
			<section className="info-container">
				<div>
					<h1>De Enige Echte RCDriftAuto™</h1>
					<p>Koop vandaag nog een RCDriftAuto™. Onze auto's zijn van uiterste kwaliteit en garanderen een langdurige speelplezier.<br/> <br/> Wij bieden een 14 dagen niet goed, geld terug garantie aan. Ook bieden wij gratis verzendkosten aan voor u. <br/> <br/>Wij leveren bij elk aankoop 2 sets banden. Eentje zijn geschikt voor Driften en de andere zijn voor Racen.<br/> <br/> Onze Klantenservice is altijd snel, gratis en behulpzaam. Bij defecten zorgen wij voor een creditering of een gloednieuwe.</p>
					<Link className="a-button" to="/autos">Auto's Bekijken</Link>
				</div>
				<video autoPlay playsInline muted loop>
					<source src="https://res.cloudinary.com/dwkzjfa1m/video/upload/v1697713604/RCDriftAuto_Website_Video_dyvx5t.mp4" type="video/mp4" />
			</video>
			</section>
			<div className="home-container">
				{status === "success" ? (
					<section className="main-home">
						<h1 className="home-title" ref={element}>RCDriftAuto™ Garage</h1>
						<div className="products">
							{popularProducts &&
								popularProducts?.map((product) => (
									<div key={product._id} className="product">
										<Link to={"/auto/" + product.url}>
											<img src={product.image[0]} alt={product.name} />
										</Link>
										<Link to={"/auto/" + product.url}>
											<h1>{product.name}</h1>
										</Link>
										{ product?.averageRating > 0 ? (
											<p className="rating">
												<Rating name="reviewgemiddelde" value={product?.averageRating} readOnly precision={0.5} />
												{`(${product?.ratingCount})`}
											</p>
										) : <p className='desc'>0 Reviews</p>
										} 
										<div className='prices'>
											<span className="price">€{(product.price).toLocaleString('nl-nl', { maximumFractionDigits: 2, minimumFractionDigits: 2})}</span>
											{	product.sale > 0 &&
												<span className='saleprice'>€{(product.sale).toLocaleString('nl-nl', { maximumFractionDigits: 2, minimumFractionDigits: 2})}</span>
											}
										</div>
										<button onClick={() => handleAddToCart(product)}>
											In winkelwagen
										</button>
									</div>

								))}
						</div>
						<Link className="allesbekijken" to="/autos">Alles Bekijken</Link>
					</section>
				) : status === "pending" ? (
					<p></p>
				) : (
					<p></p>
				)}
			</div>
			<section className="stats-container">
				<div>
					<img src={Satisfied} alt="200+ Tevreden Klanten" />
					<h1>200+ Tevreden Klanten</h1>
				</div>
				<div>
					<img src={Returns} alt="14 Dagen Retour Garantie" />
					<h1>14 Dagen Retour Garantie</h1>
				</div>
				<div>
					<img className="lastimg" src={Service} alt="Snelle Klantenservice" />
					<h1>Snelle Klantenservice</h1>
				</div>
			</section>
			<section className="reviews-container">
				<h1 className="reviews-title">RCDriftAuto™ Reviews:</h1>
					<div className="row">
						<div className="colum">
							{array1.map((review, index) => (
								<div className="review-card" key={index}>
									{review.image && <img src={review.image} alt="Review Image" className="review-image" />}
									<h2 className="review-title">{review.name}</h2>
									<Rating className="review-rating" name="review-rating" value={review.rating} readOnly precision={0.5} />
									<p className="review-text">{review.text}</p>
								</div>
							))}
						</div>
						<div className="colum">
							{array2.map((review, index) => (
								<div className="review-card" key={index}>
									{review.image && <img src={review.image} alt="Review Image" className="review-image" />}
									<h2 className="review-title">{review.name}</h2>
									<Rating name="review-rating" value={review.rating} readOnly precision={0.5} />
									<p className="review-text">{review.text}</p>
								</div>
							))}
						</div>
						<div className="colum">
							{array3.map((review, index) => (
								<div className="review-card" key={index}>
									{review.image && <img src={review.image} alt="Review Image" className="review-image" />}
									<h2 className="review-title">{review.name}</h2>
									<Rating name="review-rating" value={review.rating} readOnly precision={0.5} />
									<p className="review-text">{review.text}</p>
								</div>
							))}
						</div>
						<div className="colum">
							{array4.map((review, index) => (
								<div className="review-card" key={index}>
									{review.image && <img src={review.image} alt="Review Image" className="review-image" />}
									<h2 className="review-title">{review.name}</h2>
									<Rating name="review-rating" value={review.rating} readOnly precision={0.5} />
									<p className="review-text">{review.text}</p>
								</div>
							))}
						</div>
						<div className="colum">
							{array5.map((review, index) => (
								<div className="review-card" key={index}>
									{review.image && <img src={review.image} alt="Review Image" className="review-image" />}
									<h2 className="review-title">{review.name}</h2>
									<Rating name="review-rating" value={review.rating} readOnly precision={0.5} />
									<p className="review-text">{review.text}</p>
								</div>
							))}
						</div>
					</div>
			</section>
			<section className="h1-section">
			<h1 className="h1-section-titel">Veelgestelde vragen:</h1>
				<div>
					<h1>Hoe snel gaan de RC Drift Auto's?</h1>
					<p>Met de driftbanden kunnen ze een snelheid tot 15 km/h bereiken. Het monteren van rubberen banden stelt de RCDriftAuto's in staat om een snelheid van 20 km/h te bereiken.</p>
				</div>
				<div>
					<h1>Hoe lang gaat de batterij mee?</h1>
					<p>De batterij heeft een gemiddelde speeltijd van 30-45 minuten en het duurt 1 uur om hem op te laden.</p>
				</div>
			</section>
			<MailList />
		</>
  );
};

export default Home;
