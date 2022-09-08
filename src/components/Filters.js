import React from "react";
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import WhatshotIcon from '@mui/icons-material/Whatshot';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import { Link } from "react-router-dom";

const Filters = ({posts}) => {


    return (
        <div>
            <span>Popular Posts</span>
        
            <Box 
                sx={{
                    backgroundColor: 'white',
                    width: 500,
                    height: 40,
                    borderRadius: 2,
                    margin: 'auto',
                    display: 'flex',
                    gap: 3,
                    alignItems: 'center',
                    paddingLeft: 3
                }}
            >

                <Typography variant="p" sx={{color: 'gray', borderRadius: 2,
                                        "&:hover": {
                                            backgroundColor: '#EBECF0'
                                            }}} >
                    <Link to="/hot" style={{ textDecoration: 'none', color: 'gray'}}>                    
                    <WhatshotIcon sx={{verticalAlign: 'middle'}} /> Hot
                    </Link>
                </Typography>   
                <Typography variant="p" sx={{color: 'gray', borderRadius: 2,
                                        "&:hover": {
                                            backgroundColor: '#EBECF0'
                                               }}} >
                    <Link to="/new" style={{ textDecoration: 'none', color: 'gray'}}>                    
                    <AccessTimeIcon sx={{verticalAlign: 'middle'}}/> New
                    </Link>
                </Typography>
                <Typography variant="p" sx={{color: 'gray', borderRadius: 2,
                                        "&:hover": {
                                            backgroundColor: '#EBECF0'
                                            }}} >
                    <Link to="/trending" style={{ textDecoration: 'none', color: 'gray'}}>                    
                    <TrendingUpIcon sx={{verticalAlign: 'middle'}}/> Trending
                    </Link>
                </Typography>   



                
            </Box>

        </div>


    )
}

export default Filters;