const { Router } = require('express');
const alunosController = require('../controllers/alunoController'); // Certifique-se de ter um controller para alunos

const router = Router();

router.get('/alunos', alunosController.getAlunos);
router.get('/alunos/:id', alunosController.getAlunoPorId);
router.post('/alunos', alunosController.postAluno);
router.put('/alunos/:id', alunosController.putAluno);
router.delete('/alunos/:id', alunosController.deleteAluno);

module.exports = router;
