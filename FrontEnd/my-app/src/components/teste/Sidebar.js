// Sidebar.js
import React from 'react';
import { List, ListItem, ListItemIcon, ListItemText, Drawer } from '@mui/material';
import DashboardIcon from '@mui/icons-material/Dashboard';
import GroupIcon from '@mui/icons-material/Group';

const Sidebar = () => {
    // Include your navigation logic here

    return (
        <Drawer
            variant="permanent"
            // Rest of your Drawer props
        >
            <List>
                {['Dashboard', 'Users'].map((text, index) => (
                    <ListItem button key={text} sx={{ '&:hover': { bgcolor: 'action.hover' } }}>
                        <ListItemIcon>
                            {index % 2 === 0 ? <DashboardIcon /> : <GroupIcon />}
                        </ListItemIcon>
                        <ListItemText primary={text} />
                    </ListItem>
                ))}
            </List>
        </Drawer>
    );
};

export default Sidebar;
