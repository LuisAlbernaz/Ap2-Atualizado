import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import Menu from './menu';
import CreateTarefa from './criarTarefas';
import Cadastrar from './cadastrarTarefas';
import TabelaTarefas from './tabelaTarefas';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
      <CreateTarefa />
      <Menu/>
      <TabelaTarefas />
      <Cadastrar/>
  </React.StrictMode>
);


