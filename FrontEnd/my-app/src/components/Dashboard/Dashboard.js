import React, { useState } from 'react';
import { Box, CssBaseline, Drawer, AppBar, Toolbar, List, ListItem, ListItemIcon, ListItemText, Typography, Collapse } from '@mui/material';
import { ExpandLess, ExpandMore } from '@mui/icons-material';
import NotificationsIcon from '@mui/icons-material/Notifications';
import ForumIcon from '@mui/icons-material/Forum';
import SettingsIcon from '@mui/icons-material/Settings';
import AnnouncementIcon from '@mui/icons-material/Announcement';
import PublishIcon from '@mui/icons-material/Publish';
import { ThemeProvider } from '@mui/material/styles';
import theme from '../../theme/theme';

// Import notification sub-components
import DoctorantSignUpRequests from './Notifications/DoctorantSignUpRequests';
import ProfesseurSignUpRequests from './Notifications/ProfesseurSignUpRequests';
import ProfesseurChangeTeamRequests from './Notifications/ProfesseurChangeTeamRequests';
import ProfileSettings from './ProfileSettings/ProfileSettings';

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
                return <ProfileSettings  />;
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
                                    <NotificationsIcon />
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
                            {/* Other Main Menu Items */}
                            <ListItem button onClick={() => handleMenuItemClick('Discussion')}>
                                <ListItemIcon><ForumIcon /></ListItemIcon>
                                <ListItemText primary="Discussion" />
                            </ListItem>
                            <ListItem button onClick={() => handleMenuItemClick('ProfileSettings')}>
                                <ListItemIcon><SettingsIcon /></ListItemIcon>
                                <ListItemText primary="Paramètre de Profile" />
                            </ListItem>
                            <ListItem button onClick={() => handleMenuItemClick('Announcements')}>
                                <ListItemIcon><AnnouncementIcon /></ListItemIcon>
                                <ListItemText primary="Annoncements" />
                            </ListItem>
                            <ListItem button onClick={() => handleMenuItemClick('Publications')}>
                                <ListItemIcon><PublishIcon /></ListItemIcon>
                                <ListItemText primary="Publications" />
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
