import { useState, useEffect, useRef } from "react"
import Keycloak from "keycloak-js"

type TToken = string | undefined

const client = new Keycloak({
    url: import.meta.env.VITE_KEYCLOAK_URL,
    realm: import.meta.env.VITE_KEYCLOAK_REALM,
    clientId: import.meta.env.VITE_KEYCLOAK_CLIENT,
})

const useAuth = (): [boolean, TToken] => {
    const isRun = useRef(false)
    const [token, setToken] = useState<TToken>(undefined)
    const [isLogin, setLogin] = useState<boolean>(false)

    useEffect(() => {
        if (isRun.current) return

        isRun.current = true
        client
            .init({
                onLoad: "login-required",
            })
            .then((res) => {
                setLogin(res)
                setToken(client.token)
            })
    }, [])

    return [isLogin, token]
}

export default useAuth