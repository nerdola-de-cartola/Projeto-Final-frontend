import React, { useState } from "react";
import { Footer, Navbar } from "../components";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import formatDate from "../utils/formatDate";

const Checkout = () => {
  const items = useSelector((state) => state.handleCart);
  const user = useSelector((state) => state.handleUser);
  const navigate = useNavigate();
  console.log(user)
  console.log(items)
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    const url = "http://localhost:8080/pedido";

    const itens = items.map((item) => {
      return {
        quantidade: item.qty,
        idProduto: item.idProduto,
        precoUnitario: item.preco
      }
    })

    const data = {
      login: user,
      idCliente: user.idCliente,
      dataPedido: formatDate(new Date()),
      status: "aguardando pagamento",
      itens
    }

    const body = {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-type": "application/json; charset=UTF-8"
      }
    };

    try {
      const resp = await fetch(url, body)

      if (resp.status !== 201) {
        setError("Não foi possível criar o seu pedido");
        return;
      }

      await resp.json();
      navigate("/OrdersPage");
    } catch (error) {
      setError(error);
    }
  }

  const EmptyCart = () => {
    return (
      <div className="container">
        <div className="row">
          <div className="col-md-12 py-5 bg-light text-center">
            <h4 className="p-3 display-5">No item in Cart</h4>
            <Link to="/" className="btn btn-outline-dark mx-4">
              <i className="fa fa-arrow-left"></i> Continue Shopping
            </Link>
          </div>
        </div>
      </div>
    );
  };

  const ShowCheckout = () => {
    let shipping = 30.0;
    let totalItems = 0;
    let subTotal = 0.0;

    for (const item of items) {
      totalItems += item.qty;
      subTotal += item.qty * item.preco
    }

    return (
      <>
        <div className="container py-3">
          <div className="card">
            <div className="card-header py-3 bg-light">
              <h5 className="mb-0">Resumo do Pedido</h5>
            </div>
            <div className="card-body">
              <ul className="list-group list-group-flush">
                <li className="list-group-item d-flex justify-content-between align-items-center border-0 px-0 pb-0">
                  Produtos ({totalItems})<span>${Math.round(subTotal)}</span>
                </li>
                <li className="list-group-item d-flex justify-content-between align-items-center px-0">
                  Preço do Envio
                  <span>${shipping}</span>
                </li>
                <li className="list-group-item d-flex justify-content-between align-items-center border-0 px-0 mb-3">
                  <div>
                    <strong>Montante total</strong>
                  </div>
                  <span>
                    <strong>${Math.round(subTotal + shipping)}</strong>
                  </span>
                </li>
              </ul>
            </div>
            <div className="d-flex justify-content-center mb-4">
              {user.idCliente === undefined ?
                <Link to="/login" className="btn btn-outline-dark mx-4">
                  <i className="fa fa-sign-in-alt mr-1"></i> Entre com seu usuário para comprar
                </Link> :
                <button
                  className="w-75 btn btn-primary "
                  onClick={handleSubmit}
                >
                  Finalizar a compra
                </button>
              }
            </div>
            {error &&
              <div className="text-center">
                <p className="text-danger">{error}</p>
              </div>
            }
          </div>
        </div>
      </>
    );
  };
  return (
    <>
      <Navbar />
      <div className="container my-3 py-3">
        <h1 className="text-center">Checkout</h1>
        <hr />
        {items.length ? <ShowCheckout /> : <EmptyCart />}
      </div>
      <Footer />
    </>
  );
};


export default Checkout;

