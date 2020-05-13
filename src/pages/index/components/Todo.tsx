import React from 'react';

interface IProps {
  text: string;
  completed: boolean;
  onClick?: (e: React.MouseEvent) => void;}

export default function Todo({
  onClick,
  completed,
  text,
}: IProps): JSX.Element {
  return (
    <li
      onClick={onClick}
      style={{
        textDecoration: completed ? 'line-through' : 'none',
      }}
    >
      {text}
    </li>
  );
}
