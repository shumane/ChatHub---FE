import React, { useState } from 'react';
import { Button, Container, Grid, TextField, Typography } from '@mui/material';
import MessageContainer from './MessageContainer';
import Message from './Message';

const WaitingRoom = ({ joinChatRoom }) => {
    const [userName, setUserName] = useState('');
    const [chatRoom, setChatRoom] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        joinChatRoom(userName, chatRoom);
    };

    return (
        <Container>
            <form onSubmit={handleSubmit}>
                <Grid container spacing={2} justifyContent="center">
                    <Grid item xs={12}>
                        <TextField
                            variant="outlined"
                            label="Username"
                            fullWidth
                            value={userName}
                            onChange={(e) => setUserName(e.target.value)}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            variant="outlined"
                            label="ChatRoom"
                            fullWidth
                            value={chatRoom}
                            onChange={(e) => setChatRoom(e.target.value)}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <Button variant="contained" 
                                color="primary" 
                                type="submit"
                                disabled={!userName 
                                || !chatRoom}>
                            Join
                        </Button>
                    </Grid>
                </Grid>
            </form>
        </Container>
    );
};

export default WaitingRoom;
