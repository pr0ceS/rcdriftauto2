import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useParams } from "react-router-dom";
import axios from "axios";
import { setHeaders, url } from "../../slices/api";

const Order = () => {
  const params = useParams();

  const [order, setOrder] = useState({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        setLoading(true);
        const res = await axios.get(
          `${url}/orders/findOne/${params.id}`,
          setHeaders()
        );

        setOrder(res.data);
        setLoading(false);
      } catch (err) {
        console.log(err);
      }
    };

    fetchOrder();
  }, [params.id]);

  return (
    <StyledOrder>
      {loading ? (
        <p>Laden...</p>
      ) : (
        <>
          <OrdersContainer>
            <h2>Bestelling Details</h2>
            <p>
						Delivery Status:{" "}
              {order.delivery_status === "pending" ? (
                <Pending>Pending</Pending>
              ) : order.delivery_status === "dispatched" ? (
                <Dispatched>Dispatch</Dispatched>
              ) : order.delivery_status === "delivered" ? (
                <Delivered>Delivered</Delivered>
              ) : (
                "error"
              )}
            </p>
						<p>Betaling Status</p>
						{order.payment_status === "unpaid" ? (
							<Pending>Unpaid</Pending>
						) : order.payment_status === "paid" ? (
							<Delivered>Paid</Delivered>
						) : "Unknown"
						}

            <h3>Bestelde Producten</h3>
            <Items>
              {order.products?.map((product, index) => (
                <Item key={index}>
                  <div>
                    <span>{product?.description ? product?.description : product?.name}</span>
                    <span>{product.cartQuantity ? product.cartQuantity : product.quantity}</span>
                    <span>
                      {"€" + (product?.amount_total ? (product?.amount_total / 100) : (product.price * product.cartQuantity)).toLocaleString('nl-nl', { maximumFractionDigits: 2, minimumFractionDigits: 2})}

                    </span>
                  </div>
                </Item>
              ))}
            </Items>
            <div>
              <h3>Totaal</h3>
              <p>{"€" + (order.total / 100).toLocaleString('nl-nl', { maximumFractionDigits: 2, minimumFractionDigits: 2})}</p>
            </div>
            {order.payment_method === "stripe" &&
              <div>
                <h3>Verzendgegevens</h3>
                <p>Klant: {order?.shipping?.name ? order?.shipping?.name : "-"}</p>
                <p>Stad: {order?.shipping?.address?.city ? order?.shipping?.address?.city : "-"}</p>
                <p>Straat: {order?.shipping?.address?.line1 ? order?.shipping?.address?.line1 : "-"}</p>
                <p>Straat 2: {order?.shipping?.address?.line2 ? order?.shipping?.address?.line2 : "-"}</p>
                <p>Postcode: {order?.shipping?.address?.postal_code ? order?.shipping?.address?.postal_code : "-"}</p>
                <p>Land: {order?.shipping?.address?.country ? order?.shipping?.address?.country : "-"}</p>
                <p>Staat: {order?.shipping?.address?.state ? order?.shipping?.address?.state : "-"}</p>
                <p>Email: {order?.shipping?.email ? order?.shipping?.email : "-"}</p>
              </div>
              }
              {order.payment_method === "paypal" && 
                <div>
                  <h3>Verzendgegevens</h3>
                  <p>Klant: {order?.shipping?.name ? order?.shipping?.name : "-"}</p>
                  <p>Stad: {order?.shipping?.shipping?.admin_area_2 ? order?.shipping?.shipping?.admin_area_2 : "-"}</p>
                  <p>Straat: {order?.shipping?.shipping?.address_line_1 ? order?.shipping?.shipping?.address_line_1 : "-"}</p>
                  <p>Straat 2: {order?.shipping?.shipping?.address_line_2 ? order?.shipping?.shipping?.address_line_2 : "-"}</p>
                  <p>Postcode: {order?.shipping?.shipping?.postal_code ? order?.shipping?.shipping?.postal_code : "-"}</p>
                  <p>Land: {order?.shipping?.shipping?.country_code ? order?.shipping?.shipping?.country_code : "-"}</p>
                  <p>Email: {order?.shipping?.email ? order?.shipping?.email : "-"}</p>
                </div>
              }
							{order.payment_method &&
              <div>
                <h3>Verzendgegevens</h3>
                <p>Klant: {order?.shipping?.name ? order?.shipping?.name : "-"}</p>
                <p>Stad: {order?.shipping?.address?.city ? order?.shipping?.address?.city : "-"}</p>
                <p>Straat: {order?.shipping?.address?.line1 ? order?.shipping?.address?.line1 : "-"}</p>
                <p>Straat 2: {order?.shipping?.address?.line2 ? order?.shipping?.address?.line2 : "-"}</p>
                <p>Postcode: {order?.shipping?.address?.postal_code ? order?.shipping?.address?.postal_code : "-"}</p>
                <p>Land: {order?.shipping?.address?.country ? order?.shipping?.address?.country : "-"}</p>
                <p>Staat: {order?.shipping?.address?.state ? order?.shipping?.address?.state : "-"}</p>
                <p>Email: {order?.shipping?.email ? order?.shipping?.email : "-"}</p>
              </div>
              } 
              <div>
                <h3>Betaalmethode</h3>
                <p>{order?.payment_method}</p>
                {order?.payment_method === "paypal" &&
                <>
                  <p>Paypal ID: {order?.paypal_id}</p>
                  <p>Paypal Payer ID: {order?.paypal_payer_id}</p>
                </>
                }
              </div>
          </OrdersContainer>
        </>
      )}
    </StyledOrder>
  );
};

export default Order;

const StyledOrder = styled.div`
  margin: 3rem;
  display: flex;
  justify-content: center;

  h3 {
    margin: 1.5rem 0 0.5rem 0;
  }

	@media screen and (max-width: 1000px) {
		margin-top: 120px;
	}
`;

const OrdersContainer = styled.div`
  max-width: 500px;
  width: 100%;
  height: auto;
  box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
  border-radius: 5px;
  padding: 2rem;
`;

const Items = styled.div`
  span {
    margin-right: 1.5rem;
    &:first-child {
      font-weight: bold;
    }
  }
`;

const Item = styled.li`
  margin-left: 0.5rem;
  margin-bottom: 0.5rem;
`;

const Pending = styled.span`
  color: rgb(253, 181, 40);
  background: rgb(253, 181, 40, 0.12);
  padding: 3px 5px;
  border-radius: 3px;
  font-size: 14px;
`;
const Dispatched = styled.span`
  color: rgb(38, 198, 249);
  background-color: rgb(38, 198, 249, 0.12);
  padding: 3px 5px;
  border-radius: 3px;
  font-size: 14px;
`;

const Delivered = styled.span`
  color: rgb(102, 108, 255);
  background-color: rgba(102, 108, 255, 0.12);
  padding: 3px 5px;
  border-radius: 3px;
  font-size: 14px;
`;
