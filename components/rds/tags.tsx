import Text from "@ramsey-design-system/text";
import clsx from "clsx";
import { FieldArray, useField } from "formik";
import Tag from "./tag";
import styles from "./rds.module.scss";
import Button from "@ramsey-design-system/button";
import { useBool, useLocale } from "../../hooks";
import AddTagModal from "../tags/addTagModal";

type TagsProps = {
  className?: string;
  name: string;
  label: string;
  help?: string;
};

export default function Tags(props: TagsProps) {
  const { className, name, label, help } = props;
  const [isAddTagOpen, closeAddTag, openAddTag] = useBool();
  const [{ value }, { touched, error }] = useField<string[]>(name);
  const t = useLocale();
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

            <Button
              type="button"
              appearance="ghost"
              size="small"
              onClick={openAddTag}
            >
              {t.tags.add}
            </Button>

            {isAddTagOpen && (
              <AddTagModal isOpen onAdd={push} onClose={closeAddTag} />
            )}
          </div>
        )}
      />
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
