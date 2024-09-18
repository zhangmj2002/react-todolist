/**
 * LoginPaneln.tsx
 *
 * @description Login panel module
 * @author
 */
import * as React from "react";
import { Box, Stack } from "@mui/material";
import Typography from "@mui/material/Typography";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Paper, { PaperProps } from "@mui/material/Paper";
import Draggable from "react-draggable";
import IconButton from "@mui/material/IconButton";
import { loginstatusAtom,
         refreshDataAtom,
         usernameAtom,
         passwordAtom
       } from "../context/TodoListAtom";
import { IconCloseDialog } from "../assets";
import Divider from "@mui/material/Divider";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import { styled } from "@mui/material/styles";
import TextField from "@mui/material/TextField";
import { useAtom,useSetAtom,useAtomValue } from "jotai";
import axios from "axios";

const StyledLabel = styled("span")({
  fontWeight: "bold",
  font: "normal 500 15px Roboto",
  width: "100px",
  height: "20px",
  color: "#000000",
  textOverflow: "ellipsis",
  overflow: "hidden",
  display: "inline-block",
});

const loginDialogStyle = {
  "& .MuiPaper-root": {
    minHeight: "220px",
    maxHeight: "350px",
    minWidth: "400px",
    maxWidth: "400px",
    borderRadius: "4px",
    backgroundColor: "rgb(227, 234, 245)",
    padding: "0px",
    overflowY: "auto",
    overflowX: "hidden",
  },
  "& .MuiDialogActions-root": {
    marginRight: "8px",
    marginBottom: "8px",
  },
};

function PaperComponent(props: PaperProps) {
  return (
    <Draggable
      handle="#draggable-dialog-title"
      cancel={'[class*="MuiDialogContent-root"]'}
    >
      <Paper {...props} />
    </Draggable>
  );
}

export const LoginPanel = () => {
  const [open, setOpen] = React.useState(true);
  const setLoginstatus = useSetAtom(loginstatusAtom);
  const setRefreshData = useSetAtom(refreshDataAtom);
  const [username, setUsername] = useAtom(usernameAtom);
  const [password, setPassword] = useAtom(passwordAtom);
  
  const onClose = () => {
    setOpen(false);
  };

  const onLogin = () => {
    var params = {username: username, password: password};
    var baseUrl = 'http://localhost:8080/login';
    axios.defaults.headers.post['content-type'] = 'application/json';
    axios
      .post(baseUrl, JSON.stringify(params))
      .then((response) => {
        if (true === response.data) {
          setLoginstatus(true);
          setRefreshData(true);
        }
      })
      .catch((error) => {
        alert("Login failed");
        console.error('Status text:', error.message);
      });
  }
  const usernameChange = (event) => {
    setUsername(event.target.value);
  }
  const passwordChange = (event) => {
    setPassword(event.target.value);
  }
  
  return (
    <Dialog
      open={open}
      sx={loginDialogStyle}
      PaperComponent={PaperComponent}
      aria-labelledby="draggable-dialog-title"
    >
      <DialogTitle
        style={{
          cursor: "move",
          height: "28px",
          color: "white",
          minWidth: "400px",
          maxWidth: "400px",
          backgroundColor: "black",
          display: "flex",
          borderRadius: "4px 4px 0px 0px",
          padding: "4px 8px 4px 8px",
          alignItems: "center",
        }}
      >
        Login
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{
            marginLeft: "auto",
            height: "17px",
            padding: "10px",
          }}
        >
          <IconCloseDialog />
        </IconButton>
      </DialogTitle>
      <DialogContent
        style={{
          padding: "16px",
          alignItems: "center",
        }}
      >
        <Box
          component="div"
          sx={{
            marginTop: "0px",
            display: "flex",
            flexDirection: "row",
            backgroundColor: "white",
            padding: "16px",
            borderRadius: "4px",
            height: "50px"
          }}>
          
          <StyledLabel>
              {"Username:"}
          </StyledLabel>
          <TextField variant="outlined" size="small"
            sx={{
                flex: 1,
                marginTop:"0px",
                "& .MuiOutlinedInput-root": {
                  position: "relative",
                  width: "220px",
                  height: "30px",
                  alignItems: "center",
                },                
              }}
            value={username}
            onChange={usernameChange}
          />
        </Box>
        <Box
          component="div"
          sx={{
            marginTop: "0px",
            display: "flex",
            flexDirection: "row",
            backgroundColor: "white",
            padding: "16px",
            borderRadius: "4px",
            height: "50px"
          }}>
          <StyledLabel>
              {"Password:"}
          </StyledLabel>
          <TextField variant="outlined" size="small"
            type={"password"}
            sx={{
                flex: 1,
                marginTop:"0px",
                "& .MuiOutlinedInput-root": {
                  position: "relative",
                  width: "220px",
                  height: "30px",
                  alignItems: "center",
                },                
              }}
            value={password}
            onChange={passwordChange}
          />
        </Box>
      </DialogContent>
      <DialogActions>
        <Stack component="div" direction="row" spacing={2}>
          <Button
            onClick={onLogin}
            sx={{
              color: "#FFFFFF",
              textTransform: "none",
              backgroundColor: "rgb(71, 137, 200)",
            }}
          >
            Login
          </Button>
        </Stack>
      </DialogActions>
    </Dialog>
  );
}