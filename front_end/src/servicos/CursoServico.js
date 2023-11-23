// CursoServico.js
import axios from 'axios';

const apiURL = 'http://localhost:3000';

export const getCursos = async () => {
  try {
    const response = await axios.get(`${apiURL}/cursos`);
    return response.data;
  } catch (error) {
    console.error(`Erro ao buscar cursos: ${error.message}`);
    throw error;
  }
};

export const editarCurso = async (curso) => {
  try {
    const response = await axios.put(`${apiURL}/cursos/${curso.id}`, curso);
    return response.data;
  } catch (error) {
    console.error(`Erro ao editar curso: ${error.message}`);
    throw error;
  }
};

export const excluirCurso = async (cursoId) => {
  try {
    const response = await axios.delete(`${apiURL}/cursos/${cursoId}`);
    return response.data;
  } catch (error) {
    console.error(`Erro ao excluir curso: ${error.message}`);
    throw error;
  }
};

export const adicionarCurso = async (novoCurso) => {
  try {
    const response = await axios.post(`${apiURL}/cursos`, novoCurso);
    return response.data;
  } catch (error) {
    console.error(`Erro ao criar curso: ${error.message}`);
    throw error;
  }
};

