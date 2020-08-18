import React from "react";
import axios from 'axios'
import styled from 'styled-components';
import { useHistory } from 'react-router-dom';
import useForm from '../hooks/useForm'

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
  width: 20rem;
  height: 20rem;
  margin-bottom: 8px;
  background-color: #ecf0f3;
  box-shadow: 0px 0px 10px #ffffff;
  opacity: 0.92;
  padding-top: 32px;
`
const Imput = styled.input`
  width: 250px;
  border: none;
  outline: none;
  background: none;
  color: #555;
  border-radius: 25px;
  margin: 64px;
  padding: 10px 5px 10px 20px;
  box-shadow: inset 5px 5px 5px #cbced1,
              inset -5px -5px 5px #ffffff;
              :hover {
                background: #FFFFFF;
                    }
`
const Label = styled.label`
  font-size: 1.2em;
  font-weight: 600;
  margin: -48px 64px;
`
const LoginButton = styled.button`
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
  outline: none;
`

const baseUrl = "https://us-central1-labenu-apis.cloudfunctions.net/labeX/airton-turing"

export default function LoginPage() {
  const history = useHistory();
  const { form, onChange } = useForm({
    email: "",
    password: ""
  });

  const handleLogIn = (e) => {
    e.preventDefault()
    const body = {
      email: form.email,
      password: form.password
    }

    axios.post(`${baseUrl}/login`, body)
    .then(response => {
      window.localStorage.setItem("token", response.data.token)
      history.push("/trips/list")
    }).catch(err => {
      alert("Email ou senha não cadastrados")
    })
  }
  
  const handleInputChange = event => {
    const { name, value } = event.target;

    onChange(name, value);
  };

  return (
    <MainContainer>
      <SubscriptionForm onSubmit={handleLogIn}>
        <Label>E-mail</Label>
        <Imput
          name="email"
          placeholder="Digite seu E-mail"
          type="email"
          value={form.email}
          onChange={handleInputChange}
          required
        />
        <Label>Senha</Label>
        <Imput
          name="password"
          placeholder="Digite sua senha"
          type="password"
          value={form.password}
          onChange={handleInputChange}
          required
        />
        <LoginButton>Login</LoginButton>
      </SubscriptionForm>
    </MainContainer>
  );
}