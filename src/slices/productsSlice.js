import { createSlice, createAsyncThunk, combineReducers } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from 'redux-persist';
import storage from "redux-persist/lib/storage";
import axios from "axios";
import toast from "react-hot-toast";
import { url, setHeaders } from "./api";

const initialState = {
  items: [],
  status: null,
  createStatus: null,
  editStatus: null,
  deleteStatus: null,
};

export const productsFetch = createAsyncThunk(
  "products/productsFetch",
  async () => {
    try {
      const response = await axios.get(`${url}/products`);

      return response.data;
    } catch (error) {
      console.log(error);
    }
  }
);

export const productsCreate = createAsyncThunk(
  "products/productsCreate",
  async (values) => {
    try {
			// Console.log
			console.log(values);
      const response = await axios.post(
        `${url}/products`,
        values,
        setHeaders()
      );

			toast.success("Gerettet")
      return response.data;
    } catch (error) {
			toast.error(error);
    }
  }
);

export const productsEdit = createAsyncThunk(
  "products/productsEdit",
  async (values) => {
    try {
      const response = await axios.put(
        `${url}/products/${values.productId}`,
        values,
        setHeaders()
      );

			toast.success("Gerettet")
      console.log(response.data);
      return response.data;
    } catch (error) {
      console.log(error);
			toast.error(error);
    }
  }
);

export const productDelete = createAsyncThunk(
  "products/productDelete",
  async (id) => {
    try {
      const response = await axios.delete(
        `${url}/products/${id}`,
        setHeaders()
      );

			toast.success("Löscht")
      return response.data;
    } catch (error) {
			toast.error(error.response.data);
    }
  }
);

const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {},
  extraReducers: {
    [productsFetch.pending]: (state, action) => {
      state.status = "pending";
    },
    [productsFetch.fulfilled]: (state, action) => {
      state.items = action.payload;
      state.status = "success";
    },
    [productsFetch.rejected]: (state, action) => {
      state.status = "rejected";
    },
    [productsCreate.pending]: (state, action) => {
      state.createStatus = "pending";
    },
    [productsCreate.fulfilled]: (state, action) => {
      state.items.push(action.payload);
      state.createStatus = "success";
    },
    [productsCreate.rejected]: (state, action) => {
      state.createStatus = "rejected";
    },
    [productDelete.pending]: (state, action) => {
      state.deleteStatus = "pending";
    },
    [productDelete.fulfilled]: (state, action) => {
      const newList = state.items.filter(
        (item) => item._id !== action.payload._id
      );
      state.items = newList;
      state.deleteStatus = "success";
    },
    [productDelete.rejected]: (state, action) => {
      state.deleteStatus = "rejected";
    },
    [productsEdit.pending]: (state, action) => {
      state.editStatus = "pending";
    },
    [productsEdit.fulfilled]: (state, action) => {
      const updatedProducts = state.items.map((product) =>
        product._id === action.payload._id ? action.payload : product
      );
      state.items = updatedProducts;
      state.editStatus = "success";
    },
    [productsEdit.rejected]: (state, action) => {
      state.editStatus = "rejected";
    },
  },
});

export default productsSlice.reducer;
