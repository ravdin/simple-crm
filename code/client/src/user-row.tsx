import { useState } from "react";
import { User } from "./types";
import axios from "axios";
import { AddUserNote } from "./add-user-note";
import { Link } from "react-router-dom";

export const UserRow: React.FC<{ user: User }> = ({ user }) => {
    const [isEditing, setIsEditing] = useState(false);
    const [isAddingNote, setIsAddingNote] = useState(false);
    const [firstName, setFirstName] = useState(user.firstName);
    const [lastName, setLastName] = useState(user.lastName);
    const [age, setAge] = useState(`${user.age}`);
    const [phoneNumber, setPhoneNumber] = useState(user.phoneNumber);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState(false);
    const [loading, setLoading] = useState(false);
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError("");
        try {
            await axios.put(`/api/users/${user.id}`, {
                firstName,
                lastName,
                age,
                phoneNumber,
            });
            setSuccess(true);
            setIsEditing(false);
        } catch (error) {
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            setError((error as any).response.data);
        }
        setLoading(false);
    };
    if (isEditing) {
        return (
            <tr>
                <td colSpan={6}>
                    <form
                        onSubmit={handleSubmit}
                        className="space-y-4 p-4 rounded bg-gray-100 w-96">
                        <h2 className="text-xl font-fold">Edit</h2>
                        {error && <p className="text-red-500">{error}</p>}
                        {success && (
                            <p className="text-green-500">User added successfully</p>
                        )}
                        <input
                            type="text"
                            placeholder="First Name"
                            value={firstName}
                            onChange={e => setFirstName(e.target.value)}
                            className="block w-full p-2 border border-gray-300 rounded"
                        />
                        <input
                            type="text"
                            placeholder="Last Name"
                            value={lastName}
                            onChange={e => setLastName(e.target.value)}
                            className="block w-full p-2 border border-gray-300 rounded"
                        />
                        <input
                            type="text"
                            placeholder="Age"
                            value={age}
                            onChange={e => setAge(e.target.value)}
                            className="block w-full p-2 border border-gray-300 rounded"
                        />
                        <input
                            type="text"
                            placeholder="Phone Number"
                            value={phoneNumber}
                            onChange={e => setPhoneNumber(e.target.value)}
                            className="block w-full p-2 border border-gray-300 rounded"
                        />
                        <button
                            type="submit"
                            disabled={loading}
                            className="block w-full p-2 bg-blue-500 text-white rounded">
                            Update User
                        </button>
                    </form>
                </td>
            </tr>
        );
    }
    return (
        <>
        <tr key={user.id}>
            <td>
                <button onClick={() => setIsEditing(true)}>Edit</button>
                <button style={{marginLeft: "1em"}} onClick={() => setIsAddingNote(true)}>Add Note</button>
                <Link style={{marginLeft: "1em"}} to={`/user/${user.id}`}>Details</Link>
            </td>
            <td>{firstName}</td>
            <td>{lastName}</td>
            <td>{age}</td>
            <td>{phoneNumber}</td>
            <td>
                <div style={{width: "100%"}}>
                    {user.notes.map(userNote => <div style={{textOverflow: "ellipsis"}}>{userNote.note}</div>)}
                </div>
            </td>
        </tr>
        {isAddingNote && (
            <tr>
                <td colSpan={6}>
                    <AddUserNote user={user} key={user.id}/>
                </td>
            </tr>
            )
        }
        </>
    );
};
