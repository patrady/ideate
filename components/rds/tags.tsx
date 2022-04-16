import Text from "@ramsey-design-system/text";
import clsx from "clsx";
import { FieldArray, Formik, useField, yupToFormErrors } from "formik";
import Tag from "./tag";
import styles from "./rds.module.scss";
import Button from "@ramsey-design-system/button";
import * as yup from "yup";
import { useBool } from "../../hooks";
import Modal from "../modal/modal";
import ButtonGroup from "./buttonGroup";
import Input from "./input";

type TagsProps = {
  className?: string;
  name: string;
  label: string;
  help?: string;
};

export default function Tags(props: TagsProps) {
  const { className, name, label, help } = props;
  const [isAddTagOpen, closeAddTag, openAddTag] = useBool();
  const [{ value = [], onChange, onBlur }, { touched, error }] =
    useField<string[]>(name);
  const hasError = touched && error;

  return (
    <div className={clsx(styles["rds-FormField"], className)}>
      <Text
        element="label"
        className={styles["rds-FormField-label"]}
        htmlFor={name}
      >
        {label}
      </Text>
      <FieldArray
        name={name}
        render={({ remove, push }) => (
          <div className={styles["rds-Group"]}>
            {value.map((tag, index) => (
              <Tag
                key={tag}
                text={tag}
                subtle
                color="primary"
                onDelete={() => remove(index)}
              />
            ))}

            <Button type="button" appearance="ghost" size="small" onClick={openAddTag}>
              Add Tag
            </Button>

            {isAddTagOpen && (
              <Formik
                initialValues={{ tag: "" }}
                validationSchema={yup.object().shape({
                  tag: yup.string().required("Please provide a tag"),
                })}
                onSubmit={({ tag }) => {
                  push(tag);
                  closeAddTag();
                }}
              >
                <Modal
                  form
                  isOpen
                  title="Add Tag"
                  onClose={closeAddTag}
                  actions={
                    <ButtonGroup alignRight>
                      <Button type="button" appearance="ghost">
                        Cancel
                      </Button>
                      <Button type="submit">Add</Button>
                    </ButtonGroup>
                  }
                >
                  <Input name="tag" />
                </Modal>
              </Formik>
            )}
          </div>
        )}
      />
      {/* <div
        className={clsx(styles["rds-FormField-control"], {
          [styles["rds-FormField-control--error"]]: hasError,
        })}
      >
        <div className={styles["rds-Input"]}>
          <input onChange={onChange} onBlur={onBlur} />
        </div>
      </div> */}
      {hasError && (
        <Text element="span" className={styles["rds-FormField-errorMessage"]}>
          {error}
        </Text>
      )}
      {help && (
        <Text className={styles["rds-FormField-help"]} color="subdued">
          {help}
        </Text>
      )}
    </div>
  );
}
