import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import api from '../../utils/api';

function PedidoForm() {

    const navigate = useNavigate()
    const [sabores, setSabores] = useState([]);
    const [produtos, setProdutos] = useState([]);
    const get_client_items = async () =>{
        try {
            const response = await api.get("/client")
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
        
        let sabores_box = document.getElementsByName('saborbox');
        let sabores_escolhidos = []
        const pedido_object = { sabores:[] }

        for(var i = 0; i < sabores_box.length; i++){
            if(sabores_box[i].checked){
                sabores_escolhidos.push(sabores_box[i].id)
                pedido_object.sabores.push(sabores_box[i].id)
            }
        }
    
        pedido_object.tamanho = document.querySelector('input[name="tamanho"]:checked').value;
        pedido_object.borda = document.querySelector('input[name="borda"]:checked').value;
        pedido_object.entrega = document.querySelector('input[name="entrega"]:checked').value;
        pedido_object.produto = document.querySelector('input[name="bebida"]:checked').value;
        pedido_object.observacoes = document.getElementById("observacoes").value;

        console.log(pedido_object)

        await api.post("/client/pedido", pedido_object)
    }

    return (
        <div>
            <form onSubmit={(e) => criar_pedido(e)}>

                <h1>Tamanho:</h1>
                <input type="radio" name="tamanho" value="Broto"></input>
                <label htmlFor="html">Broto</label><br></br>
                
                <input type="radio" name="tamanho" value="Pequena"></input>
                <label htmlFor="html">Pequena</label><br></br>

                <input type="radio" name="tamanho" value="Media"></input>
                <label htmlFor="html">Média</label><br></br>

                <input type="radio" name="tamanho" value="Grande"></input>
                <label htmlFor="html">Grande</label><br></br>

                <h1>Borda:</h1>

                <input type="radio" name="borda" value="Sem"></input>
                <label htmlFor="html">Sem recheio</label><br></br>
                
                <input type="radio" name="borda" value="Cheedar"></input>
                <label htmlFor="html">Cheedar</label><br></br>

                <input type="radio" name="borda" value="Mussarela"></input>
                <label htmlFor="html">Mussarela</label><br></br>

                <input type="radio" name="borda" value="Requeijao"></input>
                <label htmlFor="html">Requeijão</label><br></br>

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
                            <input type="radio" name="bebida" value={produto.nome}></input>
                            <label htmlFor="html">{produto.nome}</label><br></br>
                        </div>
                    ))
                )}

                <h1>Tipo de entrega:</h1>
                <input type="radio" name="entrega" value="Retirada"></input>
                <label htmlFor="html">Retirada no balcão</label><br></br>

                <input type="radio" name="entrega" value="Delivery"></input>
                <label htmlFor="html">Delivery</label><br></br>

                <h1>Observações:</h1>
                <textarea name="observacoes" id="observacoes" cols="20" rows="5"></textarea>

                <button type="submit">Pedir</button>

            </form>
        </div>
    )
}

export default PedidoForm