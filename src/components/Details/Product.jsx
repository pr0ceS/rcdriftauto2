import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import { url } from "../../slices/api";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addToCart, getTotals } from "../../slices/cartSlice";
import Garantie from "../assets/14tagegarantie.png"
import Paypal from "../assets/paypalverified.png"
import Reviews from "../Reviews";
import { Breadcrumbs, Rating } from "@mui/material";
import { BiHome } from "react-icons/bi";
import { toast } from "react-hot-toast";
import FadeIn from "react-fade-in/lib/FadeIn";
import moment from "moment";
import 'moment/locale/nl';
moment.locale('nl');

const Product = () => {
  const params = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  
  const [product, setProduct] = useState({});
	const [RandomProductsArray, setRandomProductsArray] = useState([]);
  const [loading, setLoading] = useState(false);
	const [selectedImage, setSelectedImage] = useState(0);
  const [averageRating, setAverageRating] = useState(0);
	const [productPrice, setProductPrice] = useState(null);
	const [productSale, setProductSale] = useState(null);
	const [activeSelected, setActiveSelected] = useState('option1');
	const [date1, setDate1] = useState(null);
	const [date2, setDate2] = useState(null);
	const [date3, setDate3] = useState(null);
	const [date4, setDate4] = useState(null);
  const user = useSelector((state) => state.auth);
  const cart = useSelector((state) => state.cart);

  useEffect(() => {
    dispatch(getTotals());
  }, [cart, dispatch]);

  const handleAddToCart = (product) => {
		if(activeSelected === 'option1') {
			dispatch(addToCart(product));
		} else if(activeSelected === 'option2') {
			dispatch(addToCart(product));
			dispatch(addToCart(product));
		} else if(activeSelected === 'option3') {
			dispatch(addToCart(product));
			dispatch(addToCart(product));
			dispatch(addToCart(product));
		}
		toast.success("Toegevoegd aan Winkelwagen");
		navigate('/winkelwagen')
  };

  const handleCheckout = (product) => {
    if(activeSelected === 'option1') {
			dispatch(addToCart(product));
		} else if(activeSelected === 'option2') {
			dispatch(addToCart(product));
			dispatch(addToCart(product));
		} else if(activeSelected === 'option3') {
			dispatch(addToCart(product));
			dispatch(addToCart(product));
			dispatch(addToCart(product));
		}

    const cartItems = JSON.parse(localStorage.getItem("cartItems"));

    axios
      .post(`${url}/stripe/create-checkout-session`, {
        cartItems,
        userId: user._id,
      })
      .then((response) => {
        if (response.data.url) {
          window.location.href = response.data.url;
        }
      })
      .catch((err) => console.log(err.message))
  };


  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);
        const res = await axios.get(`${url}/products/find/${params.id}`);

				setProductPrice(res.data.price);
				setProductSale(res.data.sale);
        setProduct(await res.data);
        setLoading(false);
      } catch (err) {
				navigate('/')
        console.log(err);
				toast.error("ERROR: Probeer het later nog eens");
      }
    };

    fetchProduct();
  }, [params.id]);

  // useEffect(() => {
  //   const fetchAverageRating = async () => {
  //     try {
  //       setLoading(true);
  //       const res = await axios.get(`${url}/products/review/${params.id}/average`);

  //       setAverageRating(await res.data);
  //       setLoading(false);
  //     } catch (error) {
  //       console.log(error);
  //     }
  //   }
    
  //   fetchAverageRating();
  // }, [params.id, Rating])

	useEffect(() => {
		const calculateShippingTime = () => {
			let d1 = new Date();
			let d2 = new Date();
			let d3 = new Date();
			let d4 = new Date();
			d1.setDate(d1.getDate() + 1);
			d2.setDate(d2.getDate() + 3);
			d3.setDate(d3.getDate() + 4);
			d4.setDate(d4.getDate() + 8);
			if(d1.getDay() === 0) {
				d1.setDate(d1.getDate() + 1);
			}
			if(d2.getDay() === 0) {
				d2.setDate(d2.getDate() + 1)
			}
			if(d3.getDay() === 0) {
				d3.setDate(d3.getDate() + 1)
			}
			if(d4.getDay() === 0) {
				d4.setDate(d4.getDate() + 1)
			}
			setDate1(d1);
			setDate2(d2);
			setDate3(d3)
			setDate4(d4);
		}


		calculateShippingTime()
	}, [])

	// Shaking button logic
	const [shaking, setShaking] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setShaking(true);
      setTimeout(() => {
        setShaking(false);
      }, 1000);
    }, 4000);

    return () => clearInterval(interval);
  }, []);

	// Calculate sale percentage
	const calculateSalePercentage = (oldPrice, newPrice) => {
    const percentage = ((oldPrice - newPrice) / oldPrice) * 100;
    return Math.round(percentage);
  };

	const [scrollClassName, setScrollClassName] = useState('');

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 700) {
        setScrollClassName('bb-show');
      } else {
        setScrollClassName('');
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

	const price1 = product.price;
	const price2 = price1 * 2 * 0.9;
	const price3 = price1 * 3 * 0.85;
	const sale1 = product.sale;
	const sale2 = sale1 * 2;
	const sale3 = sale1 * 3;

	const handleButtonClick = (option) => {
		setActiveSelected(option)
		if(option === "option1") {
			setProductPrice(price1);
			setProductSale(sale1)
		} else if(option === "option2") {
			setProductPrice(price2);
			setProductSale(sale2)
		} else if(option === "option3") {
			setProductPrice(price3);
			setProductSale(sale3)
		}
	}
	
	
  return (
    <div className="styled-product">
			<div className="breadcrumbs-container singleproduct">
				<Breadcrumbs className="breadcrumbs">
					<Link to="/"><BiHome/></Link>
					<Link to="/autos">Auto's</Link>
					<Link to={`/auto/${params.id}`} className="breadcrumbs-a">{product?.name}</Link>
				</Breadcrumbs>
			</div>
      <FadeIn>
        <div className="product-container">
          {loading ? (
            <p>Laden...</p>
          ) : (
            <>
							{product?.image &&
								<div className="img-container">
									<img className="mainImage" src={product?.image[selectedImage] ? product?.image[selectedImage] : "loading" } alt="product" />
									<div className="images">
										{product?.image.map((img, index) => {
											return <img key={index} src={img} alt="product" className={index === selectedImage ? "selected" : ""} onClick={() => setSelectedImage(index)} />
										})}
									</div>
								</div>
							}
              <div className="product-details">
                <h1>{product?.name}</h1>
									<div className="rating">
										{ product?.averageRating > 0 ?
										<>
											<Rating name="reviewgemiddelde" value={product?.averageRating} readOnly precision={0.5} />
											<p>{product.ratingCount} Reviews</p>
										</> : (
											<>
												<Rating name="reviewgemiddelde" value={0} readOnly />
												<p>0 Reviews</p>
											</>
										)
										} 
									</div>
                
								{/* <OldPrice>{(product?.price + product?.sale).toLocaleString('nl-nl', { maximumFractionDigits: 2, minimumFractionDigits: 2})}</OldPrice> */}
								<div className="product-prices">
									{product?.sale? (
										productSale !== null && (
											<div className="product-sales">
												<p className="product-price sale-price">€{productSale?.toLocaleString('nl-nl', { maximumFractionDigits: 2, minimumFractionDigits: 2})}</p>
												<p className={`sale-display ${activeSelected === "option2" ? "sale-selected" : activeSelected === "option3" ? "sale-selected" : ""}`}>{activeSelected === "option2" ? "10% Korting" : activeSelected === "option3" ? "15% Korting" : ""}</p>
											</div>
										)  
									) : (
										<p>Laden...</p>
									)}
									
									{productPrice !== null ? (
										<p className="product-price">€{productPrice?.toLocaleString('nl-nl', { maximumFractionDigits: 2, minimumFractionDigits: 2})}</p>
									) : (
										<p>Laden...</p>
									)}
									
								</div>
                {/* <p className="product-price">€{((product?.price * 0.21) + product?.price).toLocaleString('nl-nl', { maximumFractionDigits: 2, minimumFractionDigits: 2})}</p> */}

								<p className="mwst">Incl. {product?.tax ? product?.tax + "% " : ""}BTW</p>
								<div className="more-options">
									<div className={`option ${activeSelected === "option1" ? "option-selected" : ""}`} onClick={() => handleButtonClick('option1')}>
										<p>
											<div className="centercircle">
												<div className="innercircle"></div>
											</div>
											1 Stuk
										</p>
										<span>0% Korting</span>
									</div>
									<div className={`option ${activeSelected === "option2" ? "option-selected" : ""}`} onClick={() => handleButtonClick('option2')}>
										<p>
											<div className="centercircle">
												<div className="innercircle"></div>
											</div>
											2 Stuks
										</p>
										<span><b>10%</b> Korting</span>
									</div>
									<div className={`option ${activeSelected === "option3" ? "option-selected" : ""}`} onClick={() => handleButtonClick('option3')}>
										<p>
											<div className="centercircle">
												<div className="innercircle"></div>
											</div>
											3+ Stuks
										</p>
										<span><b>15%</b> Korting</span>
									</div>
								</div>
								{product?.soldout ? 
									<button className="product-soldout">
										Uitverkocht
									</button>
								: 
									<button
										className={`shaking-button product-add-to-cart ${shaking ? 'shake-animation' : ''}`}
										onClick={() => handleAddToCart(product)}
									>
										<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"></path><line x1="3" y1="6" x2="21" y2="6"></line><path d="M16 10a4 4 0 0 1-8 0"></path></svg>
										In winkelwagen
									</button>
								}
                <button 
                  className="product-purchase"
                  onClick={() => handleCheckout(product)}
                >
                  Koop nu
                </button>
								{product?.deliveryTime && 
									<div className="deliverydate">
										<svg role="img" focusable="false" viewBox="0 0 22 22" xmlns="http://www.w3.org/2000/svg"> <path d="M11 22a11 11 0 1 1 0-22 11 11 0 0 1 0 22Zm0-20a9 9 0 1 0 0 18 9 9 0 0 0 0-18Z"></path> <path d="M12 12H5v-2h5V4.85h2V12Z"></path> </svg>
										{!product?.soldout &&
											<div>
												<p className="date">{product?.deliveryTime < 4 ? `${moment(date1).locale('nl').format('dd. D')} - ${moment(date2).locale('nl').format('dd. D MMMM')}` : `${moment(date3).locale('nl').format('dd. D')} - ${moment(date4).locale('nl').format('dd. D MMMM')}`}</p>
												<p className="versand">Gratis verzendkosten</p>
											</div>
										}
									</div>
								}
                <div className="payments">
									<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 38 24" width="70" height="48" role="img" aria-labelledby="pi-ideal"><script xmlns=""></script><title id="pi-ideal">iDEAL</title><path opacity=".07" d="M35 0H3C1.3 0 0 1.3 0 3v18c0 1.7 1.4 3 3 3h32c1.7 0 3-1.3 3-3V3c0-1.7-1.4-3-3-3Z"/><path d="M35 1c1.1 0 2 .9 2 2v18c0 1.1-.9 2-2 2H3c-1.1 0-2-.9-2-2V3c0-1.1.9-2 2-2h32Z" fill="#fff"/><path d="M14 6.912V19h5.648C24.776 19 27 16.302 27 12.486 27 8.834 24.776 6 19.648 6h-4.67c-.543 0-.978.414-.978.912Z" fill="#C06"/><path d="M19.312 21h-8.884C9.64 21 9 20.373 9 19.6V5.4c0-.773.64-1.4 1.428-1.4h8.884C27.742 4 29 9.317 29 12.482 29 17.974 25.555 21 19.313 21h-.001ZM10.428 4.467a.944.944 0 0 0-.878.573.936.936 0 0 0-.074.36v14.2a.936.936 0 0 0 .59.866c.115.046.238.07.362.068h8.884c5.938 0 9.212-2.86 9.212-8.052 0-6.972-5.774-8.015-9.212-8.015h-8.884Z"/><path d="M16.252 11.008c.188 0 .361.03.528.088.167.06.304.155.427.273.116.125.21.28.282.457.065.184.101.398.101.649 0 .22-.028.42-.08.604a1.417 1.417 0 0 1-.245.479 1.197 1.197 0 0 1-.413.317 1.437 1.437 0 0 1-.586.118H15V11h1.252v.008Zm-.044 2.44c.095 0 .181-.016.276-.045a.539.539 0 0 0 .23-.155.863.863 0 0 0 .168-.28c.043-.118.065-.25.065-.42 0-.147-.015-.287-.044-.405a.814.814 0 0 0-.145-.31.656.656 0 0 0-.26-.199 1.047 1.047 0 0 0-.398-.066h-.464v1.887h.572v-.008Zm3.995-2.44v.553h-1.548v.64h1.426v.51h-1.426v.73h1.585v.552h-2.229V11h2.194v.008h-.002Zm2.215 0 1.1 2.992h-.673l-.224-.663h-1.1l-.232.663h-.652l1.108-2.992h.673Zm.037 1.835-.37-1.098h-.007l-.384 1.098h.76Zm2.112-1.835v2.44H26V14h-2.076v-2.992h.643Z" fill="#fff"/><path d="M11.5 13.652c.829 0 1.5-.593 1.5-1.326 0-.732-.671-1.326-1.5-1.326s-1.5.594-1.5 1.326c0 .732.671 1.326 1.5 1.326ZM12.63 19c-1.258 0-2.269-.9-2.269-2.007v-1.568a.969.969 0 0 1 .337-.715c.214-.189.502-.294.802-.291a1.24 1.24 0 0 1 .433.073c.137.05.262.124.368.218.106.093.19.205.248.327a.93.93 0 0 1 .09.388V19h-.008Z"/></svg>
									<svg xmlns="http://www.w3.org/2000/svg" role="img" width="68" height="45" viewBox="0 0 38 24" aria-labelledby="pi-klarna"><title id="pi-klarna">Klarna</title><g stroke="none" strokeWidth="1" fill="none" fillRule="evenodd"><path d="M35 0H3C1.3 0 0 1.3 0 3v18c0 1.7 1.4 3 3 3h32c1.7 0 3-1.3 3-3V3c0-1.7-1.4-3-3-3z" fill="#FFB3C7"/><path d="M35 1c1.1 0 2 .9 2 2v18c0 1.1-.9 2-2 2H3c-1.1 0-2-.9-2-2V3c0-1.1.9-2 2-2h32" fill="#FFB3C7"/><path d="M34.117 13.184c-.487 0-.882.4-.882.892 0 .493.395.893.882.893.488 0 .883-.4.883-.893a.888.888 0 00-.883-.892zm-2.903-.69c0-.676-.57-1.223-1.274-1.223-.704 0-1.274.547-1.274 1.222 0 .675.57 1.223 1.274 1.223.704 0 1.274-.548 1.274-1.223zm.005-2.376h1.406v4.75h-1.406v-.303a2.446 2.446 0 01-1.394.435c-1.369 0-2.478-1.122-2.478-2.507 0-1.384 1.11-2.506 2.478-2.506.517 0 .996.16 1.394.435v-.304zm-11.253.619v-.619h-1.44v4.75h1.443v-2.217c0-.749.802-1.15 1.359-1.15h.016v-1.382c-.57 0-1.096.247-1.378.618zm-3.586 1.756c0-.675-.57-1.222-1.274-1.222-.703 0-1.274.547-1.274 1.222 0 .675.57 1.223 1.274 1.223.704 0 1.274-.548 1.274-1.223zm.005-2.375h1.406v4.75h-1.406v-.303A2.446 2.446 0 0114.99 15c-1.368 0-2.478-1.122-2.478-2.507 0-1.384 1.11-2.506 2.478-2.506.517 0 .997.16 1.394.435v-.304zm8.463-.128c-.561 0-1.093.177-1.448.663v-.535H22v4.75h1.417v-2.496c0-.722.479-1.076 1.055-1.076.618 0 .973.374.973 1.066v2.507h1.405v-3.021c0-1.106-.87-1.858-2.002-1.858zM10.465 14.87h1.472V8h-1.472v6.868zM4 14.87h1.558V8H4v6.87zM9.45 8a5.497 5.497 0 01-1.593 3.9l2.154 2.97H8.086l-2.341-3.228.604-.458A3.96 3.96 0 007.926 8H9.45z" fill="#0A0B09" fillRule="nonzero"/></g></svg>
									<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 38 24" width="70" height="48" role="img" aria-labelledby="pi-paypal"><title id="pi-paypal">PayPal</title><path opacity=".07" d="M35 0H3C1.3 0 0 1.3 0 3v18c0 1.7 1.4 3 3 3h32c1.7 0 3-1.3 3-3V3c0-1.7-1.4-3-3-3z"/><path fill="#fff" d="M35 1c1.1 0 2 .9 2 2v18c0 1.1-.9 2-2 2H3c-1.1 0-2-.9-2-2V3c0-1.1.9-2 2-2h32"/><path fill="#003087" d="M23.9 8.3c.2-1 0-1.7-.6-2.3-.6-.7-1.7-1-3.1-1h-4.1c-.3 0-.5.2-.6.5L14 15.6c0 .2.1.4.3.4H17l.4-3.4 1.8-2.2 4.7-2.1z"/><path fill="#3086C8" d="M23.9 8.3l-.2.2c-.5 2.8-2.2 3.8-4.6 3.8H18c-.3 0-.5.2-.6.5l-.6 3.9-.2 1c0 .2.1.4.3.4H19c.3 0 .5-.2.5-.4v-.1l.4-2.4v-.1c0-.2.3-.4.5-.4h.3c2.1 0 3.7-.8 4.1-3.2.2-1 .1-1.8-.4-2.4-.1-.5-.3-.7-.5-.8z"/><path fill="#012169" d="M23.3 8.1c-.1-.1-.2-.1-.3-.1-.1 0-.2 0-.3-.1-.3-.1-.7-.1-1.1-.1h-3c-.1 0-.2 0-.2.1-.2.1-.3.2-.3.4l-.7 4.4v.1c0-.3.3-.5.6-.5h1.3c2.5 0 4.1-1 4.6-3.8v-.2c-.1-.1-.3-.2-.5-.2h-.1z"/></svg>
									<svg width="70" height="45" viewBox="0 0 70 48" fill="none" xmlns="http://www.w3.org/2000/svg"> <rect x="0.5" y="0.5" width="69" height="47" rx="5.5" fill="white" stroke="#D9D9D9"/> <path fillRule="evenodd" clipRule="evenodd" d="M16.6924 17.8659C17.6325 17.9452 18.5726 17.3901 19.1601 16.6863C19.7379 15.9627 20.1198 14.9913 20.0219 14C19.1895 14.0397 18.1613 14.5551 17.5737 15.2787C17.0352 15.9032 16.5749 16.9143 16.6924 17.8659ZM27.8755 30.6333V15.1796H33.6041C36.5615 15.1796 38.6277 17.2414 38.6277 20.2548C38.6277 23.2683 36.5223 25.3499 33.5258 25.3499H30.2453V30.6333H27.8755ZM20.012 18.0542C19.1838 18.006 18.4281 18.3064 17.8177 18.549C17.4249 18.7051 17.0923 18.8373 16.8392 18.8373C16.5552 18.8373 16.2089 18.6981 15.82 18.5417L15.82 18.5417L15.82 18.5417L15.82 18.5417C15.3104 18.3368 14.7278 18.1025 14.1169 18.1137C12.7166 18.1335 11.4142 18.9365 10.6993 20.2152C9.23044 22.7726 10.3174 26.5593 11.7373 28.6409C12.4326 29.6718 13.265 30.8018 14.3617 30.7622C14.8442 30.7438 15.1913 30.5947 15.5505 30.4404C15.9641 30.2628 16.3937 30.0782 17.0645 30.0782C17.712 30.0782 18.1228 30.2579 18.5172 30.4305C18.8921 30.5945 19.2522 30.752 19.7868 30.7424C20.9227 30.7225 21.6376 29.7115 22.3328 28.6806C23.0831 27.5741 23.4129 26.4943 23.4629 26.3304L23.4688 26.3114C23.4676 26.3102 23.4583 26.3059 23.4419 26.2984C23.1911 26.1821 21.274 25.2937 21.2557 22.9114C21.2372 20.9118 22.7762 19.8987 23.0185 19.7392C23.0332 19.7295 23.0432 19.723 23.0477 19.7196C22.0684 18.2525 20.5408 18.0939 20.012 18.0542ZM42.9561 30.7523C44.4445 30.7523 45.8253 29.989 46.452 28.7797H46.501V30.6333H48.6945V22.9412C48.6945 20.7108 46.9318 19.2735 44.2193 19.2735C41.7026 19.2735 39.842 20.7307 39.7735 22.733H41.9083C42.0845 21.7814 42.9561 21.1569 44.1508 21.1569C45.6 21.1569 46.4128 21.8409 46.4128 23.0998V23.9522L43.4555 24.1307C40.7038 24.2992 39.2153 25.4391 39.2153 27.4217C39.2153 29.424 40.7527 30.7523 42.9561 30.7523ZM43.5924 28.9185C42.3292 28.9185 41.5262 28.3039 41.5262 27.3622C41.5262 26.3908 42.2998 25.8257 43.7785 25.7365L46.4127 25.568V26.4403C46.4127 27.8876 45.1984 28.9185 43.5924 28.9185ZM55.9702 31.238C55.0204 33.9442 53.9334 34.8363 51.6224 34.8363C51.4461 34.8363 50.8585 34.8165 50.7214 34.7768V32.9232C50.8683 32.943 51.2307 32.9628 51.4167 32.9628C52.4645 32.9628 53.0521 32.5167 53.4144 31.357L53.6298 30.673L49.6149 19.4222H52.0924L54.8833 28.5517H54.9322L57.7231 19.4222H60.1321L55.9702 31.238ZM30.2451 17.2018H32.9772C35.0336 17.2018 36.2087 18.312 36.2087 20.2648C36.2087 22.2175 35.0336 23.3377 32.9674 23.3377H30.2451V17.2018Z" fill="black"/> </svg>
									<svg width="70" height="45" viewBox="0 0 70 48" fill="none" xmlns="http://www.w3.org/2000/svg"> <rect x="0.5" y="0.5" width="69" height="47" rx="5.5" fill="white" stroke="#D9D9D9"/> <path fillRule="evenodd" clipRule="evenodd" d="M33.0603 31.5161V25.4742H36.1786C37.4564 25.4742 38.535 25.046 39.4142 24.2016L39.6252 23.9875C41.2313 22.2392 41.1258 19.5156 39.4142 17.898C38.5584 17.0417 37.3861 16.5779 36.1786 16.6016H31.1729V31.5161H33.0603ZM33.0605 23.6426V18.4332H36.2262C36.9063 18.4332 37.5512 18.6949 38.0319 19.1706C39.052 20.1697 39.0754 21.8348 38.0905 22.8695C37.6098 23.3809 36.9297 23.6664 36.2262 23.6426H33.0605ZM48.4293 22.1084C47.6204 21.3591 46.5185 20.9785 45.1234 20.9785C43.3298 20.9785 41.9816 21.6445 41.0906 22.9647L42.7553 24.0232C43.3649 23.1193 44.1973 22.6673 45.2524 22.6673C45.9206 22.6673 46.5653 22.9171 47.0694 23.3691C47.5618 23.7972 47.8432 24.4157 47.8432 25.0698V25.5099C47.1163 25.1055 46.2019 24.8914 45.0765 24.8914C43.7635 24.8914 42.7084 25.2007 41.923 25.831C41.1375 26.4614 40.739 27.2939 40.739 28.3525C40.7155 29.3158 41.1258 30.2316 41.8527 30.8501C42.5912 31.5161 43.5291 31.8491 44.631 31.8491C45.9323 31.8491 46.9639 31.2664 47.7494 30.1008H47.8314V31.5161H49.6368V25.2245C49.6368 23.9043 49.2382 22.8576 48.4293 22.1084ZM43.3066 29.6369C42.9197 29.3515 42.6852 28.8877 42.6852 28.3881C42.6852 27.8291 42.9432 27.3653 43.4473 26.9966C43.9632 26.6279 44.6081 26.4376 45.3702 26.4376C46.4255 26.4257 47.2462 26.6636 47.8325 27.1393C47.8325 27.9481 47.5159 28.6498 46.8945 29.2445C46.3317 29.8153 45.5696 30.1365 44.7723 30.1365C44.2446 30.1484 43.7287 29.97 43.3066 29.6369ZM53.693 36L60.0001 21.3115H57.9485L55.0295 28.6379H54.9943L52.0049 21.3115H49.9534L54.0916 30.862L51.747 36H53.693Z" fill="#3C4043"/> <path d="M26.5442 24.1659C26.5442 23.5831 26.4973 23.0003 26.4035 22.4295H18.4435V25.724H23.0038C22.8163 26.7825 22.2067 27.734 21.3157 28.3286V30.4695H24.0355C25.6298 28.9828 26.5442 26.7825 26.5442 24.1659Z" fill="#4285F4"/> <path d="M18.4439 32.539C20.7182 32.539 22.6408 31.7778 24.0358 30.4695L21.3161 28.3287C20.5541 28.852 19.581 29.1493 18.4439 29.1493C16.24 29.1493 14.376 27.6388 13.7078 25.6169H10.9059V27.8291C12.3362 30.7192 15.2552 32.539 18.4439 32.539Z" fill="#34A853"/> <path d="M13.708 25.617C13.3563 24.5584 13.3563 23.4048 13.708 22.3344V20.134H10.9058C9.69808 22.5484 9.69808 25.4029 10.9058 27.8173L13.708 25.617Z" fill="#FBBC04"/> <path d="M18.4439 18.8019C19.6514 18.7782 20.812 19.242 21.6795 20.0864L24.0944 17.6364C22.5587 16.1854 20.5423 15.3885 18.4439 15.4123C15.2552 15.4123 12.3362 17.2439 10.9059 20.134L13.7078 22.3462C14.376 20.3124 16.24 18.8019 18.4439 18.8019Z" fill="#EA4335"/> </svg>
									<svg width="70" height="48" aria-labelledby="pi-visa" viewBox="0 0 60 40" fill="none" xmlns="http://www.w3.org/2000/svg"><title id="pi-visa">Visa</title> <g clipPath="url(#clip0_12_324)"> <path opacity="0.07" d="M55.2632 1.05273H4.73684C2.05263 1.05273 0 3.10537 0 5.78958V34.2106C0 36.8948 2.21053 38.9475 4.73684 38.9475H55.2632C57.9474 38.9475 60 36.8948 60 34.2106V5.78958C60 3.10537 57.7895 1.05273 55.2632 1.05273Z" fill="black"/> <path d="M55.2631 2.63159C56.9999 2.63159 58.421 4.05264 58.421 5.78949V34.2105C58.421 35.9474 56.9999 37.3684 55.2631 37.3684H4.73675C2.99991 37.3684 1.57886 35.9474 1.57886 34.2105V5.78949C1.57886 4.05264 2.99991 2.63159 4.73675 2.63159H55.2631Z" fill="white"/> <g clipPath="url(#clip1_12_324)"> <path d="M25.9334 26.7838H22.207L24.5377 12.2634H28.2639L25.9334 26.7838Z" fill="#00579F"/> <path d="M39.4416 12.6182C38.7066 12.3244 37.5409 12 36.0994 12C32.4195 12 29.8282 13.9771 29.8123 16.8039C29.7818 18.8894 31.6676 20.0478 33.0781 20.7432C34.5198 21.4537 35.0099 21.9175 35.0099 22.5509C34.9952 23.5237 33.8449 23.9721 32.7721 23.9721C31.2843 23.9721 30.4872 23.7409 29.2758 23.1997L28.7851 22.9677L28.2637 26.2272C29.1376 26.6284 30.7478 26.9844 32.4195 27C36.3295 27 38.8749 25.0535 38.9051 22.0411C38.92 20.3882 37.9242 19.1216 35.7772 18.0866C34.4739 17.4223 33.6758 16.9743 33.6758 16.2945C33.6911 15.6765 34.3509 15.0435 35.8221 15.0435C37.0335 15.0125 37.9235 15.3059 38.5978 15.5995L38.9348 15.7537L39.4416 12.6182Z" fill="#00579F"/> <path d="M44.3941 21.6398C44.701 20.8056 45.8819 17.5771 45.8819 17.5771C45.8664 17.6081 46.1881 16.7275 46.3721 16.1869L46.6325 17.4381C46.6325 17.4381 47.3382 20.9138 47.4914 21.6398C46.9091 21.6398 45.1302 21.6398 44.3941 21.6398ZM48.9938 12.2634H46.1115C45.2227 12.2634 44.5474 12.5258 44.1639 13.4682L38.6289 26.7836H42.5388C42.5388 26.7836 43.1825 24.9915 43.3209 24.6055C43.7498 24.6055 47.5534 24.6055 48.1052 24.6055C48.2122 25.1153 48.5498 26.7836 48.5498 26.7836H52L48.9938 12.2634Z" fill="#00579F"/> <path d="M19.0945 12.2634L15.4452 22.1649L15.0464 20.1568C14.3717 17.8397 12.2558 15.3221 9.89453 14.0704L13.2372 26.7684H17.1776L23.0348 12.2634H19.0945Z" fill="#00579F"/> <path d="M12.0566 12.2634H6.06133L6 12.5568C10.6767 13.7618 13.774 16.6663 15.0465 20.1574L13.7432 13.484C13.5287 12.5566 12.8693 12.294 12.0566 12.2634Z" fill="#FAA61A"/> </g> </g> <defs> <clipPath id="clip0_12_324"> <rect width="60" height="40" fill="white"/> </clipPath> <clipPath id="clip1_12_324"> <rect width="46" height="15" fill="white" transform="translate(6 12)"/> </clipPath> </defs> </svg>
									<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 38 24" width="70" height="48" role="img" aria-labelledby="pi-maestro"><title id="pi-maestro">Maestro</title><path opacity=".07" d="M35 0H3C1.3 0 0 1.3 0 3v18c0 1.7 1.4 3 3 3h32c1.7 0 3-1.3 3-3V3c0-1.7-1.4-3-3-3z"/><path fill="#fff" d="M35 1c1.1 0 2 .9 2 2v18c0 1.1-.9 2-2 2H3c-1.1 0-2-.9-2-2V3c0-1.1.9-2 2-2h32"/><circle fill="#EB001B" cx="15" cy="12" r="7"/><circle fill="#00A2E5" cx="23" cy="12" r="7"/><path fill="#7375CF" d="M22 12c0-2.4-1.2-4.5-3-5.7-1.8 1.3-3 3.4-3 5.7s1.2 4.5 3 5.7c1.8-1.2 3-3.3 3-5.7z"/></svg>
									<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 38 24" width="70" height="48" aria-labelledby="pi-master"><title id="pi-master">Mastercard</title><path opacity=".07" d="M35 0H3C1.3 0 0 1.3 0 3v18c0 1.7 1.4 3 3 3h32c1.7 0 3-1.3 3-3V3c0-1.7-1.4-3-3-3z"></path><path fill="#fff" d="M35 1c1.1 0 2 .9 2 2v18c0 1.1-.9 2-2 2H3c-1.1 0-2-.9-2-2V3c0-1.1.9-2 2-2h32"></path><circle fill="#EB001B" cx="15" cy="12" r="7"></circle><circle fill="#F79E1B" cx="23" cy="12" r="7"></circle><path fill="#FF5F00" d="M22 12c0-2.4-1.2-4.5-3-5.7-1.8 1.3-3 3.4-3 5.7s1.2 4.5 3 5.7c1.8-1.2 3-3.3 3-5.7z"></path></svg>
								</div>
								<div className="veelgestelde-vragen">
									<div>
										<h1>🚀 Hoe snel gaat de RCDriftAuto™?</h1>
										<p>Met de driftbanden kunnen ze een snelheid tot 15 km/h bereiken. Het monteren van rubberen banden stelt de RCDriftAuto's in staat om een snelheid van 20 km/h te bereiken.</p>
									</div>
									<div>
										<h1>🔋 Hoe lang gaat de batterij mee?</h1>
										<p>De batterij heeft een gemiddelde speeltijd van 30-45 minuten en het duurt 1 uur om hem op te laden.</p>
									</div>
								</div>
                {/* <div className="extra-info">
									<img src={Garantie} width="215" height="215" alt="14 Tage Garantie" />
									<img src={Paypal} width="230" height="230" alt="PayPal Verified" />
								</div> */}
              </div>
            </>
          )}
        </div>
      </FadeIn>

			<div className="description">
				<div dangerouslySetInnerHTML={{__html: product?.desc}}>
				</div>
			</div>

			{/* <div className="rproducts">
				<h2>Ausgewählte Produkte</h2>
				<div className="rproduct-wrapper">
					{RandomProductsArray && 
						RandomProductsArray.map((rproduct, i) => {
							return (
								<div className="rproduct" key={i}>
									<Link key={rproduct?._id} to={"/produkt/" + rproduct?.url}>
										<img src={rproduct?.image[0]} alt={rproduct?.name} />
										<h3>{rproduct?.name}</h3>
										<div className="details">
											<p><Rating name="product-averagerating" value={rproduct?.averageRating} readOnly precision={0.5}/></p>
											<span className="price">€{(rproduct?.price).toLocaleString('nl-nl', { maximumFractionDigits: 2, minimumFractionDigits: 2})}</span>
										</div>
									</Link>							
								</div>
							)
						})
					}
				</div>
			</div> */}

      <Reviews id={params.id} />
			{product && (	
			<div className={`bottombuy ${scrollClassName}`}>
					<div className="bottombuy-product">
						<img src={product?.image ? product?.image[0] : product?.image} alt="Auto" />
						<div className="bottombuy-info">
							<h3>{product?.name}</h3>
							<p>€{product?.price?.toLocaleString('nl-nl', { maximumFractionDigits: 2, minimumFractionDigits: 2})}</p>
						</div>
					</div>
				<button className="bottombuynow" onClick={() => handleCheckout(product)}>Koop nu</button>
			</div>
		)}
    </div>
  );
};

export default Product;
