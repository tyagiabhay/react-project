import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { TextField } from "@mui/material";
import { Box } from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { Container } from "@mui/material";
import { MenuItem } from "@mui/material";
import { Select } from "@mui/material";
import { FormControl } from "@mui/material";
import { InputLabel } from "@mui/material";
import { useEffect, useState, useContext } from "react";
import Badge from '@mui/material/Badge';
import MailIcon from '@mui/icons-material/Mail';
import { useHistory } from "react-router-dom";
import AuthContext from "../store/auth-context";

const HomePage = (props) => {
  const history = useHistory();
  const [showOptions, setShowOptions] = useState(false);
  const [Name, setName] = useState('');
  const [empId, setEmpId] = useState('');
  const [empPlan, setEmpPlan] = useState('');
  const [empLevel, setEmpLevel] = useState('');
  const [monthlyPremium, setMonthlyPremium] = useState('');
  const AuthCtx = useContext(AuthContext);
  const [show, setShow] = useState(true);

  


  const onChangePlanHandler = (event) => {
    event.preventDefault();
    setShowOptions(false);
    props.ShowChangePlan(true);

  };

  const onChangeLevelHandler = (event) => {
    event.preventDefault();
    setShowOptions(false);
    props.ShowLevel(true);

  };

  const onCancelPolicyHandler = (event) => {
    event.preventDefault();
    setShowOptions(false);
    props.ShowCancelPolicy(true);

  };

  const onNotificationHandler = (event) => {
    event.preventDefault();
    history.push('/Notification');

  }

  useEffect(() => {
    let role = localStorage.getItem('Role');//check here
    if (role === 'ADMIN') {
      setShow(true);
    } else {
      if (role === 'USER') {
        setShow(false);
      }
    }

    const ID = localStorage.getItem('ID');


    const onFetchData = async (ID) => {
      try {
        const response = await fetch(`http://localhost:8080/fetchemployee/?id=${ID}`);//here put id
        if (!response.ok) {
          throw new Error('Something Went Wrong!!');
        };
        const data = await response.json();
        setEmpId(data.employeeinformation.empcode);
        setName(data.employeeinformation.firstname + ' ' + data.employeeinformation.lastname);
        setEmpPlan(data.premiuminformation.plandetails.planname);
        localStorage.setItem('Plan', data.premiuminformation.plandetails.planname);
        localStorage.setItem('Level', data.premiuminformation.coveragedetails.coveragelevel);
        setEmpLevel(data.premiuminformation.coveragedetails.coveragelevel);
        setMonthlyPremium(data.premiuminformation.amount);

      } catch (error) {
        alert(error);
      }

    }
    onFetchData(ID);
  }, [])

  const handleClose = () => {
    setShowOptions(false);
  }
  const handleOpen = () => {
    setShowOptions(true);
  }

  const onAddEmployeeHandler = (event) => {
    event.preventDefault();
    history.push('/AddEmployee');
  }

  const onLogoutHandler = (event) => {
    event.preventDefault();
    AuthCtx.logout();
    history.replace('/SignIn');
  }
  //************************************ */
  // if (history.action === "POP") {
  //   console.log('hello');
  //   history.replace('/HomePage');
  // }
  //***************************************** */
  return (
    <Container maxWidth="md">
      <Card sx={{ mt: 3, boxShadow: 8 }}>
        <CardContent sx={{ ml: 2, mr: 2 }}>
          <Box sx={{ display: "flex", justifyContent: "space-between" }}>
            <Typography gutterBottom variant="h4" align="left">
              {Name + "'s"} Health Policy Details
            </Typography>
            <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: 'center' }} >
              {show && <Badge badgeContent={props.NotificationNumber} color="primary" >
                <MailIcon color="action" variant="standard" onClick={onNotificationHandler} sx={{
                  "&:hover": {
                    color: "blue"
                  }
                }} />
              </Badge>}
              <FormControl sx={{ minWidth: 100, marginLeft: 4 }}>
                <InputLabel id="simple-select" color="success"  >
                  Options
                </InputLabel>
                <Select
                  labelId="simple-select"
                  id="simple-select"
                  color="success"
                  label="Options"
                  open={showOptions}//this is the way to hide dropdown list 
                  onClose={handleClose}
                  onOpen={handleOpen}
                >
                  <MenuItem onClick={onChangePlanHandler}  >ChangePlan</MenuItem>
                  <MenuItem onClick={onChangeLevelHandler}>
                    ChangeLevel
                  </MenuItem>
                  <MenuItem onClick={onCancelPolicyHandler}>
                    CancelPolicy
                  </MenuItem>
                  {show && <MenuItem onClick={onAddEmployeeHandler} >AddEmployee</MenuItem>}
                  <MenuItem onClick={onLogoutHandler} >LogOut</MenuItem>
                </Select>
              </FormControl>
            </Box>
          </Box>
          <Box
            sx={{
              marginTop: 2,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <TextField
              sx={{ mt: 3 }}
              id="standard-read-only-input"
              label="Employee Id"
              variant="standard"
              color="success"
              value={empId}
              focused
              fullWidth
              InputProps={{
                readOnly: true,
                style: { fontWeight: "bold", fontSize: 25, color: 'green' },
              }}
            />


            <TextField
              sx={{ mt: 3 }}
              id="standard-read-only-input"
              label="Employee Plan"
              variant="standard"
              color="success"
              value={empPlan}
              focused
              fullWidth
              InputProps={{
                readOnly: true,
                style: { fontWeight: "bold", fontSize: 25, color: 'green' },
              }}
            />
            <TextField
              sx={{ mt: 3 }}
              id="standard-read-only-input"
              label="Level"
              variant="standard"
              color="success"
              value={empLevel}
              focused
              fullWidth
              InputProps={{
                readOnly: true,
                style: { fontWeight: "bold", fontSize: 25, color: 'green' },
              }}
            />
            <TextField
              sx={{ mt: 3 }}
              id="standard-read-only-input"
              label="Monthly Premium"
              variant="standard"
              color="success"
              value={'₹' + monthlyPremium}
              focused
              fullWidth
              InputProps={{
                readOnly: true,
                style: { fontWeight: "bold", fontSize: 25, color: 'green' },
              }}
            //to do anything with input props use above
            />
          </Box>
          <Typography variant="body2" color="text.secondary" sx={{ mt: 2 }}>
            A policy of life insurance is the cheapest and safest mode of
            making a certain provision for one's family.
          </Typography>
        </CardContent>
        {/* <CardActions>
            <Button size="small">ChangePlan</Button>
            <Button size="small">ChangeLevel</Button>
            <Button size="small">CancelPolicy</Button>
            <Button size="small">LogOut</Button>
          </CardActions> */}
      </Card>
    </Container>
  );
};

export default HomePage;
