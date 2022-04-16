import Text from "@ramsey-design-system/text";
import { Form } from "formik";
import ReactModal from "react-modal";
import styles from "./modal.module.scss";

type ModalProps = {
  title: string;
  form?: boolean;
  isOpen?: boolean;
  actions?: React.ReactNode;
  children: React.ReactNode;
  onClose(): void;
};

ReactModal.setAppElement('#__next');

export default function Modal(props: ModalProps) {
  const {
    title,
    form = false,
    isOpen = false,
    actions,
    children,
    onClose,
  } = props;

  return (
    <ReactModal
      className={styles["Modal"]}
      overlayClassName={styles["Modal-overlay"]}
      isOpen={isOpen}
      onRequestClose={onClose}
      shouldCloseOnOverlayClick
    >
      <ModalBody form={form}>
        <ModalHeader onClose={onClose}>{title}</ModalHeader>
        <ModalContent>{children}</ModalContent>
        {actions}
      </ModalBody>
    </ReactModal>
  );
}

type ModalHeaderProps = {
  onClose(): void;
  children: string | JSX.Element;
};

function ModalHeader(props: ModalHeaderProps) {
  const { onClose, children } = props;

  const StyledChildren = () => {
    if (typeof children === "string") {
      return (
        <Text className={styles["Modal-title"]} element="h2" size="bodyLarge">
          {children}
        </Text>
      );
    }

    return children;
  };

  return (
    <div className={styles["Modal-header"]}>
      <StyledChildren />
      <button type="button" className={styles["Modal-close"]} onClick={onClose}>
        X
      </button>
    </div>
  );
}

type ModalBodyProps = {
  form: boolean;
  actions?: React.ReactNode;
  children: React.ReactNode;
};

function ModalBody(props: ModalBodyProps) {
  const { form, children } = props;

  if (form) {
    return <Form className={styles["Modal-body"]}>{children}</Form>;
  }

  return <>{children}</>;
}

type ModalContentProps = {
  children: React.ReactNode;
};

function ModalContent(props: ModalContentProps) {
  const { children } = props;

  return <div className={styles["Modal-content"]}>{children}</div>;
}
