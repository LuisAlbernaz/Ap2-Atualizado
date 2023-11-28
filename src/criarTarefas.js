import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Modal, Button } from 'react-bootstrap';
import axios from 'axios';

export default function CadastrarTarefa() {
  const [showModal, setShowModal] = useState(false);
  const [novaTarefa, setNovaTarefa] = useState({ nome: '' });
  const [dadosTarefa, setDadosTarefa] = useState([]);
  const [tarefasConcluidas, setTarefasConcluidas] = useState([]);
  const [tarefasPendentes, setTarefasPendentes] = useState([]);

  useEffect(() => {
    // Carregar os dados de tarefas ao carregar o componente
    carregarTarefas();
  }, []);

  useEffect(() => {
    // Filtrar tarefas concluídas e pendentes sempre que os dadosTarefa mudarem
    const concluidas = dadosTarefa.filter((tarefa) => tarefa.concluida === 1);
    const pendentes = dadosTarefa.filter((tarefa) => tarefa.concluida === 0);

    setTarefasConcluidas(concluidas);
    setTarefasPendentes(pendentes);
  }, [dadosTarefa]);

  const carregarTarefas = async () => {
    try {
      const response = await axios.get('http://localhost:3030/api/tarefas');
      setDadosTarefa(response.data);
    } catch (error) {
      console.error('Erro ao carregar tarefas:', error);
    }
  };

  const handleCadastrarTarefa = async () => {
    try {
      const response = await axios.post('http://localhost:3030/api/tarefas', {
        nome: novaTarefa.nome,
        concluida: 0, // Definindo como não concluída ao cadastrar
      });
      console.log(response.data); // Mensagem de sucesso e ID
      carregarTarefas(); // Recarrega a lista de tarefas após o cadastro
      handleCloseModal();
    } catch (error) {
      console.error('Erro ao cadastrar tarefa:', error);
    }
  };

  const handleExcluirTarefa = async (id) => {
    try {
      const response = await axios.delete(`http://localhost:3030/api/tarefas/${id}`);
      console.log(response.data); // Mensagem de sucesso
      carregarTarefas(); // Recarrega a lista de tarefas após a exclusão
    } catch (error) {
      console.error('Erro ao excluir tarefa:', error);
    }
  };

  const handleMarcarConcluida = async (id, concluida) => {
    try {
      const response = await axios.patch(`http://localhost:3030/api/tarefas/${id}`, {
        concluida: concluida ? 0 : 1, // Inverte o valor de concluída
      });
      console.log(response.data); // Mensagem de sucesso
      carregarTarefas(); // Recarrega a lista de tarefas após a atualização
    } catch (error) {
      console.error('Erro ao marcar como concluída:', error);
    }
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setNovaTarefa({ nome: '' });
  };

  return (
    <div className="container p-5">
      <table className="table">
        <thead>
          <tr>
            <th scope="col">ID</th>
            <th scope="col">Nome</th>
            <th scope="col">Concluída</th>
            <th scope="col">Ações</th>
          </tr>
        </thead>
        <tbody>
          {dadosTarefa.map((tarefa) => (
            <tr key={tarefa.id}>
              <td>{tarefa.id}</td>
              <td>{tarefa.nome}</td>
              <td>
                <input
                  type="checkbox"
                  checked={tarefa.concluida === 1}
                  onChange={() => handleMarcarConcluida(tarefa.id, tarefa.concluida === 1)}
                />
              </td>
              <td>
                <button
                  className="btn btn-danger"
                  style={{ marginRight: '5px' }}
                  onClick={() => handleExcluirTarefa(tarefa.id)}
                >
                  Excluir
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div>
        <table className="table">
          <tbody>
            <tr>
              <td>
                <button className="btn btn-primary" onClick={() => setShowModal(true)}>
                  Cadastrar Tarefa
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

        {/* Lista de Tarefas Concluídas */}
        <div className="mt-4">
        <h3>Tarefas Concluídas</h3>
        <ul className="list-group">
            {tarefasConcluidas.map((tarefa) => (
            <li key={tarefa.id} className="list-group-item">
                {tarefa.nome}
            </li>
            ))}
        </ul>
        </div>

        {/* Lista de Tarefas Pendentes */}
        <div className="mt-4">
        <h3>Tarefas Pendentes</h3>
        <ul className="list-group">
            {tarefasPendentes.map((tarefa) => (
            <li key={tarefa.id} className="list-group-item">
                {tarefa.nome}
            </li>
            ))}
        </ul>
        </div>

      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Cadastrar Tarefa</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <label>Nome da Tarefa:</label>
          <input
            type="text"
            className="form-control"
            value={novaTarefa.nome}
            onChange={(e) => setNovaTarefa({ nome: e.target.value })}
          />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Fechar
          </Button>
          <Button variant="primary" onClick={handleCadastrarTarefa}>
            Salvar
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

       








