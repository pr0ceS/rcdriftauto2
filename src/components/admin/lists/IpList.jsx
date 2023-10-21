import React, { useEffect, useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import styled from "styled-components";
import { setHeaders, url } from "../../../slices/api";
import CircularProgress from '@mui/material/CircularProgress';
import axios from "axios";
import moment from "moment";
import 'moment/locale/nl';
moment.locale('nl');

export default function IpList() {
	const [ipAddresses, setIpAddresses] = useState({});

	useEffect(() => {
		const fetchIpAddresses = async () => {
			try {
				const res = await axios.get(`${url}/info/ip`, setHeaders());

				setIpAddresses(res.data);
			} catch (error) {
				console.log(error)
			}
		}

		fetchIpAddresses();
	}, [])

		const rows =
			ipAddresses[0] && 
			ipAddresses.map((ipAddress) => {
				return {
					id: ipAddress._id,
					ipAddress: ipAddress.ipAddress, 
					createdAt: moment(ipAddress.createdAt).format('lll')
				};
			})

  const columns = [
    { field: "ipAddress", headerName: "IP ADRES", width: 250 },
    { field: "createdAt", headerName: "BEZOCHT OP", width: 200 },
    { field: "id", headerName: "ID", width: 250 },
  ];

  return (
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
