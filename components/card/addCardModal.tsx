import Button from "@ramsey-design-system/button";
import Stack from "@ramsey-design-system/stack";
import { Formik, FormikHelpers } from "formik";
import * as yup from "yup";
import { Modal, Accordian } from "..";
import { useLocale } from "../../hooks";
import { AddCardProps } from "../../models";
import { AccordianItem } from "../accordian";
import { Input, Checkbox, TextArea, Tags, Links } from "../rds";

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
          learnings: ""
        },
        scale: {
          notes: "",
        },
        isArchived: false,
        tags: [] as string[],
        links: [] as string[],
      }}
      validationSchema={yup.object().shape({
        title: yup.string().required("Please provide a title"),
        description: yup.string(),
        testSuccessCriteria: yup.string(),
        isArchived: yup.bool(),
        tags: yup.array(yup.string()),
        link: yup.string().url('Please provide a valid link'),
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
            <TextArea name="test.learnings" label="Learnings" />
          </AccordianItem>
          <AccordianItem title="Scale">
            <TextArea name="scale.notes" label="Notes" />
          </AccordianItem>
        </Accordian>
        <Accordian>
          <AccordianItem title="Links">
            <Links name="links" fullWidth />
          </AccordianItem>
        </Accordian>
        <Accordian>
          <AccordianItem title="Advanced">
            <Checkbox name="isArchived" label="Archived" />
          </AccordianItem>
        </Accordian>
      </Modal>
    </Formik>
  );
}
