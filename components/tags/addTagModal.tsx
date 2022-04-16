import Button from "@ramsey-design-system/button";
import Stack from "@ramsey-design-system/stack";
import { Formik, FormikHelpers } from "formik";
import * as yup from "yup";
import { useLocale } from "../../hooks";
import { AddModalProps } from "../../types";
import Modal from "../modal/modal";
import { Input } from "../rds";

type FormProps = {
  tag: string;
};

export default function AddTagModal(props: AddModalProps<string>) {
  const { onAdd, onClose } = props;
  const t = useLocale();

  function handleAdd(
    { tag }: FormProps,
    { setSubmitting }: FormikHelpers<FormProps>
  ) {
    setSubmitting(false);
    onAdd(tag);
    onClose();
  }

  return (
    <Formik
      initialValues={{ tag: "" }}
      validationSchema={yup.object().shape({
        tag: yup.string().required("Please provide a tag"),
      })}
      onSubmit={handleAdd}
    >
      <Modal
        form
        isOpen
        title={t.addTagModal.title}
        onClose={onClose}
        actions={
          <Stack horizontalAlignment="right">
            <Button type="button" appearance="ghost" onClick={onClose}>
              {t.addTagModal.cancel}
            </Button>
            <Button type="submit">{t.addTagModal.add}</Button>
          </Stack>
        }
      >
        <Input name="tag" />
      </Modal>
    </Formik>
  );
}
