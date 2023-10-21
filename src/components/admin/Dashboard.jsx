import React, { useState } from "react";
import styled from "styled-components";
import { Outlet, NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import { FaLock, FaUsers, FaStore, FaClipboard, FaTachometerAlt, FaBullhorn, FaServer, FaCog, FaEnvelope, FaReceipt } from "react-icons/fa";
import {BsFillChatDotsFill} from "react-icons/bs";

const Dashboard = () => {
  const [show, setShow] = useState(false);
  const auth = useSelector((state) => state.auth);

  if (!auth.isAdmin) return <p>Access Denied.</p>;

  return (
    <StyledDashboard className="show">
      <SideNav>
        <h3>MKB-ADMIN V2.0</h3>
        <NavLink
          className={({ isActive }) =>
            isActive ? "link-active" : "link-inactive"
          }
          to="/admin/summary"
        >
          <FaTachometerAlt /> Dashboard
        </NavLink>
        <NavLink
          className={({ isActive }) =>
            isActive ? "link-active" : "link-inactive"
          }
          to="/admin/products"
        >
          <FaStore /> Producten
        </NavLink>
        <NavLink
          className={({ isActive }) =>
            isActive ? "link-active" : "link-inactive"
          }
          to="/admin/orders"
        >
          <FaClipboard /> Bestellingen
        </NavLink>
				<NavLink
          className={({ isActive }) =>
            isActive ? "link-active" : "link-inactive"
          }
          to="/admin/invoices"
        >
          <FaReceipt /> Facturen
        </NavLink>
        <NavLink
          className={({ isActive }) =>
            isActive ? "link-active" : "link-inactive"
          }
          to="/admin/users"
        >
          <FaUsers /> Gebruikers
        </NavLink>
        <NavLink
          className={({ isActive }) =>
            isActive ? "link-active" : "link-inactive"
          }
          to="/admin/contact"
        >
          <BsFillChatDotsFill /> Contact
        </NavLink>
        <NavLink
          className={({ isActive }) =>
            isActive ? "link-active" : "link-inactive"
          }
          to="/admin/reviews"
        >
          <FaBullhorn /> Reviews
        </NavLink>
        <NavLink
          className={({ isActive }) =>
            isActive ? "link-active" : "link-inactive"
          }
          to="/admin/mailing-list"
        >
          <FaEnvelope /> Mail Lijst
        </NavLink>
        {/* <NavLink
          className={({ isActive }) =>
            isActive ? "link-active" : "link-inactive"
          }
          to="/admin/ip"
        >
          <FaLock /> IP Adressen
        </NavLink> */}
        <NavLink
          className={({ isActive }) =>
            isActive ? "link-active" : "link-inactive"
          }
          to="/admin/server"
        >
          <FaServer /> Server
        </NavLink>
        <NavLink
          className={({ isActive }) =>
            isActive ? "link-active" : "link-inactive"
          }
          to="/admin/instellingen"
        >
          <FaCog /> Instellingen
        </NavLink>
      </SideNav>
      <Content>
        <Outlet />
      </Content>
    </StyledDashboard>
  );
};

export default Dashboard;

const StyledDashboard = styled.div`
  display: flex;
  height: fit-content;

	@media screen and (max-width: 1000px) {
		margin-top: 120px;
	}
`;

const SideNav = styled.div`
  border: 1px solid rgba(224, 224, 224, 1);
  height: calc(100vh);
  width: 200px;
  display: flex;
  flex-direction: column;
  padding: 30px;

  h3 {
    margin: 0 0 1rem 0;
    padding: 0;
    text-transform: uppercase;
    font-size: 17px;
  }

  a {
    text-decoration: none;
    margin-bottom: 1.5rem;
    color: #444;
    font-size: 14px;
    display: flex;
    align-items: center;
    font-weight: 700;
    &:hover {
      color: var(--action);
      text-decoration: underline;
    }

    svg {
      margin-right: 0.5rem;
      font-size: 18px;
    }
  }
`;

const Content = styled.div`
  padding: 2rem 3rem;
  width: 100%;
`;
