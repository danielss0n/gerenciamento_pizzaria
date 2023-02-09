import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import pedidoFetch from '../../utils/api';

function PedidoForm() {

    const navigate = useNavigate()
    const [sabores, setSabores] = useState([]);
    const [produtos, setProdutos] = useState([]);

    const get_client_items = async () =>{

        try {

            const response = await pedidoFetch.get("/client")
            const data = response.data
            
            setSabores(data.sabores_cadastrados)
            setProdutos(data.produtos_cadastrados)
            
        } catch (error) {
            console.log(error)
        }

    }    

    useEffect(() => {
        get_client_items();
    }, []);

    const criar_pedido = async(e) => {
        e.preventDefault()
        
        var sabores_box = document.getElementsByName('saborbox');
        
        const pedido_object = {
            pizza:[],
        }


        //verificar quais checkboxes de sabores foram selecionados
        for(var i = 0; i < sabores_box.length; i++){
            if(sabores_box[i].checked == true){
                pedido_object.pizza.push(sabores_box[i].id)
            }
        }


        
        const pedido = {
            tamanho: "Media",
            sabores: "Calabresa",
            borda: "Sem recheio",
            observacoes: "",
            produto: "Vinho Tinto",
            entrega: "Delivery"
        }

        // await pedidoFetch.post("/client/pedido", pedido)
    }

    return (
        <div>
            <form onSubmit={(e) => criar_pedido(e)}>

                <h1>Tamanho:</h1>
                <input type="radio" name="tamanho" value="broto"></input>
                <label for="html">Broto</label><br></br>
                
                <input type="radio" name="tamanho" value="pequena"></input>
                <label for="html">Pequena</label><br></br>

                <input type="radio" name="tamanho" value="media"></input>
                <label for="html">Média</label><br></br>

                <input type="radio" name="tamanho" value="grande"></input>
                <label for="html">Grande</label><br></br>

                <h1>Borda:</h1>

                <input type="radio" name="borda" value="sem"></input>
                <label for="html">Sem recheio</label><br></br>
                
                <input type="radio" name="borda" value="cheedar"></input>
                <label for="html">Cheedar</label><br></br>

                <input type="radio" name="borda" value="mussarela"></input>
                <label for="html">Mussarela</label><br></br>

                <input type="radio" name="borda" value="requeijao"></input>
                <label for="html">Requeijão</label><br></br>

                <h1>Sabores:</h1>
                {sabores.length === 0 ? ( <p>Carregando...</p> ) : (
                    sabores.map((sabor, index) => (
                        <div className="div-sabor" key={index}>
                            <input type="checkbox" id={sabor.nome} name="saborbox"></input>
                            <label htmlFor={sabores.nome}>{sabor.nome}</label>
                        </div>
                    ))
                )}

                <h1>Bebidas:</h1>
                {produtos.length === 0 ? ( <p>Carregando...</p> ) : (
                    produtos.map((produto, index) => (
                        <div className="div-produto" key={index}>
                            <input type="checkbox" id={produto.nome} name={produto.nome}></input>
                            <label htmlFor={produto.nome}>{produto.nome}</label>
                        </div>
                    ))
                )}

                <h1>Tipo de entrega:</h1>
                <input type="radio" name="entrega" value="retirada"></input>
                <label for="html">Retirada no balcão</label><br></br>

                <input type="radio" name="entrega" value="delivery"></input>
                <label for="html">Delivery</label><br></br>

                <h1>Observações:</h1>
                <textarea name="observacoes" id="observacoes" cols="30" rows="10"></textarea>
                
                <button type="submit">Pedir</button>

            </form>
        </div>
    )
}

export default PedidoForm