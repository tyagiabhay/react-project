import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { useRef, useState, useEffect } from 'react';
import styled from "./LoginPage.module.css";
import { ButtonBase, MenuItem } from '@mui/material';
import { useHistory } from 'react-router-dom';
import Modal from '../Layout/Modal';

const regEmail = /^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9+_.-]+\.+[a-z]+$/;
const regFirstName = /^[A-Za-z]+$/;
const regLastName = /^[A-Za-z]+$/;

const AddEmployee = () => {
  const [AllData, setAllData] = useState([]);
   const [PlanValue,setPlanValue] =useState('');
   const [active,setInactive] = useState(false);
   const history = useHistory();

  const firstNameRef = useRef();
  const lastNameRef = useRef();
  const emailIdRef = useRef();
  const textRef = useRef();



  const [formsValidity, setFormValidity] = useState({
    firstName: true,
    lastName: true,
    emailId: true,
  });


  const isEmailValid = (value) => regEmail.test(value);
  const isFirstNameValid = (value) => regFirstName.test(value);
  const isLastNameValid = (value) => regLastName.test(value);

  const onFocusHandler = () => {
    setFormValidity({ firstName: true, lastName: true, emailId: true, });
  };


  const sendNewEmployeeData = async(firstname,lastname,email,empcode,premiuminfoid) => {
    try{
          const response = await fetch('http://localhost:8080/inserttransaction',{
            method:'POST',
            body:JSON.stringify({
              employeeinformation:{
                firstname,
                lastname,
                email,
                empcode,
              },
              premiuminformation:{
                premiuminfoid,
              }
            }),
            headers: { "content-type": "application/json" },

          })
          if (!response.ok) {
            const data = await response.json();
            alert(data.message);
            throw new Error("Something Went Wrong!!");
          }
          if (response.ok) {
            const data = await response.text();
            if(data === 'user_inactive'){
              console.log(data);
              // prompt("User is inactive. Do you want to take policy again?", inpu);
              // alert('User is Inactive');
              setInactive(true);
            }
            else{
              alert('Employee Added Successfully......');
              history.replace('/HomePage');
            }
            
          }
    }catch(error){
      console.log(error);
    }
  }



  const sendInactiveEmployeeData = async(firstname,lastname,email,empcode,premiuminfoid) => {
    console.log(firstname);
    try{
          const response = await fetch('http://localhost:8080/insertinactivetransaction',{
            method:'POST',
            body:JSON.stringify({
              employeeinformation:{
                firstname,
                lastname,
                email,
                empcode,
              },
              premiuminformation:{
                premiuminfoid,
              }
            }),
            headers: { "content-type": "application/json" },

          })
          if (!response.ok) {
            throw new Error("Something Went Wrong!!");
          }
          if (response.ok) {
            // const data = await response.json();
            alert('Employee Reactivated......');
            setInactive(false);
            history.replace('/HomePage');
            
  
            
          }
    }catch(error){
      console.log(error);
    }
  }




  const onSubmitHandler = (event) => {
    event.preventDefault();


    const enrteredFirstName = firstNameRef.current.value;
    const enteredLastName = lastNameRef.current.value;
    const enteredEmailId = emailIdRef.current.value.toLowerCase();
    const enteredText = textRef.current.value;
    const premiumID = PlanValue;
    localStorage.setItem('FirstName',enrteredFirstName);
    localStorage.setItem('LastName',enteredLastName);
    localStorage.setItem('EMailId',enteredEmailId);
    localStorage.setItem('Text',enteredText);
    localStorage.setItem('PremiumId',premiumID);
    


    const enteredEmailIdIsvalid = isEmailValid(enteredEmailId);
    const enrteredFirstNameIsValid = isFirstNameValid(enrteredFirstName);
    const enteredLastNameIsValid = isLastNameValid(enteredLastName);


    //setEmpData({firstname: enrteredFirstName,lastname:enteredLastName,email:enteredEmailId,text:enteredText,premiumid:premiumID})


    setFormValidity({
      firstName: enrteredFirstNameIsValid,
      lastName: enteredLastNameIsValid,
      emailId: enteredEmailIdIsvalid,

    });
    let formIsValid = enrteredFirstNameIsValid && enteredLastNameIsValid && enteredEmailIdIsvalid;

    if (!formIsValid) {
      return;
    }
    else {
      //here i have reset the values to null;
      sendNewEmployeeData(enrteredFirstName,enteredLastName,enteredEmailId,enteredText,premiumID);
      // firstNameRef.current.value = '';
      // lastNameRef.current.value = '';
      // emailIdRef.current.value = '';
      // textRef.current.value = '';
      setPlanValue('');
    }
  };

  useEffect(() => {
    const getAllInfo = async () => {
      try {
        const response = await fetch('http://localhost:8080/fetchpremium');
        if (!response.ok) {
          throw new Error("error.......")
        }
        const data = await response.json();
        const AllData = [];
        for (let key in data) {
          AllData.push({ coverageId: data[key].coveragedetails.coverageid, coverageLevel: data[key].coveragedetails.coveragelevel, planId: data[key].plandetails.planid, planName: data[key].plandetails.planname, premiumInfoId: data[key].premiuminfoid })
        }
        setAllData(AllData);
      } catch (error) {
        console.log(error);
      }
    }
    getAllInfo();
  }, [])

  //*********************************** */
  const onChangePlan = (event) => {
    setPlanValue(event.target.value);
  };
//********************************* */
const yesOnClickHandler = (event) => {
  event.preventDefault();

  const firstname = localStorage.getItem('FirstName');
  const lastname = localStorage.getItem('LastName');
  const email = localStorage.getItem('EMailId');
  const text = localStorage.getItem('Text');
  const premium = localStorage.getItem('PremiumId');

  setInactive(false);
   sendInactiveEmployeeData(firstname,lastname,email,text,premium);

}
const noOnClickHandler = (event) => {
  event.preventDefault();
  alert('Rejected....'); 
  setInactive(false);
}
  return (

    
    <Container component="main" maxWidth="xs">
      {active && <Modal>{<div>
        <p>User is inactive. Do you want to get policy again?</p>
        <Button sx={{mr:4}} variant='outlined' size='small' onClick={noOnClickHandler}>no</Button>
        <Button sx={{mr:4}} variant='outlined' size='small' onClick={yesOnClickHandler} >yes</Button>       
        </div>}</Modal>}
      <CssBaseline />
      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Add Employee
        </Typography>
        <Box component="form" onSubmit={onSubmitHandler} sx={{ mt: 3 }}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                name="FirstName"
                required
                fullWidth
                id="FirstName"
                label="First Name"
                inputRef={firstNameRef}
                onFocus={onFocusHandler}
                error={!formsValidity.firstName}
              />
              {!formsValidity.firstName && (
                <p className={styled.invalid} >Please enter a valid First Name must include only alphabets!</p>
              )}
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                fullWidth
                id="LastName"
                label="Last Name"
                name="LastName"
                autoComplete="off"
                inputRef={lastNameRef}
                onFocus={onFocusHandler}
                error={!formsValidity.lastName}
              />
              {!formsValidity.lastName && (
                <p className={styled.invalid} >Please enter a valid Last Name must include only alphabets!</p>
              )}
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
              
                inputRef={emailIdRef}
                onFocus={onFocusHandler}
                error={!formsValidity.emailId}
              />
              {!formsValidity.emailId && (
                <p className={styled.invalid} >Please enter a valid emailId!</p>
              )}
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                name="EmpCode"
                label="EmployeeCode"
                autoComplete="off"
                type="text"
                id="text"
                inputRef={textRef}
                onFocus={onFocusHandler}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                name='PlanName'
                label="PlanName"
                autoComplete="off"
                type="text"
                id="text"
                select
                onChange={onChangePlan}
                SelectProps={{
                  value: (PlanValue)
                }}  
              >

                {AllData.map((option) => {
            return (
              <MenuItem key={option.premiumInfoId} value={option.premiumInfoId}             
               >{(option.coverageLevel+' '+option.planName)}</MenuItem>
            )
          })}

              </TextField>
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Confirm
          </Button>
        </Box>
      </Box>
      
    </Container>
  );
}
export default AddEmployee;