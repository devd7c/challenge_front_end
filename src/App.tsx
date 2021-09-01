import React, { useState } from 'react';
import { useEffect } from 'react';
import generateMessage, { Message } from './Api';
//styles
import { 
  styleDivButton, styleBtn, styleError, styleWarning, 
  styleInfo, styleLabel, styleLabelDark

} from "./styles"
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import SnackbarContent from '@material-ui/core/SnackbarContent';
import Snackbar from '@material-ui/core/Snackbar';

const App: React.FC<{}> = () => {
  const [messages, setMessages] = useState<Message[]>([]);

  const [stopMessage, setStopMessage] = useState(false);
  const [open, setOpen] = useState(false);
  const [msg, setMsg] = useState('');

  const [countError, setCountError] = useState(0);
  const [countWarning, setCountWarning] = useState(0);
  const [countInfo, setCountInfo] = useState(0);

  useEffect(() => {
    if(!stopMessage){
      const cleanUp = generateMessage((message: Message) => {
        if(message.priority === 0) {
          setOpen(true);
          setMsg(message.message);
        }
        setMessages(oldMessages => [message, ...oldMessages]);
      });
      return cleanUp;
    }
  }, [stopMessage]);
  
  useEffect(() => {
    const _countError = messages.filter(i => i.priority === 0);
    setCountError(_countError.length);

    const _countWarning = messages.filter(i => i.priority === 1);
    setCountWarning(_countWarning.length);

    const _countInfo = messages.filter(i => i.priority === 2);
    setCountInfo(_countInfo.length);

  }, [messages]);


  const onStartMessages = () => {
    setStopMessage(false);
  };
  const onStopMessages = () => {
    setStopMessage(true);
  };
  const onClearMessages = () => {
    setMessages([]);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const handleCloseSnack = (event: Message) => {
    let removeItem = messages.filter(function(element) {
      return element !== event
    });
    setMessages(removeItem);
  };
  const actionSnackbar = (
    <Button style={styleLabelDark} size="small" onClick={handleClose}>close</Button>
  );
  
  return (
    <div>
      <Snackbar anchorOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }} open={open} autoHideDuration={2000} onClose={handleClose} 
      message={msg} action={actionSnackbar}/>
      <Grid container>
        <Grid item xs={4}></Grid>
        <Grid item xs={4} style={styleDivButton}>
          {stopMessage === false?<Button variant="contained" style={styleBtn} onClick={onStopMessages}>STOP</Button>:
          <Button variant="contained" style={styleBtn} onClick={onStartMessages}>START</Button>}
          <Button variant="contained" style={styleBtn} onClick={onClearMessages}>CLEAR</Button>
        </Grid>
        <Grid item xs={4}></Grid>
      </Grid>
      <Grid container>
        <Grid item xs={2}></Grid>
        <Grid container item xs={8}>
          <Grid item xs={4}>
            <h2>Error Type 1</h2>
            <span>Count {countError}</span>
            {messages.filter(msgError => msgError.priority === 0)?.map?.((msg, index) => 
            <div key={index}>
              <SnackbarContent style={styleError} message={msg?.message} action={
                <React.Fragment>
                  <Button style={styleLabel} size="small" onClick={() => {handleCloseSnack(msg)}}>clear</Button>
                </React.Fragment>
              } />
            </div>
            )}
          </Grid>
          <Grid item xs={4}>
            <h2>Warning Type 2</h2>
            <span>Count {countWarning}</span>
            {messages.filter(msgError => msgError.priority === 1)?.map?.((msg, index) => 
            <div key={index}>
              <SnackbarContent style={styleWarning} message={msg?.message} action={
                <React.Fragment>
                  <Button style={styleLabel} size="small" onClick={() => {handleCloseSnack(msg)}}>clear</Button>
                </React.Fragment>
              } />
            </div>
            )}
          </Grid>
          <Grid item xs={4}>
            <h2>Info Type 3</h2>
            <span>Count {countInfo}</span>
            {messages.filter(msgError => msgError.priority === 2)?.map?.((msg, index) => 
            <div key={index}>
              <SnackbarContent style={styleInfo} message={msg?.message} action={
                <React.Fragment>
                  <Button style={styleLabel} size="small" onClick={() => {handleCloseSnack(msg)}}>clear</Button>
                </React.Fragment>
              } />
            </div>
            )}
          </Grid>
        </Grid>
        <Grid item xs={2}></Grid>
      </Grid>
    </div>
  );
}

export default App;
