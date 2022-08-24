import * as React from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { Box, Container, Button, Typography } from '@mui/material';
import { CancelPresentationOutlined, CheckBoxOutlined } from '@mui/icons-material';
import NotificationsActiveTwoToneIcon from '@mui/icons-material/NotificationsActiveTwoTone';
import { useState } from 'react';
import KeyboardBackspaceTwoToneIcon from '@mui/icons-material/KeyboardBackspaceTwoTone';
import { useHistory } from 'react-router-dom';


export default function DataTable(props) {
  const [selectedRows, setSelectedRows] = useState([]);
  const history = useHistory();


  const onFetchedNotification = async (approvedIds) => {
    try {
      const response = await fetch('http://localhost:8080/approvebutton', {
        method: 'POST',
        body: JSON.stringify(approvedIds),

        headers: { "content-type": "application/json" },
      }
      );
      if (!response.ok) {
        throw new Error("Something Went Wrong!!");
      }
      if (response.ok) {
        const data = await response.json();
        
        props.fetchingNotification();
        setSelectedRows([]);
      }

    } catch (error) {
      console.log(error);
    }
  }
  const onRejectedNotification = async (DisapprovedIds) => {
    console.log(DisapprovedIds);
    console.log('hello');
    try {
      const response = await fetch('http://localhost:8080/disapprovebutton', {
        method: 'POST',
        body: JSON.stringify(DisapprovedIds),
        headers: { "content-type": "application/json" },
      }
      );
      if (!response.ok) {
        throw new Error("Something Went Wrong!!");
      }
      if (response.ok) {
        const data = await response.json();
        props.fetchingNotification();
        setSelectedRows([]);
      }

    } catch (error) {
      console.log(error);
    }
  }

  const columns = [

    { field: 'id', headerName: 'ID', width: 70, headerAlign: 'center' },
    { field: 'employeename', headerName: 'Name', width: 170, headerAlign: 'center' },
    { field: 'requestdescription', headerName: 'Request Description', width: 170, headerAlign: 'center' },
    { field: 'requestdetails', headerName: 'Request Details', width: 170, headerAlign: 'center' },

  ];



  const passDataHandler = () => {
    if (selectedRows.length === 0) {
      alert('select atleast one row');
      return;
    }
    else {
      const selectedRowsId = [];
      for (let i = 0; i < selectedRows.length; i++) {
        selectedRowsId.push(selectedRows[i].id);
      }
      onFetchedNotification(selectedRowsId);
    }
  }
  const deleteDataHandler = () => {
    if (selectedRows.length === 0) {
      alert('select atleast one row');
      return;
    }
    else {
      const selectedRowsId = []
      for (let i = 0; i < selectedRows.length; i++) {
        selectedRowsId.push(selectedRows[i].id);
      }
      onRejectedNotification(selectedRowsId);

    }
  }

  // const backbuttonhandler = () => {
  //   history.replace('/HomePage');
  // }

  return (
    <Container maxWidth="xl">
      {/* <Button startIcon={<  KeyboardBackspaceTwoToneIcon />} sx={{
        textTransform: "none", borderColor: 'blue', display: 'flex', alignContent: 'flex-start', mt: 2, "&:hover": {
        }
      }} onClick={
        backbuttonhandler
      }>
        Back
      </Button> */}

      <Box sx={{ display: 'flex' }} >

        <Typography gutterBottom variant='h4' align='left' sx={{ mt: 5 }} >
          Notifications
        </Typography>
        <NotificationsActiveTwoToneIcon sx={{ mt: 5, width: 60, height: 40 }} fontSize='large' />

      </Box>
      <Box sx={{ mt: 2 }} >
        <div style={{ height: 400, width: '100%' }}>
          <DataGrid sx={{

            boxShadow: 6,
            border: 2,
            borderColor: 'primary.light',
            '& .MuiDataGrid-colCellTitle': {
              display: 'block',
              textAlign: 'left',

            },
            '& .MuiDataGrid-cell': {
              display: 'block',
              textAlign: 'center',
            },

            '& .MuiDataGrid-cell:hover': {
              color: 'primary.main',


            }
          }}

            rows={props.NotificationData}
            columns={columns}
            pageSize={5}
            rowsPerPageOptions={[5]}
            checkboxSelection
            onSelectionModelChange={(ids) => {
              // console.log(ids);
              const selectedIDs = new Set(ids);
              const selectedRows = props.NotificationData.filter((row) =>
                selectedIDs.has(row.id),
              );

              setSelectedRows(selectedRows);
            }}

          />

        </div>

      </Box>
      <div>
        <Button variant="contained" color="primary" startIcon={<CheckBoxOutlined />} sx={{
          textTransform: "none", mt: 2, mr: 2, "&:hover": {
            background: "Green"
          }
        }} onClick={passDataHandler}>
          Approve
        </Button>
        <Button variant="contained" color="primary" startIcon={<CancelPresentationOutlined />} sx={{
          textTransform: "none", mt: 2, "&:hover": {
            background: "Red"
          }
        }} onClick={deleteDataHandler}>
          Disapprove
        </Button>
      </div>


    </Container>
  );
}
