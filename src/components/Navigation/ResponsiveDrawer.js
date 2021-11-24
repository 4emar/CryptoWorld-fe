import React from "react";
import {Link, NavLink} from "react-router-dom";
import {makeStyles} from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import LocalLibraryOutlinedIcon from '@material-ui/icons/LocalLibraryOutlined';
import CategoryOutlinedIcon from '@material-ui/icons/CategoryOutlined';
import MonetizationOnIcon from '@material-ui/icons/MonetizationOn';
import PropTypes from 'prop-types';
import Button from "@material-ui/core/Button";
import VpnKeyIcon from '@material-ui/icons/VpnKey';
import FavoriteIcon from "@material-ui/icons/Favorite";

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
    },
    appBar: {
        width: `calc(100% - ${drawerWidth}px)`,
        marginLeft: drawerWidth,
    },
    drawer: {
        width: drawerWidth,
        flexShrink: 0,
    },
    drawerPaper: {
        width: drawerWidth,
    },
    // necessary for content to be below app bar
    toolbar: theme.mixins.toolbar,
    content: {
        flexGrow: 1,
        backgroundColor: theme.palette.background.default,
        padding: theme.spacing(3),
    },
    flexGrow: {
        flexGrow: 1
    }
}));

const ResponsiveDrawer = (props) => {

    const classes = useStyles();

    return (
        <div className={classes.root}>
            <CssBaseline/>
            <AppBar position="fixed" className={classes.appBar}>
                <Toolbar>
                    {props.isAuthenticated ?
                        <Typography className={classes.flexGrow} noWrap>{"Welcome to your CryptoWorld, " + props.username + "! "}</Typography>
                        :
                        <Typography className={classes.flexGrow} variant="h6" noWrap>
                            CryptoWorld
                        </Typography>
                    }
                    {props.isAuthenticated ?
                        <React.Fragment>
                            <Button onClick={props.logout} color="inherit">Logout</Button>
                        </React.Fragment>
                        :
                        null}

                </Toolbar>
            </AppBar>

            <Drawer
                className={classes.drawer}
                variant="permanent"
                classes={{
                    paper: classes.drawerPaper,
                }}
                anchor="left"
            >
                <div className={classes.toolbar}/>
                <Divider/>
                <List>
                    {['Coins', 'Login', 'Favorites'].map((text) => (
                        <NavLink to={`/${text.toLowerCase()}`}
                                 key={text}
                                 activeStyle={{backgroundColor: "#dddddd"}}>
                            <ListItem button>

                                {text === "Login" &&
                                <ListItemIcon>
                                    <VpnKeyIcon/>
                                </ListItemIcon>
                                }
                                {text === "Favorites" &&
                                <ListItemIcon>
                                    <FavoriteIcon/>
                                </ListItemIcon>}
                                {text === "Coins" &&
                                <ListItemIcon>
                                    <MonetizationOnIcon/>
                                </ListItemIcon>}

                                <ListItemText primary={text}/>

                            </ListItem>

                        </NavLink>
                    ))}

                </List>
            </Drawer>

            <main className={classes.content}>
                <div className={classes.toolbar}/>

            </main>
        </div>
    );
};

export default ResponsiveDrawer;