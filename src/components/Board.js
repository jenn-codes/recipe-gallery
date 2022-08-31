import React from 'react';
import { useParams } from 'react-router-dom';

const Board = () => {
    
    const params = useParams();
    const board = params.id;

    console.log(board);

    return ( 
        <div>
            <span>Board</span>
        </div>

    )


}

export default Board;