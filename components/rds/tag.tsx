import Button from "@ramsey-design-system/button";
import RDSTag, { TagProps as RDSTagProps } from "@ramsey-design-system/tag";
import { CloseIcon } from "..";
import styles from './rds.module.scss';

interface TagProps extends RDSTagProps {
  onDelete?(): void;
}

export default function Tag(props: TagProps) {
  const { onDelete, text, ...rest } = props;

  if (!onDelete) {
    return <RDSTag text={text} {...rest} />;
  }

  return (
    <RDSTag {...rest}>
      {text}
      <Button
        iconOnly
        icon={CloseIcon}
        type="button"
        appearance="subtle"
        size="small"
        className={styles["rds-Tag-delete"]}
        onClick={onDelete}
      />
    </RDSTag>
  );
}
