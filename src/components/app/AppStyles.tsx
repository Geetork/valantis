import styles from 'styled-components';

export const AppContainer = styles.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100vh;
  align-items: center;
  gap: 5px;
`;

export const ScrollableContainer = styles.div`
  overflow-y: auto;
  width: 80%;
  height: 80vh;

  &::-webkit-scrollbar {
    width: 6px;
  }

  &::-webkit-scrollbar-thumb {
    background-color: #888;
  }

  &::-webkit-scrollbar-track {
    background-color: #eee;
  }
`;

export const RowContainer = styles.div`
  display: flex;
  align-items: center;
  gap: 20px;
`;

export const Button = styles.button`
  font-size: 12px;
  padding: 5px 15px;
  display: flex;
  align-items: center;
  gap: 5px;
  border-radius: 15px;
  border: none;
  background-color: rgba(235, 240, 255, 0.8);
`;