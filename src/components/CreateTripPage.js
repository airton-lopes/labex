import React from "react";
import styled from "styled-components";
import useForm from '../hooks/useForm'
import { useHistory } from "react-router-dom";
import { useEffect } from "react";
import Axios from "axios";

const MainContainer = styled.div`
  width: 100vw;
  height: 75vh;
  display: flex;
  justify-content: center;
  align-items: center;
`
const SubscriptionForm = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border-radius: 20px;
  width: 25rem;
  height: 25rem;
  background-color: #ecf0f3;
  box-shadow: 0px 0px 10px #ffffff;
  opacity: 0.92;
`
const Imput = styled.input`
  width: 300px;
  height: 36px;
  margin-bottom: 8px;
  border: none;
  outline: none;
  background: none;
  color: #555;
  border-radius: 25px;
  padding: 0px 0px 0px 20px;
  box-shadow: inset 5px 5px 5px #cbced1,
              inset -5px -5px 5px #ffffff;
              :hover {
                background: #FFFFFF;
                    }
`
const Select = styled.select`
  width: 300px;
  height: 36px;
  margin-bottom: 8px;
  border: none;
  outline: none;
  background: none;
  color: #555;
  border-radius: 25px;
  padding: 0px 0px 0px 20px;
  box-shadow: inset 5px 5px 5px #cbced1,
              inset -5px -5px 5px #ffffff;
              :hover {
                background: #FFFFFF;
                    }
`
const Label = styled.label`
  font-size: 1.2em;
  font-weight: 600;
`
const SendCreateTrip = styled.button`
  cursor: pointer;
  width: 150px;
  height: 36px;
  background-color: #05c46b;
  border-radius: 0px 12px 0px 12px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 1.3em;
  font-weight: 700;
  outline: none;
`

export default function CreateTripPage() {
  const history = useHistory();
    const { form, onChange } = useForm({
    name: "",
    planet: "",
    date: "",
    description: "",
    durationInDays: ""
  });  
  
  useEffect(() => {
    const token = window.localStorage.getItem("token")

    if (token === null) {
      history.push("/login")
    }
  }, [history])

  const baseUrl = "https://us-central1-labenu-apis.cloudfunctions.net/labeX/airton-turing"

  const today = new Date().toISOString().split("T")[0]

  const handleCreateTrip = (e) => {
    e.preventDefault()
    const token = window.localStorage.getItem("token")
    const [year, month, day] = form.date.split("-")
    const body = {
      name: form.name,
      planet: form.planet,
      date: `${day}/${month}/${year}`,
      description: form.description,
      durationInDays: form.durationInDays
    }
    const axiosConfig = {
      headers: {
        auth: token
      }  
    }

    Axios.post(`${baseUrl}/trips`, body, axiosConfig)
    .then(() => {
      alert(`Viagem cadastrada com sucesso!`)
      history.push("/trips/list")
    })
    .catch((err) => {
      console.log(err.message)
    })
  }

  const handleInputChange = event => {
    const { name, value } = event.target;

    onChange(name, value);
  };

  return (
    <MainContainer>
      <SubscriptionForm onSubmit={handleCreateTrip}>
        <Label>Nome da viagem</Label>
        <Imput
          name="name"
          placeholder="Digite o nome da viagem"
          pattern={"^.{5,}"}
          title="O nome da viagem deve ter no mínimo 5 letras"
          value={form.name}
          onChange={handleInputChange}
          required
        />
        <Label>Selecione o planeta de destino</Label>
        <Select
        name="planet"
        value={form.planet}
        onChange={handleInputChange}
        required
        >
          <option value="">Escolha um planeta</option>
          <option value="Mercúrio">Mercúrio</option>
          <option value="Vênus">Vênus</option>
          <option value="Marte">Marte</option>
          <option value="Júpiter">Júpiter</option>
          <option value="Saturno">Saturno</option>
          <option value="Urano">Urano</option>
          <option value="Netuno">Netuno</option>
          <option value="Plutão">Plutão</option>
        </Select>
        <Label>Data</Label>
        <Imput
          type="date"
          name="date"
          placeholder="Escolha a data de partida da Terra"
          min={today}
          value={form.date}
          onChange={handleInputChange}
          required
        />
        <Label>Descrição</Label>
        <Imput
          type="text"
          name="description"
          placeholder="Descrição da viagem"
          pattern={"^.{50,}"}
          value={form.description}
          onChange={handleInputChange}
          required
        />
        <Label>Duração em dias</Label>
        <Imput
          name="durationInDays"
          placeholder="Digite a duaração da viagem"
          type="number"
          min="50"
          value={form.durationInDays}
          onChange={handleInputChange}
          required
        />
        <SendCreateTrip>Criar viagem</SendCreateTrip>
      </SubscriptionForm>
    </MainContainer>
  );
}