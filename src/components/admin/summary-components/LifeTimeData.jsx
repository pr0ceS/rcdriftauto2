import axios from "axios";
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { setHeaders, url } from "../../../slices/api";

const LifeTimeData = () => {
  const [users, setUsers] = useState([]);
  const [orders, setOrders] = useState([]);
	const [visitors, setVisitors] = useState([]);
  const [reviews, setReviews] = useState([]);

  function compare(a, b) {
    if (a._id < b._id) {
      return 1;
    }
    if (a._id > b._id) {
      return -1;
    }
    return 0;
  }

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await axios.get(`${url}/users/stats`, setHeaders());

        res.data.sort(compare);
        setUsers(res.data);
      } catch (err) {
        console.log(err);
      }
    }
    fetchData();
  }, []);

	useEffect(() => {
    async function fetchData() {
      try {
        const res = await axios.get(`${url}/orders/`, setHeaders());

				let counter = 0;
				for (const order of res.data) {
					counter++
				}

				setOrders(counter);
      } catch (err) {
        console.log(err.response.data);
      }
    }
    fetchData();
  }, []);

	useEffect(() => {
    async function fetchData() {
      try {
        const res = await axios.get(`${url}/visitor/`, setHeaders());

				setVisitors(res.data);
      } catch (err) {
        console.log(err);
      }
    }
    fetchData();
  }, []);

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await axios.get(`${url}/products/reviews/count`, setHeaders());

				setReviews(res.data);
      } catch (err) {
        console.log(err);
      }
    }
    fetchData();
  }, []);


  return (
    <Main>
      <h3>In totaal</h3>
      <Info>
        <Title>Totaal Gebruikers</Title>
        <Data>{users[0] ? users[0].total : 0}</Data>
      </Info>
      <Info>
        <Title>Totaal Bestellingen</Title>
        <Data>{orders ? orders : 0}</Data>
      </Info>
      <Info>
        <Title>Totaal Reviews</Title>
        <Data>{reviews ? reviews : 0}</Data>
      </Info>
      <Info>
        <Title>Bezoekers</Title>
        <Data>{visitors ? visitors : 0}</Data>
      </Info>
    </Main>
  );
};

export default LifeTimeData;

const Main = styled.div`
  background: rgb(48, 51, 78);
  color: rgba(234, 234, 255, 0.87);
  margin-top: 1.5rem;
  border-radius: 5px;
  padding: 1rem;
  font-size: 14px;
`;

const Info = styled.div`
  display: flex;
  margin-top: 1rem;
  padding: 0.3rem;
  border-radius: 3px;
  background: rgba(38, 198, 249, 0.12);

  &:nth-child(even) {
    background: rgba(102, 108, 255, 0.12);
  }
`;
const Title = styled.div`
  flex: 1;
`;
const Data = styled.div`
  flex: 1;
  font-weight: 700;
`;
