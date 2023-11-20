import React, { useEffect, useState } from 'react';
import { AgGridReact } from 'ag-grid-react';
import dayjs from 'dayjs';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { API_URL } from '../constants';

import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-material.css';

function TrainingList() {
    const [trainings, setTrainings] = useState([]);
    const [customers, setCustomers] = useState([]);

    const [columnDefs] = useState([
        {
            field: 'date', sortable: true, filter: true, width: 180, floatingFilter: true,
            cellRenderer: params => dayjs(params.value).format('DD.MM.YYYY HH:mm')
        },
        {
            field: 'duration', sortable: true, filter: true, width: 150, headerName: 'Duration (min)', floatingFilter: true,
            cellRenderer: params => params.value + ' min'
        },
        {   field: 'activity', sortable: true, filter: true, width: 180, floatingFilter: true },
        {
            field: 'customer', sortable: true, filter: true, width: 180, floatingFilter: true,
            cellRenderer: params => params.value.firstname + ' ' + params.value.lastname
        },
       
    ]);

    const getTrainings = () => {
        fetch(API_URL + 'gettrainings')
            .then(response => {
                if (response.ok)
                    return response.json();
                else
                    alert('Something went wrong with request: GET');
            })
            .then(data => setTrainings(data))
            .catch(err => console.error(err));
        fetch(API_URL + 'api/customers')
            .then(response => {
                if (response.ok)
                    return response.json();
                else
                    alert('Something went wrong with request: GET');
            })
            .then(data => setCustomers(data.content))
            .catch(err => console.error(err));
    };

    useEffect(() => {
        getTrainings();
    }, []);


    return (
        <>
            <AppBar position="static" color="secondary">
                <Toolbar>
                    <Typography variant="h6">Trainings</Typography>
                </Toolbar>
            </AppBar>
            <div className="ag-theme-material" style={{ height: 600, width: '100%', margin: 'auto' }}>
                <AgGridReact
                    rowData={trainings}
                    columnDefs={columnDefs}
                    pagination={true}
                    paginationPageSize={10}
                    animateRows={true}
                    
                />
            </div>
        </>
    )
}

export default TrainingList;