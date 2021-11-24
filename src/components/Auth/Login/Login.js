import React, {useCallback, useEffect, useState} from "react";
import {withRouter} from "react-router-dom";
import {Button, FormControl, InputLabel, makeStyles, MenuItem, Paper, Select, Typography} from "@material-ui/core";
import TextField from "@material-ui/core/TextField";
import {connect} from "react-redux";
import * as actions from "../../../store/actions";
import store from "../../../store/store";
import { useHistory} from "react-router-dom";

const useStyles = makeStyles((theme) => ({
    root: {
        paddingLeft: theme.spacing(2),
        paddingRight: theme.spacing(2),
        paddingBottom: theme.spacing(2),
        paddingTop: theme.spacing(2),
    },
    formControl: {
        margin: theme.spacing(1),
        width: "100%"
    },
    selectEmpty: {
        marginTop: theme.spacing(2),
    }
}));

const Login = (props) => {
    const classes = useStyles();

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    let history = useHistory();

    const handleLogin = () => {
        props.login(username, password);
    };

    useEffect(() => {
        if (props.user.username){
            props.history.push("/");
        }
    }, [props.user.username])

    return (
        <React.Fragment>
            <Paper className={classes.root} variant={"elevation"}>
                <Typography variant={"h5"}>
                    Login
                </Typography>
                <FormControl className={classes.formControl}>
                    <TextField
                        autoFocus
                        margin="dense"
                        id="loginPassword"
                        label="Username"
                        value={username}
                        onChange={(event) => setUsername(event.target.value)}
                        type="text"
                        fullWidth
                    />
                </FormControl>
                <FormControl className={classes.formControl}>
                    <TextField
                        autoFocus
                        margin="dense"
                        id="registerPassword"
                        label="Password"
                        value={password}
                        onChange={(event) => setPassword(event.target.value)}
                        type="password"
                        fullWidth
                    />
                </FormControl>
                <Button onClick={handleLogin} variant={"outlined"} color={"primary"}>
                    Login
                </Button>
            </Paper>
        </React.Fragment>
    )
}

const mapStateToProps = (state) => {
    return {
        user: state.authReducer,
        error: state.authReducer.error
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        login: (username, password) => dispatch(actions.login(username, password)),
    }
}
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Login));
