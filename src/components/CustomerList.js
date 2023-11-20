import React, { useEffect, useState, useRef } from 'react';
import { AgGridReact } from 'ag-grid-react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { API_URL } from '../constants';

import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-material.css';

function CustomerList() {
    const [customers, setCustomers] = useState([]);
    const gridRef = useRef();

    const [columnDefs] = useState([
        { field: 'firstname', sortable: true, filter: true, width: 130, floatingFilter: true },
        { field: 'lastname', sortable: true, filter: true, width: 130, floatingFilter: true },
        { field: 'streetaddress', sortable: true, filter: true, width: 180, floatingFilter: true },
        { field: 'postcode', sortable: true, filter: true, width: 130, floatingFilter: true },
        { field: 'city', sortable: true, filter: true, width: 130, floatingFilter: true },
        { field: 'email', sortable: true, filter: true, width: 180, floatingFilter: true },
        { field: 'phone', sortable: true, filter: true, width: 180, floatingFilter: true },
        
    ]);

    const getCustomers = () => {
        fetch(API_URL + 'api/customers')
            .then(response => {
                if (response.ok)
                    return response.json();
                else
                    alert('Something went wrong in GET request');
            })
            .then(data => setCustomers(data.content))
            .catch(err => console.error(err));
    };


    useEffect(() => {
        getCustomers();
    }, []);

    
    return (
        <>
            <AppBar position="static" color="secondary">
                <Toolbar>
                    <Typography variant="h6">Customers</Typography>
                </Toolbar>
            </AppBar>
            <div className="ag-theme-material" style={{ height: 600, width: '100%', margin: 'auto' }}>
                <AgGridReact
                    ref={gridRef}
                    rowData={customers}
                    columnDefs={columnDefs}
                    pagination={true}
                    paginationPageSize={10}
                    animateRows={true}
                />
            </div>
        </>
    )
}

export default CustomerList;