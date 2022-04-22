
import React from 'react';
import { Box } from '@mui/system';
import { Card } from '@mui/material';

const Item = ({motivation}) => {
    return (
        // This is the motivation video frame
        <div>
            <Box sx={{
                p: 1
            }}>
                { motivation.type === 'Quote' ? 
                    <Card 
                        variant="outlined" 
                        style={{
                            position: 'absolute', left: '50%', top: '50%',
                            transform: 'translate(-50%, -50%)' 
                        }}
                        sx={{
                            p: 5
                        }}
                        >{motivation.content}</Card> :
                    <iframe 
                        width="355" 
                        height="200" 
                        src="https://www.youtube.com/embed/videoseries?list=PLUKRqQ8cSB-DCDuEl5vYogIMH9ph-7OP7&autoplay=0" 
                        title="Motivational Video"
                        frameborder="0" 
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                        allowFullScreen 
                    />
                }
            </Box>
        </div>
    );
}

export default Item;