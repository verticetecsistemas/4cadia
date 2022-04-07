# Square-Bank Project

Desenvolvido por : Carlos Leandro da Silva Alves - verticetecsistemas@gmail.com

# square_bank
Aplicativo teste para avalição da 4cadia Foundation.\
Para desevonvolvimento da aplicação foram utilizadas seguintes ferramentas : Node.JS versão 12.16.1 , Visual Studio Code versão 1.66 , Mysql-Front versão 6.1 build 1.26, Mysql 5.6.

Os scripts deste repositório foram definidos da seguinte forma:
# front_end
## src/components/Buttons 
Métodos para definição do botão de navegação: FullButton.jsx
## src/components/Elements 
Métodos que compoem o template original, optado por não retirar para possíveis reaproveitamentos futuros de código.
## src/components/Functions 
Métodos criados para exibição e ocultação das divs Extrato e Saldo.
## src/components/Nav 
Métodos dos menus de navegação Superior e Lateral(disponível em modo responsivo).
## src/components/Sections.
Métodos front-end do projeto sendo utilizados:Extrato.jsx,Header.jsx,Footer.jsx,Login.jsx,Register.jsx,Saldo.jsx
## src/screens 
Método de chamada dos menus.

# back_end
## src/database 
Métodos para conexão ao banco de dados mysql: connection

## src/controllers 
Métodos para conexão ao banco de dados mysql: connection

## src/balance  
API para exibição do extrato.

## src/login  
API para login do sistema.

## src/register  
API para cadastro no sistema.

Obs.:Não houve tempo hábil para terminar a função de saldo.

## Instalação e execução

No diretório do projeto execute :

### `npm install`
### `npm start`

Para visualizar a aplicação.\
[http://localhost:3000](http://localhost:3000) 

