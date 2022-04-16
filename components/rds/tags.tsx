import Text from "@ramsey-design-system/text";
import clsx from "clsx";
import { FieldArray, useField } from "formik";
import Tag from "./tag";
import styles from "./rds.module.scss";
import Button from "@ramsey-design-system/button";
import { useState } from "react";

type TagsProps = {
  className?: string;
  name: string;
  label: string;
  help?: string;
};

export default function Tags(props: TagsProps) {
  const { className, name, label, help } = props;
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
        render={({ remove }) => (
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

            <Button appearance="ghost" size="small">
              Add Tag
            </Button>
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
