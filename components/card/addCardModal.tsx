import Button from "@ramsey-design-system/button";
import Stack from "@ramsey-design-system/stack";
import { Formik, FormikHelpers } from "formik";
import * as yup from "yup";
import { Modal } from "..";
import { useLocale } from "../../hooks";
import { AddableCardProps } from "../../models";
import { Input, TextArea, Tags, Links, Tabs, Tab } from "../rds";

type AddCardModalProps = {
  isOpen: boolean;
  onAdd(card: AddableCardProps): Promise<void>;
  onClose(): void;
};

export default function AddCardModal(props: AddCardModalProps) {
  const { isOpen, onAdd, onClose } = props;
  const t = useLocale();

  async function handleSubmit(
    values: AddableCardProps,
    { setSubmitting, resetForm }: FormikHelpers<AddableCardProps>
  ) {
    await onAdd(values);
    setSubmitting(false);
    resetForm();
  }

  return (
    <Formik
      initialValues={{
        title: "",
        description: "",
        prototype: {
          notes: "",
          links: [] as string[],
        },
        test: {
          successCriteria: "",
          metrics: "",
          learnings: "",
          links: [] as string[],
        },
        scale: {
          notes: "",
          links: [] as string[],
        },
        tags: [] as string[],
      }}
      validationSchema={yup.object().shape({
        title: yup.string().required("Please provide a title"),
        description: yup.string(),
        testSuccessCriteria: yup.string(),
        isArchived: yup.bool(),
        tags: yup.array(yup.string()),
        link: yup.string().url("Please provide a valid link"),
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
        <Tabs>
          <Tab label="Info">
            <Input name="title" label="Title" />
            <Input name="description" label="Description" />
            <Tags name="tags" label="Tags" />
          </Tab>
          <Tab label="Prototype">
            <TextArea name="prototype.notes" label="Notes" />
            <Links label="Links" name="prototype.links" fullWidth />
          </Tab>
          <Tab label="Test">
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
            <Links label="Links" name="test.links" fullWidth />
          </Tab>
          <Tab label="Scale">
            <TextArea name="scale.notes" label="Notes" />
            <Links label="Links" name="scale.links" fullWidth />
          </Tab>
        </Tabs>
      </Modal>
    </Formik>
  );
}
