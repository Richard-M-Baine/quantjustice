import React from 'react';
import { Modal } from '../../../context/modal.js';
import ExtendedResults from './ExtendedResults.js'; // <-- Capitalized

import './extendedResults.css';

function ExtendedResultsModal({ onClose, misconduct }) {
  return (
    <Modal onClose={onClose}>
      <ExtendedResults misconduct={misconduct} />
    </Modal>
  );
}

export default ExtendedResultsModal;
