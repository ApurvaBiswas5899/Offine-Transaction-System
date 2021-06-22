import React, {useState} from 'react'
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import { DataGrid } from '@material-ui/data-grid';
import LOGOS from '../assets/logos/LOGOS'

const columns = [
    { field: 'id', headerName: 'ID', width: 100 },
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
        field: 'success',
        headerName: 'Success',
        width: 200,
        editable: false,
    },
    {
        field: 'from',
        headerName: 'From',
        width: 200,
        editable: false,
    },
    {
        field: 'to',
        headerName: 'To',
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
        field: 'message',
        headerName: 'Message',
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
        field: 'details',
        headerName: 'Details',
        width: 200,
        editable: false,
    },
    {
        field: 'beforeTransaction',
        headerName: 'Before transaction',
        width: 200,
        type: 'number',
        editable: false,
    },
    {
        field: 'afterTransaction',
        headerName: 'After transaction',
        width: 200,
        type: 'number',
        editable: false,
    },
]

const rows = [
    { id: 1, mobileNumber: 9867130540, firstName: 'Vision', lastName: 'Maximof', balance: 50000 },
    { id: 2, mobileNumber: 9326004454, firstName: 'Wanda', lastName: 'Maximof', balance: 100000 },
];

const transactions = [
    {
        mobileNumber: 9867130540,
        transactions: [ 
            {id: 324253425, success: '✅  Debited', from: 9867130540, to: 9326004454, amount: 450, message: 'Pizza', timestamp: '2017-12-02', details: 'Transaction Successful', beforeTransaction: 5000, afterTransaction: 6000},
            {id: 234523452, success: '⚠️  Failed', from: 9867130540, to: 9326004454, amount: 450, message: 'Pizza', timestamp: '2017-12-02', details: 'Transaction failed', beforeTransaction: 5000, afterTransaction: 6000},
            {id: 3245234545, success: '✅  Debited', from: 9867130540, to: 9326004454, amount: 450, message: 'Pizza', timestamp: '2017-12-02', details: 'Transaction Successful', beforeTransaction: 5000, afterTransaction: 6000},
            {id: 24345, success: '💰  Credited', from: 9867130540, to: 9326004454, amount: 450, message: 'Pizza', timestamp: '2017-12-02', details: 'Transaction Successful', beforeTransaction: 5000, afterTransaction: 6000},
            {id: 23452345, success: '✅  Debited', from: 9867130540, to: 9326004454, amount: 450, message: 'Pizza', timestamp: '2017-12-02', details: 'Transaction Successful', beforeTransaction: 5000, afterTransaction: 6000},
            {id: 56474567, success: '💰  Credited', from: 9867130540, to: 9326004454, amount: 450, message: 'Pizza', timestamp: '2017-12-02', details: 'Transaction Successful', beforeTransaction: 5000, afterTransaction: 6000},
        ]
    },
    {
        mobileNumber: 9326004454,
        transactions: [ 
            {id: 3456456, success: '✅  Debited', from: 9867130540, to: 9326004454, amount: 450, message: 'Pizza', timestamp: '2017-12-02', details: 'Transaction Successful', beforeTransaction: 5000, afterTransaction: 6000},
            {id: 86967584, success: '⚠️  Failed', from: 9867130540, to: 9326004454, amount: 450, message: 'Pizza', timestamp: '2017-12-02', details: 'Transaction failed', beforeTransaction: 5000, afterTransaction: 6000},
            {id: 4536456, success: '⚠️  Failed', from: 9867130540, to: 9326004454, amount: 450, message: 'Pizza', timestamp: '2017-12-02', details: 'Transaction Successful', beforeTransaction: 5000, afterTransaction: 6000},
            {id: 347567, success: '⚠️  Failed', from: 9867130540, to: 9326004454, amount: 450, message: 'Pizza', timestamp: '2017-12-02', details: 'Transaction Successful', beforeTransaction: 5000, afterTransaction: 6000},
            {id: 234564356, success: '✅  Debited', from: 9867130540, to: 9326004454, amount: 450, message: 'Pizza', timestamp: '2017-12-02', details: 'Transaction Successful', beforeTransaction: 5000, afterTransaction: 6000},
            {id: 354764676, success: '💰  Credited', from: 9867130540, to: 9326004454, amount: 450, message: 'Pizza', timestamp: '2017-12-02', details: 'Transaction Successful', beforeTransaction: 5000, afterTransaction: 6000},
        ]
    },
];

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
    const [showTransactionList, setShowTransactionList] = useState(null);

    const renderList = (data) => {

        const show = transactions.filter(obj => {
            return obj.mobileNumber === data.row.mobileNumber;
        });

        return (
            <div>
                <div className={classes.container}>
                    <Typography variant="h5" gutterBottom>
                        Transaction List for {data.row.firstName}
                    </Typography>
                </div>
                <div>
                    <DataGrid
                        rows={show[0].transactions}
                        columns={transactionsColumns}
                        pageSize={20}
                        autoHeight={true}
                    />
                    
                </div>
            </div>
        )
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
                        ?   <Button variant="contained" color="primary" size="large">
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
                        onRowClick={(GridRowParams) => {
                            setShowTransactionList(GridRowParams);
                        }}
                    />
                </div>
            </div>
            <div style = {{marginTop: 40}}>
                {showTransactionList !== null ? renderList(showTransactionList) : null}
            </div>
        </div>
    )
}