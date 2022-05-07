import Button from "@ramsey-design-system/button";
import Stack from "@ramsey-design-system/stack";
import { Formik, FormikHelpers } from "formik";
import * as yup from "yup";
import { Modal } from "..";
import { useLocale } from "../../hooks";
import { Team, UpdateableTeamProps } from "../../models";
import { Checkbox, Input } from "../rds";

type UpdateTeamModalProps = {
  team: Team;
  isOpen: boolean;
  onUpdate(values: UpdateableTeamProps): Promise<void>;
  onClose(): void;
};

export default function UpdateTeamModal(props: UpdateTeamModalProps) {
  const { team, isOpen, onUpdate, onClose } = props;
  const t = useLocale();

  async function handleSubmit(
    values: UpdateableTeamProps,
    { setSubmitting, resetForm }: FormikHelpers<UpdateableTeamProps>
  ) {
    await onUpdate(values);
    onClose();
    setSubmitting(false);
    resetForm();
  }

  return (
    <Formik
      initialValues={{
        name: team.name,
        isActive: team.isActive,
      }}
      validationSchema={yup.object().shape({
        name: yup.string().required("Please provide a name"),
        isActive: yup.bool(),
      })}
      onSubmit={handleSubmit}
    >
      <Modal
        form
        title={t.updateTeamModal.title}
        isOpen={isOpen}
        onClose={onClose}
        actions={
          <Stack horizontalAlignment="right">
            <Button appearance="ghost" type="button" onClick={onClose}>
              {t.modal.cancel}
            </Button>
            <Button type="submit">{t.modal.update}</Button>
          </Stack>
        }
      >
        <Input name="name" label="Name" />
        <Checkbox name="isActive" label="Is Active" />
      </Modal>
    </Formik>
  );
}
