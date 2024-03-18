import React, { useState ,useEffect} from 'react';
import { Button, Grid, Icon, TextField } from '@mui/material';
import SendOutlinedIcon from '@mui/icons-material/SendOutlined';
import IconButton from '@mui/material/IconButton';

const Message = ({ sendMessage,sendTypingIndicator}) => {
    const [msgToBeSent, setMsgToBeSent] = React.useState('');
    const [isTyping,setIsTyping] = useState(false);
    const [typingIndicator, setTypingIndicator] = useState('');

    useEffect(() => {
        let timer;
        if (isTyping) {
            let counter = 0;
            timer = setInterval(() => {
                setTypingIndicator('.'.repeat(counter % 3 + 1));
                counter++;
            }, 500);
        } else {
            clearInterval(timer);
            setTypingIndicator('');
        }
        return () => clearInterval(timer);
    }, [isTyping]);


    const handleMessageChange = (e) => {
        let message = e.target.value;
        setMsgToBeSent(e.target.value);

        if(message.trim() !== ''){
            if(!isTyping) {
              setIsTyping(true);
              sendTypingIndicator(true);
          }
        } else {
            if (isTyping) {
              setIsTyping(false);
              sendTypingIndicator(false);
          }
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        sendMessage(msgToBeSent);
        setMsgToBeSent('');
        setIsTyping(false);
        sendTypingIndicator(false);
    };

    return (
        <form onSubmit={handleSubmit}>
            <Grid container spacing={2} alignItems="center">
                <Grid item xs={12}>
                    <TextField
                        fullWidth
                        variant="outlined"
                        placeholder="Type your message here..."
                        value={msgToBeSent}
                        onChange={handleMessageChange}
                        InputProps={{
                          endAdornment:
                          (
                            <>
                              {typingIndicator}
                              <IconButton
                                  aria-label="send"
                                  onClick={handleSubmit}
                              >
                                  <SendOutlinedIcon />
                              </IconButton>
                            </>
                          )
                        }}
                    />
                </Grid>
                {/* <Grid item xs={2}>
                <Grid item xs={2}>
                    <Button
                        fullWidth
                        variant="contained"
                        color="primary"
                        type="submit"
                        disabled={!msgToBeSent}
                        onClick={handleSubmit}
                        aria-label="send"
                        endIcon={<SendOutlinedIcon />}
                    />
                </Grid>
                </Grid> */}
            </Grid>
        </form>
    );
};

export default Message;
