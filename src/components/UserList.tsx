import React, { useEffect } from 'react'
import { useActions } from '../hooks/useAction'
import { useTypedSelector } from '../hooks/useTypedSelector'

const UserList: React.FC = () => {
    const { users, error, loading } = useTypedSelector(state => state.user)
    const { fetchUsers } = useActions();

    useEffect(() => {
        fetchUsers();
    }, [])

    if (loading) {
        return <h1>Идёт загрузка...</h1>
    }
    if (error) {
        return <h1>{error}</h1>
    }

    return (
        <ul>
            {users.map(user => 
                <li key={user.id}>{user.name}</li>
            )}
        </ul>
    )
}

export default UserList;