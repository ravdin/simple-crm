import { useEffect, useState } from "react";
import { User } from "./types";
import axios from "axios";
import { useParams } from "react-router-dom";

export const ViewUser: React.FC = () => {
    const { id } = useParams<{id: string}>();
    const [user, setUser] = useState<User>();
    const [error, setError] = useState("")
    useEffect(() => {
        axios.get(`/api/user/${id}`)
            .then(response => setUser(response.data))
            .catch(err => setError(err.response.data));
        }, [id]);
    if (error != "") {
        console.log(error);
        return (
            <div className="p-4 space-y-8">
                <h1 className="text-xl">Could not fetch user!</h1>
            </div>
        );
    }
    const formatDateTime = (date: Date) =>
        new Date(date).toLocaleDateString('en-us') + ' ' + new Date(date).toLocaleTimeString('en-us');
    return (
        <div className="p-4 space-y-8">
            <h1 className="text-xl">User Details</h1>
            <div>
                <div><b>Name:&nbsp;</b>{user?.firstName} {user?.lastName}</div>
                <div><b>Age:&nbsp;</b>{user?.age}</div>
                <div><b>Phone:&nbsp;</b>{user?.phoneNumber}</div>
                {user?.notes && user.notes.length > 0 && 
                <div>
                    <b>Notes</b>
                    <ul>
                        {user.notes.map(userNote =>
                        <li>
                            <span>{formatDateTime(userNote.createdAt)}</span>
                            <span style={{marginLeft: "1em"}}>{userNote.note}</span>
                        </li>
                        )}
                    </ul>
                </div>
                }
            </div>
        </div>
    );
};

export default ViewUser;