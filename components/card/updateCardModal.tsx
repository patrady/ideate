import Button from "@ramsey-design-system/button";
import Stack from "@ramsey-design-system/stack";
import { Formik, FormikHelpers } from "formik";
import * as yup from "yup";
import { Accordian, AccordianItem, Modal } from "..";
import { useLocale } from "../../hooks";
import { Card, UpdateCardProps } from "../../models";
import { Input, Checkbox, TextArea, Tags } from "../rds";

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
        prototype: card.prototype,
        test: card.test,
        scale: card.scale,
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
          <Stack horizontalAlignment="right">
            <Button appearance="dangerSubtle" onClick={onDelete}>
              Delete
            </Button>
            <Button appearance="ghost" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit">Update</Button>
          </Stack>
        }
      >
        <Input name="title" label="Title" />
        <Input name="description" label="Description" />
        <Tags name="tags" label="Tags" />
        <Accordian>
          <AccordianItem title="Prototype">
            <TextArea name="prototype.notes" label="Notes" />
          </AccordianItem>
          <AccordianItem title="Test">
            <Stack>
              <Input
                name="test.startDate"
                label="Start"
                type="date"
                fullWidth
              />
              <Input name="test.endDate" label="End" type="date" fullWidth />
            </Stack>
            <TextArea name="test.successCriteria" label="Success Criteria" />
            <TextArea name="test.metrics" label="Metrics" />
          </AccordianItem>
          <AccordianItem title="Scale">
            <TextArea name="scale.notes" label="Notes" />
          </AccordianItem>
        </Accordian>
        <Checkbox name="isArchived" label="Archived" />
      </Modal>
    </Formik>
  );
}
