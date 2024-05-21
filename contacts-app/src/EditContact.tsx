import React, { useState, useEffect } from "react";
import Contact from "./Contact";
import axios from "axios";

interface ContactDetails {
    id: number;
    contactName: string;
    number: string;
    city: string;
}

interface selectedItem {
    selectedId: number;
}

const EditContact: React.FC<selectedItem> = ({ selectedId }) => {
    const [items, setItems] = useState<ContactDetails>( // Set default city value
        { id: 0, contactName: "", number: "", city: "" }
    );
    const [updateditems] = useState<ContactDetails>( // Set default city value
        { id: 0, contactName: "", number: "", city: "" }
    );
    const [contactName, setContactName] = useState(items?.city);
    const [contactNumber, setContactNumber] = useState(items?.city);
    const [city, setCity] = useState(items?.city);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const [isBackClicked, setIsBackClicked] = useState(false);
    const [isOnChangeName, SetIsOnChangeName] = useState(false);
    const [isOnChangeNumber, SetIsOnChangeNumber] = useState(false);
    const [isOnChangeCity, SetIsOnChangeCity] = useState(false);
    const [networkError, setNetworkError] = useState(false);
    const [editedMessage, setEditedMessage] = useState(false);

    const handleNameChangeClick = (event: React.ChangeEvent<HTMLInputElement>) => {
        setContactName(event.target.value);
        SetIsOnChangeName(true);
    };
    const handleNumberChangeClick = (event: React.ChangeEvent<HTMLInputElement>) => {
        setContactNumber(event.target.value);
        SetIsOnChangeNumber(true);
    };
    const handleCityChangeClick = (event: React.ChangeEvent<HTMLInputElement>) => {
        setCity(event.target.value);
        SetIsOnChangeCity(true);
    };

    const handleSubmitClick = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        try {
            updateditems.id = items.id;
            updateditems.contactName = contactName;
            updateditems.number = contactNumber;
            updateditems.city = city;
            const response = await axios.put("https://localhost:44305/api/Contact/" + items.id, updateditems); // Assuming PUT request for update
            console.log("Update successful:", response.data);
            setEditedMessage(true);
            // Handle successful update (e.g., clear form, show success message)
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
                setItems(data);
            } catch (error) {
            } finally {
                setIsLoading(false);
            }
        };
        fetchData();
    }, []);

    return (
        <div>
            {networkError ? <div className="bgNetworkError"><ul><li><h2>Please make sure WEB API is running.</h2></li><li><h2>Please add CORS as a browser extension (Development / Unit testing perpose only).</h2></li></ul></div> : <div>
                {isBackClicked ? <div><Contact /></div> : <div>
                    {editedMessage ? <div><h1>CONTACT UPDATED!</h1><button className="centerButton" onClick={handleBackClick}>BACK TO DASHBOARD!</button></div> : <div>
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
                            <p>Error: {error}</p>
                        ) : (
                            <form onSubmit={(e) => handleSubmitClick(e)}>
                                <table className="table table-hover table-striped table-bordered">
                                    <thead className="tableHeader">
                                        <tr>
                                            <th>FIELD NAMES</th><th>VALUES</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr><td>CONTACT ID</td>
                                            <td>
                                                <input
                                                    type="text"
                                                    value={items?.id}
                                                    disabled
                                                />
                                            </td>
                                        </tr>
                                        <tr><td>CONTACT NAME</td>
                                            <td>
                                                <input
                                                    type="text"
                                                    value={(contactName) ? contactName : ((!isOnChangeName) ? items?.contactName : contactName)}
                                                    onChange={(e) => { handleNameChangeClick(e) }}
                                                />
                                            </td>
                                        </tr>
                                        <tr><td>CONTACT NUMBER</td>
                                            <td>
                                                <input
                                                    type="text"
                                                    value={(contactNumber) ? contactNumber : ((!isOnChangeNumber) ? items?.number : contactNumber)}
                                                    onChange={(e) => { handleNumberChangeClick(e) }}
                                                />
                                            </td>
                                        </tr>
                                        <tr><td>CITY</td>
                                            <td>
                                                <input
                                                    type="text"
                                                    value={(city) ? city : ((!isOnChangeCity) ? items?.city : city)}
                                                    onChange={(e) => { handleCityChangeClick(e) }}
                                                />
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                                )
                                <button className="submitButton" type="submit">SUBMIT</button>
                                <button className="backButton" onClick={handleBackClick}>BACK</button>
                            </form>
                        )}
                    </div>}
                </div>}
            </div>}
        </div>
    );
};

export default EditContact;