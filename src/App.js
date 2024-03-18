import logo from './logo.svg';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Col, Row } from 'react-bootstrap';
import WaitingRoom from './components/WaitingRoom';
import { useState } from 'react';
import { HubConnectionBuilder, LogLevel } from '@microsoft/signalr';
import ChatRoom from './components/ChatRoom';
import MessageContainer from './components/MessageContainer';

function App() {
  const [connection, setConnection] = useState();
  const [messages, setMessages] = useState([]);
  const [userName, setUserName] = useState(''); // Add userName state

  const joinChatRoom = async (userName, chatRoom) => {
    try {
      //initiate connection
      const conn = new HubConnectionBuilder()
        .withUrl("https://localhost:7089/chat")
        .configureLogging(LogLevel.Information)
        .build();

      //setup handler
      conn.on("JoinSpecificChatRoom", (userName, msg) => {
        console.log("msg:", msg);
        console.log("userName:", userName);
        setUserName(userName); // Set the userName state here
      });

      conn.on("SendMessage", (userName, msg) => {
        //appending a new message that we currently have kwedini!!
        setMessages(messages => [...messages, { userName, msg }]);
      })

      await conn.start();
      await conn.invoke("JoinSpecificChatRoom", { userName, chatRoom });
      setConnection(conn);
    } catch (e) {
      console.log(e, "Error");
    } finally {
      //
    }
  }

  const sendMessage = async (message) => {
    try {
      await connection.invoke("SendMessage", message);
    } catch (e) {
      console.log(e);
    }
  }

  const sendTypingIndicator = async (isTyping) => {
    try {
      await connection.invoke("TypingIndicator", userName, isTyping);
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <div>
      <main>
        <Container>
          <Row className='px-5 my-5'>
            <Col sm='12'>
              <h1 className='font-weight-light'>Welcome to ChatHubZA</h1>
            </Col>
          </Row>
          {!connection ?
            <WaitingRoom joinChatRoom={joinChatRoom} />
            :
            <ChatRoom
              messages={messages}
              sendMessage={sendMessage}
              sendTypingIndicator={sendTypingIndicator}
            ></ChatRoom>
          }
        </Container>
      </main>
    </div>
  );
}

export default App;
