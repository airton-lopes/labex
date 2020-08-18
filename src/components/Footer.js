import React from 'react';
import styled from 'styled-components'

const FooterDiv = styled.div`
  height: 8vh;
  width: 100vw;
  display: flex;
  justify-content: center;
  align-items: center;
  box-shadow: 0em -3em 2em #45aaf2;
`

export default function Footer() {
  return (
    <FooterDiv>
      <h4>Copyright© - Designed by: Airton Lopes - 2020</h4>
    </FooterDiv>
  );
}