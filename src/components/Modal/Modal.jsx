import { useEffect } from 'react';
import PropTypes from 'prop-types';

export default function Modal({ largeImageURL, id, onModalWindowClose }) {
  useEffect(() => {
    window.addEventListener('keydown', closeModalWindow);

    return () => {
      window.removeEventListener('keydown', closeModalWindow);
    };
  });

  function closeModalWindow(event) {
    if (event.code === 'Escape') {
      onModalWindowClose();
    }
  }

  function closeModalOnBackDrop(event) {
    onModalWindowClose();
  }

  return (
    <div className="Overlay" onClick={closeModalOnBackDrop}>
      <div className="Modal">
        <img src={largeImageURL} alt={id} />
      </div>
    </div>
  );
}

Modal.propTypes = {
    id: PropTypes.number.isRequired,
    largeImageURL: PropTypes.string.isRequired,
    onModalWindowClose:PropTypes.func.isRequired,
  };
  