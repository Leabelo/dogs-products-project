abstract class Config {
    public port: number;
    public mySql = { host: "", user: "", password: "", database: "" };
    public loginExpiresIn: string;
    public imagePath: string;
}

class DevelopmentConfig extends Config {
    public constructor() {
        super();
        this.port = 3001;
        this.loginExpiresIn = "30h"; // 30 hours
        this.mySql = { host: "localhost", user: "root", password: "", database: "dogs-product-project" };
        this.imagePath = "./src/Assets/Images/";
    }
}

class ProductionConfig extends Config {
    public constructor() {
        super();
        this.port = +process.env.PORT;
        this.loginExpiresIn = "30h"; // 30 hours
        this.mySql = { host: "eu-cdbr-west-02.cleardb.net", user: "b7cc86d32c5674", password: "55a06f1d", database: "heroku_9a5e90571ab8190" };
        this.imagePath = "./Assets/Images/";
    }
}

const config = process.env.ENVIRONMENT === "development" ? new DevelopmentConfig() : new ProductionConfig();

export default config;
