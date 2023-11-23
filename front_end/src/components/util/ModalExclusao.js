import React from 'react';
import Modal from '@mui/material/Modal';
import { Button, Typography } from '@mui/material';
import './DeleteModal.css'; 

const DeleteModal = ({ isOpen, onConfirm, onCancel }) => {
  return (
    <Modal open={isOpen} onClose={onCancel}>
      <div className="modal-container">
        <Typography variant="h6" className="modal-text">
          Deseja realmente excluir o aluno?
        </Typography>
        <Button onClick={onConfirm} variant="contained" color="primary" className="modal-button">
          Sim
        </Button>
        <Button onClick={onCancel} variant="contained" color="secondary" className="modal-button">
          Cancelar
        </Button>
      </div>
    </Modal>
  );
};

export default DeleteModal;

