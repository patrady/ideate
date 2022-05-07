import Button from "@ramsey-design-system/button";
import Stack from "@ramsey-design-system/stack";
import { Formik, FormikHelpers } from "formik";
import * as yup from "yup";
import { Accordian, AccordianItem, Modal } from "..";
import { useLocale } from "../../hooks";
import { Card, UpdateableCardProps } from "../../models";
import {
  Input,
  Checkbox,
  TextArea,
  Tags,
  LinkInput,
  Links,
  Tag,
  Tabs,
  Tab,
} from "../rds";

type UpdateCardModalProps = {
  isOpen: boolean;
  card: Card;
  onUpdate(card: UpdateableCardProps): Promise<void>;
  onDelete(): Promise<void>;
  onClose(): void;
};

export default function UpdateCardModal(props: UpdateCardModalProps) {
  const { isOpen, card, onUpdate, onDelete, onClose } = props;
  const t = useLocale();

  async function handleSubmit(
    values: UpdateableCardProps,
    { setSubmitting }: FormikHelpers<UpdateableCardProps>
  ) {
    await onUpdate(values);
    setSubmitting(false);
  }

  const CurrentAvatar = () => (
    <Tag text="Current" size="small" color="primary" />
  );

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
        links: card.links,
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
        <Tabs>
          <Tab label="Info">
            <Input name="title" label="Title" />
            <Input name="description" label="Description" />
            <Tags name="tags" label="Tags" />
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
          </Tab>
          <Tab label="Prototype">
            <TextArea name="prototype.notes" label="Notes" />
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
          </Tab>
          <Tab label="Scale">
            <TextArea name="scale.notes" label="Notes" />
          </Tab>
        </Tabs>
        {/* <Accordian>
          <AccordianItem
            title="Prototype"
            tag={card.isPrototype() && <CurrentAvatar />}
          ></AccordianItem>
          <AccordianItem
            title="Test"
            tag={card.isTest() && <CurrentAvatar />}
          ></AccordianItem>
          <AccordianItem
            title="Scale"
            tag={card.isScale() && <CurrentAvatar />}
          ></AccordianItem>
        </Accordian> */}
      </Modal>
    </Formik>
  );
}
