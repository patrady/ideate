import { Form, Formik, FormikHelpers } from "formik";
import * as yup from "yup";
import { Modal } from "..";
import { useLocale } from "../../hooks";
import { Card } from "../../models";
import { Input, Checkbox } from "../rds";

type UpdateCardModalProps = {
  isOpen: boolean;
  card: Card;
  onUpdate(card: UpdateCardFormProps): Promise<void>;
  onDelete(): Promise<void>;
  onClose(): void;
};

export type UpdateCardFormProps = {
  title: string;
  description: string;
  testSuccessCriteria: string;
  isArchived: boolean;
};

export default function UpdateCardModal(props: UpdateCardModalProps) {
  const { isOpen, card, onUpdate, onDelete, onClose } = props;
  const t = useLocale();

  async function handleSubmit(
    values: UpdateCardFormProps,
    { setSubmitting }: FormikHelpers<UpdateCardFormProps>
  ) {
    await onUpdate(values);
    setSubmitting(false);
  }

  return (
    <Modal title={t.board.modal.title} isOpen={isOpen} onClose={onClose}>
      <Formik
        initialValues={{
          title: card.title,
          description: card.description,
          testSuccessCriteria: card.testSuccessCriteria,
          isArchived: card.isArchived,
        }}
        validationSchema={yup.object().shape({
          title: yup.string().required("Please provide a title"),
          description: yup.string(),
          testSuccessCriteria: yup.string(),
          isArchived: yup.bool(),
        })}
        onSubmit={handleSubmit}
      >
        <Form>
          <Input name="title" label="Title" help="What displays on the card" />
          <Input name="description" label="Description" />
          <Input name="testSuccessCriteria" label="Test Success Criteria" />
          <Checkbox name="isArchived" label="isArchived" />
          <button onClick={onDelete}>Delete</button>
          <button type="submit">Update</button>
        </Form>
      </Formik>
    </Modal>
  );
}
