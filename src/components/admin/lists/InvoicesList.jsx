import React, { useEffect, useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import styled from "styled-components";
import { setHeaders, url } from "../../../slices/api";
import { useSelector } from 'react-redux';
import { useNavigate } from "react-router-dom";
import CircularProgress from '@mui/material/CircularProgress';
import axios from "axios";
import moment from "moment";
import 'moment/locale/nl';
moment.locale('nl');

export default function InvoicesList() {
  const auth = useSelector((state) => state.auth);
  const navigate = useNavigate();
	const [invoices, setInvoices] = useState({});
	const [input, setInput] = useState("")
	const [foundInvoices, setFoundInvoices] = useState([])

	useEffect(() => {
		const fetchInvoices = async () => {
			try {
				const res = await axios.get(`${url}/invoice/all`, setHeaders());

				setFoundInvoices(res.data);
				setInvoices(res.data);
			} catch (error) {
				console.log(error)
			}
		}

		fetchInvoices();
	}, [])

	const searchReference = (reference) => {
		setInput(reference.toUpperCase())
		const foundReference = invoices.filter(invoice => invoice.reference.includes(reference.toUpperCase()));
		setFoundInvoices(foundReference);
	}

	const openInvoice = async (param) => {
		try {
			const res = await axios.get(
				`${url}/invoice/${param}/${auth._id}`,
				{
					responseType: "blob",
					headers: {
      		"x-auth-token": localStorage.getItem("token"),
    			},
				},
			);

			window.open(URL.createObjectURL(res.data));
		} catch (error) {
			console.log(error);
		}
	}

	const rows =
		invoices[0] && 
		foundInvoices.map((invoice) => {
			return {
				id: invoice._id,
				reference: invoice.reference,
				invoiceNumber: invoice.invoiceNumber,
				total: (invoice.total / 100)?.toLocaleString('nl-nl', { maximumFractionDigits: 2, minimumFractionDigits: 2}),
				paymentMethod: invoice.paymentMethod,
				shippingMethod: invoice.shippingMethod,
				date: moment(invoice.Date).format('lll'),
				company: invoice?.addressB?.company ? invoice?.addressB?.company : "",
				userId: invoice.userId,
				createdAt: moment(invoice.createdAt).format('lll')
			};
		})


  const columns = [
    { field: "reference", headerName: "Referentienummer", width: 150 },
    { field: "invoiceNumber", headerName: "Factuurnummer", width: 130 },
    { field: "total", headerName: "Totale Prijs (€)", width: 120 },
    { field: "paymentMethod", headerName: "Betaalmethode", width: 120 },
    { field: "shippingMethod", headerName: "Verzendmethode", width: 60 },
    { field: "date", headerName: "Datum", width: 150 },
    { field: "company", headerName: "Bedrijf/Naam", width: 150 },
    { field: "id", headerName: "ID", width: 80 },
		{
      field: "actions",
      headerName: "Acties",
      width: 300,
      renderCell: (params) => {
        return (
          <Actions>
            <View onClick={() => openInvoice(params.row.reference)}>Factuur openen</View>
          </Actions>
        );
      },
    },
  ];

  return (
		<>
			<div>
				<input value={input} onChange={(e) => searchReference(e.target.value)} type="text" placeholder="Zoek referentienummer" />
			</div>
			<div style={{ height: 400, width: "100%", marginTop: "2rem" }}>
				{rows ?
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

const Delete = styled.button`
  background-color: rgb(255, 77, 73);
`;
const View = styled.button`
  background-color: rgb(114, 225, 40);
`;
const Order = styled.button`
  background-color: rgb(238, 75, 43);
`;
const Admin = styled.div`
  color: rgb(253, 181, 40);
  background: rgb(253, 181, 40, 0.12);
  padding: 3px 5px;
  border-radius: 3px;
  font-size: 14px;
`;
const Customer = styled.div`
  color: rgb(38, 198, 249);
  background-color: rgb(38, 198, 249, 0.12);
  padding: 3px 5px;
  border-radius: 3px;
  font-size: 14px;
`;
