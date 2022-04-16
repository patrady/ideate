import Button from "@ramsey-design-system/button";
import Stack from "@ramsey-design-system/stack";
import { Formik, FormikHelpers } from "formik";
import * as yup from "yup";
import { useLocale } from "../../hooks";
import { AddModalProps } from "../../types";
import Modal from "../modal/modal";
import { Input } from "../rds";

type FormProps = {
  value: string;
};

type AddStringModalProps = AddModalProps<string> & {
  title: string;
}

export default function AddStringModal(props: AddStringModalProps) {
  const { title, onAdd, onClose } = props;
  const t = useLocale();

  function handleAdd(
    { value }: FormProps,
    { setSubmitting }: FormikHelpers<FormProps>
  ) {
    setSubmitting(false);
    onAdd(value);
    onClose();
  }

  return (
    <Formik
      initialValues={{ value: "" }}
      validationSchema={yup.object().shape({
        value: yup.string().required("Please provide a value"),
      })}
      onSubmit={handleAdd}
    >
      <Modal
        form
        isOpen
        title={title}
        onClose={onClose}
        actions={
          <Stack horizontalAlignment="right">
            <Button type="button" appearance="ghost" onClick={onClose}>
              {t.modal.cancel}
            </Button>
            <Button type="submit">{t.modal.add}</Button>
          </Stack>
        }
      >
        <Input name="value" />
      </Modal>
    </Formik>
  );
}
