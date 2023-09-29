import { css } from '@emotion/react';
import CloseIcon from '@mui/icons-material/Close';

const styles = {
  title: css`
    font-size: 1rem;
    font-weight: bold;
    margin-bottom: 0.5rem;
    text-align: center;
  `,
  inputBox: css`
    display: flex;
    align-items: center;
    gap: 1rem;
  `,
  input: css`
    width: 100%;
    padding: 0.5rem 1rem;
    outline: 1px solid #ddd;
    border-radius: 10px;
    &::-webkit-search-cancel-button {
      cursor: pointer;
      padding: 0.2rem;
    }
  `,
  addButton: css`
    font-weight: bold;
    background-color: #26a641;
    color: #fff;
    border-radius: 10px;
    padding: 0.5rem 1rem;
    transition: all 0.2s;
    &:hover {
      opacity: 0.8;
    }
  `,
  closeButton: css`
    position: absolute;
    top: 0.5rem;
    right: 0.5rem;
    padding: 0.5rem;
    transition: all 0.2s;
    &:hover {
      opacity: 0.8;
    }
  `,
  modalHref: css`
    font-size: 0.9rem;
    font-weight: bold;
    color: #1f6feb;
    text-align: center;
    margin-top: 1rem;
    transition: all 0.2s;
    &:hover {
      opacity: 0.8;
    }
  `,
};

type Props = {
  title: string;
  placeholder: string;
  setGithubId: React.Dispatch<React.SetStateAction<string>>;
  value: string;
  addMemberHandler: () => void;
  closeModalHandler: () => void;
  setExportSelectTextHandler?: () => void;
  linkText?: string;
};

const ModalInput = ({
  title,
  placeholder,
  setGithubId,
  value,
  addMemberHandler,
  closeModalHandler,
  setExportSelectTextHandler,
  linkText,
}: Props) => {
  return (
    <div>
      <p css={styles.title}>{title}</p>
      <div css={styles.inputBox}>
        <input
          css={styles.input}
          placeholder={placeholder}
          type="search"
          onChange={(e) => setGithubId(e.target.value)}
          value={value}
        />
        <button
          css={styles.addButton}
          onClick={addMemberHandler}
        >
          Add
        </button>
      </div>
      <button
        onClick={closeModalHandler}
        css={styles.closeButton}
      >
        <CloseIcon />
      </button>
      {linkText && (
        <div css={styles.modalHref}>
          <a onClick={setExportSelectTextHandler}>
            {linkText}
          </a>
        </div>
      )}
    </div>
  );
};

export default ModalInput;
