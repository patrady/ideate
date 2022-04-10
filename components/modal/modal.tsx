import ReactModal from "react-modal";
import styles from "./modal.module.scss";

type ModalProps = {
  title: string;
  isOpen?: boolean;
  actions?: React.ReactNode;
  children: React.ReactNode;
  onClose(): void;
};

export default function Modal(props: ModalProps) {
  const { title, isOpen = false, actions, children, onClose } = props;

  return (
    <ReactModal
      className={styles["Modal"]}
      overlayClassName={styles["Modal-overlay"]}
      isOpen={isOpen}
      onRequestClose={onClose}
      shouldCloseOnOverlayClick
    >
      <div className={styles["Modal-header"]}>
        <h2 className={styles["Modal-title"]}>{title}</h2>
        <button className={styles["Modal-close"]} onClick={onClose}>
          X
        </button>
      </div>
      <div className={styles["Modal-content"]}>{children}</div>
      <div className={styles["Modal-actions"]}>{actions}</div>
    </ReactModal>
  );
}
