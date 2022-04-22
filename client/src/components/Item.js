import { Box } from '@mui/system';
import React from 'react';

const Item = () => {
    return (
        // This is the motivation video frame
        // <iframe 
        //     width="560" 
        //     height="315" 
        //     src="https://www.youtube.com/embed/videoseries?list=PLUKRqQ8cSB-DCDuEl5vYogIMH9ph-7OP7&autoplay=1" 
        //     title="Motivational Video"
        //     frameborder="0" 
        //     allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
        //     allowfullscreen 
        // />
        <div>
            <Box sx={{
                p: 5
            }}>
                Hello Dean
            </Box>
        </div>
    );
}

export default Item;