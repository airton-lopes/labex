import React from 'react';
import { Switch, Route, BrowserRouter } from "react-router-dom";
import HomePage from './HomePage'
import ApplicationFormPage from './ApplicationFormPage'
import CreateTripPage from './CreateTripPage'
import ListTripsPage from './ListTripsPage'
import LoginPage from './LoginPage'
import TripDetailsPage from './TripDetailsPage'
import Header from './Header';
import Footer from './Footer';
import styled from 'styled-components'

const Body = styled.div`
  box-sizing: border-box;
`

export default function Router() {
  return (
    <Body>
      <BrowserRouter>
      <Header />
        <Switch>
          <Route exact path="/login">
            <LoginPage />
          </Route>
          <Route exact path="/application-form">
            <ApplicationFormPage />
          </Route>
          <Route exact path="/trips/list">
            <ListTripsPage />
          </Route>
          <Route exact path="/trips/create">
            <CreateTripPage />
          </Route>
          <Route exact path="/trips/details/:tripId">
            <TripDetailsPage />
          </Route>
          <Route exact path="/">
            <HomePage />
          </Route>
          <Route path="/">
            <div>Opa! 404!</div>
          </Route>
        </Switch>
        <Footer />
      </BrowserRouter>
    </Body>
  );
}