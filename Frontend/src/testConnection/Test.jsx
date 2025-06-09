import { useEffect, useState } from "react";

function Test() {

    const[mensajeTipoFactura, setMensajeTipoFactura] = useState("NO SE HA MODIFICADO")
    const[mensajeCliente, setMensajeCliente] = useState("NO SE HA MODIFICADO")
    const[mensajeFacturas, setMensajeFacturas] = useState("NO SE HA MODIFICADO")
    const[mensajeProveedores, setMensajeProveedores] = useState("NO SE HA MODIFICADO")
    const[mensajeUsuarios, setMensajeUsuarios] = useState("NO SE HA MODIFICADO")

    useEffect(() => {
        setMessageBills()
        setMessageBillType()
        setMessageClient()
        setMessageProviders()
        setMessageUsers()
    }, [])

    const setMessageBillType = async() =>  {
        try {
            const response = await fetch('/testConnectionTipoFactura')
            if (response.ok) {
                const data = await response.json()
                if (data.status===200) {
                    setMensajeTipoFactura(data.message)
                } else {
                    if (debug == true) console.log("Bad STATUS: "+data.status+", ERROR: "+data.message);
                }
                } else {
                console.log("Response not OK!")
                }
        } catch (error) {
            console.log("HUBO UN ERROR AL CONECTAR CON LA API: "+error)
        }
    }

    const setMessageClient = async () => {
        try {
            const response = await fetch('/testConnectionCliente')
            if (response.ok) {
                const data = await response.json()
                if (data.status===200) {
                    setMensajeCliente(data.message)
                } else {
                    if (debug == true) console.log("Bad STATUS: "+data.status+", ERROR: "+data.message);
                }
                } else {
                console.log("Response not OK!")
                }
        } catch (error) {
            console.log("HUBO UN ERROR AL CONECTAR CON LA API: "+error)
        }
    }

    const setMessageBills = async() =>  {
        try {
            const response = await fetch('/testConnectionFactura')
            if (response.ok) {
                const data = await response.json()
                if (data.status===200) {
                    setMensajeFacturas(data.message)
                } else {
                    if (debug == true) console.log("Bad STATUS: "+data.status+", ERROR: "+data.message);
                }
                } else {
                console.log("Response not OK!")
                }
        } catch (error) {
            console.log("HUBO UN ERROR AL CONECTAR CON LA API: "+error)
        }
    }

    const setMessageProviders = async() =>  {
        try {
            const response = await fetch('/testConnectionProveedores')
            if (response.ok) {
                const data = await response.json()
                if (data.status===200) {
                    setMensajeProveedores(data.message)
                } else {
                    if (debug == true) console.log("Bad STATUS: "+data.status+", ERROR: "+data.message);
                }
                } else {
                console.log("Response not OK!")
                }
        } catch (error) {
            console.log("HUBO UN ERROR AL CONECTAR CON LA API: "+error)
        }
    }

    const setMessageUsers = async() => {
        try {
            const response = await fetch('/testConnectionUsuarios')
            if (response.ok) {
                const data = await response.json()
                if (data.status===200) {
                    setMensajeUsuarios(data.message)
                } else {
                    if (debug == true) console.log("Bad STATUS: "+data.status+", ERROR: "+data.message);
                }
                } else {
                console.log("Response not OK!")
                }
        } catch (error) {
            console.log("HUBO UN ERROR AL CONECTAR CON LA API: "+error)
        }
    }

    return (<>
        <h1>Mensajes de Test:</h1>
        <ul>
            <li><h2>{mensajeFacturas}</h2></li>
            <li><h2>{mensajeTipoFactura}</h2></li>
            <li><h2>{mensajeCliente}</h2></li>
            <li><h2>{mensajeProveedores}</h2></li>
            <li><h2>{mensajeUsuarios}</h2></li>
        </ul>
    </>)
}

export default Test