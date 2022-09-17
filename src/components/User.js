import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getAuth, onAuthStateChanged, updateProfile } from "firebase/auth";
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom';
import { Grid } from '@mui/material';


const User = () => {


    const navigate = useNavigate();
    const params = useParams();
    const paramId = params.id;
    console.log(paramId);
    const auth = getAuth();
    const [uid, setUid] = useState(null);
    const [email, setEmail] = useState(null);
    const [displayName, setDisplayName] = useState(null);
    const [newUrl, setNewUrl] = useState('');
    const [userLoggedIn, setUserLoggedIn] = useState(false);

    console.log(uid)


    useEffect(() => {       
        onAuthStateChanged(auth, (user) => {
            if (user) {
                setEmail(user.email);
                setUid(user.uid);
                setDisplayName(user.displayName);
                setNewUrl(`/user/${user.uid}`); 
                setUserLoggedIn(true);
                navigate(newUrl)
                console.log(newUrl)
            } 
        })   

    }, [auth, navigate, newUrl])
    
    const updateName = () => {
        updateProfile(auth.currentUser, {
            displayName: displayName
        })
        document.querySelector('#displayName').value = '';        
    }


    return ( 
        <div>
            {userLoggedIn ? 
            
            <Box
                component="form"
                className="add-post"
                sx={{
                    backgroundColor: 'white', borderRadius: 2, margin: 'auto',  
                    '& > :not(style)': { m: 1, width: '40' },
                }}
                noValidate
                autoComplete="off"
                >
                <Typography variant="h4" sx={{color: 'gray', textAlign: 'center', margin: 'auto'}} >
                    User Data
                </Typography>

                <Grid container spacing={2} style={{width: '80%', margin: 'auto'}}>
                    <Grid item xs={10} style={{padding: 0}}>
                        <TextField id="displayName" label="Enter a display name." onChange={(e) => setDisplayName(e.target.value)} variant="standard" style = {{width: '90%', padding: 0}} />
                    </Grid>
                    <Grid item xs={2} style={{padding: 0, display: 'flex', flexDirection: 'column', justifyContent: 'flex-end'}}>
                        <Button size="small" variant="outlined" sx={{backgroundColor: 'white', padding: 0, alignSelf: 'center', justifySelf: 'center'}} onClick={updateName}  style={{padding: 0,  verticalAlign: 'middle'}}>Update</Button>
                    </Grid>
                </Grid>
                
                <Typography variant="p" align="center" style={{width: '80%'}}>User Email: {email}</Typography>
                <Typography variant="p" align="center"  style={{width: '80%'}}>Display Name: {displayName}</Typography>
                <Typography variant="p" align="left" >Posts Submitted by User:</Typography>

            </Box>

            : <span>You are not logged in. Log in to continue.</span>}



        </div>
    )   
}

export default User;