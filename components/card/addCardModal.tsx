import Button from "@ramsey-design-system/button";
import { Form, Formik, FormikHelpers } from "formik";
import * as yup from "yup";
import { Modal } from "..";
import { useLocale } from "../../hooks";
import { Input, Checkbox, ButtonGroup } from "../rds";

type AddCardModalProps = {
  isOpen: boolean;
  onAdd(card: AddCardFormProps): Promise<void>;
  onClose(): void;
};

export type AddCardFormProps = {
  title: string;
  description: string;
  testSuccessCriteria: string;
  isArchived: boolean;
};

export default function AddCardModal(props: AddCardModalProps) {
  const { isOpen, onAdd, onClose } = props;
  const t = useLocale();

  async function handleSubmit(
    values: AddCardFormProps,
    { setSubmitting }: FormikHelpers<AddCardFormProps>
  ) {
    await onAdd(values);
    setSubmitting(false);
  }

  return (
    <Formik
      initialValues={{
        title: "",
        description: "",
        testSuccessCriteria: "",
        isArchived: false,
      }}
      validationSchema={yup.object().shape({
        title: yup.string().required("Please provide a title"),
        description: yup.string(),
        testSuccessCriteria: yup.string(),
        isArchived: yup.bool(),
      })}
      onSubmit={handleSubmit}
    >
      <Modal
        form
        title={t.board.addCardModal.title}
        isOpen={isOpen}
        onClose={onClose}
        actions={
          <ButtonGroup alignRight>
            <Button appearance="ghost" type="button" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit">Add</Button>
          </ButtonGroup>
        }
      >
        <Input name="title" label="Title" help="What displays on the card" />
        <Input name="description" label="Description" />
        <Input name="testSuccessCriteria" label="Test Success Criteria" />
        <Checkbox name="isArchived" label="Archived" />
      </Modal>
    </Formik>
  );
}
