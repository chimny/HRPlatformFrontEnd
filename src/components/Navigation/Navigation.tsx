import {useState, MouseEvent} from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import MenuItem from '@mui/material/MenuItem';
import {Link} from "react-router-dom";
import GroupsIcon from '@mui/icons-material/Groups';
import './styles/navStyle.css';


interface pageNavigation {
    name: string;
    path: string;
    activeStatus: boolean
}

const pagesUpdate: pageNavigation[] = [{
    name: 'Home',
    path: '/',
    activeStatus: true
},
    {
        name: 'Person List',
        path: '/personList',
        activeStatus: false
    },
    {
        name: 'Add person',
        path: '/addPerson',
        activeStatus: false
    },
    {
        name: 'Position List',
        path: '/position-list',
        activeStatus: false
    },
]

export const Navigation = () => {
    const [anchorElNav, setAnchorElNav] = useState<null | HTMLElement>(null);
    const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null);
    const [nav, setNav] = useState(pagesUpdate);

    const handleOpenNavMenu = (event: MouseEvent<HTMLElement>) => {
        setAnchorElNav(event.currentTarget);
    };


    const handleCloseNavMenu = () => {
        setAnchorElNav(null);
    };

    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };


    const activeMenuItem = (passedIndex: number) => {
        setNav(prev => {
            // removed for now highlighting the active item
            return prev.map((el, index) => index === passedIndex ? {...el, activeStatus: false} : {
                ...el,
                activeStatus: false
            })
        })
        handleCloseNavMenu()

    }


    return (
        <AppBar position="static">
            <Container maxWidth="xl">
                <Toolbar disableGutters>
                    <GroupsIcon sx={{display: {xs: 'none', md: 'flex'}, mr: 1}}/>
                    <Typography
                        variant="h6"
                        noWrap
                        sx={{
                            mr: 2,
                            display: {xs: 'none', md: 'flex'},
                            fontFamily: 'monospace',
                            fontWeight: 700,
                            letterSpacing: '.3rem',
                            color: 'inherit',
                            textDecoration: 'none',
                            cursor: 'default'
                        }}
                    >
                        HRPlatform
                    </Typography>

                    <Box sx={{flexGrow: 1, display: {xs: 'flex', md: 'none'}}}>
                        <IconButton
                            size="large"
                            aria-label="account of current user"
                            aria-controls="menu-appbar"
                            aria-haspopup="true"
                            onClick={handleOpenNavMenu}
                            color="inherit"
                        >
                            <MenuIcon/>
                        </IconButton>
                        <Menu
                            id="menu-appbar"
                            anchorEl={anchorElNav}
                            anchorOrigin={{
                                vertical: 'bottom',
                                horizontal: 'left',
                            }}
                            keepMounted
                            transformOrigin={{
                                vertical: 'top',
                                horizontal: 'left',
                            }}
                            open={Boolean(anchorElNav)}
                            onClose={handleCloseNavMenu}
                            sx={{
                                display: {xs: 'block', md: 'none'},
                            }}
                        >
                            {nav.map(({name, path, activeStatus}, index) => (
                                <MenuItem key={name}
                                          selected={activeStatus}
                                >
                                    <Link to={path} className={'menuLinkMobile'}
                                    > <Typography textAlign="center">
                                        {name}
                                    </Typography></Link>
                                </MenuItem>
                            ))}
                        </Menu>
                    </Box>
                    <GroupsIcon sx={{display: {xs: 'flex', md: 'none'}, mr: 1}}/>
                    <Typography
                        variant="h5"
                        noWrap
                        sx={{
                            mr: 2,
                            display: {xs: 'flex', md: 'none'},
                            flexGrow: 1,
                            fontFamily: 'monospace',
                            fontWeight: 700,
                            letterSpacing: '.3rem',
                            color: 'inherit',
                            textDecoration: 'none',
                            cursor: 'default'
                        }}
                    >
                        HRPlatform
                    </Typography>
                    <Box sx={{flexGrow: 1, display: {xs: 'none', md: 'flex'}}}>
                        {nav.map(({
                                      name, path, activeStatus
                                  }, index) => (
                            <MenuItem key={name}>
                                <Link to={path} key={name} className={activeStatus ? 'activeOption' : ''}> <Button

                                    onClick={() => activeMenuItem(index)}
                                    sx={{my: 2, color: 'white', display: 'block'}}

                                >
                                    {name}
                                </Button></Link>
                            </MenuItem>

                        ))}
                    </Box>

                    <Box sx={{flexGrow: 0}}>
                        <Menu
                            sx={{mt: '45px'}}
                            id="menu-appbar"
                            anchorEl={anchorElUser}
                            anchorOrigin={{
                                vertical: 'top',
                                horizontal: 'right',
                            }}
                            keepMounted
                            transformOrigin={{
                                vertical: 'top',
                                horizontal: 'right',
                            }}
                            open={Boolean(anchorElUser)}
                            onClose={handleCloseUserMenu}
                        >
                        </Menu>
                    </Box>
                </Toolbar>
            </Container>
        </AppBar>
    );
};
