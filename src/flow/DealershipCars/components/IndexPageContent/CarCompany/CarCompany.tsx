import React, {useEffect, useState} from "react";
import "./CarCompanyStyling.css";
import {Heading} from "@chakra-ui/react";
import {ApiGetCar, getCancelToken} from "../../Service/api-requests/ApiRequests";
import axios from "axios";
import {carBrandData} from "./CarBrandData";
import {Car} from "../../Service/dto/Interfaces";

const CarCompany: React.FC = () => {
    window.scrollTo(0, 0);

    const [cars, setCars] = useState<Car[]>([]);

    useEffect(() => {
        ApiGetCar()
            .then((res: any) => setCars(res.data))
            .catch(err => {
                if (axios.isCancel(err)) {
                    console.error("cancelled!");
                }
            });

        return () => {
            getCancelToken().cancel();
        }
    }, [setCars]);

    return (
        <>
            <Heading as={"h1"}
                     style={{
                         marginLeft: "23.5rem"
                         , padding: "9rem 0 2.5rem 0"
                     }}
            >Car Companies</Heading>
            <section className="container">
                {cars.map((car, index) =>
                    <div className="card" key={index}>
                        <div className="card-image">
                            <img className={"car-img"}
                                 src={carBrandData[index].srcImage}
                                 alt={"car-brand"}/>
                            <Heading as="h2"
                                     style={{
                                         fontSize: "20px",
                                         display: "flex",
                                         justifyContent: "center"
                                     }}
                            >{car.carCompany}</Heading>
                            <p style={{
                                paddingTop: "10px"
                                , fontSize: "16px"
                                , display: "flex",
                                justifyContent: "center"
                            }}>Total Cars: {car.quantityInStock}</p>
                        </div>
                    </div>
                )}
            </section>
        </>
    );
}
export default CarCompany;
