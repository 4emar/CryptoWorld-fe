import React from "react"
import Coins from "../../components/Coins/Coins"
import {Route, Switch, withRouter} from "react-router-dom"
import ResponsiveDrawer from "../../components/Navigation/ResponsiveDrawer"
import {connect} from "react-redux";
import * as actions from "../../store/actions";
import './Layout.css';
import Login from "../../components/Auth/Login/Login";
import {Favorite} from "@material-ui/icons";
import Favorites from "../../components/Favorites/Favorites";

const Layout = (props) => {

    let routes = (
        <Switch>
            <Route exact path={["/", "/coins"]}>
                <Coins/>
            </Route>

            <Route exact path={"/login"}>
                <Login/>
            </Route>

            <Route exact path={"/favorites"}>
                <Favorites/>
            </Route>
        </Switch>
    );

    return(
        <React.Fragment>
            <div id="rootContainer">
                <ResponsiveDrawer isAuthenticated={props.isAuthenticated}
                                  username={props.username}
                                  logout={props.logoutUser}/>
                <main id="mainContainer">
                    {routes}
                </main>
            </div>
        </React.Fragment>
    )
};
const mapStateToProps = state => {
    return {
        isAuthenticated: state.authReducer.token !== null,
        username: state.authReducer.username
    };
};

const mapDispatchToProps = dispatch => {
    return {
        // onTryAutoSignIn: () => dispatch(actions.authCheckState()),
        logoutUser: () => dispatch(actions.logout())
    };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Layout));
