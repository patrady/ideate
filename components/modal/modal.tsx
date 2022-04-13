import Text from "@ramsey-design-system/text";
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
        <Text className={styles["Modal-title"]} element="h2" size="bodyLarge">{title}</Text>
        <button className={styles["Modal-close"]} onClick={onClose}>
          X
        </button>
      </div>
      <div className={styles["Modal-content"]}>{children}</div>
      <div className={styles["Modal-actions"]}>{actions}</div>
    </ReactModal>
  );
}
