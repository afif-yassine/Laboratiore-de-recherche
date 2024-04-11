import React from 'react';
import { Box, Container, Typography, Grid, Link } from '@mui/material';
import { styled, useTheme } from '@mui/material/styles';

// Custom styled components using the theme
const MainLayout = styled(Box)(({ theme }) => ({
    display: 'flex',
    flexDirection: 'column',
    minHeight: '90vh', // full viewport height
}));

const Content = styled('main')(({ theme }) => ({
    flex: '1 0 auto', // takes up the remaining space
}));

const FooterBox = styled(Box)(({ theme }) => ({
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.primary.contrastText,
    padding: theme.spacing(2, 1),
    flexShrink: 0, // don't allow the footer to shrink
}));

const Footer = () => {
    const theme = useTheme();

    return (
        <MainLayout>
            <Content>
                {/* All the content of your page would go here, wrapped inside Content */}
            </Content>
            <FooterBox component="footer">
                <Container maxWidth="lg">
                    <Box mt={1} textAlign="center">
                        <Typography variant="subtitle1">
                            {'Copyright © '}
                            {new Date().getFullYear()}{' '}
                            <Link href="https://yourcompanywebsite.com" color="inherit">
                                Your Company Name
                            </Link>{' '}
                            All rights reserved.
                        </Typography>
                    </Box>
                </Container>
            </FooterBox>
        </MainLayout>
    );
};

export default Footer;
