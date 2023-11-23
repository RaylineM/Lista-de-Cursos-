const database = require('../models');

class AlunoController {
  static async getAlunos(req, res) {
    try {
      const alunos = await database.aluno.findAll();
      return res.status(200).json(alunos);
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  }

  static async getAlunoPorId(req, res) {
    const { id } = req.params;
    try {
      const aluno = await database.aluno.findOne({ where: { id: Number(id) } });
      return res.status(200).json(aluno);
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  }

  static async postAluno(req, res) {
    const novoAluno = req.body;
    try {
      const novoAlunoEnviado = await database.aluno.create(novoAluno);
      return res.status(200).json(novoAlunoEnviado);
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  }

  static async putAluno(req, res) {
    const novosDados = req.body;
    const { id } = req.params;
    try {
      await database.aluno.update(novosDados, { where: { id: Number(id) } });
      const aluno = await database.aluno.findOne({ where: { id: Number(id) } });
      return res.status(200).json(aluno);
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  }

  static async deleteAluno(req, res) {
    const { id } = req.params;
    try {
      await database.aluno.destroy({ where: { id: Number(id) } });
      return res.status(200).json({ message: `${id} deletado com sucesso` });
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  }
}

module.exports = AlunoController;
