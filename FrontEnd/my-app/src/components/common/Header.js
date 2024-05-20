// Header.js
import React, { useState } from 'react';
import { styled } from '@mui/material/styles';
import {
    AppBar,
    Toolbar,
    Typography,
    Button,
    IconButton,
    Menu,
    MenuItem,
    Container,
    Box,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { Link as RouterLink } from 'react-router-dom';

// Import your theme
import theme from '../../theme/theme'; // Update the import path to the correct location of theme.js

const ActionButtonsContainer = styled(Box)(({ theme }) => ({
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    '& > * + *': {
        marginLeft: theme.spacing(2),
    },
}));

const HeaderLogo = styled('img')({
    flexGrow: 1,
    maxHeight: '40px', // Adjust the height as needed
    cursor: 'pointer',
});

const ActionButton = styled(Button)({
    color: theme.palette.getContrastText(theme.palette.secondary.main),
    backgroundColor: theme.palette.secondary.main,
    '&:hover': {
        backgroundColor: theme.palette.secondary.dark,
    },
    margin: theme.spacing(0.5),
    marginLeft: theme.spacing(2),
});

const NavigationButton = styled(Button)({
    color: theme.palette.text.primary,
    margin: theme.spacing(1),
});

const StyledRouterLink = styled(RouterLink)({
    textDecoration: 'none',
    color: 'inherit',
    display: 'flex',
    alignItems: 'center',
});

const Header = () => {
    const [anchorElNav, setAnchorElNav] = useState(null);

    const handleOpenNavMenu = (event) => {
        setAnchorElNav(event.currentTarget);
    };

    const handleCloseNavMenu = () => {
        setAnchorElNav(null);
    };

    const navigationItems = [
        { title: 'Introduction de laboratoire', path: '/about-us' },
        { title: 'Actualité', path: '/news' },
        { title: 'Membre/equipe', path: '/team' },
        { title: 'Contact Us', path: '/contact' },
        { title: 'Production Scientifique', path: '/productionScientifique' },
    ];

    return (
        <AppBar position="fixed" elevation={0} sx={{ bgcolor: 'background.default' }}>
            <Container maxWidth="xl">
                <Toolbar disableGutters>
                    <StyledRouterLink to="/about-us">
                        <HeaderLogo src="/images/logo.png" alt="Lab Logo" />
                    </StyledRouterLink>
                    <Box sx={{ display: { xs: 'none', md: 'flex' }, flexGrow: 1, justifyContent: 'center' }}>
                        {navigationItems.map((item) => (
                            <StyledRouterLink to={item.path} key={item.title}>
                                <NavigationButton>{item.title}</NavigationButton>
                            </StyledRouterLink>
                        ))}
                    </Box>
                    <Toolbar disableGutters>
                        <ActionButtonsContainer sx={{ flexGrow: 0 }}>
                            <StyledRouterLink to="/login" style={{ textDecoration: 'none' }}>
                                <ActionButton>Login</ActionButton>
                            </StyledRouterLink>
                            <StyledRouterLink to="/signup" style={{ textDecoration: 'none' }}>
                                <ActionButton variant="contained" color="secondary">
                                    Sign Up
                                </ActionButton>
                            </StyledRouterLink>
                        </ActionButtonsContainer>
                    </Toolbar>
                    <IconButton
                        size="large"
                        edge="end"
                        color="inherit"
                        aria-label="menu"
                        sx={{ ml: 2, display: { md: 'none' } }}
                        onClick={handleOpenNavMenu}
                    >
                        <MenuIcon />
                    </IconButton>
                    <Menu
                        id="menu-appbar-mobile"
                        anchorEl={anchorElNav}
                        anchorOrigin={{
                            vertical: 'bottom',
                            horizontal: 'right',
                        }}
                        keepMounted
                        transformOrigin={{
                            vertical: 'top',
                            horizontal: 'right',
                        }}
                        open={Boolean(anchorElNav)}
                        onClose={handleCloseNavMenu}
                        sx={{ display: { xs: 'block', md: 'none' } }}
                    >
                        {navigationItems.map((item) => (
                            <MenuItem key={item.title} onClick={handleCloseNavMenu}>
                                <Typography textAlign="center">{item.title}</Typography>
                            </MenuItem>
                        ))}
                    </Menu>
                </Toolbar>
            </Container>
        </AppBar>
    );
};

export default Header;
