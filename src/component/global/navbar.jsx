import {useState} from "react";
import {
    Box,
    Button,
    Container,
    Typography,
    IconButton,
    Drawer,
    List,
    ListItem,
} from "@mui/material";
import {Link, useNavigate} from "react-router-dom";
import MenuIcon from "@mui/icons-material/Menu";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import Logo from "../../assets/images/navbar/logo.webp";
import CloseIcon from "@mui/icons-material/Close";
import img1 from "../../assets/images/navbar/top_bar_bg-2.png";

const Navbar = () => {
    const [drawerOpen, setDrawerOpen] = useState(false);
    const [dropdownOpen, setDropdownOpen] = useState(false);

    const navigate = useNavigate();

    const toggleDropdown = () => {
        setDropdownOpen(!dropdownOpen);
    };

    const toggleDrawer = (open) => () => {
        setDrawerOpen(open);
    };

    const navLinks = [
        {label: "slider", href: "/slider"},
        {label: "Products", href:"/product"},
        {label: "Contact", href: "/contact"},
        {label: "AddTestimonial", href: "/testimonial"},
    ];

    return (
        <Box
            sx={{
                py: 1,
                backgroundColor: "#fff",
                boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
                position: "sticky",
                top: "0",
                width: "100%",
                zIndex: "1000",
            }}
        >
            <Container
                sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                }}
            >

                <Box sx={{width: {xs: "80px", sm: "100px"}}}>
                    <Link to="/">
                        <Typography
                            component="img"
                            src={Logo}
                            alt="Logo"
                            sx={{width: "100%", height: "auto"}}
                        />
                    </Link>
                </Box>

                <Box
                    sx={{
                        display: {xs: "none", md: "flex"},
                        alignItems: "center",
                        gap: 3,
                    }}
                >
                    {navLinks.map((link, index) =>
                        (
                            <Typography
                                key={index}
                                component="a"
                                href={link.href}
                                sx={{
                                    textDecoration: 'none',
                                    color: '#555',
                                    fontWeight: '500',
                                    position: 'relative',
                                    display: 'flex',
                                    alignItems: 'center',
                                    fontSize: '14px',
                                    '&::after': {
                                        content: '""',
                                        position: 'absolute',
                                        top: '230%',
                                        transform: 'translateX(-50%)',
                                        left: "50%",
                                        width: '0%',
                                        height: '2px',
                                        backgroundColor: '#f8c311',
                                        transition: 'width 0.3s ease',
                                    },
                                    '&:hover::after': {
                                        width: '100%',
                                    }
                                }}
                            >
                                {link.label}
                            </Typography>
                        )
                    )}
                </Box>

                <IconButton
                    sx={{display: {xs: "flex", md: "none"}, color: "#555"}}
                    onClick={toggleDrawer(true)}
                >
                    <MenuIcon/>
                </IconButton>

                <Drawer
                    anchor="left"
                    open={drawerOpen}
                    onClose={toggleDrawer(false)}
                    PaperProps={{
                        sx: {
                            width: "100vw",
                            height: "100vh",
                            display: "flex",
                            flexDirection: "column",
                            justifyContent: "space-between",
                            backgroundColor: "#ffffff",
                            boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
                        },
                    }}
                >
                    <Box
                        sx={{
                            display: "flex",
                            justifyContent: "space-between",
                            alignItems: "center",
                            p: 3,
                            position: "sticky",
                            top: "10px",
                            zIndex: 100,
                        }}
                    >

                        <Box sx={{width: "80px"}}>
                            <Link to="/" onClick={toggleDrawer(false)}>
                                <Typography
                                    component="img"
                                    src={Logo}
                                    alt="Logo"
                                    sx={{width: "100%", height: "auto"}}
                                />
                            </Link>
                        </Box>

                        <IconButton
                            onClick={toggleDrawer(false)}
                            sx={{
                                borderRadius: "50%",
                                color: "#000",
                                background: "#e6b600",
                            }}
                        >
                            <CloseIcon/>
                        </IconButton>
                    </Box>

                    <Box
                        sx={{
                            height: "100%",
                            display: "flex",
                            flexDirection: "column",
                            justifyContent: "center",
                            alignItems: "center",
                            gap: 2,
                        }}
                    >
                        <List>
                            {navLinks.map((link, index) => (
                                (

                                    <Typography
                                        key={index}
                                        sx={{
                                            textDecoration: "none",
                                            color: "#555",
                                            fontWeight: "500",
                                            mb: 2,
                                            display: "block",
                                            textAlign: "start",
                                            "&:hover": {
                                                textDecoration: "underline",
                                            },
                                        }}
                                        component={Link}
                                        to={link.href}
                                        onClick={toggleDrawer(false)}
                                    >
                                        {link.label}
                                    </Typography>
                                )
                            ))}
                        </List>
                        <Box sx={{
                            height: "250px",
                            width: "400px",
                            overflow: "hidden",
                        }}>
                            <img
                                src={img1}
                                alt="Background Image"
                                style={{
                                    width: "100%",
                                    height: "100%",
                                    objectFit: "contain",
                                }}
                            />
                        </Box>
                    </Box>
                </Drawer>


            </Container>
        </Box>
    );
};

export default Navbar;
