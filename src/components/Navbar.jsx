import React from 'react'
import { NavLink } from 'react-router-dom'
import { useSelector } from 'react-redux'

const navItem = "d-flex align-items-center";

const Navbar = () => {
    const user = useSelector((state) => state.handleUser);
    const state = useSelector(state => state.handleCart)

    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light py-3 sticky-top d-flex">
            <div className="d-flex justify-content-around flex-nowrap w-100">
                <div className='d-flex justify-content-center'>
                    <NavLink className="navbar-brand fw-bold fs-4 px-2 text-wrap" to="/"> SISTEMA DE CONTROLE DE PEDIDOS - SCP
                    </NavLink>
                </div>
                <button className="navbar-toggler mx-2" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>

                <div className="collapse navbar-collapse flex-grow-0" id="navbarSupportedContent">
                    <ul className="navbar-nav my-2 text-center gap-3">
                        <li className={navItem}>
                            <NavLink className="nav-link" to="/">Página inicial </NavLink>
                        </li>
                        <li className={navItem}>
                            <NavLink className="nav-link" to="/product">Produtos</NavLink>
                        </li>
                        <li className={navItem}>
                            <NavLink className="nav-link" to="/about">Sobre</NavLink>
                        </li>
                        <li className={navItem}>
                            <NavLink className="nav-link" to="/contact">Contato</NavLink>
                        </li>
                    </ul>
                    <div className="nav-buttons d-flex gap-3 flex-wrap">
                        {user.idCliente !== undefined ?
                            <NavLink to="/user" className="btn btn-outline-dark"><i className="fa-solid fa-user mr-1"></i> Usuário</NavLink>
                            :
                            <NavLink to="/login" className="btn btn-outline-dark"><i className="fa fa-sign-in-alt mr-1"></i> Login</NavLink>
                        }
                        <NavLink to="/register" className="btn btn-outline-dark"><i className="fa fa-user-plus mr-1"></i> Cadastro</NavLink>
                        <NavLink to="/cart" className="btn btn-outline-dark"><i className="fa fa-cart-shopping mr-1"></i> Carrinho ({state.length})</NavLink>
                        {user.idCliente !== undefined &&
                            <NavLink to="/OrdersPage" className="btn btn-outline-dark"><i className="fa fa-sign-in-alt mr-1"></i> Histórico</NavLink>
                        }
                    </div>

                </div>


            </div>
        </nav>
    )
}

export default Navbar