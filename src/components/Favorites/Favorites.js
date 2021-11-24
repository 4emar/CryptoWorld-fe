import React, {useEffect, useState} from "react";
import {withRouter} from "react-router";
import {withStyles, makeStyles} from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import {API_DRIVER} from "../../config";
import * as actions from '../../store/actions/index';
import {connect} from "react-redux";
import IconButton from "@material-ui/core/IconButton/IconButton";
import DeleteOutlineOutlinedIcon from '@material-ui/icons/DeleteOutlineOutlined';

const cell_width = 200;

const StyledTableCell = withStyles((theme) => ({
    head: {
        backgroundColor: "gray",
        color: theme.palette.common.white,

    },
    body: {
        fontSize: 14,
        width: `${cell_width}px`
    },
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
    root: {
        '&:nth-of-type(odd)': {
            backgroundColor: theme.palette.action.hover,
        },
    },
}))(TableRow);


const useStyles = makeStyles({
    table: {
        minWidth: 1000
    },
    tableContainer: {
        maxWidth: 1000
    }
});


const Favorites = (props) => {
    const classes = useStyles();
    const [favorites, setFavorites] = useState(null);
    const string = "/api/user/favorites/" + props.username;
    const getFavorites = () => {
        API_DRIVER.get(string)
            .then(response => {
                setFavorites(response.data)
            })
            .catch(error => {
                //TODO
            })
    };

    useEffect(() => {
        getFavorites();
    }, []);

    const deleteFav = (favId) =>{
        API_DRIVER.delete("/api/user/deleteCoin/" + favId + "/user/" + props.username)
            .then(res => {
                getFavorites()
            })
            .catch(error => {
                //TODO
            })
    };

    return(
        <React.Fragment>
            <div>
                <TableContainer component={Paper}>
                    <Table className={classes.table} aria-label="customized table">
                        <TableHead>
                            <TableRow>

                                <StyledTableCell  align="left">Coin Name</StyledTableCell>
                                <StyledTableCell align="left">Coin Image</StyledTableCell>
                                <StyledTableCell align="left">Coin Symbol</StyledTableCell>
                                <StyledTableCell align="left">Coin Price</StyledTableCell>
                                <StyledTableCell align="left">Coin Market Cap</StyledTableCell>
                                <StyledTableCell align="left">Coin Market Cap Rank</StyledTableCell>
                                <StyledTableCell align="left"></StyledTableCell>

                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {favorites !== null ? favorites.map((fav) => (
                                <StyledTableRow key={"coin-row-" + fav.id}>

                                    <StyledTableCell align="left">{fav.name}</StyledTableCell>
                                    <StyledTableCell align="left"><img style={{width: '50px', height: '50px'}} src={fav.image} alt={"coin_image"} /></StyledTableCell>
                                    <StyledTableCell align="left">{fav.symbol}</StyledTableCell>
                                    <StyledTableCell align="left">{"$" + fav.currentPrice}</StyledTableCell>
                                    <StyledTableCell align="left">{"$" + fav.marketCap}</StyledTableCell>
                                    <StyledTableCell align="left">{fav.marketCapRank}</StyledTableCell>
                                    <StyledTableCell align="left">
                                        <IconButton onClick={() => deleteFav(fav.id)} aria-label="delete">
                                            <DeleteOutlineOutlinedIcon color={"error"}/>
                                        </IconButton>
                                    </StyledTableCell>
                                </StyledTableRow>
                            )) : null}
                        </TableBody>
                    </Table>
                </TableContainer>
            </div>
        </React.Fragment>
    );

};

const mapStateToProps = (state) => {
    return {
        favorites: state.favReducer.favorites,
        username: state.authReducer.username
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        getFavorites: () => dispatch(actions.getFavorites())
    }
}
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Favorites));