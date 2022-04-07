import React, { useState } from "react";
import styled from "styled-components";

import { HideRegister } from "../Functions/index";

// API BACKEND
import api from '../../Services/api';

export default function Register() {

  const [Agency, setAgency] = useState('');
  const [Account, setAccount] = useState('');
  const [Name, setName] = useState('');
  const [Identity, setIdentity] = useState('');
  const [Email, setEmail] = useState('');
  const [Phone, setPhone] = useState('');
  const [Password, setPassword] = useState('');



  async function handleRegister(e) {
    e.preventDefault();

    const data = {
      Agency,
      Account,
      Name,
      Identity,
      Email,
      Phone,
      Password
    };

    try {
    const response = await api.post('register', data);

    alert(response.data.texto);

    HideRegister();



    } catch (err) {
        alert('Erro no Cadastro, Tente Novamente');
    }
    }

  return (
    <Wrapper id="register" style={{ display: 'none' }}>
      <div className="whiteBg">
        <div className="container">
          <HeaderInfo>
            <h1 className="font40 extraBold">Preencha o formulário</h1>
            <p className="font13" style={{ fontSize: 17 }}>
            Certifique-se de inserir seus dados corretamente.
              <br />
              <strong>Vamos lá...</strong>
            </p>
          </HeaderInfo>


     

          <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12">
              <Form onSubmit={handleRegister}>

 
              <div className="row col-md-12" style={{ display: 'flex', flexDirection: 'row' }} >

<div className="col-md-4 col-xs-12 col-sm-12">
<label className="font13">Nome:</label>
<input required type="text" id="Name" name="Name" className="font20" value={Name} onChange={e => setName(e.target.value)} />
</div>

<div className="col-md-2 col-xs-12 col-sm-12">
<label className="font13">CPF:</label>
<input required type="text" id="Identity" name="Identity" className="font20" value={Identity} onChange={e => setIdentity(e.target.value)} />
</div>

<div className="col-md-4 col-xs-12 col-sm-12">
<label className="font13">E-mail:</label>
<input required type="text" id="Email" name="Email" className="font20" value={Email} onChange={e => setEmail(e.target.value)} />
</div>

<div className="col-md-2 col-xs-12 col-sm-12">
<label className="font13">Celular:</label>
<input required type="text" id="Phone" name="Phone" className="font20" value={Phone} onChange={e => setPhone(e.target.value)} />
</div>


</div>



<div className="row col-md-12" style={{ display: 'flex', flexDirection: 'row' }} >





<div className="col-md-2 col-xs-12 col-sm-12">
<label className="font13">Agência:</label>
<input required type="text" id="Agency" name="Agency" className="font20" value={Agency} onChange={e => setAgency(e.target.value)} />
</div>

<div className="col-md-3 col-xs-12 col-sm-12">
<label className="font13">Conta:</label>
<input required type="text" id="Account" name="Account" className="font20" value={Account} onChange={e => setAccount(e.target.value)} />
</div>

<div className="col-md-2 col-xs-12 col-sm-12">
<label className="font13">Senha para Logar:</label>
<input required type="password" id="Pass" name="Pass" className="font20" value={Password} onChange={e => setPassword(e.target.value)} />
</div>



</div>

<div className="col-xs-12 col-sm-12 col-md-12 col-lg-12">
              <SumbitWrapper className="flex" style={{ textAlign: 'center' }}>
                <ButtonInput type="submit" value="Salvar" className="pointer animate radius8" style={{ maxWidth: 220 }} />
              </SumbitWrapper>
              </div>
                

          
              </Form>
              </div>

              
           
            
        
       



        </div>
      </div>
    </Wrapper>
  );
}

const Wrapper = styled.section`
  width: 100%;
  padding: 50px 0;
`;
const HeaderInfo = styled.div`
  margin-bottom: 0;
  @media (max-width: 860px) {
    text-align: center;
  }
`;

//------------------------------------------------------------------------------------------------------//

const Form = styled.form`
  padding: 70px 0 30px 0;
  width: 100%;



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
  @media (max-width: 860px) {
    padding: 30px 0;
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




