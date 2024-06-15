import { useState, useEffect, useRef } from "react"
import axios from "axios"

interface TData {
    [key: string]: string[]
}

const Protected = ({ token }: {token: string | undefined}) => {
    const isRun = useRef(false)

    const [data, setData] = useState<TData>({})

    useEffect(() => {
        if (isRun.current) return;

        isRun.current = true;

        const config = {
            headers: {
                authorization: `Bearer ${token}`,
            },
        }

        axios
            .get("/documents", config)
            .then((res) => setData(res.data))
            .catch((err) => console.error(err))
    }, [token])

    return data ? (
        <>
            {Object.keys(data).map((email) => (
                <div key={email}>
                    <h3>{email}</h3>
                    <ul>
                        {data[email].map((message, index) => (
                            <li key={index}>{message}</li>
                        ))}
                    </ul>
                </div>
            ))}
        </>
    ) : (
        <div>Protected</div>
    )
}

export default Protected