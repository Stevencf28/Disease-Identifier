
import React from 'react';
import { Box } from '@mui/system';
import { Card } from '@mui/material';

const Item = ({motivation}) => {
    let content = motivation.content;
    if (motivation.type === 'youtube'){
        if(content.includes('https://youtu.be/')){
            content = content.replace('https://youtu.be/', 'https://www.youtube.com/embed/')
        }
        if(content.includes('https://www.youtube.com/watch?v=')){
            content = content.replace('https://www.youtube.com/watch?v=', 'https://www.youtube.com/embed/')
        }
    }

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
                        src={content}
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