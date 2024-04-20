import React, { useState } from 'react';
import { Box, CssBaseline, Drawer, AppBar, Toolbar, List, ListItem, ListItemIcon, ListItemText, Typography, Collapse, ThemeProvider } from '@mui/material';
import { ExpandLess, ExpandMore, Notifications, Forum, Settings, Announcement, Publish } from '@mui/icons-material';
import theme from '../../theme/theme';

// Import notification sub-components
import DoctorantSignUpRequests from './Notifications/DoctorantSignUpRequests';
import ProfesseurSignUpRequests from './Notifications/ProfesseurSignUpRequests';
import ProfesseurChangeTeamRequests from './Notifications/ProfesseurChangeTeamRequests';
import ProfileSettings from './ProfileSettings/ProfileSettings';
import Articles from './Articles/Articles';  // Adjust the path as necessary if it differs

const drawerWidth = 240;

const Dashboard = () => {
    const [open, setOpen] = useState(false);
    const [selectedComponent, setSelectedComponent] = useState('');

    const handleClick = () => {
        setOpen(!open);
    };

    const handleMenuItemClick = (componentName) => {
        setSelectedComponent(componentName);
    };

    const renderComponent = () => {
        switch (selectedComponent) {
            case 'Discussion':
                return <Typography variant="body2">Discussion Content</Typography>;
            case 'ProfileSettings':
                return <ProfileSettings />;
            case 'Announcements':
                return <Typography variant="body2">Announcements Content</Typography>;
            case 'Publications':
                return <Typography variant="body2">Publications Content</Typography>;
            case 'DoctorantSignUpRequests':
                return <DoctorantSignUpRequests />;
            case 'ProfesseurSignUpRequests':
                return <ProfesseurSignUpRequests />;
            case 'ProfesseurChangeTeamRequests':
                return <ProfesseurChangeTeamRequests />;
            case 'Articles':  // Ensure you have added this case
                return <Articles />;
            default:
                return <Typography variant="body2">Please select an item from the menu.</Typography>;
        }
    };

    return (
        <ThemeProvider theme={theme}>
            <Box sx={{ display: 'flex' }}>
                <CssBaseline />
                <AppBar position="fixed" sx={{ width: `calc(100% - ${drawerWidth}px)`, ml: `${drawerWidth}px` }}>
                    <Toolbar>
                        <Typography variant="h6" noWrap>
                            Dashboard
                        </Typography>
                    </Toolbar>
                </AppBar>
                <Drawer
                    variant="permanent"
                    sx={{
                        width: drawerWidth,
                        flexShrink: 0,
                        '& .MuiDrawer-paper': { width: drawerWidth, boxSizing: 'border-box' },
                    }}
                >
                    <Toolbar />
                    <Box sx={{ overflow: 'auto' }}>
                        <List>
                            <ListItem button onClick={handleClick}>
                                <ListItemIcon>
                                    <Notifications />
                                </ListItemIcon>
                                <ListItemText primary="Notifications" />
                                {open ? <ExpandLess /> : <ExpandMore />}
                            </ListItem>
                            <Collapse in={open} timeout="auto" unmountOnExit>
                                <List component="div" disablePadding>
                                    <ListItem button sx={{ pl: 4 }} onClick={() => handleMenuItemClick('DoctorantSignUpRequests')}>
                                        <ListItemText primary="Doctorant Sign-up Requests" />
                                    </ListItem>
                                    <ListItem button sx={{ pl: 4 }} onClick={() => handleMenuItemClick('ProfesseurSignUpRequests')}>
                                        <ListItemText primary="Professeur Sign-up Requests" />
                                    </ListItem>
                                    <ListItem button sx={{ pl: 4 }} onClick={() => handleMenuItemClick('ProfesseurChangeTeamRequests')}>
                                        <ListItemText primary="Professeur Change Team Requests" />
                                    </ListItem>
                                </List>
                            </Collapse>
                            <ListItem button onClick={() => handleMenuItemClick('Discussion')}>
                                <ListItemIcon><Forum /></ListItemIcon>
                                <ListItemText primary="Discussion" />
                            </ListItem>
                            <ListItem button onClick={() => handleMenuItemClick('ProfileSettings')}>
                                <ListItemIcon><Settings /></ListItemIcon>
                                <ListItemText primary="Paramètre de Profile" />
                            </ListItem>
                            <ListItem button onClick={() => handleMenuItemClick('Announcements')}>
                                <ListItemIcon><Announcement /></ListItemIcon>
                                <ListItemText primary="Announcements" />
                            </ListItem>
                            <ListItem button onClick={() => handleMenuItemClick('Publications')}>
                                <ListItemIcon><Publish /></ListItemIcon>
                                <ListItemText primary="Publications" />
                            </ListItem>
                            <ListItem button onClick={() => handleMenuItemClick('Articles')}>
                                <ListItemIcon><Publish /></ListItemIcon>
                                <ListItemText primary="Manage Articles" />
                            </ListItem>
                        </List>
                    </Box>
                </Drawer>
                <Box
                    component="main"
                    sx={{
                        flexGrow: 1,
                        bgcolor: 'background.default',
                        p: 3,
                    }}
                >
                    <Toolbar />
                    {renderComponent()}
                </Box>
            </Box>
        </ThemeProvider>
    );
};

export default Dashboard;
