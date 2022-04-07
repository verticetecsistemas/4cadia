import React, { useState, useEffect } from "react";
import styled from "styled-components";

// API BACKEND
import api from '../../Services/api';

export default function Extract() {

  const [Extract, setExtract] = useState([]);

  const idCostumer = localStorage.getItem('Id');
  
  useEffect(() => {
    api.get('balance', {
        headers: { Authorization: idCostumer,
        }
    }).then(response =>  {
      setExtract(response.data);
    })
  }, [idCostumer]);


  function LogOut() {

    window.location.replace('/');
    
    localStorage.removeItem("Id");
    
    }


  return (
    <Wrapper id="extract" style={{ display: 'none' }}>
      <div className="lightBg">
        <div className="container">
          <HeaderInfo>
            <h1 className="font40 extraBold">Extrato</h1>
            
          </HeaderInfo>


     

          <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12">
              <Form>

 
              <div className="row col-md-12" >
                <table>
                    <th>Data</th>
                    <th>Histórico</th>
                    <th>Valor</th>

                    {Extract.map(ext => (

                    <tr key={ext.Id_Movement}>
                        <td className="col-md-12">{ext.Date.substring(0, 10).split('-').reverse().join('/')}</td>
                        <td className="col-md-18">{ext.Historic}</td>
                        <td className="col-md-12" align="right">{Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(ext.Money)}</td>
                        
                    </tr>

                     ))}
                    
                </table>

                

</div>



                

          
              </Form>


              <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12">
              <SumbitWrapper className="flex">
                <ButtonInput onClick={LogOut} type="button" value="Deslogar" className="pointer animate radius8" />
              </SumbitWrapper>
              </div>
              </div>
        </div>
      </div>
    </Wrapper>
  );
}

const Wrapper = styled.section`
  width: 100%;
  padding: 0 0;
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
  max-width: 80px;
  margin-bottom: 10px;
  :hover {
    background-color: #580cd2;
    border: 1px solid #7620ff;
    color: #fff;
  }
  @media (max-width: 991px) {
    width: 100%;

      margin-left: 175px;

  }
`;

const SumbitWrapper = styled.div`
  @media (max-width: 991px) {
    width: 100%;
    margin-bottom: 50px;
  }
`;
