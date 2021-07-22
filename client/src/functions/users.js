import React, {
    useState,
    useEffect
} from "react"
import api from "../services/api"

export default function Users() {
    const [users, setUsers] = useState([])
    useEffect(() => {
        async function loadUsers() {
            const response = await api.get('/api/users')
            setUsers(response.data)
        }
        loadUsers()
    }, [])
}