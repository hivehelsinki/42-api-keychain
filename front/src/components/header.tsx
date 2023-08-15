import { FC } from 'react';

interface headerProps {
  heading: string;
  text?: string;
}

const Header: FC<headerProps> = ({ heading, text }) => {
  return (
    <>
      <h2 className="text-3xl font-bold tracking-tight">{heading}</h2>
      {text && <p className="mt-3">{text}</p>}
    </>
  );
};

export default Header;
