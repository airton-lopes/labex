import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useHistory } from "react-router-dom";
import Axios from "axios";

const MainContainer = styled.div`
  height: 75vh;
  padding-left: 320px;
  padding-right: 320px;
  display: flex;
  flex-direction: column;
`
const CreateTripButton = styled.button`
  cursor: pointer;
  width: 240px;
  height: 42px;
  background-color: #05c46b;
  border-radius: 0px 12px 0px 12px;
  font-size: 2em;
  font-weight: 700;
  outline: none;
`
const DetailTripButton = styled.button`
  cursor: pointer;
  width: 180px;
  height: 36px;
  background-color: #45aaf2;
  border-radius: 0px 12px 0px 12px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 1em;
  font-weight: 700;
  outline: none;
  position: relative;
  bottom: 0px;
`
const TripCardContainer = styled.div`
  display: flex;
  flex-direction: column;
  border: 2px solid;
  width: 400px;
  min-height: 260px;
  padding: 20px;
  margin: 20px;
  border-radius: 1em;
  background-color: #ffffff;
`
const TripsContainer = styled.div`
  overflow: auto;
  display: flex;
  justify-content: space-evenly;
  flex-direction: row;
  flex-wrap: wrap;
  padding: 0px 32px 0px 32px;
`
const MainTitleHeader = styled.div`
  width: 60vw;
  display: flex;
  justify-content: space-evenly;
  align-items: center;
`

const baseUrl = "https://us-central1-labenu-apis.cloudfunctions.net/labeX/airton-turing"

export default function ListTripsPage() {
  const history = useHistory();
  const [tripsList, setTripsList] = useState([])

  useEffect(() => {
    const token = window.localStorage.getItem("token")

    if (token === null) {
      history.push("/login")
    } else {
      getTrips()
    }
  }, [history])

  const getTrips = () => {
    const token = window.localStorage.getItem("token")
  
    Axios.get(`${baseUrl}/trips`, {
      headers: {
        auth: token
      }
    }).then(response => {
      setTripsList(response.data.trips)
    }).catch(err => {
      console.log(err.message)
    })
  }

  const goToTripDetailsPage = (tripId) => {
    history.push(`/trips/details/${tripId}`);
  };

  const goToCreateTripPage = () => {
    history.push("/trips/create");
  };

  return (
    <MainContainer>
      <MainTitleHeader>
        <CreateTripButton onClick={goToCreateTripPage}>Criar viagem</CreateTripButton>
        <h1>Lista de Viagens:</h1>
      </MainTitleHeader>
      <TripsContainer>
        {tripsList.map((trip) => {
                    return <TripCardContainer key={trip.id}>
                    <h2>{trip.name}</h2>
                    <p>{trip.description}</p>
                    <p>Planeta: {trip.planet}</p>
                    <p>Data de embarque: {trip.date}</p>
                    <p>Duracao da viagem: {trip.durationInDays} Dias</p>
                    <DetailTripButton onClick={() => goToTripDetailsPage(trip.id)}>Detalhes da viagem</DetailTripButton>
                    </TripCardContainer>
                })}
      </TripsContainer>
    </MainContainer>
  );
}