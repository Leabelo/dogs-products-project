import { Component } from "react";
import "./AdminPanel.css";
import ProductModel from "../../../Models/ProductModel";
import Loading from "../../SharedArea/Loading/Loading";
import { NavLink} from "react-router-dom";
import productsService from "../../../Services/ProductsService";
import EditIcon from '@mui/icons-material/Edit';
import RemoveIcon from '@mui/icons-material/RemoveCircleOutline';
import UserModel from "../../../Models/UserModel";
import authService from "../../../Services/AuthService";
import notifyService from "../../../Services/NotifyService";
import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, styled } from "@mui/material";
import { tableCellClasses, TextField } from "@mui/material";
import config from "../../../Utils/Config";
import { Unsubscribe } from "redux";
import { productsStore } from "../../../Redux/Store";
import moment from "moment";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
        backgroundColor: theme.palette.common.black,
        color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
        fontSize: 20,
    },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&:nth-of-type(odd)': {
        backgroundColor: theme.palette.action.hover,
    },
    // hide last border
    '&:last-child td, &:last-child th': {
        border: 0,
    },
}));

interface AdminPanelState {
    query: string;
    user: UserModel;
    products: ProductModel[];
}

class AdminPanel extends Component<{}, AdminPanelState> {

    public constructor(props: {}) {
        super(props);
    }
    private unsubscribeMe: Unsubscribe;

    public async componentDidMount() {
        if (!authService.isAdmin()) {
            notifyService.error("You are not logged in as Admin");
            //To add Navigation out! 
            window.location.replace(config.loginPath);
        };

        try {
            const products = await productsService.getAllProducts();
            this.setState({ products });
            this.unsubscribeMe = productsStore.subscribe(async () => {
                const products = await productsService.getAllProducts();
                this.setState({ products });
            });
        }
        catch (err: any) {
            notifyService.error(err.message);
        }
    }

    public componentWillUnmount(): void {
        this.unsubscribeMe();
    }

    public query: string = "";
    public render(): JSX.Element {

        return (
            <div className="AdminPanel">

                <br />
                <TextField
                    id="filled-basic"
                    label="חפש מוצר"
                    variant="standard"
                    onChange={(e) => { this.query = e.target.value; this.setState({ query: e.target.value }); }}
                />
                <br />
                <hr />
                {this.state?.products === undefined && <Loading />}
                <TableContainer component={Paper}>
                    <Table aria-label="customized table">
                        <TableHead >
                            <TableRow>
                                <StyledTableCell align="center">Name</StyledTableCell>
                                <StyledTableCell align="center">Description</StyledTableCell>
                                <StyledTableCell align="center">Price Range</StyledTableCell>
                                <StyledTableCell align="center">Image</StyledTableCell>
                                <StyledTableCell align="center">Followers</StyledTableCell>
                                <StyledTableCell align="center">Edit</StyledTableCell>
                                <StyledTableCell align="center">Delete</StyledTableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {this.state?.products?.filter((post) => {
                                if (this.query === "") {
                                    return post;
                                } else if (

                                       post.name.toLowerCase().includes(this.query.toLowerCase()) ||
                            post.priceRange.toLowerCase().includes(this.query.toLowerCase()) ||
                            post.description.toLowerCase().includes(this.query.toLowerCase()) ||
                            post.productId.toString().includes(this.query) ||
                            post.followers.toString().includes(this.query)

                                ) {
                                    return post;
                                }
                            }).map(v =>
                                <StyledTableRow key={v.productId}>
                                    <StyledTableCell align="center"><div className="Destination">{v.name}</div></StyledTableCell>
                                    <StyledTableCell align="center" ><div className="Description">{v.description}</div></StyledTableCell>
                                    <StyledTableCell align="center">{v.priceRange} $</StyledTableCell>
                                    <StyledTableCell align="center"> <img src={config.urls.productImages + v.imageName} alt="" />
                                    </StyledTableCell>
                                    <StyledTableCell align="center">{v.followers ? v.followers : 'No followers'} </StyledTableCell>
                                    <StyledTableCell align="center">
                                        <NavLink to={`/products/update/${v.productId}`}>
                                            <EditIcon />
                                        </NavLink>
                                    </StyledTableCell>
                                    <StyledTableCell align="center">
                                        <button onClick={() => productsService.deleteProduct(+v.productId)} ><RemoveIcon /></button>
                                    </StyledTableCell>
                                </StyledTableRow >).reverse()}
                        </TableBody>
                    </Table>
                </TableContainer>
            </div>
        );
    }
}

export default AdminPanel;




