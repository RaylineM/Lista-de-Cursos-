import React from 'react';
import Modal from '@mui/material/Modal';
import { Button, Typography } from '@mui/material';
import './ModalExclusaoCurso.css';

const ModalExclusaoCurso = ({ isOpen, onConfirm, onCancel }) => {
  return (
    <Modal open={isOpen} onClose={onCancel}>
      <div className="modal-container">
        <Typography variant="h6">Deseja realmente excluir este curso?</Typography>
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

export default ModalExclusaoCurso;
