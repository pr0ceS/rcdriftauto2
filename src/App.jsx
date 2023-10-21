import "./App.scss";
import { BrowserRouter, Routes, Route } from "react-router-dom";
// import { PayPalScriptProvider } from "@paypal/react-paypal-js";

import Home from "./components/Home";
import NavBar from "./components/NavBar";
import NotFound from "./components/NotFound";
import Cart from "./components/Cart";

import React, { useEffect } from "react";
import { Toaster } from "react-hot-toast";
import Register from "./components/auth/Register";
import Login from "./components/auth/Login";
import ProductsPage from "./components/ProductsPage";
import { useDispatch } from "react-redux";
import { loadUser } from "./slices/authSlice";
import CheckoutSuccess from "./components/CheckoutSuccess";
import Dashboard from "./components/admin/Dashboard";
import Products from "./components/admin/Products";
import Users from "./components/admin/Users";
import Orders from "./components/admin/Orders";
import Summary from "./components/admin/Summary";
import CreateProduct from "./components/admin/CreateProduct";
import ProductsList from "./components/admin/lists/ProductsList";
import Product from "./components/Details/Product";
import UserProfile from "./components/Details/UserProfile";
import Order from "./components/Details/Order";
import UserOrders from "./components/Details/UserOrders";
import Klantenservice from "./components/Klantenservice";
import FAQ from "./components/info/FAQ";
import Footer from "./components/Footer";
import ScrollToTop from "./ScrollToTop";
// import Privacybeleid from "./components/info/Privacybeleid";
import Retourbeleid from "./components/info/Retourbeleid";
import Algemenevoorwaarden from "./components/info/Algemenevoorwaarden";
import Verzendbeleid from "./components/info/Verzendbeleid";
import Impressum from "./components/info/Impressum";
import Reviews from "./components/admin/Reviews";
import Server from "./components/admin/Server";
// import Ips from "./components/admin/Ips";
import MailList from "./components/admin/MailingList";
import Contact from "./components/admin/Contact";
import Invoices from "./components/admin/Invoices";
import { PayPalScriptProvider } from "@paypal/react-paypal-js";

// const initialOptions = {
//   "client-id": "Ae4Yr0-ydoK23Ujy5BDUK-iznEzBN8SpgoxforBS15e-hA6cPFC8p8sWEmPXcrGZwMvSCHT5ydH0dvVW",
//   currency: "EUR",
//   intent: "capture",
// }

function App() {
  const dispatch = useDispatch();

	const initialOptions = {
		"client-id": "AU1zM9clGWNkex9sDW_so4FbZo8Ipa1cImeLbY6A69vCTFjvjRo0NngM9kPjJyDEEWGIolmUl3ep-9X0",
		currency: "EUR",
		intent: "capture",
		// deferLoading: false,
	}

  useEffect(() => {
    dispatch(loadUser(null));
  }, [dispatch]);

  return (
		<div className="App">
			<PayPalScriptProvider options={initialOptions}>
				<Toaster position="bottom-left" toastOptions={{ duration: 5000, error: { duration: 20000 }, style: { background: "#333", color: "#fff"} }}/>
				<BrowserRouter>
					<ScrollToTop />
					{/* {statement && <Statement />} */}
					<NavBar />
					<div className="content-container">
						<Routes>
							<Route path="/" element={<Home />} />
							<Route path="/winkelwagen" element={<Cart />} />
							<Route path="/betaald" element={<CheckoutSuccess />} />
							<Route path="/registreren" element={<Register />} />
							<Route path="/inloggen" element={<Login />} />
							<Route path="/auto/:id" element={<Product />} />
							<Route path="/autos" element={<ProductsPage />} />
							<Route path="/bestelling/:id" element={<Order />} />
							<Route path="/bestellingen" element={<UserOrders />} />
							<Route path="/klantenservice" element={<Klantenservice />} />
							<Route path="/faq" element={<FAQ />} />
							{/* <Route path="/privacy-beleid" element={<Privacybeleid />} /> */}
							<Route path="/retourbeleid" element={<Retourbeleid />} />
							<Route path="/verzendbeleid" element={<Verzendbeleid />} />
							<Route path="/algemenevoorwaarden" element={<Algemenevoorwaarden />} />
							<Route path="/bedrijfsgegevens" element={<Impressum />} />
							<Route path="/account/:id" element={<UserProfile />} />
							<Route path="/admin" element={<Dashboard />}>
								<Route path="summary" element={<Summary />} />
								<Route path="products" element={<Products />}>
									<Route index element={<ProductsList />} />
									<Route path="create-product" element={<CreateProduct />} />
								</Route>
								<Route path="users" element={<Users />} />
								<Route path="orders" element={<Orders />} />
								<Route path="invoices" element={<Invoices/>} />
								<Route path="reviews" element={<Reviews />} />
								<Route path="mailing-list" element={<MailList />} />
								<Route path="contact" element={<Contact />} />
								<Route path="server" element={<Server />} />
							</Route>
							<Route path="*" element={<NotFound />} />
						</Routes>
					</div>
					<Footer />
				</BrowserRouter>
			</PayPalScriptProvider>
    </div>
  );
}

export default App;
