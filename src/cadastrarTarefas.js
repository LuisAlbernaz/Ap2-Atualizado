import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Modal, Button } from 'react-bootstrap';
import axios from 'axios';


export default function Cadastrar(){
    const [showModal, setShowModal] = useState(false);
    const [novaTarefa, setNovaTarefa] = useState({ nome: '' });

    const handleCadastrarTarefa = async () => {
        try {
          const response = await axios.post('http://localhost:3030/api/tarefas', {
            nome: novaTarefa.nome,
            concluida: 0, 
          });
          console.log(response.data); 
          handleCloseModal();
        } catch (error) {
          console.error('Erro ao cadastrar tarefa:', error);
        }
      };

    const handleCloseModal = () => {
        setShowModal(false);
        setNovaTarefa({ nome: '' });
      };

    return <>
            <div className="container p-5">
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
                    onChange={(e) => setNovaTarefa({ ...novaTarefa, nome: e.target.value })}
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
    </>
}