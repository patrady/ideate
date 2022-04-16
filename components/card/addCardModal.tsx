import Button from "@ramsey-design-system/button";
import Stack from '@ramsey-design-system/stack';
import { Formik, FormikHelpers } from "formik";
import * as yup from "yup";
import { Modal, Accordian } from "..";
import { useLocale } from "../../hooks";
import { AddCardProps } from "../../models";
import { AccordianItem } from "../accordian";
import { Input, Checkbox, TextArea, Tags } from "../rds";

type AddCardModalProps = {
  isOpen: boolean;
  onAdd(card: AddCardProps): Promise<void>;
  onClose(): void;
};

export default function AddCardModal(props: AddCardModalProps) {
  const { isOpen, onAdd, onClose } = props;
  const t = useLocale();

  async function handleSubmit(
    values: AddCardProps,
    { setSubmitting }: FormikHelpers<AddCardProps>
  ) {
    await onAdd(values);
    setSubmitting(false);
  }

  return (
    <Formik
      initialValues={{
        title: "",
        description: "",
        prototype: {
          notes: "",
        },
        test: {
          successCriteria: "",
          metrics: "",
        },
        scale: {
          notes: "",
        },
        isArchived: false,
        tags: [] as string[],
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
          <Stack horizontalAlignment="right">
            <Button appearance="ghost" type="button" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit">Add</Button>
          </Stack>
        }
      >
        <Input name="title" label="Title" help="What displays on the card" />
        <Input name="description" label="Description" />
        <Accordian>
          <AccordianItem title="Prototype">
            <TextArea name="prototype.notes" label="Notes" />
          </AccordianItem>
          <AccordianItem title="Test">
            <Stack>
              <Input name="test.startDate" label="Start" type="date" />
              <Input name="test.endDate" label="End" type="date" />
            </Stack>
            <TextArea name="test.successCriteria" label="Success Criteria" />
            <TextArea name="test.metrics" label="Metrics" />
          </AccordianItem>
          <AccordianItem title="Scale">
            <TextArea name="scale.notes" label="Notes" />
          </AccordianItem>
        </Accordian>

        <Tags name="tags" label="Tags" />
        <Checkbox name="isArchived" label="Archived" />
      </Modal>
    </Formik>
  );
}
