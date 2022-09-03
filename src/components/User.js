import React from 'react';
import { useParams } from 'react-router-dom';

const User = () => {
    
    const params = useParams();
    const user = params.id;

    return ( 
        <div>
            <span>User</span>
        </div>
    )
}

export default User;