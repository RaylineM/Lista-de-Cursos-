import React, { useState, useEffect } from 'react';
import { getCursos, editarCurso, excluirCurso, adicionarCurso } from '../../servicos/CursoServico';
import AlunosList from '../AlunoList/AlunosList';
import ModalExclusaoCurso from '../util/ModalExclusaoCurso';
import './CursosList.css';

const CursosList = () => {
  const [cursos, setCursos] = useState([]);
  const [selectedCurso, setSelectedCurso] = useState(null);
  const [editingCurso, setEditingCurso] = useState(null);
  const [novoCurso, setNovoCurso] = useState({ curso: '' });
  const [showExclusaoModal, setShowExclusaoModal] = useState(false);
  const [cursoParaExcluir, setCursoParaExcluir] = useState(null);

  useEffect(() => {
    const fetchCursos = async () => {
      try {
        const cursosData = await getCursos();
        setCursos(cursosData);
      } catch (error) {
        console.error('Erro ao buscar cursos:', error.message);
        setCursos([]);
      }
    };

    fetchCursos();
  }, []);

  const handleCursoClick = (curso) => {
    setSelectedCurso(curso);
  };

  const handleVisualizarAlunosClick = () => {
    setSelectedCurso(null);
  };

  const handleEditarCurso = (curso) => {
    setEditingCurso(curso);
  };

  const handleSaveEdit = async () => {
    try {
      await editarCurso(editingCurso);
      const updatedCursos = cursos.map((c) => (c.id === editingCurso.id ? editingCurso : c));
      setCursos(updatedCursos);
      setEditingCurso(null);
    } catch (error) {
      console.error('Erro ao salvar edições:', error.message);
    }
  };

  const handleExcluirCurso = (curso) => {
    setCursoParaExcluir(curso);
    setShowExclusaoModal(true);
  };

  const handleConfirmExcluirCurso = async () => {
    try {
      await excluirCurso(cursoParaExcluir.id);
      const updatedCursos = cursos.filter((c) => c.id !== cursoParaExcluir.id);
      setCursos(updatedCursos);
      setCursoParaExcluir(null);
    } catch (error) {
      console.error('Erro ao excluir curso:', error.message);
    } finally {
      setShowExclusaoModal(false);
    }
  };

  const handleCancelarExcluirCurso = () => {
    setCursoParaExcluir(null);
    setShowExclusaoModal(false);
  };

  const handleAdicionarCurso = async () => {
    try {
      const cursoCriado = await adicionarCurso(novoCurso);
      setCursos([...cursos, cursoCriado]);
      setNovoCurso({ curso: '' });
    } catch (error) {
      console.error('Erro ao criar curso:', error.message);
    }
  };

  return (
    <div className="cursos-list-container">
      <header>
        <h1>Lista de Cursos</h1>
      </header>

      <ul className="cursos-list">
        {cursos.map((curso) => (
          <li key={curso.id} className="curso-item">
            {curso.curso}
            <div className="button-group">
              <button onClick={() => handleCursoClick(curso)}>Visualizar Alunos</button>
              <button onClick={() => handleEditarCurso(curso)}>Editar</button>
              <button onClick={() => handleExcluirCurso(curso)}>Excluir</button>
            </div>
          </li>
        ))}
      </ul>

      {editingCurso && (
        <div className="novo-curso-container">
          <input
            type="text"
            value={editingCurso.curso}
            onChange={(e) => setEditingCurso({ ...editingCurso, curso: e.target.value })}
          />
          <button onClick={handleSaveEdit}>Salvar Edição</button>
        </div>
      )}

      <div className="novo-curso-container">
        <h2>Adicionar Novo Curso</h2>
        <input
          type="text"
          value={novoCurso.curso}
          onChange={(e) => setNovoCurso({ ...novoCurso, curso: e.target.value })}
        />
        <button onClick={handleAdicionarCurso}>Adicionar Curso</button>
      </div>

      {selectedCurso && <AlunosList curso={selectedCurso} />}

      {selectedCurso && (
        <button onClick={handleVisualizarAlunosClick}>Voltar para a Lista de Cursos</button>
      )}

      <ModalExclusaoCurso
        isOpen={showExclusaoModal}
        onConfirm={handleConfirmExcluirCurso}
        onCancel={handleCancelarExcluirCurso}
      />
    </div>
  );
};

export default CursosList;
