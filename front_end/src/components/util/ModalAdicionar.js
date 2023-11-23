import React from 'react';
import Modal from '@mui/material/Modal';
import { Button, Typography } from '@mui/material';
import './ModalAdicionar.css';

const ModalAdicionar = ({ isOpen, onClose }) => {
  return (
    <Modal open={isOpen} onClose={onClose}>
      <div className="modal-container">
        <Typography variant="h6">Por favor, preencha todos os campos antes de adicionar um aluno.</Typography>
        <Button onClick={onClose} variant="contained" color="primary" className="button-margin">
          OK
        </Button>
      </div>
    </Modal>
  );
};

export default ModalAdicionar;

