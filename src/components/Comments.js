import React from "react";
import uniqid from 'uniqid';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Divider from '@mui/material/Divider';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';



const Comments = ({ comments }) => {




    return (
        <div className="comments">
            <span>Comments</span>
            <List sx={{ width: '100%', bgcolor: 'background.paper' }}>
                {comments.map(item => {
                    return (     
                        <div>

                        <ListItem alignItems="flex-start" key={uniqid}>
                            <ListItemAvatar>
                                <Avatar sx={{bgcolor: 'darkorange'}}>{item.user[0]}</Avatar>

                            </ListItemAvatar>

                            <ListItemText
                            primary={item.comment}
                            secondary={
                                <React.Fragment>

                                    -{item.user}
                                </React.Fragment>
                            }
                            />
                        </ListItem>
                        <Divider  />

                        </div>         

                    )
                })}
            </List>

        </div>

    )
}

export default Comments;