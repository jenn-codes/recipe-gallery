import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getAuth, onAuthStateChanged, updateProfile } from "firebase/auth";
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

const User = () => {
    
    const params = useParams();
    const paramId = params.id;
    const auth = getAuth();
    const [uid, setUid] = useState(null)
    const [email, setEmail] = useState(null)
    const [displayName, setDisplayName] = useState(null)

    
    const updateName = () => {
        updateProfile(auth.currentUser, {
            displayName: displayName
        })
        document.querySelector('#displayName').value = '';        
    }



    useEffect(() => {
        onAuthStateChanged(auth, (user) => {
            if (user) {
                setEmail(user.email);
                setUid(user.uid);
                setDisplayName(user.displayName);
            } 
        })   

    }, [auth])


    return ( 
        <div>
            <span>User</span>
            
            <Box
                component="form"
                className="add-post"
                sx={{
                    backgroundColor: 'white', borderRadius: 2, margin: 'auto',  
                    '& > :not(style)': { m: 1, width: '25ch' },
                }}
                noValidate
                autoComplete="off"
                >
                <Typography variant="h4" sx={{color: 'gray', textAlign: 'center', margin: 'auto'}} >
                    Update your display name.
                </Typography>
                
                <TextField id="displayName" label="Enter a display name." onChange={(e) => setDisplayName(e.target.value)} variant="standard" style = {{width: '80%'}}/>
                <Button size="small" variant="contained" sx={{backgroundColor: 'darkorange'}} onClick={updateName}>Update username.</Button>
            </Box>
            <span>{uid}</span>
            <span>{email}</span>
            <span>{displayName}</span>


        </div>
    )   
}

export default User;