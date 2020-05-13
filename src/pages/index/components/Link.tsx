import React from 'react';

interface IProps {
  active: boolean;
  children: any;
  onClick: () => void;
}

export default function Link({
  active,
  children,
  onClick,
}: IProps): JSX.Element {
  if (active) {
    return <span>{children}</span>;
  }

  return (
    <a
      href="javascript(0);"
      onClick={(e) => {
        e.preventDefault();
        onClick();
      }}
    >
      {children}
    </a>
  );
}
