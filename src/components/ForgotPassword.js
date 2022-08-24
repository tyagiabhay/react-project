import * as React from 'react';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { useRef, useState } from 'react';
import styled from "./LoginPage.module.css";
import { useHistory } from 'react-router-dom';

const regEmail = /^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9+_.-]+\.+[a-z]+$/;
const regPassword =
  /^.*(?=.{8,})(?=..*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$!%^&+=]).*$/;

const ForgotPassword = () => {

   const history = useHistory();
   
  const emailIdRef = useRef();
  const oldPasswordRef = useRef();
  const newPasswordRef = useRef(); 
  const confirmPasswordRef = useRef();

  const [formsValidity, setFormValidity] = useState({
    emailId: true,
    oldPasswordRef:true,
    newPassword : true,
    confirmPassword : true,
  });

//********************************************* */
  
  const onForgotPasswordHandler = async (email,oldpassword, newpassword,confirmpassword) => {
    try {
      const response = await fetch(
        "http://localhost:8080/forgotpassword",
        {
          method: "POST",
          body: JSON.stringify({
            email,
            oldpassword,
            newpassword,
            confirmpassword
          }),
          headers: { "content-type": "application/json" },
        }
      );
      if (!response.ok) {
        throw new Error("Something Went Wrong!!");
      }
      if (response.ok) {
        const data = await response.json();
        console.log(data.response);
        if(data.response === 'email_invalid'){
            alert('Email is Invalid');
        }
        else if(data.response === 'old_password_invalid'){
            alert('Old Password is Invalid');
        }
        else if(data.response === 'confirm_password_invalid'){
            alert('Confirm Password not same as New Password');
        }
        else if(data.response === 'old_password_equals_new_password'){
            alert("New Password can't be same as Old Password");
        }
        else if( data.response === 'successfully_updated'){
            alert('Successfully Updated');
            emailIdRef.current.value = '';
            oldPasswordRef.current.value = '';
            newPasswordRef.current.value = '';
            confirmPasswordRef.current.value = '';
            history.replace('/SignIn');
        }

       

      }
    } catch (error) {
      alert(error);
    }
  };
//************************************************* */


  const isEmailValid = (value) => regEmail.test(value);
  const isPasswordValid = (value) => regPassword.test(value);

  const onFocusHandler = () => {
    setFormValidity({ emailId: true,oldPassword:true,newPassword:true,confirmPassword:true });
  };


  const onSubmitHandler = (event) => {
    event.preventDefault();

    const enteredEmailId = emailIdRef.current.value.toLowerCase();

    const enteredOldPassword = oldPasswordRef.current.value;
    const enteredPassword = newPasswordRef.current.value;
    const enteredConfirmPassword = confirmPasswordRef.current.value;

    const enteredEmailIdIsvalid = isEmailValid(enteredEmailId);
    const oldPasswordIsValid = isPasswordValid(enteredOldPassword);
    const newPasswordIsValid = isPasswordValid(enteredPassword);
    const enteredConfirmPasswordIsValid = isPasswordValid(enteredConfirmPassword);



    setFormValidity({
      emailId: enteredEmailIdIsvalid,
      oldPassword:oldPasswordIsValid,
      newPassword:newPasswordIsValid,
      confirmPassword:enteredConfirmPasswordIsValid,
    });

    let formIsValid = enteredEmailIdIsvalid && oldPasswordIsValid && newPasswordIsValid && enteredConfirmPasswordIsValid ;

    if (!formIsValid) {
      alert('Enter valid details....');
      return;
    }
    else {
      //here i have reset the values to null;
      onForgotPasswordHandler(enteredEmailId,enteredOldPassword,enteredPassword,enteredConfirmPassword);

     
    }
  };


  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Typography component="h1" variant="h5">
          Get Your New Password
        </Typography>
        <Box component="form" onSubmit={onSubmitHandler} sx={{ mt: 3 }}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="off"
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
                name="OldPassword"
                label='Old Password'
                autoComplete="off"
                type="Password"
                id="Password"
                inputRef={oldPasswordRef}
                onFocus={onFocusHandler}
                
              />
                {!formsValidity.emailId && (
              <p className={styled.invalid} >Please enter a valid Password Type!</p>
            )}
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                name="NewPassword"
                label='New Password'
                autoComplete="off"
                type="Password"
                id="New Password"
                inputRef={newPasswordRef}
                onFocus={onFocusHandler}
                
              />
                {!formsValidity.emailId && (
              <p className={styled.invalid} >Please enter a valid Password!</p>
            )}
            </Grid>
            
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                name="Confrim Password"
                label='Confirm Password'
                autoComplete="off"
                type="Password"
                id="Confirm Password"
                inputRef={confirmPasswordRef}
                onFocus={onFocusHandler}
              />
               {!formsValidity.emailId && (
              <p className={styled.invalid} >Please enter a valid Password!</p>
            )}
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
export default ForgotPassword;