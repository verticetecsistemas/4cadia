import React from "react";
import styled from "styled-components";
import { Link } from "react-scroll";
import { ShowRegister, HideRegister, ShowSaldo } from '../Functions/index';

// Assets
import CloseIcon from "../../assets/svg/CloseIcon";
import LogoIcon from "../../assets/svg/Logo";

export default function Sidebar({ sidebarOpen, toggleSidebar }) {

function ActiveRegister() {

ShowRegister();
toggleSidebar(!sidebarOpen);

}

function DisabledRegister() {

  HideRegister();
  toggleSidebar(!sidebarOpen);
  
  }

function ActiveBalance() {

ShowSaldo();
toggleSidebar(!sidebarOpen);

}




  return (
    <Wrapper className="animate darkBg" sidebarOpen={sidebarOpen}>
      <SidebarHeader className="flexSpaceCenter">
        <div className="flexNullCenter">
          <LogoIcon />
          <h1 className="whiteColor font20" style={{ marginLeft: "15px" }}>
            Square Bank
          </h1>
        </div>
        <CloseBtn onClick={() => toggleSidebar(!sidebarOpen)} className="animate pointer">
          <CloseIcon />
        </CloseBtn>
      </SidebarHeader>

      <UlStyle className="flexNullCenter flexColumn">

        <li className="semiBold font15 pointer">
          <Link
            onClick={DisabledRegister}
            activeClass="active"
            className="whiteColor"
            style={{ padding: "10px 15px" }}
            to="home"
            spy={true}
            smooth={true}
            offset={-60}
          >
            Início
          </Link>
        </li>

        <li className="semiBold font15 pointer">
          <Link
            onClick={DisabledRegister}
            activeClass="active"
            className="whiteColor"
            style={{ padding: "10px 15px" }}
            to="login"
            spy={true}
            smooth={true}
            offset={-60}
          >
            Login
          </Link>
        </li>

        <li className="semiBold font15 pointer">
          <Link
            onClick={ActiveRegister}
            activeClass="active"
            className="whiteColor"
            style={{ padding: "10px 15px" }}
            to="register"
            spy={true}
            smooth={true}
            offset={-60}
          >
            Cadastrar-se
          </Link>
        </li>

        <li className="semiBold font15 pointer">
          <Link
            onClick={ActiveBalance}
            activeClass="active"
            className="whiteColor"
            style={{ padding: "10px 15px" }}
            to="balance"
            spy={true}
            smooth={true}
            offset={-60}
          >
            Saldo/Extrato
          </Link>
        </li>


      </UlStyle>
      
    </Wrapper>
  );
}

const Wrapper = styled.nav`
  width: 400px;
  height: 100vh;
  position: fixed;
  top: 0;
  padding: 0 30px;
  right: ${(props) => (props.sidebarOpen ? "0px" : "-400px")};
  z-index: 9999;
  @media (max-width: 400px) {
    width: 100%;
  }
`;
const SidebarHeader = styled.div`
  padding: 20px 0;
`;
const CloseBtn = styled.button`
  border: 0px;
  outline: none;
  background-color: transparent;
  padding: 10px;
`;
const UlStyle = styled.ul`
  padding: 40px;
  li {
    margin: 20px 0;
  }
`;
