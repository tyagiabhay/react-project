import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import { Link,useHistory } from "react-router-dom";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { useRef, useState,useContext } from "react";
import styled from "./LoginPage.module.css";
import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import AuthContext from "../store/auth-context";







const regPassword =
  /^.*(?=.{8,})(?=..*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%^&+=]).*$/;
const regEmail = /^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9+_.-]+\.+[a-z]+$/;


const SignIn = (props) => {
  const [values, setValues] = useState('password');
  const [type,setType] = useState(false);
  const emailIdRef = useRef();
  const passwordRef = useRef();

  const [formsValidity, setFormValidity] = useState({
    emailId: true,
    password: true,
  });
  //********** */
  const AuthCtx = useContext(AuthContext);
  //*********** */

  let history = useHistory();

  const isPasswordValid = (value) => regPassword.test(value);
  const isEmailValid = (value) => regEmail.test(value);

  const onFocusHandler = () => {
    setFormValidity({ emailId: true, password: true });
  };

  const onToggleHandler = () => {
    if (values === "password") {
      setValues('text');
      setType(true)
    } else {
      setValues('password');
      setType(false);
    }
  };



  const FetchHandler = async (emailId, password) => {
    try {
      const response = await fetch(
        "http://localhost:8080/login",
        {
          method: "POST",
          body: JSON.stringify({
            email: emailId,
            password: password,
          }),
          headers: { "content-type": "application/json" },
        }
      );
      if (!response.ok) {
        throw new Error("Something Went Wrong!!");
      }
      if (response.ok) {
        const data = await response.json();
        let role = data.role;
        let id = data.id;
        let active = data.isactive;
        
        if ((data.response === 'Success') && (active === 'true')) {
         localStorage.setItem('Role',role);
          localStorage.setItem('ID',id);
          // cookie.set('ID',id, {path: '/'});
          // Cookies.set('ID',id, {path: '/'});
          AuthCtx.login(data.email);//important check it//changeit with id afterwards
          history.replace('/HomePage');
        }
        else if ((data.response === 'Success') && (active === 'false')){
          alert('User is InActive....')
        }
        else {
          if (data.response === 'Fail') {
            alert('password is incorrect....')
          }
          else {
            if (data.response === 'UserInvalid') {
              alert('User Doesnot exist');
            }
          }
        }

      }
    } catch (error) {
      console.log(error);
    }
  };





  const onSubmitHandler = (event) => {
    event.preventDefault();

    const enteredEmailId = emailIdRef.current.value.toLowerCase();//try first
    const enteredPassword = passwordRef.current.value;

    const enteredEmailIdIsvalid = isEmailValid(enteredEmailId);
    const enteredPasswordIsValid = isPasswordValid(enteredPassword);

    setFormValidity({
      password: enteredPasswordIsValid,
      emailId: enteredEmailIdIsvalid,
    });

    let formIsValid = enteredEmailIdIsvalid && enteredPasswordIsValid;

    if (!formIsValid) {
      return;
    }

    FetchHandler(enteredEmailId, enteredPassword);
    props.fetchingNotification();
  };
  
 

  return (
    <React.Fragment>

      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <Box component="form" onSubmit={onSubmitHandler} sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              // type='email'
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
            {/* <label  style={{color: 'blue'}} >Name</label> */}
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type={values}

              
              id="password"
              autoComplete="new-password"
              inputRef={passwordRef}
              onFocus={onFocusHandler}
              error={!formsValidity.password}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    {/* <p>hello</p> */}
                    <IconButton
                      aria-label="toggle password visibility"
                      // onMouseDown={handleMouseDownPassword}
                      onClick={onToggleHandler}
                      edge="end"
                    >
                      {type ? <Visibility />  :  <VisibilityOff />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />

            {!formsValidity.password && (
              <p className={styled.invalid}>Please enter a valid password!</p>
            )}

            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
        >
              Sign In
            </Button>
            <Grid container>
              <Grid item xs>
                <Link
                  style={{ textDecoration: "none" }}
                  to="/ForgotPassword"
                  variant="body2"
                    //onClick={onForgotClickHandler}
                >
                  Change password?
                </Link>
                {/* <link type="text/css" />
                <link href="/css/style.css" rel="stylesheet" type="text/css"></link> */}
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </React.Fragment>
  );
};
export default SignIn;

