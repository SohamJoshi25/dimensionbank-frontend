import { createContext, useState, useContext } from "react";

// Default Context Values
const defaultContext = {
    token:localStorage.getItem('token'),
    id: "",
    name: "",
    email: "",
    createdAt: "",
    accounts: [],

    setUserId: (id) => { },
    setName: (name) => { },
    setEmail: (email) => { },
    setCreatedAt: (time) => { },
    setAccounts: (acc) => { },


    setUser: (user) => { },
};

// Create Context
const UserContext = createContext(defaultContext);

// Provider Component
export const UserProvider = ({ children }) => {
    const [token,setToken] = useState(localStorage.getItem('token'));
    const [id, setUserId] = useState("");
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [createdAt, setCreatedAt] = useState("");
    const [accounts, setAccounts] = useState([]);

    const setUser = (user) => {
        if (user.id !== undefined) setUserId(user.id);
        if (user.name !== undefined) setName(user.name);
        if (user.email !== undefined) setEmail(user.email);
        if (user.date_of_creation !== undefined) setCreatedAt(user.date_of_creation);
    };

    return (
        <UserContext.Provider
            value={{
                token,
                id,
                name,
                email,
                createdAt,
                accounts,

                setToken,
                setUserId,
                setName,
                setEmail,
                setCreatedAt,
                setAccounts,

                setUser,
            }}
        >
            {children}
        </UserContext.Provider>
    );
};

// Custom Hook to use the User Context
export const useUserContext = () => {
    const context = useContext(UserContext);
    if (!context) {
        throw new Error("useUserContext must be used within a UserProvider");
    }
    return context;
};

export default UserContext;