import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Foxy  from '../assets/foxy.gif'
export default function Welcome() {
  const [userName, setUserName] = useState("");
  
  useEffect(() => {
    
    async function changeUserName(){
      setUserName(
        await JSON.parse(
          localStorage.getItem(process.env.REACT_APP_LOCALHOST_USER)
        ).username
      );
    }
    changeUserName();
  }, []);
  return (
    <Container>
      <img src={Foxy} alt="" />
      <h1>
        Hello, <span>{userName}!</span>
      </h1>
      <h3>Select a friend to CHAT!</h3>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  color: white;
  flex-direction: column;
  img {
    height: 20rem;
    filter: drop-shadow(0px 30px 10px black);
  }
  span {
  background: linear-gradient(to right,#e49d3e,#004dffa6);
  -webkit-background-clip: text;
  color: transparent;
  display: inline-block;
  } 
`;
