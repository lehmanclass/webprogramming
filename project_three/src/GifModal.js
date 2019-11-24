import React from 'react';
import Modal from 'react-modal';

const GifModal = (props) => {
    if (!props.selectedGif) {
        return <div></div>;
    }
    return (
        <Modal
        isOpen={ props.modalIsOpen }
        onRequestClose={ () => props.onRequestClose() }>
        <div className="gif-focus-display">
            <img src={ props.selectedGif.giphy} />
            <div>
                <button id="btn2" onClick={() => props.onRequestClose()}>close</button>
            </div>
        </div>
        </Modal>
    );
};

export default GifModal;