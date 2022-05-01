import Button from "@ramsey-design-system/button";
import Stack from "@ramsey-design-system/stack";
import { Formik, FormikHelpers } from "formik";
import * as yup from "yup";
import { Modal } from "..";
import { useLocale } from "../../hooks";
import { AddTeamProps } from "../../models";
import { Input } from "../rds";

type AddTeamModalProps = {
  isOpen: boolean;
  onAdd(values: AddTeamProps): Promise<void>;
  onClose(): void;
};

export default function AddTeamModal(props: AddTeamModalProps) {
  const { isOpen, onAdd, onClose } = props;
  const t = useLocale();

  async function handleSubmit(
    values: AddTeamProps,
    { setSubmitting, resetForm }: FormikHelpers<AddTeamProps>
  ) {
    await onAdd(values);
    onClose();
    setSubmitting(false);
    resetForm();
  }

  return (
    <Formik
      initialValues={{
        name: "",
        slug: "",
      }}
      validationSchema={yup.object().shape({
        name: yup.string().required("Please provide a name"),
        slug: yup.string().required("Please provide a slug"),
      })}
      onSubmit={handleSubmit}
    >
      <Modal
        form
        title={t.addTeamModal.title}
        isOpen={isOpen}
        onClose={onClose}
        actions={
          <Stack horizontalAlignment="right">
            <Button appearance="ghost" type="button" onClick={onClose}>
              {t.modal.cancel}
            </Button>
            <Button type="submit">{t.modal.add}</Button>
          </Stack>
        }
      >
        <Input name="name" label="Name" />
        <Input name="slug" label="Slug" />
      </Modal>
    </Formik>
  );
}
