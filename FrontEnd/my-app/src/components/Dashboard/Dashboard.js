import React, { useState } from 'react';
import {
    Box,
    CssBaseline,
    Drawer,
    AppBar,
    Toolbar,
    List,
    ListItem,
    ListItemIcon,
    ListItemText,
    Typography,
    Collapse,
    ThemeProvider,
    Button
} from '@mui/material';
import {
    ExpandLess,
    ExpandMore,
    Notifications,
    Forum,
    Settings,
    Publish,
    CalendarViewDaySharp,
    Article,
    LibraryBooks,
    AddSharp,
    ExitToApp,
    GroupAdd,
    DeleteForever,
    SwapHoriz
} from '@mui/icons-material';
import theme from '../../theme/theme'; // Ensure this is the correct path to your theme file

import PublicationList from './Annonces/PublicationList';
import ModifyAnnoncement from './Annonces/ModifyPublication';
import Chat from "./Chat/Chat";
import CreateTeam from "./Management/CreateTeam";
import DeleteProfessor from "./Management/DeleteProfessor";
import DeleteDoctorant from "./Management/DeleteDoctorant";
import ChangeProfessorRole from "./Management/ChangeProfessorRole";
import FalseActiveArticles from "./Notifications/FalseActiveArticles";
import DoctorantSignUpRequests from "./Notifications/DoctorantSignUpRequests";
import ProfesseurSignUpRequests from "./Notifications/ProfesseurSignUpRequests";
import ProfesseurChangeTeamRequests from "./Notifications/ProfesseurChangeTeamRequests";
import Articles from "./Articles/Articles";
import ArticleDisplay from "./Articles/ArticleDisplay";
import AllArticle from "./Articles/AllArticle";
import HandleLogout from "../login/Logout";
import CreatePublication from "./Annonces/CreatePublication";
import PublishIcon from "@mui/icons-material/Publish";
import ProfileSettings from "./ProfileSettings/ProfileSettings";

// Import other components as needed

const drawerWidth = 240;

const Dashboard = () => {
    const [open, setOpen] = useState(false);
    const [articlesOpen, setArticlesOpen] = useState(false);
    const [selectedComponent, setSelectedComponent] = useState('');
    const [managementOpen, setManagementOpen] = useState(false);
    const [publicationOpen, setPublicationOpen] = useState(false);

    const handleClick = (menu) => {
        switch (menu) {
            case 'notifications':
                setOpen(!open);
                break;
            case 'articles':
                setArticlesOpen(!articlesOpen);
                break;
            case 'management':
                setManagementOpen(!managementOpen);
                break;
            case 'publications':
                setPublicationOpen(!publicationOpen);
                break;
            default:
            // do nothing
        }
    };

    const handleMenuItemClick = (componentName) => {
        setSelectedComponent(componentName);
    };

    const renderComponent = () => {
        switch (selectedComponent) {
            case 'Discussion':
                return <Chat />;
            case 'ProfileSettings':
                return <ProfileSettings />;
            case 'CreateTeam':
                return <CreateTeam />;
            case 'DeleteProfesseur':
                return <DeleteProfessor />;
            case 'DeleteDoctorant':
                return <DeleteDoctorant />;
            case 'ChangeProfessorRole':
                return <ChangeProfessorRole />;
            case 'FalseActiveArticles':
                return <FalseActiveArticles />;
            case 'DoctorantSignUpRequests':
                return <DoctorantSignUpRequests />;
            case 'ProfesseurSignUpRequests':
                return <ProfesseurSignUpRequests />;
            case 'ProfesseurChangeTeamRequests':
                return <ProfesseurChangeTeamRequests />;
            case 'CreateArticle':
                return <Articles />;
            case 'MyArticles':
                return <ArticleDisplay/>;
            case 'AllArticles':
                return <AllArticle />;
            case 'Logout':
                return <HandleLogout />;
            case 'ModifyAnnoncement':
                return <PublicationList />;
            case 'CreatePublication':
                return <CreatePublication />;
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
                            <ListItem button onClick={() => handleClick('notifications')}>
                                <ListItemIcon>
                                    <Notifications />
                                </ListItemIcon>
                                <ListItemText primary="Notifications" />
                                {open ? <ExpandLess /> : <ExpandMore />}
                            </ListItem>
                            <Collapse in={open} timeout="auto" unmountOnExit>
                                <List component="div" disablePadding>
                                    <ListItem button sx={{ pl: 4 }} onClick={() => handleMenuItemClick('FalseActiveArticles')}>
                                        <ListItemText primary="Article Notification" />
                                    </ListItem>
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
                            <ListItem button onClick={() => handleClick('management')}>
                                <ListItemIcon>
                                    <Settings />
                                </ListItemIcon>
                                <ListItemText primary="Management" />
                                {managementOpen ? <ExpandLess /> : <ExpandMore />}
                            </ListItem>
                            <Collapse in={managementOpen} timeout="auto" unmountOnExit>
                                <List component="div" disablePadding>
                                    <ListItem button sx={{ pl: 4 }} onClick={() => handleMenuItemClick('CreateTeam')}>
                                        <ListItemIcon><GroupAdd /></ListItemIcon>
                                        <ListItemText primary="Create Team" />
                                    </ListItem>
                                    <ListItem button sx={{ pl: 4 }} onClick={() => handleMenuItemClick('DeleteProfesseur')}>
                                        <ListItemIcon><DeleteForever /></ListItemIcon>
                                        <ListItemText primary="Delete Professeur" />
                                    </ListItem>
                                    <ListItem button sx={{ pl: 4 }} onClick={() => handleMenuItemClick('DeleteDoctorant')}>
                                        <ListItemIcon><DeleteForever /></ListItemIcon>
                                        <ListItemText primary="Delete Doctorant" />
                                    </ListItem>
                                    <ListItem button sx={{ pl: 4 }} onClick={() => handleMenuItemClick('ChangeProfessorRole')}>
                                        <ListItemIcon><SwapHoriz /></ListItemIcon>
                                        <ListItemText primary="Change Prof Role" />
                                    </ListItem>
                                </List>
                            </Collapse>
                            <ListItem button onClick={() => handleClick('publications')}>
                                <ListItemIcon><PublishIcon /></ListItemIcon>
                                <ListItemText primary="Publications" />
                                {publicationOpen ? <ExpandLess /> : <ExpandMore />}
                            </ListItem>
                            <Collapse in={publicationOpen} timeout="auto" unmountOnExit>
                                <List component="div" disablePadding>
                                    <ListItem button sx={{ pl: 4 }} onClick={() => handleMenuItemClick('CreatePublication')}>
                                        <ListItemIcon><AddSharp /></ListItemIcon>
                                        <ListItemText primary="Create Publication" />
                                    </ListItem>
                                    <ListItem button sx={{ pl: 4 }} onClick={() => handleMenuItemClick('ModifyAnnoncement')}>
                                        <ListItemIcon><CalendarViewDaySharp /></ListItemIcon>
                                        <ListItemText primary="Modify Annoncement" />
                                    </ListItem>
                                </List>
                            </Collapse>
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
                            <ListItem>
                                <Button
                                    fullWidth
                                    startIcon={<ExitToApp />}
                                    onClick={() => handleMenuItemClick('Logout')}
                                    sx={{ color: 'white', backgroundColor: 'primary.main', '&:hover': { backgroundColor: 'primary.dark' } }}
                                >
                                    Log Out
                                </Button>
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
