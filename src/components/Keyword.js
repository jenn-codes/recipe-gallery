import React from 'react';
import { useParams } from 'react-router-dom';

const Keyword = () => {
    
    const params = useParams();
    const keyword = params.id;

    console.log(keyword);

    return ( 
        <div>
            <span>Keyword</span>
        </div>

    )


}

export default Keyword;