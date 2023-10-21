import { Breadcrumbs, Rating } from '@mui/material';
import React, { useEffect, useRef, useState } from 'react'
import FadeIn from 'react-fade-in/lib/FadeIn';
import { toast } from 'react-hot-toast';
import { BiHome } from 'react-icons/bi';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { addToCart, getTotals } from '../slices/cartSlice';
import MailList from './MailList';
import { url } from '../slices/api';
import axios from 'axios';

const ProductsPage = () => {
	const { items: data, status } = useSelector((state) => state.products);
	const [products, setProducts] = useState(data);
  const cart = useSelector((state) => state.cart);
	const dispatch = useDispatch();
  // const navigate = useNavigate();
	const element = useRef(null);

	useEffect(() => {
    dispatch(getTotals());
  }, [cart, dispatch]);

	const handleAddToCart = (product) => {
    dispatch(addToCart(product));
		toast.success("Toegevoegd aan Winkelwagen")
	};

	// Calculate sale percentage
	const calculateSalePercentage = (oldPrice, newPrice) => {
    const percentage = ((oldPrice - newPrice) / oldPrice) * 100;
    return Math.round(percentage);
  };

	return (
		<>
		
		<div className="home-container alle-produkte">
				{status === "success" ? (
					<>
						<div className="breadcrumbs-container">
							<Breadcrumbs className="breadcrumbs">
								<Link to="/"><BiHome/></Link>
								<Link to="/autos" className="breadcrumbs-a">Auto's</Link>
							</Breadcrumbs>
						</div>
						<h1 className="products-title" ref={element}>RCDriftAuto™ Garage</h1>
							<FadeIn>
						<div className="products">
							{products &&
								products?.toReversed().map((product) => (
									<div key={product._id} className="product">
										<Link to={"/auto/" + product.url}>
											<img src={product.image[0]} alt={product.name} />
										</Link>
										<Link to={"/auto/" + product.url}>
											<h1>{product.name}</h1>
										</Link>
										{ product?.averageRating  ? (
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
								</FadeIn>
					</>
				) : status === "pending" ? (
					<p></p>
				) : (
					<p></p>
				)}
			</div>
			<MailList/>
		</>
	)
}

export default ProductsPage