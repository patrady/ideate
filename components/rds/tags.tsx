import Stack from "@ramsey-design-system/stack";
import Button from "@ramsey-design-system/button";
import { FieldArray, useField } from "formik";
import { useBool, useLocale } from "../../hooks";
import AddStringModal from "../modals/addStringModal";
import Tag from "./tag";
import FormField, { FormFieldProps } from "./formField";

type TagsProps = FormFieldProps & {};

export default function Tags(props: TagsProps) {
  const { name, ...rest } = props;
  const [isAddTagOpen, closeAddTag, openAddTag] = useBool();
  const [{ value }] = useField<string[]>(name);
  const t = useLocale();

  return (
    <FormField name={name} {...rest}>
      <FieldArray
        name={name}
        render={({ remove, push }) => (
          <Stack>
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
              <AddStringModal
                isOpen
                title={t.addTagModal.title}
                onAdd={push}
                onClose={closeAddTag}
              />
            )}
          </Stack>
        )}
      />
    </FormField>
  );
}
