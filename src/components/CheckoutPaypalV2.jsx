import { 
	PayPalButtons,
	usePayPalScriptReducer,
} from '@paypal/react-paypal-js';
import React, { useEffect } from 'react'
import { url } from '../slices/api';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { toast } from 'react-hot-toast';

const CheckoutPaypalV2 = ({ cartItems, totalAmount }) => {
	const cart = useSelector((state) => state.cart);
  const user = useSelector((state) => state.auth);
  const navigate = useNavigate();

	let cartTotalAmount = totalAmount && totalAmount;

	const [{ options }, dispatch] = usePayPalScriptReducer();

	useEffect(() => {
			if(totalAmount) {
				dispatch({
					type: "resetOptions",
					value: {
						...options,
					}
				})
			}
	}, [cart])

	const createOrder = (data) => {
    // Order is created on the server and the order id is returned
    return fetch(`${url}/paypal/v2/create-paypal-order`, {
      method: "POST",
       headers: {
        "Content-Type": "application/json",
      },
      // use the "body" param to optionally pass additional order information
      // like product skus and quantities
      body: JSON.stringify({
        cart: [
          {
						description: "ErgotronLX",
            amount: (cartTotalAmount + 9.49),
          },
        ],
      }),
    })
    .then((response) => response.json())
    .then((order) => order.id);
  };
  const onApprove = (data) => {
     return fetch(`${url}/paypal/v2/capture-paypal-order`, {
      method: "POST",
       headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        orderID: data.orderID,
      })
    })
    .then((response) => {
			return response.json();
		}).then((data) => {
			try {
				axios({
					method: "post",
					url: `${url}/paypal/`,
					headers: {},
					data: {
						cartItems,
						userId: user._id,
						shipping: data.purchase_units[0].shipping.address,
						amount: Number(data.purchase_units[0].payments.captures[0].amount.value),
						email: data.payer.email_address,
						name: (`${data.payer.name.given_name} ${data.payer.name.surname}`),
						payment_method: "paypal",
						paypal_id: data.id,
						paypal_payer_id: data.payer.payer_id,
					}
				})
				.then(() => {
					navigate("/zahlung-abgeschlossen")
					toast.success("PayPal Zahlung erfolgreich")
				})
			} catch (error) {
				console.log(error);
			}
		})

  };
  return (
    <PayPalButtons
      createOrder={(data) => createOrder(data)}
      onApprove={(data) => onApprove(data)}
    />
  );
}

export default CheckoutPaypalV2