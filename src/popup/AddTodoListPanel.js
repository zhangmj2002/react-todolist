/**
 * AddTodoListPaneln.tsx
 *
 * @description Add Todo List panel module
 * @author
 */
import * as React from "react";
import { useAtom,useSetAtom, useAtomValue } from "jotai";
import { Box, Stack } from "@mui/material";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import Paper, { PaperProps } from "@mui/material/Paper";
import Draggable from "react-draggable";
import IconButton from "@mui/material/IconButton";
import { openAddTodoPanelAtom,
         newIdAtom,
         newTitleAtom,
         newDescAtom,
         newDueAtom,
         newPrioAtom,
         newStatusAtom,
         refreshDataAtom,
         newOwnersAtom,
         addedittypeAtom } from "../context/TodoListAtom";
import { IconCloseDialog } from "../assets";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import TextField from "@mui/material/TextField";
import { styled } from "@mui/material/styles";
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFnsV3'
import { LocalizationProvider } from "@mui/x-date-pickers";
import { format } from "date-fns";
import axios from "axios";
import Autocomplete from "@mui/material/Autocomplete";

const statusOptions = [
  { label: "Not started", value : 1},
  { label: "In progress", value : 2},
  { label: "Finished", value : 3}];
const priorityOptions = [
  { label: "Low", value : 1},
  { label: "Medium", value : 2},
  { label: "High", value : 3}];

