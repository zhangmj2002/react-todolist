/**
 * TodoListPanel.js
 *
 * @description Todo List panel module
 * @author
 */
import * as React from "react";
import { useAtom, useSetAtom, useAtomValue } from "jotai";
import { Box, Grid, Button} from "@mui/material";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import { styled } from "@mui/material/styles";
import Autocomplete from "@mui/material/Autocomplete";
import { sorttypeAtom,
         showtypeAtom,
         openAddTodoPanelAtom,
         refreshDataAtom,
         todolistDataAtom,
         loginstatusAtom,
         usernameAtom,
         newIdAtom,
         newTitleAtom,
         newDescAtom,
         newDueAtom,
         newPrioAtom,
         newStatusAtom,
         newOwnersAtom,
         addedittypeAtom } from "./context/TodoListAtom";
import { AddTodoList } from "./popup/AddTodoListPanel";
import { LoginPanel } from "./popup/LoginPanel";
import axios from "axios";

const StyledLabel = styled("span")({
  fontWeight: "bold",
  font: "normal 500 15px Roboto",
  width: "100px",
  height: "auto",
  color: "#000000",
  textOverflow: "ellipsis",
  overflow: "hidden",
  display: "inline-block",
  padding: "8px, 4px, 8px, 4px",
});


const sortOptions = [
  { label: "Due Date", value : 1},
  { label: "Priority", value : 2},
  { label: "Title", value : 3}];

const showOptions = [
  { label: "Not started", value : 1},
  { label: "In progress", value : 2},
  { label: "Finished", value : 3}];
          
