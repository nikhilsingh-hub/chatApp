import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { io } from "socket.io-client";
import styled from "styled-components";
import { getAllUsersRoute, host } from "../utils/APIRoutes";
import ChatHere from "../components/ChatHere";
import FriendsContainer from "../components/FriendsContainer";
import Welcome from "../components/Welcome";

export default function Chat() {
  const navigate = useNavigate();
  const socket = useRef();
  const [otherUsers, setOtherUsers] = useState([]);
  const [currentlyChattingTo, setcurrentlyChattingTo] = useState(undefined);
  const [currentUser, setCurrentUser] = useState(undefined);

  useEffect(() => {
    async function x() {
      if (!localStorage.getItem(process.env.REACT_APP_LOCALHOST_USER)) {
        navigate("/login");
      } else {
        setCurrentUser(
          JSON.parse(
            localStorage.getItem(process.env.REACT_APP_LOCALHOST_USER)
          )
        );
      }
    }
    x();
  }, [])




  useEffect(() => {
    if (currentUser) {
      socket.current = io(host);
      socket.current.emit("add-user", currentUser._id);
    }
  }, [currentUser]);


  useEffect(() => {
    const x = async () => {
      try {
        if (currentUser !== undefined) {
          const response = await axios.get(`${getAllUsersRoute}/${currentUser._id}`);
          setOtherUsers(response.data);
          console.log(otherUsers);
        }

      } catch (error) {
        console.error('Error fetching contacts:', error);
      }
    }
    x();
  }, [currentUser]);

  const handleChatChange = (chat) => {
    setcurrentlyChattingTo(chat);

  };
  return (
    <>
      <Container>
        <div className="container">
          <FriendsContainer contacts={otherUsers} changeChat={handleChatChange} />
          {currentlyChattingTo === undefined ? (<Welcome />) : (<ChatHere currentlyChattingTo={currentlyChattingTo} socket={socket} />)}
        </div>
      </Container>
    </>
  );
}

const Container = styled.div`
  height: 100vh;
  width: 100vw;
  display: flex;
  flex-direction: row;
  justify-content: center;
  background: linear-gradient(to right, #ff892573, #494b50);
  gap: 1rem;
  align-items: center;
  .container {
    height: 75vh;
    width: 75vw;
    box-shadow: box-shadow: rgba(0, 0, 0, 0.25) 0px 54px 55px, rgba(0, 0, 0, 0.12) 0px -12px 30px, rgba(0, 0, 0, 0.12) 0px 4px 6px, rgba(0, 0, 0, 0.17) 0px 12px 13px, rgba(0, 0, 0, 0.09) 0px -3px 5px;
    background-color: #00000076;
    // border-top-right-radius: 50px;
    border-top-left-radius: 50px;
    border-bottom-right-radius: 50px;
    
    display: grid;
    grid-template-columns: 25% 75%;
    @media screen and (min-width: 720px) and (max-width: 1080px) {
      grid-template-columns: 35% 65%;
    }
  }
`;
