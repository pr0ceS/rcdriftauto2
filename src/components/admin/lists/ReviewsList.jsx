import React, { useEffect, useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { useSelector, useDispatch } from "react-redux";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { setHeaders, url } from "../../../slices/api";
import CircularProgress from '@mui/material/CircularProgress';
import axios from "axios";
import toast from "react-hot-toast";
import moment from "moment";
import 'moment/locale/nl';
import { Rating } from "@mui/material";
moment.locale('nl');

export default function ReviewsList() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

	const [reviews, setReviews] = useState({});
  const [loading, setLoading] = useState(false);

  const handleDelete = async (id) => {
		try {
			const res = await axios.delete(`${url}/products/review/${id}`, setHeaders())
		} catch (error) {
			console.log(error)
		}
		toast.error("Verwijderd")
		setTimeout(() => {
			window.location.reload();
		}, 1000);
	}

	useEffect(() => {
		const fetchReviews = async () => {
			try {
				setLoading(true);
				const res = await axios.get(`${url}/products/reviews`, setHeaders());

				setReviews(res.data);
				setLoading(false);
			} catch (error) {
				console.log(error)
			}
		}

		fetchReviews();
	}, [])

		const rows =
			reviews[0] && 
			reviews.map((review) => {
				return {
					id: review._id,
					productId: review.productId,
					uName: review.name,
					uEmail: review.email,
					stars: review.stars,
					title: review.title,
					message: review.message,
					createdAt: moment(review.createdAt).format('lll')
				};
			})

  const columns = [
    { field: "uName", headerName: "Naam", width: 130 },
    { 
			field: "stars",
			headerName: "Rating",
			width: 140,
			renderCell: (params) => {
				return (
					<Rating name="read-only" precision={0.5} value={params.row.stars} readOnly />
				)
			}
		},
    { field: "title", headerName: "Titel", width: 150 },
    { field: "message", headerName: "Bericht", width: 200 },
    { field: "uEmail", headerName: "Email", width: 200 },
    { field: "createdAt", headerName: "Geschreven op", width: 200 },
    {
      field: "actions",
      headerName: "Acties",
      width: 150,
      renderCell: (params) => {
        return (
          <Actions>
            <Delete onClick={() => handleDelete(params.row.id)}>Verwijder</Delete>
            <View onClick={() => navigate(`/produkt/${params.row.url}`)}>Bekijk</View>
          </Actions>
        );
      },
    },
    { field: "id", headerName: "ID", width: 120 },
    { field: "productId", headerName: "Product ID", width: 120 },
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
			: "Geen reviews"}
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
