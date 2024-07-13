import React from 'react';
import InputMask from 'react-input-mask';

const UserForm = ({ form, setForm }) => {
    const handleChange = (e) => {
        const { name, value } = e.target;

        setForm(prevState => ({
            ...prevState,
            [name]: value
        }));

    }
    
    return (
        <>
            <div className="form-group my-3">
                <label htmlFor="Nome">Nome Completo</label>
                <input
                    type="text"
                    className="form-control"
                    id="Nome"
                    name="nome"
                    placeholder="Digite seu nome completo"
                    value={form.nome}
                    onChange={handleChange}
                />
            </div>
            <div className="form-group my-3">
                <label htmlFor="Email">Endereço de E-mail</label>
                <input
                    type="email"
                    className="form-control"
                    id="Email"
                    name="email"
                    placeholder="nome@exemplo.com"
                    onChange={handleChange}
                    value={form.email}
                />
            </div>
            <div className="form-group my-3">
                <label htmlFor="Password">Senha</label>
                <input
                    type="password"
                    className="form-control"
                    id="Password"
                    name="senha"
                    placeholder="Senha"
                    onChange={handleChange}
                    value={form.senha}
                />
            </div>
            <div className="form-group my-3">
                <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
                    <label>
                        <input
                            type="radio"
                            name="tipoDocumento"
                            value="CPF"
                            onChange={handleChange}
                            checked={form.tipoDocumento === 'CPF'}
                        /> CPF
                    </label>
                    <label>
                        <input
                            type="radio"
                            name="tipoDocumento"
                            value="CNPJ"
                            onChange={handleChange}
                            checked={form.tipoDocumento === 'CNPJ'}
                        /> CNPJ
                    </label>
                </div>
            </div>
            {form.tipoDocumento === 'CPF' && (
                <>
                    <div className="form-group my-3">
                        <label htmlFor="cpf">CPF</label>
                        <InputMask
                            mask="999.999.999-99"
                            className="form-control"
                            id="cpf"
                            name="cpf"
                            placeholder="Digite seu CPF"
                            onChange={handleChange}
                            value={form.cpf}
                        />
                    </div>
                    <div className="form-group my-3">
                        <label htmlFor="DataNascimento">Data de Nascimento</label>
                        <input
                            type="date"
                            className="form-control"
                            id="DataNascimento"
                            name="dataNascimento"
                            onChange={handleChange}
                            value={form.dataDeNascimento}
                        />
                    </div>
                    <div className="form-group my-3">
                        <label htmlFor="RG">RG</label>
                        <InputMask
                            mask="99.999.999-9"
                            className="form-control"
                            id="RG"
                            name="rg"
                            placeholder="Digite seu RG"
                            onChange={handleChange}
                            value={form.rg}
                        />
                    </div>
                </>
            )}
            {form.tipoDocumento === 'CNPJ' && (
                <>
                    <div className="form-group my-3">
                        <label htmlFor="cnpj">CNPJ</label>
                        <InputMask
                            mask="99.999.999/9999-99"
                            className="form-control"
                            id="cnpj"
                            name="cnpj"
                            placeholder="Digite seu CNPJ"
                            onChange={handleChange}
                            value={form.cnpj}
                        />
                    </div>
                    <div className="form-group my-3">
                        <label htmlFor="RazaoSocial">Razão Social</label>
                        <input
                            type="text"
                            className="form-control"
                            id="RazaoSocial"
                            name="razaoSocial"
                            placeholder="Digite a razão social"
                            onChange={handleChange}
                            value={form.razaoSocial}
                        />
                    </div>
                    <div className="form-group my-3">
                        <label htmlFor="InscricaoEstadual">Inscrição Estadual</label>
                        <input
                            type="text"
                            className="form-control"
                            id="InscricaoEstadual"
                            name="inscricaoEstadual"
                            placeholder="Digite a inscrição estadual"
                            onChange={handleChange}
                            value={form.inscricaoEstadual}
                        />
                    </div>
                </>
            )}
        </>
    );
}

export default UserForm;