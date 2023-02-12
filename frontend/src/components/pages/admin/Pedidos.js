import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import api from '../../utils/api';

function Pedidos() {

    const navigate = useNavigate()
    const [pedidos, setPedidos] = useState([]);

    const get_pedidos = async () =>{
        try {
            const response = await api.get("/admin/pedidos")
            const data = response.data
    

            setPedidos(data.pedidos_cadastrados)
        } catch (error) {
            console.log(error)
        }
    }    
    useEffect(() => {
        get_pedidos();
    }, []);

    const finalizar = async(e, pedido) => {
        await api.patch(`/admin/pedidos/${pedido._id}`)
    }

    return (
        <div>
            <h1>Pedidos:</h1>
            {pedidos.length === 0 ? ( <p>Carregando...</p> ) : (
                pedidos.map((pedido, index) => (
                    <div className="div-sabor" key={index}>
                        <h2>Pizza {index}</h2>
                        <p>Sabores:</p>
                        <p>{pedido.pizza.sabores}</p>
                        {pedido.status === "Pizza pronta" ? <p>Pizza pronta!</p> :
                            <form onSubmit={(e) => finalizar(e, pedido)}>
                                <input type="submit" value="Finalizar Pedido" />
                            </form>
                        }
                    </div>
                ))
            )}
        </div>
    )
}

export default Pedidos