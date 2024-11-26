import { useState } from "react";
import { useLoaderData } from "react-router-dom";

const Users = () => {

    const loadedUser = useLoaderData()

    const [users, setUsers] = useState(loadedUser)

    const handleDelete = id => {
        console.log(id)
        fetch(`http://localhost:5000/users/${id}`, {
            method: 'DELETE'
        })
        .then(res => res.json())
        .then(data => {
            console.log(data);
            if(data.deletedCount > 0) {
                alert('deleted successfully');
                const remainingUser = users.filter(user => user._id !== id);
                setUsers(remainingUser)
            }
        })
    }

    return (
        <div>
            {users.length}
            <div>
                {
                    users.map(user => <p key={user._id}>{user.name}: {user.email} 
                    <button
                     onClick={() => handleDelete(user._id)}
                    >X</button></p>)
                }
            </div>
        </div>
    );
};

export default Users;