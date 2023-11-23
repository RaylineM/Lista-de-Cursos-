import React from 'react';
import Modal from '@mui/material/Modal';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import './ModalNovoAluno.css';



const ModalNovoAluno = ({ isOpen, onClose }) => {
  return (
    <Modal open={isOpen} onClose={onClose}>
      <div className="modal-container">
        <Typography variant="h6" className="modal-text">
          Por favor, preencha todos os campos antes de adicionar um aluno.
        </Typography>
        <Button onClick={onClose} variant="contained" color="primary">
          OK
        </Button> 
      </div>
    </Modal>
  );
};


export default ModalNovoAluno;
