import React, { useState } from 'react';
import { Box, Button, Typography, TextField, Paper, FormControl, InputLabel, Select, MenuItem } from '@mui/material';

const Articles = () => {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [author, setAuthor] = useState('');

    const handleSubmit = (event) => {
        event.preventDefault();
        console.log('Submitting article:', title, content, author);
        // Here, integrate with your backend or state management to actually create the article
    };

    return (
        <Box component="form" onSubmit={handleSubmit} sx={{ '& .MuiTextField-root': { m: 1 } }}>
            <Typography variant="h6">Create New Article</Typography>
            <TextField
                label="Title"
                fullWidth
                variant="outlined"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
            />
            <TextField
                label="Content"
                fullWidth
                multiline
                rows={4}
                variant="outlined"
                value={content}
                onChange={(e) => setContent(e.target.value)}
            />
            <FormControl fullWidth>
                <InputLabel>Author</InputLabel>
                <Select
                    value={author}
                    label="Author"
                    onChange={(e) => setAuthor(e.target.value)}
                >
                    <MenuItem value="Author 1">Author 1</MenuItem>
                    <MenuItem value="Author 2">Author 2</MenuItem>
                    <MenuItem value="Author 3">Author 3</MenuItem>
                </Select>
            </FormControl>
            <Button type="submit" variant="contained" color="primary" sx={{ mt: 2 }}>
                Create Article
            </Button>
        </Box>
    );
};

export default Articles;
