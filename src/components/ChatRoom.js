import React, { useState } from 'react';
import { Row, Col } from "react-bootstrap";
import MessageContainer from "./MessageContainer";
import Message from "./Message";

const ChatRoom = ({ messages, sendMessage, sendTypingIndicator }) => {
    const [typingUsers, setTypingUsers] = useState([]);

    const handleTypingIndicator = (userName, isTyping) => {
        if (isTyping) {
            setTypingUsers(users => [...users, userName]);
        } else {
            setTypingUsers(users => users.filter(user => user !== userName));
        }
    };

    return (
        <div>
            <Row className='px-5 my-5'>
                <Col sm={12}>
                    <h2>ChatRoom</h2>
                </Col>
            </Row>
            <Row className='px-5 my-5'>
                <Col sm={12}>
                    <MessageContainer messages={messages} />
                </Col>
            </Row>
            <Row className='px-5 my-5'>
                <Col sm={12}>
                    <Message
                        sendMessage={sendMessage}
                        sendTypingIndicator={sendTypingIndicator}
                        typingIndicatorHandler={handleTypingIndicator}
                    />
                    {typingUsers.length > 0 && (
                        <p>
                            {typingUsers.join(', ')} {typingUsers.length === 1 ? 'is typing...' : 'are typing...'}
                        </p>
                    )}
                </Col>
            </Row>
        </div>
    );
};

export default ChatRoom;
