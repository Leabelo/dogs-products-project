import ProductModel from "../../../Models/ProductModel";
import config from "../../../Utils/Config";
import "./ProductCard.css";
import { Card, Switch } from "@mui/material";
import UserModel from "../../../Models/UserModel";
import followedProductsService from "../../../Services/FollowedProductService";
import { useState } from "react";
import { Button, Typography, Box, Modal } from "@mui/material";
// import moment from "moment";
import Avatar from '@mui/material/Avatar';
import { red } from '@mui/material/colors';
import CardHeader from '@mui/material/CardHeader';
import IconButton from '@mui/material/IconButton';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import CardMedia from '@mui/material/CardMedia';
import DropdownShareButton from "../DropdownShareButton/DropdownShareButton";
import { NavLink } from "react-router-dom";


const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    height: `80%`,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
    overflow: `scroll`,
};

interface ProductCardProps {
    product: ProductModel;
    user: UserModel;
}

function ProductCard(props: ProductCardProps): JSX.Element {

    const [open, setOpen] = useState(false);
    const [followedByUser, setfollowedByUser] = useState<boolean>(props.product.followedByUser);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    async function toggleFollow(): Promise<void> {
        followedByUser ? setfollowedByUser(false) : setfollowedByUser(true);
        try {
            if (followedByUser) {
                await followedProductsService.deleteFollowedProduct(props.user.id, props.product.productId);
            }
            else {
                await followedProductsService.addFollowedProduct(props.user.id, props.product.productId);
            }

        } catch (err: any) {
            console.log(err.message)
        }
    }

    return (
        <div className="ProductCard">
            <Card sx={{ maxWidth: 345 }}>
                <div>
                    <CardHeader
                        action={
                            <IconButton aria-label="settings">
                                <Button onClick={handleOpen}>
                                    <MoreVertIcon />
                                </Button>
                            </IconButton>
                        }
                        title={props.product?.name}
                    />
                    <Button onClick={handleOpen}>
                        <CardMedia
                            component="img"
                            image={config.urls.productImages + props.product?.imageName}
                            alt={props.product?.imageName}
                        />
                    </Button>
                    <br />
                    {/* <Typography noWrap={true}>{props.product.description}</Typography> */}
                    <br />
                    &#8362;
{props.product.priceRange}
                    <br />
                    <b> Followers: </b>
                    {
                        <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
                            {props.product.followers ? props.product.followers + "😍" : "🙋🏼‍♂️"}
                        </Avatar>
                    }
                    <DropdownShareButton />
                    <br />
                    {followedByUser ? "UnCheck To Unfollow" : "Check To Follow"} <Switch checked={followedByUser} onChange={toggleFollow} />
                    <Modal
                        open={open}
                        onClose={handleClose}
                        aria-labelledby="modal-modal-title"
                        aria-describedby="modal-modal-description"
                    >
                        <Box sx={style}>
                            <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                                <h2>{props.product.description}</h2>
                                <p>Price: &#8362;
{props.product.priceRange}</p>
                                <p>Followers: {props.product.followers}</p>
                                {/* <img src={config.urls.productImages + props.product?.imageName} alt={props.product?.imageName} /> */}
                                <p>{props.product.description}</p>
                                <p>{props.product.followedByUser}</p>
                                <p>{props.product.description}</p>
                                <NavLink to="/about"><Button variant="contained" color="primary" size="medium" disableElevation>Order Product</Button></NavLink>
                                <Button onClick={handleClose} autoFocus>
                                    Close
                                </Button>
                            </Typography>
                        </Box>
                    </Modal>

                </div>
            </Card>

        </div>
    );
}

export default ProductCard;
