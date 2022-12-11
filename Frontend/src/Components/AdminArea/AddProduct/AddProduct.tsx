import  { useEffect } from 'react';
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import ProductModel from "../../../Models/ProductModel";
import authService from "../../../Services/AuthService";
import notifyService from "../../../Services/NotifyService";
import productsService from "../../../Services/ProductsService";
import config from "../../../Utils/Config";
import "./AddProduct.css";

function AddProduct(): JSX.Element {

  const navigate = useNavigate();

  useEffect((async () => {
    try {
      const user = await authService.getUser();
      if (user.role !== 2) {
        window.location.replace(config.loginPath);

      }
    }
    catch (err: any) {
      alert(err.message);
    }
  }) as any, []);


  const { register, handleSubmit, formState } = useForm<ProductModel>();

  async function submit(product: ProductModel) {
    try {
      const addedProduct = await productsService.addProduct(product);
      notifyService.success("Product has been added. id: " + addedProduct.productId); 
      navigate("/admin-panel");
    } catch (err: any) {
      notifyService.error(err.message);
    }
  }

  return (
    <div className="AddProduct Box">

      <h2>Add Product</h2>
      <form onSubmit={handleSubmit(submit)}>
        <label>name: </label>
        <input
          type="text"
          {...register("name", {
            required: { value: false, message: "Missing description" },
            minLength: { value: 2, message: "name must be minimum 2 chars" },
            maxLength: { value: 2000, message: "name can't exceed 2000 chars" },
          })}
        />
        <span>{formState.errors.name?.message}</span>

        <label>description: </label>
        <input
          type="text"
          {...register("description", {
            required: { value: false, message: "Missing description" },
            minLength: { value: 2, message: "description must be minimum 2 chars" },
            maxLength: { value: 100, message: "description can't exceed 100 chars" },
          })}
        />
        <span>{formState.errors.description?.message}</span>

      

        <label>Price Range: </label>
        <input
          type="text"
          {...register("priceRange", {
            required: { value: false, message: "Missing priceRange" },
            minLength: { value: 2, message: "priceRange must be minimum 2 chars" },
            maxLength: { value: 100, message: "priceRange can't exceed 100 chars" },
          })}
          step="0.01"
        />
        <span>{formState.errors.priceRange?.message}</span>

        <label>Image:</label>
        <input
          type="file"
          accept="image/*"
          {...register("image", {
            required: { value: false, message: "Missing image" },
          })}
        />
        <span>{formState.errors.image?.message}</span>

        <button>Add</button>
      </form>
    </div>
  );
}

export default AddProduct;