const addTodoListDialogStyle = {
  "& .MuiPaper-root": {
    minHeight: "520px",
    maxHeight: "920px",
    Width: "500px",
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

const StyledLabel = styled("span")({
  fontWeight: "bold",
  font: "normal 500 15px Roboto",
  width: "100px",
  height: "18px",
  color: "#000000",
  textOverflow: "ellipsis",
  overflow: "hidden",
  display: "inline-block",
  marginTop:"3px",
  padding: "10px, 0px, 0px, 0px",
});


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

export const AddTodoList = () => {
  const [open, setOpen] = React.useState(true);
  const setOpenAddTodoPanel = useSetAtom(openAddTodoPanelAtom);
  const newid = useAtomValue(newIdAtom);
  const [newtitle, setNewtitle] = useAtom(newTitleAtom);
  const [newdesc, setNewdesc] = useAtom(newDescAtom);
  const [newdue, setNewdue] = useAtom(newDueAtom);
  const [newprio, setNewprio] = useAtom(newPrioAtom);
  const [newstatus, setNewstatus] = useAtom(newStatusAtom);
  const [newowners, setNewowners] = useAtom(newOwnersAtom);
  const addedittype = useAtomValue(addedittypeAtom);
  const setRefreshData = useSetAtom(refreshDataAtom);
  const handleClose = () => {
    setOpen(false);
    setOpenAddTodoPanel(false);
  };
  
  const onChangeTitle = (event: any) => {
    setNewtitle(event.target.value);
  };
  const onChangeDesc = (event: any) => {
    setNewdesc(event.target.value);
  };
  const onChangePrio = (event: any) => {
    setNewprio(event.target.innerText);
  };
  const onChangeStatus = (event: any) => {
    setNewstatus(event.target.innerText);
  };
  const onChangeOwners = (event: any) => {
    setNewowners(event.target.value);
  };
  const onChangeDate = (data: any) => {
    setNewdue(data);
  };

  const clickSave = () => {
    if (newtitle === null || newtitle === '') {
      alert("Invalid title.")
      return
    }
    if (newdesc === null || newdesc === '') {
      alert("Invalid description.")
      return
    }
    if (newdue === null || newdue.length === 0) {
      alert("Invalid dueDate.")
      return
    }

    var timeStr = format(newdue, "yyyy-MM-dd HH:mm:ss");
    var baseUrl = "http://localhost:8080/insertOrUpdateTodo";
    var params = {id: newid, title: newtitle, description: newdesc, dueDate: timeStr, priority: newprio, status: newstatus, owners: newowners};
    
    axios.defaults.headers.post['content-type'] = 'application/json';
    axios
      .post(baseUrl, JSON.stringify(params))
      .then((response) => {
        setOpenAddTodoPanel(false);
        setRefreshData(true);
      })
      .catch((error) => {
        console.error('Status text:', error.message);
      });
  }
  React.useEffect(() => {

  }, [newtitle, setNewtitle, addedittype]);

  return (
    <Dialog
      open={open}
      sx={addTodoListDialogStyle}
      PaperComponent={PaperComponent}
      aria-labelledby="draggable-dialog-title"
    >
      <DialogTitle
        style={{
          cursor: "move",
          height: "28px",
          color: "white",
          Width: "500px",
          backgroundColor: "black",
          display: "flex",
          borderRadius: "4px 4px 0px 0px",
          padding: "4px 8px 4px 8px",
          alignItems: "center",
        }}
      >
        {addedittype === "add" ? "Add Todo List" : "Edit Todo List"}
        <IconButton
          aria-label="close"
          onClick={handleClose}
          sx={{
            marginLeft: "auto",
            height: "17px",
            padding: "10px",
          }}
        >emac
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
            flexDirection: "column",
            padding: "16px",
            borderRadius: "4px",
            minHeight: "400px",
            maxHeight: "1024px"
          }}
        >
        <Box
          component="div"
          sx={{
            marginTop: "5px",
            display: "flex",
            flexDirection: "row",
            backgroundColor: "#F0F0F0",
            padding: "16px",
            borderRadius: "4px",
            height: "20px",
          }}
        >
          <StyledLabel>
              {"Title:"}
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
            value={newtitle}
            onChange={onChangeTitle}
          />
        </Box>  
        <Box
          component="div"
          sx={{
            marginTop: "5px",
            display: "flex",
            flexDirection: "row",
            backgroundColor: "#F0F0F0",
            padding: "16px",
            borderRadius: "4px",
            height: "20px",
          }}
        >
          <StyledLabel>
              {"Description:"}
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
            value={newdesc}
            onChange={onChangeDesc}
          />
        </Box>  
        <Box
          component="div"
          sx={{
            marginTop: "5px",
            display: "flex",
            flexDirection: "row",
            backgroundColor: "#F0F0F0",
            padding: "16px",
            borderRadius: "4px",
            height: "20px",
          }}
        >
          <StyledLabel>
              {"Due Date:"}
          </StyledLabel>
          <LocalizationProvider dateAdapter={AdapterDateFns}>
          <DateTimePicker 
            sx={{
              width: "220px",
              height: "30px",
              maxHeight: "30px",
              borderRadius: "4px",
              backgroundColor: "transparent",
              "& .MuiInputBase-root": {
                backgroundColor: "transparent",
                minHeight: "30px",
                paddingLeft: "0px",
                paddingRight: "12px",
              }
          }}
          value={newdue}
          onChange={onChangeDate}
          />
          </LocalizationProvider>
        </Box> 
        <Box
          component="div"
          sx={{
            marginTop: "5px",
            display: "flex",
            flexDirection: "row",
            backgroundColor: "#F0F0F0",
            padding: "16px",
            borderRadius: "4px",
            height: "20px",
          }}
        >
          <StyledLabel>
              {"Priority:"}
          </StyledLabel>
          <Autocomplete
            ListboxProps={{ style: { maxHeight: "500px" } }}
            disableClearable
            options={priorityOptions}
            onChange={onChangePrio}
            sx={{ 
                  marginLeft: "0px", 
                  marginTop:"-5px",
                  "& .MuiInputBase-root": {
                    width: "220px",
                    height: "30px",
                    marginTop:"5px"
                  },
              }}
            size="small"
            renderInput={(params) => <TextField {...params} label={newprio} />}
          />
        </Box>
        
        <Box
          component="div"
          sx={{
            marginTop: "5px",
            display: "flex",
            flexDirection: "row",
            backgroundColor: "#F0F0F0",
            padding: "16px",
            borderRadius: "4px",
            height: "20px",
          }}
        >
          <StyledLabel>
              {"Status:"}
          </StyledLabel>
          <Autocomplete
            ListboxProps={{ style: { maxHeight: "500px" } }}
            disableClearable
            options={statusOptions}
            onChange={onChangeStatus}
            sx={{ 
                  marginLeft: "0px", 
                  marginTop: "-5px",
                  "& .MuiInputBase-root": {
                    width: "220px",
                    height: "30px",
                    marginTop: "5px"
                  },
              }}
            size="small"
            renderInput={(params) => <TextField {...params} label={newstatus} />}
          />
        </Box>

        <Box
          component="div"
          sx={{
            marginTop: "5px",
            display: "flex",
            flexDirection: "row",
            backgroundColor: "#F0F0F0",
            padding: "16px",
            borderRadius: "4px",
            height: "20px",
          }}
        >
          <StyledLabel>
              {"Owners:"}
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
            value={newowners}
            onChange={onChangeOwners}
          />
        </Box>
        </Box>
      </DialogContent>
      <DialogActions>
        <Stack component="div" direction="row" spacing={2}>
          <Button
            size="small"
            variant="outlined"
            sx={{
              width: 100,
              fontWeight: "bold",
              fontSize: "14px",
              textTransform: "none",
              color: "#4B6EAF",
              background: "white",
            }}
            onClick={handleClose}
          >
            Cancel
          </Button>
          <Button
            size="small"
            variant="outlined"
            sx={{
              width: 120,
              fontSize: "14px",
              fontWeight: "bold",
              color: "#FFFFFF",
              textTransform: "none",
              backgroundColor: "rgb(71, 137, 200)",
              "&:hover": {
                backgroundColor: "#4789C8",
              },
              "&.Mui-disabled": {
                background: "#C0C0C0",
                color: "#fff",
              },
            }}
            onClick={clickSave}
          >
            Save
          </Button>
        </Stack>
      </DialogActions>
    </Dialog>
  );
}