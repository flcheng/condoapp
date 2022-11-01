import React, { useContext } from "react";
import styled from "styled-components";
import { CondoDataContext } from "./CondoDataContext";
import { NavLink } from "react-router-dom";

const Header = () => {
  const { authenticated } = useContext(CondoDataContext);

  return (
    <Wrapper>
      <div className="logo"></div>
      {authenticated.isAuthenticated && authenticated.isAdmin && 
      <Menu>
        <NavLink to={'/bulletinboard'}>Bulletin Board</NavLink>
        <NavLink to={'/createuser'}>Create User</NavLink>
      </Menu>}
    </Wrapper>
  );
};

const Wrapper = styled.div`
    display: flex;
    position: fixed;
    top: 0;
    align-items: center;
    width: 100%;
    @media (max-width: 768px) {
      width: 100vw;
    }
    background-color: var(--color-white);
    z-index: 100;
    justify-content: space-between;
    padding: 10px;
    background: rgba(3, 83, 127, 0.6);
    box-shadow: 6px -2px 24px 3px rgb(3 83 127 / 60%);
`;

const Menu = styled.div`
    display: flex;
    align-items: center;
    a {
      color: var(--color-white);
      display: flex;
      padding: 20px;
      text-decoration: none;
      @media (max-width: 768px) {
        padding: 10px;
      }
    }
`;

export default Header;