export default function TodoListPanel() {

  const [openAddTodoPanel, setOpenAddTodoPanel] = useAtom(openAddTodoPanelAtom);
  const [refreshData, setRefreshData] = useAtom(refreshDataAtom);
  const [todolistData, setTodolistData] = useAtom(todolistDataAtom);
  const loginstatus = useAtomValue(loginstatusAtom);
  const username = useAtomValue(usernameAtom);
  const [sorttype, setSorttype] = useAtom(sorttypeAtom);
  const [showtype, setShowtype] = useAtom(showtypeAtom);
  const setNewid = useSetAtom(newIdAtom);
  const setNewtitle = useSetAtom(newTitleAtom);
  const setNewdesc  = useSetAtom(newDescAtom);
  const setNewdue = useSetAtom(newDueAtom);
  const setNewprio = useSetAtom(newPrioAtom);
  const setNewstatus = useSetAtom(newStatusAtom);
  const setNewowners = useSetAtom(newOwnersAtom);
  const setAddedittype = useSetAtom(addedittypeAtom);
  
  const changeSorttype = (
      event: React.SyntheticEvent,
      value: any,
      reason: any
      ) => {
       if(value.label !== sorttype.label ){
          setSorttype({label: value.label, value: value.value});
          setRefreshData(true);
        }
     };
                       
  const changeShowtype = (
      event: React.SyntheticEvent,
      value: any,
      reason: any
      ) => {
        if(value.label !== showtype.label){
          setShowtype({label: value.label, value: value.value});     
          setRefreshData(true); 
        }       
     };  
  
  const onFinish = (event: React.SyntheticEvent) =>{
      var baseUrl = 'http://localhost:8080/finishTodo?id=' + event.currentTarget.id;
      axios.get(baseUrl, {
        responseType:'text'
      }).then((response) => {
        console.log(response.data);
        setRefreshData(true);
      }).catch((err) => {
        console.log(err)
      });
  }

  const onDelete = (event: React.SyntheticEvent) =>{
      var baseUrl = 'http://localhost:8080/deleteTodo?id=' + event.currentTarget.id;
      axios.get(baseUrl, {
        responseType:'text'
      }).then((response) => {
        console.log(response.data);          
        setRefreshData(true);
      }).catch((err) => {
        console.log(err)
      });
  }

  const onAddList = () => {
      setNewid("");
      setNewtitle("");
      setNewdesc("");
      setNewdue(new Date());
      setNewprio("Low");
      setNewstatus("Not started");
      setNewowners(username);
      setAddedittype("add");
      setOpenAddTodoPanel(true);
      
  };
  const onEditList = (event: React.SyntheticEvent) =>{
    var id = parseInt(event.currentTarget.id);
    var currentData = todolistData.find((data) => data.id === id);
    setNewid(currentData.id);
    setNewtitle(currentData.title);
    setNewdesc(currentData.description);
      
    setNewprio(currentData.priority);
    setNewstatus(currentData.status);
    setNewowners(currentData.owners);
    var _datetime = new Date(currentData.dueDate);
    setNewdue(_datetime);
    setAddedittype("edit");
    setOpenAddTodoPanel(true);
  }
  axios.default.timeout=3600000;
  React.useEffect(() => {
    if (refreshData) {
        setRefreshData(false);
        var baseUrl = 'http://localhost:8080/getTodos?username=' + username + '&sortType=' + sorttype.value + '&showType=' + showtype.value;
        axios.get(baseUrl, {
          responseType:'text'
        }).then((response) => {
          console.log(response.data);          
          var _todolistData = JSON.parse(response.data);
          setTodolistData(_todolistData);
        }).catch((err) => {
          console.log(err)
        });
      }
  }, [refreshData, 
      setRefreshData, 
      todolistData, 
      setTodolistData,
      showtype.value,
      sorttype.value,
      username]);
  return (
     <Box
        component="div"
        sx={{
            marginTop: "20px",
            marginLeft: "100px",
            marginRight: "100px",            
            display: "flex",
            flexDirection: "column",
            backgroundColor: "#F5F5F5",
            padding: "16px",
            borderRadius: "4px",
            height: "100%",
          }}
        >
        {loginstatus && <Box>   
        <Box
          component="div"
          sx={{
            marginTop: "20px",
            marginLeft: "100px",
            marginRight: "100px",            
            display: "flex",
            alignItems: "center",
            flexDirection: "column",
            backgroundColor: "white",
            padding: "16px",
            borderRadius: "4px",
            height: "40px",
          }}
          >
          <Typography
            variant="subtitle2"
            component="div"
            sx={{
                  font: "normal 400 40px Roboto",
                  fontWeight: "bold",
                  height: "50px",
               }}
           >
           Todo List
           </Typography>    
        </Box>
        <Box
          component="div"
          sx={{
            marginTop: "20px",
            marginLeft: "100px",
            marginRight: "100px",            
            display: "flex",
            alignItems: "center",
            flexDirection: "row",
            backgroundColor: "white",
            padding: "16px",
            borderRadius: "4px",
            height: "20px",
          }}
          >
          <StyledLabel>Sort:</StyledLabel>
          <Autocomplete
              ListboxProps={{ style: { maxHeight: "500px" } }}
              disableClearable
              options={sortOptions}
              onChange={changeSorttype}
              style={{ width: "200px", marginLeft: "5px", marginRight: "100px" }}
              size="small"
              renderInput={(params) => <TextField {...params} label={sorttype.label} />}
           />
          <StyledLabel>Filter:</StyledLabel>
          <Autocomplete
              ListboxProps={{ style: { maxHeight: "500px" } }}
              disableClearable
              options={showOptions}
              onChange={changeShowtype}
              style={{ width: "200px", marginLeft: "5px", marginRight: "100px" }}
              size="small"
              renderInput={(params) => <TextField {...params} label={showtype.label} />}
           />
           <Button
              color={"secondary"}
              variant="contained"
              onClick={onAddList}
              sx={{
                  "&.MuiButton-outlined": {
                  borderColor: "#4789C8",
                  color: "#4789C8",
                  backgroundColor: "#fff",
                  },
                  "&:focus": {
                    outline: "none",
                    boxShadow: "none",
                 },
              }}
           >
           Add Todo
        </Button>
        </Box>
        {todolistData.map((data) => (
          <Grid
            container
            spacing={"8px"}
            direction="row"
            justifyContent="left"
            alignItems="left"
            sx={{
              marginLeft: "10px",
              marginRight: "10px",
              marginTop: "10px",
              opacity: 1,
              marginBottom: "15px",
              }}
         >
         <Grid item>
          <label>
          <div
              style={{
                  fontSize: "16Px",
                  fontFamily: "Helvetica",
                  fontWeight: "bold",
                  color: "blue",
                  padding: "4px 0px 4px 5px",
                  width: "200px",
              }}
            >
                {data.title}
            </div>
          </label>
          </Grid>
          <Grid item>
          <label>
          <div
              style={{
                  fontSize: "16Px",
                  fontFamily: "Helvetica",
                  fontWeight: "bold",
                  color: "blue",
                  padding: "4px 0px 4px 0px",
                  width: "200px",
              }}
            >
                {data.description}
            </div>
          </label>
          </Grid>
          <Grid item>
          <label>
          <div
              style={{
                  fontSize: "16Px",
                  fontFamily: "Helvetica",
                  fontWeight: "bold",
                  color: "blue",
                  padding: "4px 0px 4px 0px",
                  width: "160px",
              }}
            >
                {data.dueDate}
            </div>
          </label>
          </Grid>
          <Grid item>
          <label>
          <div
              style={{
                  fontSize: "16Px",
                  fontFamily: "Helvetica",
                  fontWeight: "bold",
                  color: "blue",
                  padding: "4px 0px 4px 0px",
                  width: "80px",
              }}
            >
                {data.priority}
            </div>
          </label>
          </Grid>
          <Grid item>
          <label>
          <div
              style={{
                  fontSize: "16Px",
                  fontFamily: "Helvetica",
                  fontWeight: "bold",
                  color: "blue",
                  padding: "4px 0px 4px 0px",
                  width: "100px",
              }}
            >
                {data.status}
            </div>
          </label>
          </Grid>
          <Grid item>
          <Button
              color={"white"}
              variant="contained"
              onClick={onEditList}
              id={data.id}
              sx={{
                  "&.MuiButton-outlined": {
                  borderColor: "red",
                  color: "#4789C8",
                  backgroundColor: "#fff",
                  },
                  "&:focus": {
                    outline: "none",
                    boxShadow: "none",
                 },
                 marginLeft: "100px"
              }}
           >
           Edit
        </Button>
        </Grid>
        <Grid item>
        <Button
              color={"white"}
              variant="contained"
              onClick={onFinish}
              id={data.id}
              sx={{
                  "&.MuiButton-outlined": {
                  borderColor: "red",
                  color: "#4789C8",
                  backgroundColor: "#fff",
                  },
                  "&:focus": {
                    outline: "none",
                    boxShadow: "none",
                 },
                 marginLeft: "30px",
                 marginRight: "0px",
                 padding: "0px, 0px, 0px, 0px"
              }}
           >
           Finish
        </Button>
        </Grid>
        <Grid item>
        <Button
              color={"white"}
              variant="contained"
              onClick={onDelete}
              id={data.id}
              sx={{
                  "&.MuiButton-outlined": {
                  borderColor: "red",
                  color: "#4789C8",
                  backgroundColor: "#fff",
                  },
                  "&:focus": {
                    outline: "none",
                    boxShadow: "none",
                 },
                 marginLeft: "30px",
                 marginRight: "0px",
                 padding: "0px, 0px, 0px, 0px"
              }}
           >
           Del
        </Button>
        </Grid>
        </Grid>
          ))}
        </Box>}
        {openAddTodoPanel && <AddTodoList/> }
        {!loginstatus && <LoginPanel/> }                  
        </Box>

  );  
}
