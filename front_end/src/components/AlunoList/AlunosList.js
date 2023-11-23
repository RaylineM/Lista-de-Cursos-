import React, { useState, useEffect } from 'react';
import { List, ListItem, ListItemText, Typography, Button, TextField } from '@mui/material';
import { getAlunosPorCurso, editarAluno, excluirAluno, criarAluno } from '../../servicos/AlunosServicos';
import DeleteModal from '../util/ModalExclusao';
import ModalAdicionar from '../util/ModalAdicionar';
import ModalNovoAluno from '../util/ModalNovoAluno';
import './AlunoList.css'; 

const AlunosList = ({ curso }) => {
  const [alunos, setAlunos] = useState([]);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [alunoToDelete, setAlunoToDelete] = useState(null);
  const [editingAluno, setEditingAluno] = useState(null);
  const [novoAluno, setNovoAluno] = useState({ nome: '', email: '' });
  const [modalAdicionarOpen, setModalAdicionarOpen] = useState(false);
  const [modalNovoAlunoOpen, setModalNovoAlunoOpen] = useState(false);

  useEffect(() => {
    const fetchAlunos = async () => {
      try {
        const alunosData = await getAlunosPorCurso(curso.id);
        setAlunos(alunosData);
      } catch (error) {
        console.error('Erro ao buscar alunos:', error.message);
        setAlunos([]);
      }
    };

    fetchAlunos();
  }, [curso]);

  const handleEditAluno = (aluno) => {
    setEditingAluno(aluno);
  };

  const handleSaveEdit = async () => {
    try {
      await editarAluno(editingAluno);
      const updatedAlunos = alunos.map((a) => (a.id === editingAluno.id ? editingAluno : a));
      setAlunos(updatedAlunos);
      setEditingAluno(null);
    } catch (error) {
      console.error('Erro ao salvar edições:', error.message);
    }
  };

  const handleDeleteAluno = (aluno) => {
    setAlunoToDelete(aluno);
    setShowDeleteModal(true);
  };

  const handleConfirmDelete = async () => {
    try {
      await excluirAluno(alunoToDelete.id);
      const updatedAlunos = alunos.filter((a) => a.id !== alunoToDelete.id);
      setAlunos(updatedAlunos);
      setAlunoToDelete(null);
    } catch (error) {
      console.error('Erro ao excluir aluno:', error.message);
    } finally {
      setShowDeleteModal(false);
    }
  };

  const handleCancelDelete = () => {
    setAlunoToDelete(null);
    setShowDeleteModal(false);
  };

  const handleInputChange = (e) => {
    setNovoAluno({ ...novoAluno, [e.target.name]: e.target.value });
  };

  const handleAdicionarAlunoClick = () => {
    setModalNovoAlunoOpen(true);
  };

  const handleAdicionarAluno = async () => {
    try {
    
      if (novoAluno.nome.trim() === '' || novoAluno.email.trim() === '') {
        setModalAdicionarOpen(true);
        return;
      }

      const alunoCriado = await criarAluno({ ...novoAluno, cur_id: curso.id });
      setAlunos([...alunos, alunoCriado]);
      setNovoAluno({ nome: '', email: '' });
      setModalNovoAlunoOpen(false); 
    } catch (error) {
      console.error('Erro ao criar aluno:', error.message);
    }
  };

  const handleCancelarAdicaoAluno = () => {
    setModalNovoAlunoOpen(false);
    setNovoAluno({ nome: '', email: '' }); 
  };

  return (
    <div>
      <div className="header">
        <Typography variant="h5" gutterBottom>
          Alunos do Curso: {curso.curso}
        </Typography>
      </div>
      <List className="alunos-list">
        {alunos.length === 0 ? (
          <Typography>Nenhum aluno cadastrado neste curso.</Typography>
        ) : (
          alunos.map((aluno) => (
            <ListItem key={aluno.id} className="aluno-item">
              <ListItemText primary={aluno.nome} />
              <TextField
                label="Novo Nome"
                variant="outlined"
                value={editingAluno?.id === aluno.id ? editingAluno.nome : ''}
                onChange={(e) => setEditingAluno({ ...aluno, nome: e.target.value })}
              />
              <Button onClick={() => handleEditAluno(aluno)} variant="contained" color="primary">
                Editar
              </Button>
              <Button onClick={handleSaveEdit} variant="contained" color="primary">
                Salvar Edição
              </Button>
              <Button onClick={() => handleDeleteAluno(aluno)} variant="contained" color="secondary">
                Excluir
              </Button>
            </ListItem>
          ))
        )}
      </List>
      <div>
        <Button onClick={handleAdicionarAlunoClick} variant="contained" color="primary">
          Adicionar Aluno
        </Button>
      </div>
      {modalNovoAlunoOpen && (
        <div>
          <TextField
            label="Nome"
            variant="outlined"
            name="nome"
            value={novoAluno.nome}
            onChange={handleInputChange}
          />
          <TextField
            label="E-mail"
            variant="outlined"
            name="email"
            value={novoAluno.email}
            onChange={handleInputChange}
          />
          <Button onClick={handleAdicionarAluno} variant="contained" color="primary">
            Adicionar Aluno
          </Button>
          <Button onClick={handleCancelarAdicaoAluno} className="button" variant="contained" color="default">
            Cancelar
          </Button>
        </div>
      )}
      <DeleteModal
        isOpen={showDeleteModal}
        onConfirm={handleConfirmDelete}
        onCancel={handleCancelDelete}
      />
      <ModalAdicionar
        isOpen={modalAdicionarOpen}
        onClose={() => setModalAdicionarOpen(false)}
      />
      <ModalNovoAluno
        isOpen={modalNovoAlunoOpen}
        onClose={() => setModalNovoAlunoOpen(false)}
      />
    </div>
  );
};

export default AlunosList;
