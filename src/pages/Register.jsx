import React, { useState } from 'react';
import { Footer, Navbar } from "../components";
import UserForm from '../components/UserForm';
import { Link, useNavigate } from 'react-router-dom';
import validateEmail from '../utils/validateEmail';
import formatDate from '../utils/formatDate';
import { useDispatch } from 'react-redux';
import { login } from "../redux/action";

const Register = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [error, setError] = useState("");
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
        setError("");

        if (!validateEmail(form.email)) {
            throw new Error('Por favor, insira um endereço de e-mail válido.');
        }

        const baseUrl = "http://localhost:8080/cliente/";
        const url = form.tipoDocumento === "CPF" ? baseUrl + "pessoaFisica" : baseUrl + "pessoaJuridica";
        const body = {
            ...form,
            userName: form.nome
        }
        const req = {
            method: "POST",
            body: JSON.stringify(body),
            headers: {
                "Content-type": "application/json; charset=UTF-8"
            }
        };

        try {
            const resp = await fetch(url, req);
            
            if (resp.status !== 201) {
                throw await resp.text();
            }
            
            const respBody = await resp.json();
            const dataDeNascimento = respBody.dataDeNascimento ? formatDate(respBody.dataDeNascimento) : undefined;
            const tipoDocumento = respBody.cpf ? "CPF" : "CNPJ";

            const user = { ...respBody, tipoDocumento, dataDeNascimento }

            dispatch(login(user));
            navigate("/");
        } catch (error) {
            setError(error.toString());
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
                            {error &&
                                <div>
                                    <p className="text-danger">{error}</p>
                                </div>
                            }
                            <div className="text-center">
                                <button className="btn btn-dark" type="submit">
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
