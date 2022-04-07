import React, { useState } from "react";
import styled from "styled-components";
import { Link } from "react-scroll";

import { ShowRegister } from '../Functions/index';

// API BACKEND
import api from '../../Services/api';

export default function Login() {

  const [Agency, setAgency] = useState('');
  const [Account, setAccount] = useState('');
  const [Password, setPassword] = useState('');

  async function handleLogin(e) {
    e.preventDefault();


    try {

      const data = {
        Agency,
        Account,
        Password
      };

        const res = await api.post('login',data);

        alert('Acesse seu Saldo!');
        localStorage.setItem('Id', res.data);

window.location.href = '/';

   

    } catch (err) {
        
        alert(err);

    }


}

  return (
    <Wrapper id="login">
      <div className="lightBg">
        <div className="container">
          <HeaderInfo>
            <h1 className="font40 extraBold">Entre com seu login</h1>
            <p className="font18">
               Não tem uma conta? Clique em <strong>"Criar Conta"</strong> e cadastre-se!
              <br />              
            </p>
          </HeaderInfo>
          <div className="row" style={{ paddingBottom: "30px" }}>
            <div className="col-xs-12 col-sm-12 col-md-6 col-lg-4">
              <Form onSubmit={handleLogin}>
                <label className="font13">Agência:</label>
                <input type="text" id="Agency" name="Agency" className="font20" value={Agency} onChange={e => setAgency(e.target.value)}/>
                <label className="font13">Conta:</label>
                <input type="text" id="Account" name="Account" className="font20" value={Account} onChange={e => setAccount(e.target.value)}/>
                <label className="font13">Senha:</label>
                <input type="password" id="Pass" name="Pass" className="font20" value={Password} onChange={e => setPassword(e.target.value)}/>
                
<a><Link onClick={ShowRegister} activeClass="active" to="register" spy={true} smooth={true} offset={-80}>Criar Conta</Link></a>

<div className="col-xs-12 col-sm-12 col-md-6 col-lg-4">
              <SumbitWrapper className="flex">
                <ButtonInput type="submit" value="Entrar" className="pointer animate radius8" style={{ maxWidth: "220px" }} />
              </SumbitWrapper>
              </div>
                
              </Form>

             
            </div>
            
          </div>
        </div>
      </div>
    </Wrapper>
  );
}

const Wrapper = styled.section`
  width: 100%;
`;
const HeaderInfo = styled.div`
  padding: 70px 0 30px 0;
  @media (max-width: 860px) {
    text-align: center;
  }
`;
const Form = styled.form`
  padding: 70px 0 30px 0;
  input,
  textarea {
    width: 100%;
    background-color: transparent;
    border: 0px;
    outline: none;
    box-shadow: none;
    border-bottom: 1px solid #707070;
    height: 30px;
    margin-bottom: 30px;
  }
  textarea {
    min-height: 100px;
  }

  a {
    padding-left: 138px;
    font-weight: bold;
    cursor: pointer
  }
  
  @media (max-width: 860px) {
    padding: 30px 0;

    a {
      padding-left: 182px;
      font-weight: bold;
      cursor: pointer
    }
  }
`;
const ButtonInput = styled.input`
  border: 1px solid #7620ff;
  background-color: #7620ff;
  width: 100%;
  padding: 15px;
  outline: none;
  color: #fff;
  :hover {
    background-color: #580cd2;
    border: 1px solid #7620ff;
    color: #fff;
  }
  @media (max-width: 991px) {
    margin: 0 auto;
  }
`;

const SumbitWrapper = styled.div`
  @media (max-width: 991px) {
    width: 100%;
    margin-bottom: 50px;
  }
`;









