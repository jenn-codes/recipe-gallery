import React from "react";
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import '../App.css'

const AddPost = ({posts}) => {

    let boards = [];
    posts.forEach(post => {
        if (boards.indexOf(post.board) === -1) {
            boards.push(post.board);
        }
    })

    return (
        <div>


            <Box
                component="form"
                className="add-post"
                sx={{
                    backgroundColor: 'white', borderRadius: 2, margin: 'auto',  
                    '& > :not(style)': { m: 1, width: '25ch' },
                }}
                noValidate
                fullWidth
                autoComplete="off"
                >
                <Typography variant="h4" fullWidth sx={{color: 'gray', textAlign: 'center', margin: 'auto'}} >
                    Submit a Post
                </Typography>
                
                <TextField id="title" label="Enter a title for your post" variant="standard" style = {{width: '80%'}}/>
                
                <FormControl size="small"  style = {{width: '80%'}} >
                        <InputLabel id="board">Choose a board</InputLabel>
                        <Select
                        labelId="board-selection"
                        id="board-selection"
                        // value={age}
                        label="Board"
                        // onChange={handleChange}
                        >

                            {boards.map(board => {
                                return (
                                    <div>
                                        <MenuItem value={board}>{board}</MenuItem>


                                    </div>
                                )
                            })}
                        </Select>
                    </FormControl>

                <TextField
                id="outlined-multiline-static"
                label="Share some details about this recipe."
                style = {{width: '80%'}}
                multiline
                rows={6}
                />
                <TextField id="standard-basic" label="Enter the URL for the image" variant="standard" style = {{width: '80%'}}/>
                <TextField id="standard-basic" label="Enter the URL for the post" variant="standard" style = {{width: '80%'}} />


                <Button size="small" variant="contained" sx={{backgroundColor: 'darkorange'}}>Submit</Button>




            </Box>



        </div>
    )
}

export default AddPost;