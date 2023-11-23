import axios from 'axios';

const apiURL = 'http://localhost:3000';

export const getAlunosPorCurso = async (cursoId) => {
  try {
    const response = await axios.get(`${apiURL}/alunos?cursoId=${cursoId}`);
    return response.data;
  } catch (error) {
    console.error(`Erro ao buscar alunos do curso: ${error.message}`);
    throw error;
  }
};

export const editarAluno = async (aluno) => {
  try {
    const response = await axios.put(`${apiURL}/alunos/${aluno.id}`, aluno);
    return response.data;
  } catch (error) {
    console.error(`Erro ao editar aluno: ${error.message}`);
    throw error;
  }
};

export const excluirAluno = async (alunoId) => {
  try {
    const response = await axios.delete(`${apiURL}/alunos/${alunoId}`);
    return response.data;
  } catch (error) {
    console.error(`Erro ao excluir aluno: ${error.message}`);
    throw error;
  }
};

export const criarAluno = async (novoAluno) => {
  try {
    const response = await axios.post(`${apiURL}/alunos`, novoAluno);
    return response.data;
  } catch (error) {
    console.error(`Erro ao criar aluno: ${error.message}`);
    throw error;
  }
};
