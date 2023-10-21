import React, { useEffect, useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { useSelector, useDispatch } from "react-redux";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { ordersEdit, ordersFetch } from "../../../slices/ordersSlice";
import moment from "moment";
import { CircularProgress } from "@mui/material";

export default function OrderList() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { list } = useSelector((state) => state.orders);
	const [input, setInput] = useState("")
	const [foundOrders, setFoundOrders] = useState([])

  useEffect(() => {
    dispatch(ordersFetch());
  }, [dispatch]);

	useEffect(() => {
		try {
			setFoundOrders(list)
		} catch (error) {
			console.log(error);
		}
	}, [])

	const searchReference = (reference) => {
		setInput(reference.toUpperCase())
		const foundReference = list.filter(order => order.reference.includes(reference.toUpperCase()));
		setFoundOrders(foundReference);
	}

  const rows =
    list && list[0] &&
    foundOrders.map((order) => {
      return {
        id: order._id,
        cName: order.shipping.name,
				reference: order.reference,
        amount: (order.total / 100)?.toLocaleString('nl-nl', { maximumFractionDigits: 2, minimumFractionDigits: 2}),
        dStatus: order.delivery_status,
        date: moment(order.createdAt).fromNow(),
      };
    });

  const columns = [
    { field: "reference", headerName: "Referentienummer", width: 200 },
    { field: "cName", headerName: "Naam", width: 120 },
    { field: "amount", headerName: "Bedrag(€)", width: 100 },
    {
      field: "delivery_status",
      headerName: "Status",
      width: 100,
      renderCell: (params) => {
        return (
          <div>
            {params.row.dStatus === "pending" ? (
              <Pending>Pending</Pending>
            ) : params.row.dStatus === "dispatched" ? (
              <Dispatched>Pending</Dispatched>
            ) : params.row.dStatus === "delivered" ? (
              <Delivered>Delivered</Delivered>
            ) : (
              "error"
            )}
          </div>
        );
      },
    },
    { field: "date", headerName: "Datum", width: 120 },
    {
      field: "actions",
      headerName: "Acties",
      width: 220,
      renderCell: (params) => {
        return (
          <Actions>
            <DispatchBtn onClick={() => handleOrderDispatch(params.row.id)}>
              Dispatched
            </DispatchBtn>
            <DeliveryBtn onClick={() => handleDeliver(params.row.id)}>
              Delivered
            </DeliveryBtn>
            <View onClick={() => navigate(`/bestelling/${params.row.id}`)}>
              View
            </View>
          </Actions>
        );
      },
    },
  ];

  const handleOrderDispatch = (id) => {
    dispatch(
      ordersEdit({
        id,
        delivery_status: "dispatched",
      })
    );
  };

  const handleDeliver = (id) => {
    dispatch(
      ordersEdit({
        id,
        delivery_status: "delivered",
      })
    );
  };

  return (
		<>
			<div>
				<input value={input} onChange={(e) => searchReference(e.target.value)} type="text" placeholder="Zoek referentienummer" />
			</div>
			<div style={{ height: 400, width: "100%", marginTop: "2rem" }}>
        { rows ?
				<DataGrid
					rows={rows}
					columns={columns}
					pageSize={5}
					rowsPerPageOptions={[5]}
					checkboxSelection
					disableSelectionOnClick
				/>
         : <CircularProgress disableShrink />}
			</div>
		</>
  );
}

const Actions = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;

  button {
    border: none;
    outline: none;
    font-size: 12px;

    padding: 5px;
    color: white;
    border-radius: 3px;
    cursor: pointer;
  }
`;

const DispatchBtn = styled.button`
  background-color: rgb(38, 198, 249);
`;
const DeliveryBtn = styled.button`
  background-color: rgb(102, 108, 255);
`;
const View = styled.button`
  background-color: rgb(114, 225, 40);
`;

const Pending = styled.div`
  color: rgb(253, 181, 40);
  background: rgb(253, 181, 40, 0.12);
  padding: 3px 5px;
  border-radius: 3px;
  font-size: 14px;
`;
const Dispatched = styled.div`
  color: rgb(38, 198, 249);
  background-color: rgb(38, 198, 249, 0.12);
  padding: 3px 5px;
  border-radius: 3px;
  font-size: 14px;
`;

const Delivered = styled.div`
  color: rgb(102, 108, 255);
  background-color: rgba(102, 108, 255, 0.12);
  padding: 3px 5px;
  border-radius: 3px;
  font-size: 14px;
`;
