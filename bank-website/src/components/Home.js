import React, {useState, useEffect} from 'react'
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import { DataGrid } from '@material-ui/data-grid';
import axios from 'axios';

const columns = [
    { 
        field: 'id', 
        headerName: 'ID', 
        width: 100,
        editable: false,
    },
    {
        field: 'mobileNumber',
        headerName: 'Mobile number',
        width: 200,
        editable: false,
    },
    {
        field: 'firstName',
        headerName: 'First name',
        width: 200,
        editable: false,
    },
    {
        field: 'lastName',
        headerName: 'Last name',
        width: 200,
        editable: false,
    },
    {
        field: 'balance',
        headerName: 'Balance',
        type: 'number',
        width: 200,
        editable: false,
    }
];

const transactionsColumns = [
    {
        field: 'id', 
        headerName: 'Transaction ID', 
        width: 200,
        editable: false,
    },
    {
        field: 'timestamp',
        headerName: 'Timestamp',
        width: 200,
        editable: false,
    },
    {
        field: 'sender_mobile_number',
        headerName: 'Sender mobile number',
        width: 200,
        editable: false,
    },
    {
        field: 'reciever_mobile_number',
        headerName: 'Reciever mobile number',
        width: 200,
        editable: false,
    },
    {
        field: 'is_success',
        headerName: 'Type',
        width: 200,
        editable: false,
    },
    {
        field: 'amount',
        headerName: 'Amount',
        width: 200,
        type: 'number',
        editable: false,
    },
    {
        field: 'before_transaction_sender',
        headerName: 'Before transaction sender',
        width: 200,
        type: 'number',
        editable: false,
    },
    {
        field: 'after_transaction_sender',
        headerName: 'After transaction sender',
        width: 200,
        type: 'number',
        editable: false,
    },
    {
        field: 'before_transaction_reciever',
        headerName: 'Before transaction reciever',
        width: 200,
        type: 'number',
        editable: false,
    },
    {
        field: 'after_transaction_reciever',
        headerName: 'After transaction reciever',
        width: 200,
        type: 'number',
        editable: false,
    },
    {
        field: 'message',
        headerName: 'Message',
        width: 200,
        editable: false,
    },
]

const useStyles = makeStyles((theme) => ({
    root: {
      '& .MuiTextField-root': {
        margin: theme.spacing(1),
        width: '25ch',
      },
    },
    container: {
        margin: theme.spacing(1),
    }
}));

export default function Home() {
    const classes = useStyles();

    const [firstName, setFirstName] = useState(null);
    const [lastName, setLastName] = useState(null);
    const [mobileNumber, setMobileNumber] = useState(null);
    const [balance, setBalance] = useState(null);
    const [transactionList, setTransactionList] = useState([]);
    const [rows, setRows] = useState([]);

    useEffect(() => {
        getUsers();
        getTransactions();
    });

    const getUsers = async () => {
        var data = await axios.get('http://localhost:3001/api/getUsers');
        data = data.data;
        var count = 1;
        data.forEach((obj) => {
            obj.id = count;
            count = count + 1;
        });
        setRows(data);
    };

    const addUser = async () => {
        await axios.post('http://localhost:3001/api/addUser', {
            mobileNumber: mobileNumber, 
            firstName: firstName, 
            lastName: lastName, 
            balance: balance
        });
    }

    const getTransactions = async (data) => {
        var data = await axios.get('http://localhost:3001/api/transactions');
        data = data.data;
        var count = 1;
        data.forEach((obj) => {
            obj.id = count;
            count = count + 1;
        });
        setTransactionList(data);
    }

    return (
        <div style={{marginLeft: 80, marginRight: 80, marginTop: 40}}>
            {/* Header */}
            <div style = {{textAlign: 'center', paddingBottom: 10}}>
                <Typography variant="h2" gutterBottom>
                    Pumkin Bank
                </Typography>
            </div>
            {/* Add User */}
            <div>
                <div className={classes.container}>
                    <Typography variant="h5" gutterBottom>
                        Add user
                    </Typography>
                </div>
                <form className={classes.root} noValidate autoComplete="off">
                    <TextField
                        required
                        id="outlined-required"
                        label="First Name"
                        variant="outlined"
                        onChange={event => {
                            setFirstName(event.target.value);
                        }}
                    />
                    <TextField
                        required
                        id="outlined-required"
                        label="Last Name"
                        variant="outlined"
                        onChange={event => {
                            setLastName(event.target.value);
                        }}
                    />
                    <TextField
                        required
                        id="outlined-required"
                        label="Mobile Number"
                        type="number"
                        variant="outlined"
                        onChange={event => {
                            setMobileNumber(event.target.value);
                        }}
                    />
                    <TextField
                        required
                        id="outlined-required"
                        label="Balance"
                        variant="outlined"
                        onChange={event => {
                            setBalance(event.target.value);
                        }}
                    />
                </form>
                <div className={classes.container}>
                    <div style={{marginTop: 10}}>
                        {firstName !== null && lastName !== null && mobileNumber !== null && balance !== null && firstName !== '' && lastName !== '' && mobileNumber !== '' && balance !== ''
                        ?   <Button variant="contained" color="primary" size="large" onClick = {() => {addUser()}}>
                                Add user
                            </Button>
                        :   <Button variant="outlined" size='large' disabled>
                                Add user
                            </Button>
                        }
                    </div>
                </div>
            </div>
            {/* USER LIST */}
            <div style = {{marginTop: 40}}>
                <div className={classes.container}>
                    <Typography variant="h5" gutterBottom>
                        User List
                    </Typography>
                </div>
                <div>
                    <DataGrid
                        rows={rows}
                        columns={columns}
                        pageSize={10}
                        autoHeight={true}
                    />
                </div>
            </div>
            {/* Transaction List */}
            <div style = {{marginTop: 40}}>
                <div className={classes.container}>
                    <Typography variant="h5" gutterBottom>
                        Transaction List
                    </Typography>
                </div>
                <div>
                    <DataGrid
                        rows={transactionList}
                        columns={transactionsColumns}
                        pageSize={10}
                        autoHeight={true}
                    />
                </div>
            </div>
        </div>
    )
}