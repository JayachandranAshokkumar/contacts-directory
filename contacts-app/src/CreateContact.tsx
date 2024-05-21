import axios from "axios";
import React, { useState } from "react";
import Contact from "./Contact";

const CreateContactForm = () => {
    const [contactName, setContactName] = useState("");
    const [number, setNumber] = useState("");
    const [city, setCity] = useState("");
    const [isBackClicked, setIsBackClicked] = useState(false);
    const [networkError, setNetworkError] = useState(false);
    const [createdMessage, setCreatedMessage] = useState(false);
    const handleBackClick = () => {
        setIsBackClicked(true);
    };
    const handleSubmit = async (event: { preventDefault: () => void; }) => {
        event.preventDefault();
        try {
            const response = await axios.post("https://localhost:44305/api/Contact", {
                contactName,
                number,
                city,
            });
            if (response.status === 200) {
                // Handle successful creation (e.g., clear form, show success message)
                console.log("New Contact Created Successfully");
                setContactName("");
                setNumber("");
                setCity("");
                setCreatedMessage(true);
            } else {
                // Handle errors
                console.error("Error creating contact:", response.statusText);
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
                    {createdMessage ? <div><h1>CONTACT CREATED!</h1><button className="centerButton" onClick={handleBackClick}>BACK TO DASHBOARD!</button></div> : <div>
                        <table className="table table-hover table-striped table-bordered">
                            <thead className="tableHeader">
                                <tr>
                                    <th>FIELD NAMES</th><th>VALUES</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr><td>CONTACT NAME</td>
                                    <td>
                                        <input
                                            type="text"
                                            id="contactName"
                                            value={contactName}
                                            onChange={(e) => setContactName(e.target.value)}
                                            required
                                        />
                                    </td>
                                </tr>
                                <tr><td>CONTACT NUMBER</td>
                                    <td>
                                        <input
                                            type="tel" // Use "tel" for phone number input
                                            id="number"
                                            value={number}
                                            onChange={(e) => setNumber(e.target.value)}
                                            required
                                        />
                                    </td>
                                </tr>
                                <tr><td>CITY</td>
                                    <td>
                                        <input
                                            type="text"
                                            id="city"
                                            value={city}
                                            onChange={(e) => setCity(e.target.value)}
                                            required
                                        />
                                    </td>
                                </tr>
                            </tbody>
                            <br />
                            <button type="submit" className="submitButton" onClick={handleSubmit}>CREATE</button>
                            <button className="backButton" onClick={handleBackClick}>BACK</button>
                        </table>
                    </div>}
                </div>}
            </div>}
        </div>
    );
};

export default CreateContactForm;
