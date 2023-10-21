import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { clearCart, getTotals } from "../slices/cartSlice";

const CheckoutSuccess = () => {
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart);

  useEffect(() => {
    dispatch(clearCart());
  }, [dispatch]);

  useEffect(() => {
    dispatch(getTotals());
  }, [cart, dispatch]);

  return (
    <div className="checkout-complete">
			<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true" class="nu rw axr"><path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z" clip-rule="evenodd"></path></svg>
			<div className="checkout-text">
				<h2>Bedankt voor uw Bestelling 🙂</h2>
				<p>Als u geen account hebt geregistreerd/ingelogd, ontvangt u updates over uw bestelling per e-mail.</p>
				<div>
					<Link to="/bestellingen">Bestelling-status</Link>
					<Link to="/klantenservice">Klantenservice</Link>
				</div>
			</div>
    </div>
  );
};

export default CheckoutSuccess;

const Container = styled.div`
  min-height: 60vh;
  max-width: 1000px;
	padding: 20px;
  width: 100%;
  margin: auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  h2 {
    margin-bottom: 0.5rem;
    color: var(--action);
  }

  a {
    color: var(--action);
  }

	@media screen and (max-width: 1000px) {
		margin-top: 100px;
	}
`;
