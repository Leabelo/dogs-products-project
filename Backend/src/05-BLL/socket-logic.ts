import { Server as HttpServer } from "http";
import { Server as SocketIoServer, Socket } from "socket.io";
import ProductModel from "../03-Models/product-model";
import FollowProductModel from "../03-Models/follow-product-model";

let socketIoServer: SocketIoServer;

function initSocketIo(httpServer: HttpServer): void {
    const options = {
        cors: { origin: "*" }
    };
    socketIoServer = new SocketIoServer(httpServer, options);
    socketIoServer.sockets.on("connection", (socket: Socket) => {
        console.log("One client has been connected...");
        socket.on("disconnect", () => {
            console.log("One client has been disconnected...");
        });
    });
}

function emitAddProduct(product: ProductModel): void {
    socketIoServer.sockets.emit("admin-add-product", product);
}

function emitUpdateProduct(product: ProductModel): void {
    socketIoServer.sockets.emit("admin-update-product", product);
}

function emitDeleteProduct(id: number): void {
    console.log(id);

    socketIoServer.sockets.emit("admin-delete-product", id);
}
function emitUpdateFollowedProduct(product: ProductModel): void {
    socketIoServer.sockets.emit("user-update-followProduct", product);
}

function emitAddFollowedProduct(product: ProductModel): void {
    socketIoServer.sockets.emit("user-add-followProduct", product);
}

function emitDeleteFollowedProduct(product: ProductModel): void {
    socketIoServer.sockets.emit("user-delete-followProduct", product);
}

export default {
    initSocketIo,
    emitAddProduct,
    emitUpdateProduct,
    emitDeleteProduct,
    emitAddFollowedProduct,
    emitDeleteFollowedProduct,
    emitUpdateFollowedProduct
}

