import React from "react";
import Box from '@mui/material/Box';


const Sidebar = () => {

    return (
        <div className="sidebar">
            
            <Box 
                sx={{
                    height: 233,
                    width: 1,
                    backgroundColor: "red",
                    backgroundRepeat: "no-repeat",
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "flex-end",
                    
                }}
            >TESTING</Box>
        </div>

    )
}

export default Sidebar;