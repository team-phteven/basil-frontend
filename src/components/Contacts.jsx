import React, { useEffect, useState } from "react";
import { useContacts } from "../contexts/ContactsProvider";

const Contacts = () => {
    const [incomingRequests, setIncomingRequests] = useState([]);
    // const storedUser = JSON.parse(localStorage.getItem("storedUser"));
    const { storedUser } = useContacts();
    useEffect(() => {
        console.log("use effect called");
        console.log(storedUser);
        const getRequests = async () => {
            const response = await fetch(
                "http://localhost:5000/api/users/get-requests",
                {
                    headers: {
                        Authorization: `Bearer ${storedUser.token}`,
                    },
                }
            );
            const json = await response.json();
            setIncomingRequests(json);
        };
        getRequests();
    }, []);

    return <div style={{ color: "red" }}>requests</div>;
};

export default Contacts;
