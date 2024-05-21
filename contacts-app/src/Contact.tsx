import React, { useState, useEffect } from "react";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTrashAlt } from "@fortawesome/free-regular-svg-icons";
import CreateContact from "./CreateContact";
import DeleteContact from "./DeleteContact";
import EditContact from "./EditContact";

interface ContactDetails {
    id: number;
    contactName: string;
    number: string;
    city: string;
}

let API_URL = "https://localhost:44305/api/Contact"; //It is our our API"s Localhost URL

export const fetchData = async (): Promise<ContactDetails[]> => {
    try {
        const response = await axios.get<ContactDetails[]>(API_URL);
        return response.data;
    } catch (error: any) {
        console.log(error.message);
        throw error;
    }
};

const ContactsComponent: React.FC = () => {
    const [data, setData] = useState<ContactDetails[]>([]);
    const [isEditClicked, setIsEditClicked] = useState(false);
    const [isCreateClicked, setIsCreateClicked] = useState(false);
    const [isDeleteClicked, setIsDeleteClicked] = useState(false);
    const [selectedId, setSelectedId] = useState<number>(0);
    const [networkError, setNetworkError] = useState(false);

    const handleEditClick = (id: number) => {
        setIsEditClicked(true);
        setSelectedId(id);
    };

    const handleCreateClick = () => {
        setIsCreateClicked(true);
    };

    const handleDeleteClick = (id: number) => {
        setIsDeleteClicked(true);
        setSelectedId(id);
    };

    useEffect(() => {
        const getData = async () => {
            try {
                const fetchedData = await fetchData();
                setData(fetchedData);
            } catch (error: any) {
                if (error.message === "Network Error") {
                    setNetworkError(true);
                    console.log("1. Please make sure WEB API is running. \n2.Please add CORS as a browser extension (Development / Unit testing perpose only).");
                }
                else {
                    console.log(error.message);
                }
            }
        };

        getData();
    }, []);

    const Mytable = ({ data }: { data: ContactDetails[] }) => {
        return (
            <div>
                {isDeleteClicked ? <div><DeleteContact selectedId={selectedId} /></div> : <div>
                    {isCreateClicked ? <div><CreateContact /></div> : <div>
                        {isEditClicked ? <div><EditContact selectedId={selectedId} /></div> : <div>
                            <table className="table table-hover table-striped table-bordered">
                                <thead className="tableHeader">
                                    <tr>
                                        <th className="col-sm-1">ID</th>
                                        <th className="col-sm-3">CONTACT NAME</th>
                                        <th className="col-sm-2">MOBILE NUMBER</th>
                                        <th className="col-sm-2">CITY</th>
                                        <th className="col-sm-4">ACTIONS</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {data.map((item) => (
                                        <tr className="tableBody" key={item.id.toString()}>
                                            <td>{item.id.toString()}</td>
                                            <td>{item.contactName.toString()}</td>
                                            <td>{item.number.toString()}</td>
                                            <td>{item.city.toString()}</td>
                                            <td><button className="editButton" onClick={() => handleEditClick(item.id)}>
                                                EDIT <FontAwesomeIcon icon={faEdit} />
                                            </button>

                                                <button className="deleteButton" onClick={() => handleDeleteClick(item.id)}>
                                                    DELETE <FontAwesomeIcon icon={faTrashAlt} />
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                            <button className="centerButton" onClick={handleCreateClick}>
                                CREATE NEW CONTACT DETAILS
                            </button>
                        </div>
                        }
                    </div>
                    }
                </div>}
            </div>
        );
    };

    return (
        <div>
            {networkError ? <div className="bgNetworkError"><ul><li><h2>Please make sure WEB API is running.</h2></li><li><h2>Please add CORS as a browser extension (Development / Unit testing perpose only).</h2></li></ul></div> : <div>
                {data.length > 0 ? (
                    <Mytable data={data} />
                ) : (
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
                        <p>Loading contacts... Please wait!</p>
                    </div>
                )}
            </div>}
        </div>
    );
};
export default ContactsComponent;

