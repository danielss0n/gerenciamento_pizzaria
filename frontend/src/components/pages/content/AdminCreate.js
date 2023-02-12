import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import api from '../../utils/api';

function AdminCriarSabor() {

    const [ingredientes, setIngredientes] = useState([]);
    const get_ingredientes = async () =>{
        try {
            const response = await api.get("/admin")
            const data = response.data.ingredientes_cadastrados
            setIngredientes(data)
        } catch (error) {
            console.log(error)
        }
    }    
    useEffect(() => {
        get_ingredientes();
    }, []);

    const criar_sabor = async(e) => {
        e.preventDefault()

        const sabor_obj = {
            ingredientes:[]
        }

        sabor_obj.nome = document.getElementById("nome").value
        sabor_obj.descricao = document.getElementById("descricao").value
        sabor_obj.preco = parseFloat(document.getElementById("preco").value)
        sabor_obj.imagem = document.getElementById("imagem").value
        
        var ingredientes_box = document.getElementsByName('ingrediente_box');

        //verificar quais checkboxes de sabores foram selecionados
        for(var i = 0; i < ingredientes_box.length; i++){
            if(ingredientes_box[i].checked == true){
                sabor_obj.ingredientes.push(ingredientes_box[i].id)
            }
        }
        console.log(sabor_obj)
        // await api.post("/admin/cadastrarSabor", sabor_obj)
    }

    return (
        <div>
            <form onSubmit={(e) => criar_sabor(e)}>

                <label htmlFor="nome">Nome:</label>
                <input type="text" name="nome" id="nome"/>

                <label htmlFor="descricao">Descrição:</label>
                <input type="text" name="descricao" id="descricao"/>

                <h1>Ingredientes</h1>
                {ingredientes.length === 0 ? ( <p>Carregando...</p> ) : (
                    ingredientes.map((ingrediente, index) => (
                        <div className="div-ingrediente" key={index}>
                            <input type="checkbox" id={ingrediente.nome} name="ingrediente_box"></input>
                            <label htmlFor={ingrediente.nome}>{ingrediente.nome}</label>
                        </div>
                    ))
                )}

                <label htmlFor="preco">Preço:</label>
                <input type="text" name="preco" id="preco"/>

                <label htmlFor="imagem">Imagem:</label>
                <input type="text" name="imagem" id="imagem"/>

                <button type="submit">Pedir</button>
            </form>
        </div>
    )
}

export default AdminCriarSabor