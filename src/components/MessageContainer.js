import React from 'react';
import { Grid, Typography } from '@mui/material';

const MessageContainer = ({ messages }) => {
    return (
        <Grid container direction="column" spacing={1}>
            {messages.map((msg, index) => (
                <Grid item key={index}>
                    <Typography variant="body1">
                        {`${msg.msg} - ${msg.userName}`}
                    </Typography>
                </Grid>
            ))}
        </Grid>
    );
};

export default MessageContainer;
