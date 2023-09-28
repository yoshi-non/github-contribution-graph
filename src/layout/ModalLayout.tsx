import { css } from '@emotion/react';
import { motion } from 'framer-motion';
import { fadeIn } from '@/lib/framerMotion/variants';
import { ReactNode } from 'react';
import Modal from 'react-modal';

const styles = {
  modal: css`
    position: absolute;
    top: 40%;
    left: 50%;
    right: auto;
    bottom: auto;
    transform: translate(-50%, -50%);
    width: 50%;
    max-width: 500px;
  `,
  modalContent: css`
    position: relative;
    display: flex;
    flex-direction: column;
    gap: 2rem;
    background-color: #fff;
    border-radius: 10px;
    padding: 2rem;
    border: 1px solid #ddd;
    text-align: center;
  `,
};

interface Props {
  children: ReactNode;
  isOpen: boolean;
  onRequestClose: () => void;
}

const ModalLayout: React.FC<Props> = ({
  children,
  isOpen,
  onRequestClose,
}) => {
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      appElement={
        typeof window !== 'undefined'
          ? (document.getElementById(
              '__next'
            ) as HTMLElement)
          : undefined
      }
      css={styles.modal}
    >
      <motion.div
        css={styles.modalContent}
        initial="hidden"
        animate="visible"
        variants={fadeIn}
      >
        {children}
      </motion.div>
    </Modal>
  );
};

export default ModalLayout;
