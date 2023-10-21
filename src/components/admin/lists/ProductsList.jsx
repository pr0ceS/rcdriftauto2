import * as React from "react";
import { DataGrid } from "@mui/x-data-grid";
import { useSelector, useDispatch } from "react-redux";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { productDelete } from "../../../slices/productsSlice";
import EditProduct from "../EditProduct";
import moment from "moment";
import 'moment/locale/nl'
moment.locale('nl')

export default function ProductsList() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { items } = useSelector((state) => state.products);

  const rows =
    items &&
    items.map((item) => {
      return {
        id: item._id,
        imageUrl: item.image[0],
				productUrl: item.url,
        pName: item.name,
        pDesc: item.desc,
        pStock: item.stock,
        price: (item.price).toLocaleString('nl-nl', { maximumFractionDigits: 2, minimumFractionDigits: 2}),
        pSale: item?.sale ? (item.sale).toLocaleString('nl-nl', { maximumFractionDigits: 2, minimumFractionDigits: 2}) : 0,
        createdAt: moment(item.createdAt).format('lll'),
        updatedAt: moment(item.updatedAt).format('lll'),
      };
    });

  const columns = [
    { field: "id", headerName: "ID", width: 80 },
    {
      field: "imageUrl",
      headerName: "Foto",
      width: 80,
      renderCell: (params) => {
        return (
          <ImageContainer>
            <img src={params.row.imageUrl} alt="" />
          </ImageContainer>
        );
      },
    },
    { field: "pName", headerName: "Naam", width: 130 },
    { field: "pDesc", headerName: "Beschrijving", width: 130 },
    {
      field: "price",
      headerName: "Bedrag(€)",
      width: 80,
    },
    {
      field: "pSale",
      headerName: "Korting(€)",
      width: 80,
    },
    {
      field: "pStock",
      headerName: "Voorraad",
      width: 80,
    },
    {
      field: "actions",
      headerName: "Acties",
      width: 220,
      renderCell: (params) => {
        return (
          <Actions>
            <Delete onClick={() => handleDelete(params.row.id)}>Verwijder</Delete>
            <EditProduct prodId={params.row.id} />
            <View onClick={() => navigate(`/produkt/${params.row.productUrl}`)}>
              Bekijk
            </View>
          </Actions>
        );
      },
    },
    {
      field: "createdAt",
      headerName: "Aanmaakdatum",
      width: 150,
    },
    {
      field: "updatedAt",
      headerName: "Bewerkdatum",
      width: 150,
    }
  ];

  const handleDelete = (id) => {
    dispatch(productDelete(id));
  };

  return (
    <div style={{ height: 400, width: "100%", marginTop: "2rem" }}>
      <DataGrid
        rows={rows}
        columns={columns}
        pageSize={5}
        rowsPerPageOptions={[5]}
        checkboxSelection
        disableSelectionOnClick
      />
    </div>
  );
}

const ImageContainer = styled.div`
  img {
    height: 40px;
  }
`;

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
