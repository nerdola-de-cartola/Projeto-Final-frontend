import React, { useState } from 'react';
import { Footer, Navbar } from "../components";
import UserForm from '../components/UserForm';
import { Link } from 'react-router-dom';
import validateEmail from '../utils/validateEmail';

const Register = () => {
    const [form, setForm] = useState({
        nome: '',
        email: '',
        senha: '',
        tipoDocumento: '', // 'CPF' ou 'CNPJ'
        telefone: '',
        endereco: '',
    });

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!validateEmail(form.email)) {
            alert('Por favor, insira um endereço de e-mail válido.');
            return;
        }

        console.log('Formulário enviado:', form);

        const baseUrl = "http://localhost:8080/cliente/";
        const url = form.tipoDocumento === "CPF" ? baseUrl + "pessoaFisica" : baseUrl + "pessoaJuridica";
        const body = {
            method: "POST",
            body: JSON.stringify(form),
            headers: {
                "Content-type": "application/json; charset=UTF-8"
            }
        };

        try {
            const resp = await fetch(url, body);
            const respJson = await resp.json();
            console.log(respJson);
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <>
            <Navbar />
            <div className="container my-3 py-3">
                <h1 className="text-center">Cadastro</h1>
                <hr />
                <div className="row my-4 h-100">
                    <div className="col-md-6 col-lg-6 col-sm-10 mx-auto">
                        <form onSubmit={handleSubmit}>
                            <UserForm form={form} setForm={setForm} />
                            <div className="my-3">
                                <p>Já possui uma conta? <Link to="/login" className="text-decoration-underline text-info">Entrar</Link></p>
                            </div>
                            <div className="text-center">
                                <button className="btn btn-primary" type="submit">
                                    Cadastrar
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    )
}

export default Register;
