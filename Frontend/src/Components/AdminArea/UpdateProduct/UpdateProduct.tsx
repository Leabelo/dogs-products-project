import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import ProductModel from "../../../Models/ProductModel";
import notifyService from "../../../Services/NotifyService";
import productsService from "../../../Services/ProductsService";
import "./UpdateProduct.css";
import config from "../../../Utils/Config";
import authService from "../../../Services/AuthService";

function UpdateProduct(): JSX.Element {
    const [product, setProduct] = useState<ProductModel>();
    const navigate = useNavigate();
    const { register, handleSubmit, formState, setValue } = useForm<ProductModel>();
    const lastSlashIndex = window.location.pathname.lastIndexOf("/");
    const id = +window.location.pathname.substr(lastSlashIndex + 1);

    useEffect(() => {
        (async () => {
            try {
                const user = await authService.getUser();
                if (user.role !== 2) {
                    window.location.replace(config.loginPath);
                }
                const product = await productsService.getOneProduct(id);
                await setProduct(product);
                await setValue("name", product.name);
                await setValue("description", product.description);
                await setValue("priceRange", product.priceRange);
            } catch (err) {

                console.error(err);
            }
        })();
    }, []);

    async function submit(product: ProductModel) {
        try {
            product.productId = id;
            const updatedProduct = await productsService.updatePartialProduct(product);
            notifyService.success("Product has been updated. id: " + updatedProduct.productId); // In real life - never show ids to the user.
            navigate("/admin-panel");
        }
        catch (err: any) {
            notifyService.error(err.message);
        }
    }

    return (
        <div className="UpdateProduct Box">

            <h2>Update Product</h2>

            <form onSubmit={handleSubmit(submit)}>
                <label>name: </label>
                <input type="text"  {...register("name", {
                    required: { value: false, message: "Missing name" },
                    minLength: { value: 2, message: "name must be minimum 2 chars" },
                    maxLength: { value: 100, message: "name can't exceed 100 chars" }
                })} />
                <span>{formState.errors.name?.message}</span>

                <label>description: </label>
                <input type="text" {...register("description", {
                    required: { value: false, message: "Missing description" },
                    minLength: { value: 2, message: "description must be minimum 2 chars" },
                    maxLength: { value: 1000, message: "description can't exceed 1000 chars" }
                })} />
                <span>{formState.errors.description?.message}</span>


                <label>Price Range </label>
                <input type="text" {...register("priceRange", {
                    required: { value: false, message: "Missing priceRange" },
                    minLength: { value: 2, message: "priceRange must be minimum 2 chars" },
                    maxLength: { value: 50, message: "priceRange can't exceed 50 chars" }
                })} />
                <span>{formState.errors.priceRange?.message}</span>


                <label>Image:</label><br />
                <img src={config.urls.productImages + product?.imageName} alt="" />
                <input type="file" accept="image/*" defaultValue={product?.imageName} {...register("image", {
                    required: { value: false, message: "Missing image" }
                })} />
                <span>{formState.errors.image?.message}</span>

                <button>Update</button>
            </form>

        </div>
    );
}

export default UpdateProduct;
