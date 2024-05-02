import React, { useState } from 'react';
import { Box, CssBaseline, Drawer, AppBar, Toolbar, List, ListItem,ListItemIcon, ListItemText, Typography, Collapse } from '@mui/material';
import {AddSharp, Article, CalendarViewDaySharp, ExpandLess, ExpandMore, LibraryBooks} from '@mui/icons-material';
import NotificationsIcon from '@mui/icons-material/Notifications';
import ForumIcon from '@mui/icons-material/Forum';
import SettingsIcon from '@mui/icons-material/Settings';
import AnnouncementIcon from '@mui/icons-material/Announcement';
import PublishIcon from '@mui/icons-material/Publish';
import { ThemeProvider } from '@mui/material/styles';
import theme from '../../theme/theme';
import Articles from './Articles/Articles';

// Import notification sub-components
import DoctorantSignUpRequests from './NotificationProf/DoctorantSignUpRequests';
import ProfileProfSettings from "./ProfileProfSettings/ProfileProfSettings";


const drawerWidth = 240;

const ProfDashboard = () => {
    const [open, setOpen] = useState(false);
    const [articlesOpen, setArticlesOpen] = useState(false);
    const [selectedComponent, setSelectedComponent] = useState('');

    const handleClick = (menu) => {
        if (menu === 'notifications') {
            setOpen(!open);
        } else if (menu === 'articles') {
            setArticlesOpen(!articlesOpen);
        }
    };

    const handleMenuItemClick = (componentName) => {
        setSelectedComponent(componentName);
    };

    const renderComponent = () => {
        switch (selectedComponent) {
            case 'Discussion':
                return <Typography variant="body2">Discussion Content</Typography>;
            case 'ProfileSettings':
                return <ProfileProfSettings />;
            case 'Announcements':
                return <Typography variant="body2">Announcements Content</Typography>;
            case 'Publications':
                return <Typography variant="body2">Publications Content</Typography>;
            case 'DoctorantSignUpRequests':
                return <DoctorantSignUpRequests />;
            case 'CreateArticle':
                return <Articles/>;
            case 'AllArticles':
                return <Typography variant="body2">Announcements Content</Typography>;
            case 'MyArticles':
                return <Typography variant="body2">Announcements Content</Typography>;
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
                            {/* Existing Menu Items */}
                            <ListItem button onClick={() => handleClick('notifications')}>
                                <ListItemIcon><NotificationsIcon /></ListItemIcon>
                                <ListItemText primary="Notifications" />
                                {open ? <ExpandLess /> : <ExpandMore />}
                            </ListItem>
                            <Collapse in={open} timeout="auto" unmountOnExit>
                                <List component="div" disablePadding>
                                    <ListItem button sx={{ pl: 4 }} onClick={() => handleMenuItemClick('DoctorantSignUpRequests')}>
                                        <ListItemText primary="Doctorant Sign-up Requests" />
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
                                <ListItemText primary="Profile Settings" />
                            </ListItem>
                            <ListItem button onClick={() => handleMenuItemClick('Announcements')}>
                                <ListItemIcon><AnnouncementIcon /></ListItemIcon>
                                <ListItemText primary="Announcements" />
                            </ListItem>
                            <ListItem button onClick={() => handleMenuItemClick('Publications')}>
                                <ListItemIcon><PublishIcon /></ListItemIcon>
                                <ListItemText primary="Publications" />
                            </ListItem>

                            {/* Articles Menu Item */}
                            <ListItem button onClick={() => handleClick('articles')}>
                                <ListItemIcon><LibraryBooks /></ListItemIcon>
                                <ListItemText primary="Articles" />
                                {articlesOpen ? <ExpandLess /> : <ExpandMore />}
                            </ListItem>
                            <Collapse in={articlesOpen} timeout="auto" unmountOnExit>
                                <List component="div" disablePadding>
                                    <ListItem button sx={{ pl: 4 }} onClick={() => handleMenuItemClick('CreateArticle')}>
                                        <ListItemIcon><AddSharp /></ListItemIcon>
                                        <ListItemText primary="Nouveau Article" />
                                    </ListItem>
                                    <ListItem button sx={{ pl: 4 }} onClick={() => handleMenuItemClick('AllArticles')}>
                                        <ListItemIcon><CalendarViewDaySharp /></ListItemIcon>
                                        <ListItemText primary="Articles" />
                                    </ListItem>
                                    <ListItem button sx={{ pl: 4 }} onClick={() => handleMenuItemClick('MyArticles')}>
                                        <ListItemIcon><Article /></ListItemIcon>
                                        <ListItemText primary="Mes Articles" />
                                    </ListItem>
                                </List>
                            </Collapse>
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

export default ProfDashboard;