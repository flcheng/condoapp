import React, {createContext, useState } from "react";

export const CondoDataContext = createContext();

export const CondoDataProvider = ({ children }) => {

    const authenticatedState = {user: [], isAuthenticated: false, isAdmin: false};
    const [authenticated, setIsAuthenticated] = useState(authenticatedState);
    const [firstName, setFirstName] = useState([]);
    const [lastName, setLastName] = useState([]);
    const [admin, setAdmin] = useState(false);
    const [unit, setUnit] = useState('');
    const [owner, setOwner] = useState(true);
    const [condofee, setCondofee] = useState(0);
    const [tenant, setTenant] = useState(false);
    const [phone, setPhone] = useState(0)
    const [email, setEmail] = useState([]);

    const [condofees, condoFeeValues] = useState({
        "101": "",
        "102": "",
        "201": "",
        "202": "",
        "301": "",
        "302": "",
        "401": "",
        "402": "",
    });

    const handleGetUser = (e) => {
    }

    return (
        <CondoDataContext.Provider value={{condoFeeValues, condofees, authenticated, setIsAuthenticated, firstName, setFirstName, lastName, setLastName, admin, setAdmin, unit, setUnit, owner, setOwner, condofee, setCondofee, tenant, setTenant, phone, setPhone, email, setEmail}}>
            {children}
        </CondoDataContext.Provider>
    );
};