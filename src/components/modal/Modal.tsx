import React from "react";
import ReactDOM from "react-dom";
import styles from 'styled-components';
import CloseIcon from '@mui/icons-material/Close';


const BackgroundContainer = styles.div`
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.3);
    display: flex;
    align-items: center;
    justify-content: center;
`;

const ModalContainer = styles.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: space-between;
    height: fit-content;
    width: 60%;
    background-color: white;
    border-radius: 10px;
    border: none;
    padding: 10px 20px 20px 20px;
`;

const RowContainer = styles.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 10px;
`;

const modalRoot = document.getElementById('modal') as Element;

/**
 * Modal Component
 * 
 * A component for rendering a modal
 * 
 * @component
 * @param {React.ReactNode} children - The content to be displayed inside the modal.
 * @param {() => void} onClose - Callback function to be called when the modal is closed.
 * @returns {React.ReactPortal} - Returns a React portal to render the modal outside its parent hierarchy.
 * 
 */
export const Modal: React.FC<{ 
    children: React.ReactNode, 
    onClose: () => void }> = ({ children, onClose }) => { 
    return ReactDOM.createPortal((
            <BackgroundContainer onClick={onClose}>
                <ModalContainer onClick={e => e.stopPropagation()}>
                    <RowContainer>
                        <h3>Фильтрация</h3>
                        <CloseIcon onClick={onClose} color='primary'
                            sx={[{ '&:hover': { cursor: 'pointer' } }]}/>
                    </RowContainer>
                    { children }
                </ModalContainer>
            </BackgroundContainer>
    ), modalRoot);
};