import Stack from "@ramsey-design-system/stack";
import Button from "@ramsey-design-system/button";
import { FieldArray, useField } from "formik";
import { useBool, useLocale } from "../../hooks";
import AddStringModal from "../modals/addStringModal";
import FormField, { FormFieldProps } from "./formField";
import LinkInput from "./linkInput";
import styles from "./rds.module.scss";

type LinksProps = FormFieldProps & {};

export default function Links(props: LinksProps) {
  const { name, ...rest } = props;
  const [isLinkTagOpen, closeAddLink, openAddLink] = useBool();
  const [{ value: links }] = useField<string[]>(name);
  const t = useLocale();

  return (
    <FormField name={name} {...rest}>
      <FieldArray
        name={name}
        render={({ remove, push }) => (
          <>
            {links.length > 0 && (
              <Stack className={styles["Links"]}>
                {links.map((link, index) => (
                  <LinkInput
                    key={link}
                    value={link}
                    actions={["copy", "open", "delete"]}
                    onDelete={() => remove(index)}
                  />
                ))}
              </Stack>
            )}

            <Button
              type="button"
              appearance="ghost"
              size="small"
              onClick={openAddLink}
            >
              Add Link
            </Button>

            {isLinkTagOpen && (
              <AddStringModal
                title="Add Link"
                isOpen
                onAdd={push}
                onClose={closeAddLink}
              />
            )}
          </>
        )}
      />
    </FormField>
  );
}
