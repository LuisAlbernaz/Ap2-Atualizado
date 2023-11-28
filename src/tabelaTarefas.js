import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import { Modal, Button } from 'react-bootstrap';

export default function TabelaTarefas() {
  const [dadosTarefa, setDadosTarefa] = useState([]);

  useEffect(() => {
    carregarTarefas();
  }, []);

  const carregarTarefas = async () => {
    try {
      const response = await axios.get('http://localhost:3030/api/tarefas');
      console.log('Dados Tarefa:', response.data);
      setDadosTarefa(response.data);
    } catch (error) {
      console.error('Erro ao carregar tarefas:', error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:3030/api/tarefas/${id}`);
      carregarTarefas();
    } catch (error) {
      console.error('Erro ao excluir tarefa:', error);
    }
  };

  const handleToggleComplete = async (id, concluida) => {
    try {
      const novoStatus = concluida === 1 ? 0 : 1;
      await axios.patch(`http://localhost:3030/api/tarefas/${id}`, {
        concluida: novoStatus,
      });
      carregarTarefas();
    } catch (error) {
      console.error('Erro ao alternar o status da tarefa:', error);
    }
  };

  return (
    <div className="container p-5">
      <table className="table">
        <thead>
          <tr>
            <th scope="col">ID</th>
            <th scope="col">Nome</th>
            <th scope="col">Status</th>
            <th scope="col">Ação</th>
          </tr>
        </thead>
        <tbody>
          {dadosTarefa.map((tarefa) => (
            <tr key={tarefa.id}>
              <td>{tarefa.id}</td>
              <td>{tarefa.nome}</td>
              <td>{tarefa.concluida === 1 ? 'Concluída' : 'Não Concluída'}</td>
<td>
                <Button
                  variant="info"
                  onClick={() => handleToggleComplete(tarefa.id, tarefa.concluida)}
                  style={{ marginRight: '5px' }}
                >
                  Alternar Status
                </Button>
                <button type="button" className="btn btn-danger" onClick={() => handleDelete(tarefa.id)}>
                  Excluir
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}



