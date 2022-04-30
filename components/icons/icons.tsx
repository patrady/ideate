import { SVGProps } from "react";

type Props = SVGProps<SVGSVGElement>;

function Icon({ children, ...rest }: Props) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      width="16"
      height="16"
      fill="currentColor"
      {...rest}
    >
      {children}
    </svg>
  );
}

export function LinkExternalIcon(props: Props) {
  return (
    <Icon {...props}>
      <path
        fillRule="evenodd"
        d="M9.27 4.64a1 1 0 1 1 0 2H3V21h14.36v-6.27a1 1 0 1 1 2 0V22a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V5.64a1 1 0 0 1 1-1zM22.02 1a1 1 0 0 1 .35.07l.05.02a1.02 1.02 0 0 1 .18.1l.05.05-.03-.03a1 1 0 0 1 .23.27l.03.04.03.06.02.05a.99.99 0 0 1 .06.22v.12L23 2v7.27a1 1 0 0 1-2 .12V4.4l-8.3 8.3a1 1 0 0 1-1.31.08l-.1-.08a1 1 0 0 1-.08-1.32l.08-.1L19.6 3h-4.86a1 1 0 0 1-1-.88V2a1 1 0 0 1 1-1h7.29z"
      />
    </Icon>
  );
}

export function CloseIcon(props: Props) {
  return (
    <Icon {...props}>
      <path
        fillRule="evenodd"
        d="M1.3 1.3a1 1 0 0 1 1.4 0l9.3 9.29 9.3-9.3a1 1 0 0 1 1.31-.08l.1.08a1 1 0 0 1 0 1.42L13.4 12l9.3 9.3a1 1 0 0 1 .08 1.31l-.08.1a1 1 0 0 1-1.42 0L12 13.4l-9.3 9.3a1 1 0 0 1-1.31.08l-.1-.08a1 1 0 0 1 0-1.42L10.6 12 1.3 2.7a1 1 0 0 1-.08-1.31z"
      />
    </Icon>
  );
}

export function DeleteIcon(props: Props) {
  return (
    <Icon {...props}>
      <path
        fillRule="evenodd"
        d="M19.27 8.27a1 1 0 0 1 1 .89v11.02a2.8 2.8 0 0 1-2.64 2.81l-.18.01H6.55a2.82 2.82 0 0 1-2.82-2.65V9.28a1 1 0 0 1 2-.12v11.02c0 .42.3.76.71.81l.1.01h10.91c.42 0 .77-.31.82-.72v-11a1 1 0 0 1 1-1zM12 11a1 1 0 0 1 1 .88v5.57a1 1 0 0 1-2 .12V12a1 1 0 0 1 1-1zm-3.64 0a1 1 0 0 1 1 .88v5.57a1 1 0 0 1-1.99.12V12a1 1 0 0 1 1-1zm7.28 0a1 1 0 0 1 .99.88v5.57a1 1 0 0 1-1.99.12V12a1 1 0 0 1 1-1zM8.36 6.64H2a1 1 0 0 1-.12-2h5.48V2a1 1 0 0 1 .89-1h7.39a1 1 0 0 1 1 1v2.64H22a1 1 0 0 1 .12 1.99H8.36zM14.64 3H9.36v1.64h5.28V3z"
      />
    </Icon>
  );
}

export function EditOutlinedIcon(props: Props) {
  return (
    <Icon {...props}>
      <path
        fillRule="evenodd"
        d="m19.95 1.88 2.17 2.17a3 3 0 0 1 0 4.24L8.71 21.71a1 1 0 0 1-.55.28l-6 1a1 1 0 0 1-1.15-1.15l1-6a1 1 0 0 1 .28-.55L15.71 1.88a3 3 0 0 1 4.24 0zm-5.62 4.2-10.4 10.4-.71 4.3 4.3-.71 10.4-10.4-3.6-3.58zm2.8-2.79-1.39 1.38 3.59 3.59 1.38-1.38a1 1 0 0 0 0-1.41l-2.18-2.18a1 1 0 0 0-1.4 0z"
      />
    </Icon>
  );
}

export function DocumentOutlinedIcon(props: Props) {
  return (
    <Icon {...props}>
      <path
        fillRule="evenodd"
        d="M14.67 1a1.01 1.01 0 0 1 .36.07l.04.01a.9.9 0 0 1 .22.14l.08.07 5.34 5.34a1 1 0 0 1 .2.3l.02.04a.89.89 0 0 1 .06.2v.05-.01.04-.02l.01.1v14.23a1 1 0 0 1-.88.99H4a1 1 0 0 1-1-.88V2a1 1 0 0 1 .88-1h10.79zm-1 2H5v17.56h14V8.33h-4.33a1 1 0 0 1-1-.88V3zM7.56 15.22h8.88a1 1 0 0 1 .12 2h-9a1 1 0 0 1-.12-2h9zm8.88-4.44a1 1 0 0 1 .12 2h-9a1 1 0 0 1-.12-2h9zm-5.33-4.45a1 1 0 0 1 .12 2H7.56a1 1 0 0 1-.12-1.99h3.67zm9.89.92v.08-.08z"
      />
    </Icon>
  );
}

export function PlusIcon(props: Props) {
  return (
    <Icon {...props}>
      <path
        fillRule="evenodd"
        d="M12 1a1 1 0 0 1 1 1v9h9a1 1 0 0 1 1 .88V12a1 1 0 0 1-1 1h-9v9a1 1 0 0 1-.88 1H12a1 1 0 0 1-1-1v-9H2a1 1 0 0 1-1-.88V12a1 1 0 0 1 1-1h9V2a1 1 0 0 1 .88-1z"
      />
    </Icon>
  );
}

export function ChevronRightIcon(props: Props) {
  return (
    <Icon {...props}>
      <path
        fillRule="evenodd"
        d="m15.59 12-9.3 9.3a1 1 0 0 0 1.42 1.4l10-10a1 1 0 0 0 0-1.4l-10-10a1 1 0 1 0-1.42 1.4l9.3 9.3z"
      />
    </Icon>
  );
}

export function LockOutlinedIcon(props: Props) {
  return (
    <Icon {...props}>
      <path
        fill-rule="evenodd"
        d="M12.28 1a5.5 5.5 0 0 1 5.45 5.55v3.54h2.63a1 1 0 0 1 1 1V22a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V11.1a1 1 0 0 1 1-1l2.64-.01V6.44A5.5 5.5 0 0 1 11.96 1h.22zm7.08 11.1H5V21h14.36v-8.9zm-7.18 1.63a2.82 2.82 0 1 1 0 5.63 2.82 2.82 0 0 1 0-5.63zm0 2a.82.82 0 1 0 0 1.63.82.82 0 0 0 0-1.63zm0-12.73a3.5 3.5 0 0 0-3.54 3.45v3.64h7.09V6.54A3.5 3.5 0 0 0 12.46 3h-.19z"
      />
    </Icon>
  );
}
