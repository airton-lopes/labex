import React from 'react';
import styled from "styled-components";
import { useHistory } from "react-router-dom";

const Logo = styled.div`
  cursor: pointer;
  background-color: #ffffff;
  font-size: 3rem;
  font-weight: 900;
  color: black;
  width: 10rem;
  height: 4rem;
  border-radius: 12px 0px 12px 0px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-bottom: 4px solid #2d98da;
  border-right: 4px solid #2d98da;
  position: relative;
  right: -9vw;
`

const HeaderDiv = styled.div`
  height: 15vh;
  width: 100vw;
  display: flex;
  justify-content: center;
  align-items: center;
  box-shadow: 0em 3em 2em #2d98da;
  flex-wrap: wrap;
`
const GoToLoginPageButton = styled.button`
  cursor: pointer;
  width: 96px;
  height: 36px;
  background-color: #45aaf2;
  border-radius: 0px 12px 0px 12px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 1.3em;
  font-weight: 700;
  position: relative;
  left: 20vw;
  outline: none;
  margin: 0 10px;
`
const GoToListTripsPageButton = styled.button`
  cursor: pointer;
  width: 96px;
  height: 36px;
  background-color: #45aaf2;
  border-radius: 0px 12px 0px 12px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 1.3em;
  font-weight: 700;
  position: relative;
  left: 20vw;
  outline: none;
  margin: 0 10px;
`
const HandleLogoutButton = styled.button`
  cursor: pointer;
  width: 96px;
  height: 36px;
  background-color: #eb3b5a;
  border-radius: 0px 12px 0px 12px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 1.3em;
  font-weight: 700;
  position: relative;
  left: 20vw;
  margin: 0 10px;
  outline: none;
`

export default function Header() {
  const history = useHistory();
  
  const handleLogout = () => {
    window.localStorage.clear();
    history.push("/");
  };

  const goToHomePage = () => {
    history.push("/");
  };

  const goToLoginPage = () => {
    history.push("/login");
  };

  const goToListTripsPage = () => {
    history.push("/trips/list");
  };

  return (
    <HeaderDiv>
      <Logo onClick={goToHomePage}>LabeX</Logo>
      <GoToListTripsPageButton onClick={goToListTripsPage}>Viagens</GoToListTripsPageButton>
      <GoToLoginPageButton onClick={goToLoginPage}>Admin</GoToLoginPageButton>
      <HandleLogoutButton onClick={handleLogout}>Logout</HandleLogoutButton>
    </HeaderDiv>
  );
}