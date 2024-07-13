import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Footer, Navbar } from "../components";

const Login = () => {
  const [form, setForm] = useState({
    email: "",
    senha: ""
  });
  const [error, setError] = useState("");

  const navigate = useNavigate();
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    
    setError("");
    
    setForm(prevState => ({
      ...prevState,
      [name]: value
    }));
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    const url = "http://localhost:8080/cliente/login";
    const body = {
      method: "POST",
      body: JSON.stringify(form),
      headers: {
        "Content-type": "application/json; charset=UTF-8"
      }
    };

    try {
      const resp = await fetch(url, body)
      
      if(resp.status === 403) {
        setError("Email ou senha inválidos");
        return;
      }
      
      const respJson = await resp.json();
      console.log(respJson);
      navigate(`/`);
    } catch (error) {
      setError(error);
    }
  }

  return (
    <>
      <Navbar />
      <div className="container my-3 py-3">
        <h1 className="text-center">Login</h1>
        <hr />
        <div className="row my-4 h-100">
          <div className="col-md-4 col-lg-4 col-sm-8 mx-auto">
            <form onSubmit={handleSubmit}>
              <div className="my-3">
                <label htmlFor="display-4">Endereço de email</label>
                <input
                  type="email"
                  className="form-control"
                  id="floatingInput"
                  placeholder="nome@exemplo.com"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                />
              </div>
              <div className="my-3">
                <label htmlFor="floatingPassword display-4">Senha</label>
                <input
                  type="password"
                  className="form-control"
                  id="floatingPassword"
                  placeholder="Senha"
                  name="senha"
                  value={form.senha}
                  onChange={handleChange}
                />
              </div>
              <div className="my-3">
                <p>Novo aqui? <Link to="/register" className="text-decoration-underline text-info">Cadastrar</Link> </p>
              </div>
              {error &&
                <div>
                  <p className="text-danger">{error}</p>
                </div>
              }
              <div className="text-center">
                <button className="my-2 mx-auto btn btn-dark" type="submit">
                  Login
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Login;
