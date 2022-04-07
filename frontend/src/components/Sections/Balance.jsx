import React, { useState, useEffect } from "react";
import styled from "styled-components";
// Components
import { Link } from "react-scroll";
import { ShowExtrato } from '../Functions/index';

// API BACKEND
import api from '../../Services/api';

export default function Balance() {

  return (
    <Wrapper id="balance" style={{ display: 'none' }}>
      <div className="whiteBg">
        <div className="container">
          <HeaderInfo>
            <h1 className="font40 extraBold">Saldo</h1>
            <p>R$</p>
            
          </HeaderInfo>

          <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12">
              <SumbitWrapper className="flex">
                <Link onClick={ShowExtrato} activeClass="active"  to="extract" spy={true} smooth={true} offset={-80}><ButtonInput type="submit" value="Extrato" className="pointer animate radius8" /></Link>
              </SumbitWrapper>
              </div>

        </div>
      </div>
    </Wrapper>
  );
}

const Wrapper = styled.section`
  width: 100%;
  padding: 100px 0;
`;
const HeaderInfo = styled.div`
  margin-bottom: 0;


  @media (max-width: 860px) {
    text-align: center;
  }
`;

//------------------------------------------------------------------------------------------------------//


const ButtonInput = styled.input`
  border: 1px solid #7620ff;
  background-color: #7620ff;
  width: 100%;
  padding: 15px;
  outline: none;
  color: #fff;
  max-width: 80px;
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