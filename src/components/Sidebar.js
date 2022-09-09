import React from "react";
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { Link } from "react-router-dom";
import uniqid from 'uniqid';
import Button from '@mui/material/Button';
import Avatar from '@mui/material/Avatar';
import '../App.css'


const Sidebar = () => {

    const boards = ['drinks', 'desserts', 'mains']

    return (
        <div className="sidebar">
            
            <Box 
                sx={{
                    backgroundColor: 'white',
                    borderRadius: 2,
                    gap: 3,
                    width: 0.9,
                    padding: 2
                }}
            >
                
                <Typography variant="h4" sx={{color: 'gray', borderRadius: 2, textAlign: 'left'}} >
                    Top Food Boards:
                </Typography>
                <Typography variant="p" sx={{color: 'gray', borderRadius: 2, textAlign: 'left', padding: 2}} >
                    {boards.map(board => {
                        return (
                            <div key={uniqid()} className='boards-list'>

                                
                                <Link to={`/board/${board}`} style={{ textDecoration: 'none', color: 'gray'}}>
                                    <div  style={{display: 'flex', alignItems:'center'}}>
                                    <Avatar sx={{bgcolor: 'blue', marginRight: 1}}>{board[0]}</Avatar>
                                    {boards.indexOf(board) + 1}: r/{board}
                                    </div>
                                </Link>

                                <Link to={`/board/${board}`} style={{ textDecoration: 'none', color: 'gray'}}>
                                    <Button size="small" variant="contained">Join</Button>
                                </Link>

                            </div>
                        )
                    })}
                </Typography>   

            </Box>
        </div>

    )
}

export default Sidebar;