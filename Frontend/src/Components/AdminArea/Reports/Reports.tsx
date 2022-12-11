import "./Reports.css";
import { useEffect, useState } from "react";
import { VictoryBar, VictoryChart, VictoryAxis } from 'victory';
import authService from "../../../Services/AuthService";
import config from "../../../Utils/Config";
import productsService from "../../../Services/ProductsService";
import ProductModel from "../../../Models/ProductModel";

function Reports(): JSX.Element {

    const [products, setProducts] = useState<ProductModel[]>(undefined);
    const [data, setData] = useState<{ name: string, followers: number }[]>(undefined);
    const [myTickValues, setMyTickValues] = useState<number[]>(undefined);
    const [myTickFormat, setMyTickFormat] = useState<string[]>(undefined);

    useEffect((async () => {
        try {
            const user = await authService.getUser();

            if (user.role !== 2) {
                window.location.replace(config.loginPath);
            } else {
                const products = await productsService.getAllProducts();
                setProducts(products);
                const stateProducts: { name: string, followers: number }[] = [];
                const myTickValues: number[] = [];
                const myTickFormat: string[] = [];
                products.forEach((v: any, index: number) => {
                    myTickValues.push(+index + 1);
                    myTickFormat.push(v.name);
                    let obj = { name: v.name, followers: +v.followers };
                    stateProducts.push(obj);
                });

                setData(stateProducts);
                setMyTickValues(myTickValues);
                setMyTickFormat(myTickFormat);
            }
        }
        catch (err: any) {
            alert(err.message);
        }
    }) as any, []);

    return (

        <div className="Reports">
            {data && <><h1>"Products 💖 and Number of Followers 😍"</h1>

                <VictoryChart
                    // domainPadding will add space to each side of VictoryBar to
                    // prevent it from overlapping the axis
                    domainPadding={20}
                >
                    <VictoryAxis
                        // tickValues specifies both the number of ticks and where
                        // they are placed on the axis
                        tickValues={myTickValues}
                        tickFormat={myTickFormat}
                    />
                    <VictoryAxis
                        dependentAxis
                        // tickFormat specifies how ticks should be displayed
                        tickFormat={(x) => (`${x}`)}
                    />
                    <VictoryBar horizontal
                        data={data}
                        x="name"
                        y="followers"
                    />
                </VictoryChart>
            </>}

        </div>
    );
}

export default Reports;
