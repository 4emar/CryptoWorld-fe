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
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import FavoriteIcon from '@material-ui/icons/Favorite';
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton/IconButton";

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
        maxWidth: 1000,
    }
});

const Coins = (props) => {
    const classes = useStyles();
    const [coins, setCoins] = useState(null);

    const getCoins = () => {
        API_DRIVER.get("/api/coins")
            .then(response => {
                setCoins(response.data)
            })
            .catch(error => {
                //TODO
            })
    };

    const handleFav = (coinId) => {
        API_DRIVER.post("/api/user/addCoin/" + coinId + "/user/" + props.username)
            .then(res => {
                getCoins();
            })
            .catch(error => {
                //TODO
            })
    }

    useEffect(() => {
        getCoins();
    }, []);

    return (
        <React.Fragment>
            <div>
                <TableContainer component={Paper}>
                    <Table className={classes.table} aria-label="customized table">
                        <TableHead>
                            <TableRow>

                                <StyledTableCell align="left">Coin Name</StyledTableCell>
                                <StyledTableCell align="left">Coin Image</StyledTableCell>
                                <StyledTableCell align="left">Coin Symbol</StyledTableCell>
                                <StyledTableCell align="left">Coin Price</StyledTableCell>
                                <StyledTableCell align="left">Coin Market Cap</StyledTableCell>
                                <StyledTableCell align="left">Coin Market Cap Rank</StyledTableCell>


                                <StyledTableCell align="left"/>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {coins !== null ? coins.map((coin) => (
                                <StyledTableRow key={"coin-row-" + coin.id}>

                                    <StyledTableCell align="left">{coin.name}</StyledTableCell>
                                    <StyledTableCell align="left"><img style={{width: '50px', height: '50px'}}
                                                                       src={coin.image}
                                                                       alt={"coin_image"}/></StyledTableCell>
                                    <StyledTableCell align="left">{coin.symbol}</StyledTableCell>
                                    <StyledTableCell align="left">{"$" + coin.currentPrice}</StyledTableCell>
                                    <StyledTableCell align="left">{"$" + coin.marketCap}</StyledTableCell>
                                    <StyledTableCell align="left">{coin.marketCapRank}</StyledTableCell>

                                    <StyledTableCell align="left">
                                        <IconButton onClick={() => handleFav(coin.id)} aria-label="delete">
                                            <FavoriteBorderIcon color={"action"}/>
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
        coins: state.coinReducer.coins,
        username: state.authReducer.username
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        getCoins: () => dispatch(actions.getCoins())
    }
}
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Coins));