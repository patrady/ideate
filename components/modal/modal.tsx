import Button from "@ramsey-design-system/button";
import Heading from "@ramsey-design-system/heading";
import { Form } from "formik";
import ReactModal from "react-modal";
import { CloseIcon } from "../icons/icons";
import styles from "./modal.module.scss";

type ModalProps = {
  title: string;
  form?: boolean;
  isOpen?: boolean;
  actions?: React.ReactNode;
  children: React.ReactNode;
  onClose(): void;
};

ReactModal.setAppElement("#__next");

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
        <Heading className={styles["Modal-title"]} level="2" size="medium">
          {children}
        </Heading>
      );
    }

    return children;
  };

  return (
    <div className={styles["Modal-header"]}>
      <StyledChildren />
      <Button
        iconOnly
        icon={CloseIcon}
        type="button"
        aria-label="Close Modal"
        appearance="subtle"
        className={styles["Modal-close"]}
        onClick={onClose}
      />
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
