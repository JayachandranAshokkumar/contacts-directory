import React, { useState, useEffect } from "react";
import axios from "axios";
import Contact from "./Contact";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashAlt } from "@fortawesome/free-regular-svg-icons";

interface ContactDetails {
    id: number;
    contactName: string;
    number: string;
    city: string;
}
interface selectedItem {
    selectedId: number;
}

const ContactList: React.FC<selectedItem> = ({ selectedId }) => {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<Error | null>(null);
    const [isBackClicked, setIsBackClicked] = useState(false);
    const [contact, setContacts] = useState<ContactDetails>( // Set default city value
        { id: 0, contactName: "", number: "", city: "" }
    );
    const [deleteMessage, setDeleteMessage] = useState(false);
    const [networkError, setNetworkError] = useState(false);

    const handleBackClick = () => {
        setIsBackClicked(true);
    };
    useEffect(() => {
        const fetchData = async () => {
            setIsLoading(true);
            setError(null);
            try {
                const BaseAPI = "https://localhost:44305/api/Contact/";
                const APIURL = `${BaseAPI}${selectedId}`;
                const response = await fetch(APIURL); // Our Localhost URL
                const data = await response.json();
                setContacts(data);
            }
            catch (error: any) {
                if (error.message === "Network Error") {
                    setNetworkError(true);
                    console.log("1. Please make sure WEB API is running. \n2.Please add CORS as a browser extension (Development / Unit testing perpose only).");
                }
                else {
                    console.log(error.message);
                }
            }
            finally {
                setIsLoading(false);
            }
        };

        fetchData();
    }, []); // Empty dependency array to fetch data only on component mount

    const handleDeleteClick = async () => {
        try {
            const response = await axios.delete(`https://localhost:44305/api/Contact/${selectedId}`);
            if (response.status === 200) {
                setDeleteMessage(true); // Update state directly
            } else {
                console.error("Error deleting contact:", response.statusText);
            }
        }
        catch (error: any) {
            if (error.message === "Network Error") {
                setNetworkError(true);
                console.log("1. Please make sure WEB API is running. \n2.Please add CORS as a browser extension (Development / Unit testing perpose only).");
            }
            else {
                console.log(error.message);
            }
        }
    };

    return (
        <div>
            {networkError ? <div className="bgNetworkError"><ul><li><h2>Please make sure WEB API is running.</h2></li><li><h2>Please add CORS as a browser extension (Development / Unit testing perpose only).</h2></li></ul></div> : <div>
                {isBackClicked ? <div><Contact /></div> : <div>
                    {deleteMessage ? <div><h1>CONTACT DELETED!</h1><button className="centerButton" onClick={handleBackClick}>BACK TO DASHBOARD!</button></div> : <div>
                        {isLoading ? (
                            <div className="ring-div">
                                <div className="wrapper">
                                    <div className="ring">
                                        <div className="ring-phone ring-green ring-show">
                                            <div className="ring-ph-circle"></div>
                                            <div className="ring-ph-circle-fill"></div>
                                            <div className="ring-ph-img-circle"></div>
                                        </div>
                                    </div>
                                </div>
                                <p>Loading contact... Please wait!</p>
                            </div>
                        ) : error ? (
                            <p>Error: {error.message}</p>
                        ) : (
                            <div>
                                <table className="table table-hover table-striped table-bordered">
                                    <thead className="tableHeader">
                                        <tr>
                                            <th>FIELD NAMES</th><th>VALUES</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr><td>CONTACT ID</td>
                                            <td>{contact.id}</td>
                                        </tr>
                                        <tr><td>CONTACT NAMR</td>
                                            <td>{contact.contactName}</td>
                                        </tr>
                                        <tr><td>CONTACT NUMBER</td>
                                            <td>{contact.number}</td>
                                        </tr>
                                        <tr><td>CITY</td>
                                            <td>{contact.city}</td>
                                        </tr>
                                    </tbody>
                                </table>
                                <button className="submitDeleteButton" onClick={handleDeleteClick}>DELETE <FontAwesomeIcon icon={faTrashAlt} /></button>
                            </div>
                        )}
                    </div>}
                    <button className="backButton" onClick={handleBackClick}>BACK</button>
                </div>}
            </div>}
        </div>
    );
};

export default ContactList;
