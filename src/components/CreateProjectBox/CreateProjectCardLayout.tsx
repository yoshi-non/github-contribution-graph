import { css } from '@emotion/react';
import { ReactNode } from 'react';

const styles = {
  container: css`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 5px;
    height: 100px;
    width: 140px;
    background-color: #39d353;
    color: #fff;
    font-size: 1.1rem;
    font-weight: bold;
    border-radius: 4px;
    padding: 16px;
    cursor: pointer;
    transition: all 0.2s ease-in-out;
    &:hover {
      transform: scale(1.05);
    }
  `,
};

interface Props {
  children: ReactNode; // ReactNodeは任意のReact要素を表します
  onClick: () => void;
}

const CreateProjectCardLayout: React.FC<Props> = ({
  children,
  onClick,
}) => {
  return (
    <button css={styles.container} onClick={onClick}>
      {children}
    </button>
  );
};

export default CreateProjectCardLayout;
