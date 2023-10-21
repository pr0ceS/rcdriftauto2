import React from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import { url } from "../slices/api";

const PayButton = ({ cartItems }) => {
  const user = useSelector((state) => state.auth);

  const handleCheckout = () => {
    axios({
      method: "post",
      url: `${url}/stripe/create-checkout-session`,
      headers: {},
      data: {
        cartItems,
        userId: user._id,
      }
    }).then((response) => {
        if (response.data.url) {
          window.location.href = response.data.url;
        }
      })
      .catch((err) => console.log(err.message));
  };

  return (
    <>
      <button onClick={() => handleCheckout()}>Afrekenen</button>
    </>
  );
};

export default PayButton;
