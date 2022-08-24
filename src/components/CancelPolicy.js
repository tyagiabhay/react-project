import Modal from "../Layout/Modal";
import { Typography } from "@mui/material";
import { Button, Box } from "@mui/material";
const CancelPolicy = (props) => {
    let email = localStorage.getItem('EmailId');

    const onCancelPolicy= async(email) => {

        

        try{
              const response = await fetch('http://localhost:8080/insertcancelpolicyrequest',{
                method:'POST',
                body:JSON.stringify({
                 email,
                }),
                headers: { "content-type": "application/json" },
    
              })
              if (!response.ok) {
                // const data = await response.json();
                // alert(data.message);
                throw new Error("Something Went Wrong!!");
              }
              if (response.ok) {
                alert('Cancel Policy Request Initiated......');
                props.onClose();
              }
        }catch(error){
          console.log(error);
        }
      }


    const onCancelClickHandler = () => {
        props.onClose();
    }
    const cancelPolicy = () => {
        onCancelPolicy(email);
    }

    return (<Modal onClose={props.onClose}  >
        <Typography gutterBottom variant="h4" align="center" >
            CancelPolicy
        </Typography>
        <Typography color='red' gutterBottom variant="h6" align="left"  >
            Are You Sure You Want To Cancel Your Current Policy
        </Typography>
        <Box sx={{ mt: 3 }} >
            <Button sx={{ mr: 2 }} variant='outlined' size='small' onClick={onCancelClickHandler} > Cancel </Button>
            <Button sx={{ mr: 2 }} variant='outlined' size='small' onClick={cancelPolicy} > Confirm </Button>
        </Box>
    </Modal>);
}
export default CancelPolicy;