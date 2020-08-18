import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useHistory, useParams } from "react-router-dom";
import Axios from "axios";

const baseUrl = "https://us-central1-labenu-apis.cloudfunctions.net/labeX/airton-turing"

const MainContainer = styled.div`
  width: 100vw;
  height: 75vh;
  display: flex;
  justify-content: center;
`
const AwaitingCandidatesContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  border: 2px solid;
  width: 40vw;
  height: 60vh;
  padding: 20px;
  margin: 20px;
  border-radius: 1em;
  overflow: auto;
  margin-top: 10vh;
  background-color: #3D9FDD;
`
const ApprovedCandidatesContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  border: 2px solid;
  width: 40vw;
  height: 60vh;
  padding: 20px;
  margin: 20px;
  border-radius: 1em;
  overflow: auto;
  margin-top: 10vh;
  background-color: #3D9FDD;
`
const Candidates = styled.div`
  display: flex;
  flex-direction: column;
  border: 2px solid;
  width: 30vw;
  padding: 20px;
  margin: 20px;
  border-radius: 1em;
  background-color: #ffffff;
`
const Approved = styled.div`
  display: flex;
  flex-direction: column;
  border: 2px solid;
  width: 30vw;
  padding: 20px;
  margin: 20px;
  border-radius: 1em;
  background-color: #ffffff;
`
const ApproveButton = styled.button`
  cursor: pointer;
  width: 96px;
  height: 36px;
  background-color: #05c46b;
  border-radius: 0px 12px 0px 12px;
  font-size: 1.3em;
  font-weight: 700;
  outline: none;
`
const RefuseButton = styled.button`
  cursor: pointer;
  width: 96px;
  height: 36px;
  background-color: #eb3b5a;
  border-radius: 0px 12px 0px 12px;
  font-size: 1.3em;
  font-weight: 700;
  outline: none;
`
const ButtonsContainer = styled.div`
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  padding: 2em;
`
const AwaitingMainTitle = styled.h1`
  color: #ffffff;
  text-shadow: 0 0 8px black;
`
const ApprovedMainTitle = styled.h1`
  color: #ffffff;
  text-shadow: 0 0 8px black;
`

export default function TripDetailsPage() {
  const history = useHistory();
  const params = useParams();
  const [tripDetailList, setTripDetailList] = useState([])

  useEffect(() => {
    const token = window.localStorage.getItem("token")

    if (token === null) {
      history.push("/login")
    } else {
        getTripDetail()
    }
  }, [history])

  const getTripDetail = () => {
    const token = window.localStorage.getItem("token")
  
    Axios.get(`${baseUrl}/trip/${params.tripId}`, {
      headers: {
        auth: token
      }
    }).then(response => {
        setTripDetailList(response.data.trip)
    }).catch(err => {
      console.log(err.message)
    })
  }

  const handleChooseCandidate = (candidateId, option) => {
    const token = window.localStorage.getItem("token")
    const body = {
        approve: option
    }
    const axiosConfig = {
      headers: {
        auth: token
      }  
    }

    Axios.put(`${baseUrl}/trips/${params.tripId}/candidates/${candidateId}/decide`, body, axiosConfig)
    .then(() => {
      if (option === true) {
        alert(`Candidato aprovado com sucesso!`)
      } else {
        alert(`Candidato reprovado com sucesso!`)
      }
      history.push("/")
    })
    .catch((err) => {
      console.log(err.message)
    })
  }

  return (
    <MainContainer>
      <AwaitingCandidatesContainer>
        <AwaitingMainTitle>Candidatos aguardando aprovação:</AwaitingMainTitle>
          {tripDetailList.candidates && tripDetailList.candidates.map((detail) => {
                      return   <Candidates key={detail.id}>
                                 <h2>Nome: {detail.name}</h2>
                                 <p>Pais: {detail.country}</p>
                                 <p>Profissao: {detail.profession}</p>
                                 <p>Idade: {detail.age}</p>
                                 <p>{detail.applicationText}</p>
                                 <ButtonsContainer>
                                  <ApproveButton onClick={() => handleChooseCandidate(detail.id, true)}>Aprovar</ApproveButton>
                                  <RefuseButton onClick={() => handleChooseCandidate(detail.id, false)}>Recusar</RefuseButton>
                                 </ButtonsContainer>
                               </Candidates>
                  })}
      </AwaitingCandidatesContainer>
      <ApprovedCandidatesContainer>
        <ApprovedMainTitle>Candidatos aprovados para esta viagem:</ApprovedMainTitle>
          {tripDetailList.approved && tripDetailList.approved.map((detail) => {
                      return  <Approved key={detail.id}>
                                <h2>Nome: {detail.name}</h2>
                                <p>Pais: {detail.country}</p>
                                <p>Profissao: {detail.profession}</p>
                                <p>Idade: {detail.age}</p>
                                <p>{detail.applicationText}</p>
                              </Approved>
                  })}
      </ApprovedCandidatesContainer>
    </MainContainer>
  );
}