import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {BrowserRouter as Router, Route, Routes} from "react-router-dom";
import {ChakraProvider} from '@chakra-ui/react';
import AllCars from "./flow/DealershipCars/components/pages/all-cars-page/AllCars";
import OneCar from "./flow/DealershipCars/components/pages/one-car-page/OneCar";
import Review from "./flow/DealershipCars/components/pages/review-page/Review";
import Authentication from "./flow/DealershipCars/components/pages/authentication-page/Authentication";
import SignIn from "./flow/DealershipCars/components/pages/sign-page/SignIn";

const root = ReactDOM.createRoot(
    document.getElementById('root') as HTMLElement
);
root.render(
    <React.StrictMode>
        <Router>
            <ChakraProvider>
                <Routes>
                    <Route path="/" element={<App/>}/>
                    <Route path="/all-cars" element={<AllCars/>}/>
                    <Route path="/review" element={<Review/>}/>
                    <Route path="/car/:id" element={<OneCar/>}/>
                    <Route path="/register" element={<Authentication/>}/>
                    <Route path="/sign" element={<SignIn/>}/>
                </Routes>
            </ChakraProvider>
        </Router>
    </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
