import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { setHeaders, url } from '../../slices/api';
import moment from "moment";
import 'moment/locale/nl'
import styled from 'styled-components';
import { Breadcrumbs } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import { BiHome } from 'react-icons/bi';
import { FiChevronDown } from "react-icons/fi"

const UserOrders = () => {
  const navigate = useNavigate();

  const auth = useSelector((state) => state.auth);

  const [orders, setOrders] = useState({});
  const [invoices, setInvoices] = useState({});
	const [invoiceProducts, setInvoiceProducts] = useState([]);
	const [orderInformation, setOrderInformation] = useState(false);
	const [PDF, setPDF] = useState(null)
  const [loading, setLoading] = useState(false);

	useEffect(() => {
    if (!auth._id) {
      navigate("/inloggen");
    }
  }, [auth._id, navigate]);

	const toggleOrderInfoOff = () => {
		setOrderInformation(false);
	}

	const toggleOrderInfoOn = (index) => {
		setOrderInformation(index);
	}

	const downloadPDF = async (index) => {
		try {
			const res = await axios.get(
				`${url}/invoice/${invoices[index].reference}/${auth._id}`,
				{
					responseType: "blob",
					headers: {
      		"x-auth-token": localStorage.getItem("token"),
    			},
				},
			);
			
			const blob = new Blob([res.data], { type: 'application/pdf' });
			const urlPDF = window.URL.createObjectURL(blob);
			const link = document.createElement('a');
			link.href = urlPDF;
			link.download = `invoice_${invoices[index].reference}.pdf`;
			link.click();

		} catch (error) {
			console.log(error);
		}
	}

	useEffect(() => {
		const fetchInvoices = async () => {
			try {
				setLoading(true);
				const res = await axios.get(
					`${url}/invoice`,
					setHeaders()
				);
				setInvoices(res.data.invoices);
				setInvoiceProducts(res.data.products);
				setLoading(false);
			} catch (error) {
				console.log(error);
			}
		}

		if(auth._id) {
			fetchInvoices()
		}
	}, [auth._id])

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        setLoading(true);
        const res = await axios.get(
          `${url}/orders/find/${auth._id}`,
          setHeaders(),
        );

        setOrders(res.data);
        setLoading(false);
      } catch (err) {
        console.log(err);
      }
    };

		if(auth._id) {
			fetchOrder();
		}
  }, [auth._id]);

	return (
		<div className='orders'>
			<div className="breadcrumbs-container alleprodukte">
				<Breadcrumbs className="breadcrumbs">
					<Link to="/"><BiHome/></Link>
					<Link to="/bestellingen" className="breadcrumbs-a">Bestellingen</Link>
				</Breadcrumbs>
			</div>
			<div className="orders-title">Uw Bestellingen {`(${invoices.length ? invoices.length : 0})`}</div>
			<div className='complete-wrapper'>
				{invoices[0] ? invoices.map((invoice, index) => (
					<div className='orders-wrapper' key={index}>
						<div className='order-info'>
							<div>
								<h3>Besteldatum:</h3>
								<p>{moment(invoice.Date).locale("de").format('LL')}</p>
							</div>
							<div>
								<h3>Totaalbedrag:</h3>
								<p>€{(invoice.total / 100).toLocaleString('nl-nl', { maximumFractionDigits: 2, minimumFractionDigits: 2})}</p>
							</div>
							<div className='order-address'>
								<h3>Adres:</h3>
								<p className="order-name" onMouseEnter={() => toggleOrderInfoOn(index)} onMouseLeave={() => toggleOrderInfoOff()}>
									{invoice?.addressB?.company ? invoice?.addressB?.company : orders[index]?.shipping?.name} <FiChevronDown/>
								</p>
								<div className={`order-information ${orderInformation === index ? "order-show" : ""}`} onMouseLeave={() => toggleOrderInfoOff()} onMouseEnter={() => toggleOrderInfoOn(index)}>
									<p>{invoice?.addressB?.company ? invoice?.addressB?.company : orders[index]?.shipping?.name}</p>
									<p>{invoice?.addressB?.huisnummer ? (`${invoice?.addressB?.straat} ${invoice?.addressB?.huisnummer}`) : invoice?.addressB?.straat}{","}</p>
									<p>
										{invoice?.addressB?.postcode ? invoice?.addressB?.postcode : null}
										{" "}
										{invoice?.addressB?.stad ? invoice?.addressB?.stad : null}
									</p>
								</div>
							</div>
							<div>
								<h3>Referentie:</h3>
								<p>{invoice.reference}</p>
							</div>
							<div>
								<h3>Bestelstatus:</h3>
								{orders[index]?.delivery_status && orders[index]?.delivery_status === "pending" ? (
								<p className='pending'>Betaling Ontvangen</p>
							) : orders[index]?.delivery_status && orders[index]?.delivery_status === "dispatched" ? (
								<p className='dispatched'>Bestelling Verzonden</p>
							) : orders[index]?.delivery_status && orders[index].delivery_status === "delivered" ? (
								<p className='delivered'>Bestelling Thuisbezorgd</p>
							) : (
								"Bestelling in Behandeling"
								)}
							</div>
						</div>
						
						<div>
							{invoice.products[0] && invoice.products.map((product, index) => {
								const productImage = invoiceProducts.find((invoiceProduct) => invoiceProduct?.name === product?.description ? product?.description : product?.name ? product?.name : null);
								return (
									<div className='order-products' key={index}>
										<div className='order-image-desc'>
											<div>
												{productImage && <Link to={`/auto/${productImage.url}`}><img src={productImage.image[0]} alt={productImage.name} width={100}></img></Link>}
											</div>
											<div className='order-text'>
												<div className='order-products-desc'>
													<p className='anzahl'><Link to={productImage && `/auto/${productImage.url}`}>{product.description ? product.description : null}</Link>{product.quantity ? `, Aantal: ${product.quantity}` : null}</p>		
													{productImage && <p>{productImage.category}</p>}
													{productImage && <p>{productImage.condition}</p>}
													{productImage && <p>{productImage.PN}</p>}
												</div>
												<p><strong>€{(product?.amount_total ? (product?.amount_total) / 100 : null).toLocaleString('nl-nl', { maximumFractionDigits: 2, minimumFractionDigits: 2})}</strong> {`(Stukprijs: €${(product?.amount_total ? (product?.amount_total / 100 / product?.quantity) : null).toLocaleString('nl-nl', { maximumFractionDigits: 2, minimumFractionDigits: 2})})`}</p>
											</div>
										</div>
									</div>
								)
							})}

							<div className='rechnung'>
								<button onClick={() => downloadPDF(index)}>Factuur Downloaden</button>
								<Link to="/klantenservice" className="a-button">Probleem met uw bestelling?</Link>
							</div>
						</div>

					</div>
				)) : <p className="order-none">U heeft geen Bestellingen</p>}
			</div>
		</div>
		
	)
}

export default UserOrders
