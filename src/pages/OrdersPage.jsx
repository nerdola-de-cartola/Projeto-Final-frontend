import React, { useEffect, useState } from 'react';
import { Navbar, Footer } from '../components';
import { useSelector } from 'react-redux'
import { useNavigate, Link } from "react-router-dom";
import formatDate from '../utils/formatDate';

const OrdersPage = () => {
  const navigate = useNavigate();
  const user = useSelector((state) => state.handleUser);
  const [orders, setOrders] = useState([]);
  const [viewOrders, setViewOrders] = useState([]);

  const Item = ({item}) => {
    const [product, setProduct] = useState([]);

    useEffect(() => {
      const fetchData = async () => {
        const url = new URL(`http://localhost:8080/produto/${item.idProduto}`);
        const response = await fetch(url);
        const data = await response.json();
        setProduct(data);
      }
  
      fetchData();
    }, [item.idProduto])

    return (
      <div key={item.idProduto}>
        <div className="row d-flex align-items-center">
          <div className="col-lg-3 col-md-12">
            <div
              className="bg-image rounded"
              data-mdb-ripple-color="light"
            >
              <img
                src={product.imagem}
                alt={product.nome}
                width={100}
                height={75}
              />
            </div>
          </div>
          <div className="col-lg-5 col-md-6">
            <p>
              <strong>{product.nome}</strong>
            </p>
            <p>
              {product.descricao}
            </p>
          </div>
          <div className="col-lg-4 col-md-6">
            <p className="text-start text-md-center">
              <strong>
                <span className="text-muted">{item.quantidade}</span> x ${item.precoUnitario} = ${item.quantidade * item.precoUnitario}
              </strong>
            </p>
          </div>
        </div>
        <hr className="my-4" />
      </div>
    );
  }

  const fullView = (index) => {
    setViewOrders(viewOrders.map((view, i) => i === index ? !view : view))
  }

  useEffect(() => {
    setViewOrders(orders.map(() => false))
  }, [orders]);

  useEffect(() => {
    const fetchData = async () => {
      const url = new URL("http://localhost:8080/pedido?");
      const params = new URLSearchParams({
        email: user.email,
        senha: user.senha
      }).toString();
      const response = await fetch(url + params);
      const data = await response.json();
      setOrders(data.map(order => {
        return {
          ...order,
          completeView: false
        }
      }));
    }

    if (user && user.idCliente === undefined) {
      navigate(`*`);
      return;
    }

    fetchData();
  }, [navigate, user])


  const Orders = () => {
    return (
      <>
        <section className="h-100 gradient-custom">
          <div className="container py-5">
            <div className="row d-flex justify-content-center my-4">
              <div className="col-md-8">
                <div className="card mb-4">
                  <div className="card-header py-3">
                    <h5 className="mb-0">Lista dos Pedidos</h5>
                  </div>
                  <div className="card-body">
                    {orders.map((order, index) => (
                      <div key={order.idPedido}>
                        <div className="row d-flex align-items-center">
                          <div className="col-lg-5 col-md-6">
                            <p>
                              Número do pedido: <strong>{order.idPedido}</strong>
                            </p>
                            <p>
                              Data do pedido: <strong>{formatDate(order.dataPedido)}</strong>
                            </p>
                            <p>
                              Status do pedido: <strong>{order.status}</strong>
                            </p>
                          </div>
                          {viewOrders[index] &&
                          order.itens.map(item =>
                            <Item item={item} />)}
                          <div className="text-center">
                            <button
                              className="my-2 mx-auto btn btn-primary"
                              type="button"
                              onClick={() => fullView(index)}
                            >
                              {viewOrders[index] ? "Fechar pedido" : "Ver pedido completo"}
                            </button>
                          </div>
                        </div>
                        {index !== orders.length - 1 &&
                          <hr className="my-4" />
                        }
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </>
    );
  }

  const Empty = () => {
    return (
      <div className="container">
        <div className="row">
          <div className="col-md-12 py-5 bg-light text-center">
            <h4 className="p-3 display-5">Você ainda não tem nenhum pedido</h4>
            <Link to="/" className="btn btn-outline-dark mx-4">
              <i className="fa fa-arrow-left"></i> Continue comprando
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <>
      <Navbar />
      <div className="container my-3 py-3">
        <h1 className="text-center">Histórico de pedidos</h1>
        <hr />
        {orders.length > 0 ? <Orders /> : <Empty />}
      </div>
      <Footer />
    </>
  );
};

export default OrdersPage;


