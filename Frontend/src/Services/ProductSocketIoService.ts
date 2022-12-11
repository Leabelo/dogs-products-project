import { Socket, io } from 'socket.io-client';
import ProductModel from '../Models/ProductModel';
import { productsStore } from '../Redux/Store';
import { addProductAction, deleteProductAction, updatePartialProductAction } from '../Redux/ProductsState';
import config from '../Utils/Config';


class SocketIoService {

    private socket: Socket;

    public connect(): void {

        // Connect to socket server:
        this.socket = io(config.urls.socketServer);

        // Listen to adding a  product  by admin:
        this.socket.on("admin-add-product", (product: ProductModel) => {
            productsStore.dispatch(addProductAction(product));
        });

        // Listen to updating a product follow by user:
        this.socket.on("user-update-followProduct", (product: ProductModel) => {
            productsStore.dispatch(updatePartialProductAction(product));
        });
        // Listen to updating a product by admin:
        this.socket.on("admin-update-product", (product: ProductModel) => {
            productsStore.dispatch(updatePartialProductAction(product));
        });

        // Listen to deleting a product by admin:
        this.socket.on("admin-delete-product", (id: number) => {
            productsStore.dispatch(deleteProductAction(id));
        });


        // Listen to adding a follow product by user:
        this.socket.on("user-add-followProduct", (product: ProductModel) => {
            productsStore.dispatch(updatePartialProductAction(product));
        });

        // Listen to deleting a follow product by user:
        this.socket.on("user-delete-followProduct", (product: ProductModel) => {
            productsStore.dispatch(updatePartialProductAction(product));
        });

    }

    public disconnect(): void {
        this.socket.disconnect();
    }

}

const productSocketIoService = new SocketIoService();

export default productSocketIoService;



