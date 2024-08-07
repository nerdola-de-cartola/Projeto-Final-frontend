import React, { useState, useEffect } from "react";
import { Footer, Navbar } from "../components";
import UserForm from "../components/UserForm";
import { useSelector } from 'react-redux'
import { useDispatch } from "react-redux";
import validateEmail from "../utils/validateEmail";
import { useNavigate } from "react-router-dom";
import { login, logout } from "../redux/action";
import formatDate from "../utils/formatDate";

const User = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const user = useSelector((state) => state.handleUser);
  const [form, setForm] = useState(user);
  const [msg, setMsg] = useState("");

  const handleLogout = () => {
    dispatch(logout());
    navigate("/")
  }

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
      ...form,
      userName: form.nome
    }
    const req = {
      method: "PUT",
      body: JSON.stringify(body),
      headers: {
        "Content-type": "application/json; charset=UTF-8"
      }
    };


    try {
      const resp = await fetch(url, req);
      const respBody = await resp.json();
      const dataDeNascimento = respBody.dataDeNascimento ? formatDate(respBody.dataDeNascimento) : undefined;
      const tipoDocumento = respBody.cpf ? "CPF" : "CNPJ";

      const user = { ...respBody, tipoDocumento, dataDeNascimento }
      setMsg("Cadastro atualizado com sucesso!");
      dispatch(login(user));
    } catch (error) {
      console.log(error)
    }
  }


  useEffect(() => {
    if (user.idCliente === undefined) {
      navigate(`*`);
    }
  }, [navigate, user])

  return (
    <>
      <Navbar />
      <div className="container my-3 py-3">
        <h1 className="text-center">Usuário</h1>
        <hr />
        { msg &&
          <h4 className="text-center text-success">{msg}</h4>
        }
        <div className="row my-4 h-100">
          <div className="col-md-6 col-lg-6 col-sm-10 mx-auto">
            <form onSubmit={handleSubmit}>
              <UserForm form={form} setForm={setForm} />
              <div className="text-center">
                <button className="btn btn-primary" type="submit">
                  Atualizar cadastro
                </button>
              </div>
            </form>
          </div>
        </div>
        <div className="text-center">
          <button className="btn btn-danger" type="submit" onClick={handleLogout}>
            Sair
          </button>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default User;
