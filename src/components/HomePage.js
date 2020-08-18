import React from "react";
import styled from "styled-components";
import { useHistory } from "react-router-dom";
import Planet1 from '../images/planets/planeta1.jpg'
import Planet2 from '../images/planets/planeta2.jpg'
import Planet3 from '../images/planets/planeta3.jpg'
import Planet4 from '../images/planets/planeta4.jpg'

const MainContainer = styled.div`
  width: 100vw;
  height: 75vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`
const Img = styled.img`
  width: 12rem;
  height: 8rem;
  margin: 1rem 0.5rem 1rem 0.5rem;
  box-shadow: 1em 1em 1em black;
`
const TripsImageContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
  flex-wrap: wrap;
  overflow: auto;
  width: 70vw;
`
const SubscriptionButton = styled.button`
  cursor: pointer;
  width: 20rem;
  height: 3rem;
  background-color: #fc5c65;
  border-radius: 0px 12px 0px 12px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 2em;
  font-weight: 700;
  color: #ffffff;
  text-shadow: 0 0 8px black;
  margin-top: 10vh;
`
const MainTitle = styled.h1`
  font-size: 2em;
  font-weight: 500;
  color: #ffffff;
  text-shadow: 0 0 8px black;
  margin-bottom: 10vh;
  width: 50vw;
  text-align: center;
`

export default function HomePage() {
  const history = useHistory();

  const goToApplicationFormPage = () => {
    history.push("/application-form");
  };

  return (
    <MainContainer>
      <MainTitle>Deseja desfrutar dessas belíssimas paisagens do nosso sistema solar?</MainTitle>
      <TripsImageContainer>
        <Img src={Planet1} />
        <Img src={Planet2} />
        <Img src={Planet3} />
        <Img src={Planet4} />
      </TripsImageContainer>
      <SubscriptionButton onClick={goToApplicationFormPage}>Inscreva-se agora!</SubscriptionButton>
    </MainContainer>
  );
}