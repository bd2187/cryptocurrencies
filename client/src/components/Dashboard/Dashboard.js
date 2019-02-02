import React from "react";
import CurrenciesContainer from "../Currencies/CurrenciesContainer";
import { topTenEndpoint } from "API/endpoints";

const Dashboard = () => {
    return <CurrenciesContainer endpoint={topTenEndpoint} />;
};

export default Dashboard;
