import Button from "@ramsey-design-system/button";
import { Formik, FormikHelpers } from "formik";
import * as yup from "yup";
import { Modal } from "..";
import { useLocale } from "../../hooks";
import { Card, UpdateCardProps } from "../../models";
import { Input, Checkbox, ButtonGroup, TextArea, Tags } from "../rds";

type UpdateCardModalProps = {
  isOpen: boolean;
  card: Card;
  onUpdate(card: UpdateCardProps): Promise<void>;
  onDelete(): Promise<void>;
  onClose(): void;
};

export default function UpdateCardModal(props: UpdateCardModalProps) {
  const { isOpen, card, onUpdate, onDelete, onClose } = props;
  const t = useLocale();

  async function handleSubmit(
    values: UpdateCardProps,
    { setSubmitting }: FormikHelpers<UpdateCardProps>
  ) {
    await onUpdate(values);
    setSubmitting(false);
  }

  return (
    <Formik
      initialValues={{
        title: card.title,
        description: card.description,
        testSuccessCriteria: card.testSuccessCriteria,
        tags: card.tags,
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
      <Modal
        form
        title={t.board.updateCardModal.title}
        isOpen={isOpen}
        onClose={onClose}
        actions={
          <ButtonGroup alignRight>
            <Button appearance="dangerSubtle" onClick={onDelete}>
              Delete
            </Button>
            <Button appearance="ghost" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit">Update</Button>
          </ButtonGroup>
        }
      >
        <Input name="title" label="Title" help="What displays on the card" />
        <Input name="description" label="Description" />
        <TextArea name="testSuccessCriteria" label="Test Success Criteria" />
        <Tags name="tags" label="Tags" />
        <Checkbox name="isArchived" label="Archived" />
      </Modal>
    </Formik>
  );
}
