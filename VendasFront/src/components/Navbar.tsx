import React from 'react';
import type { IconType } from 'react-icons';
import { FiHome, FiUser, FiBox } from 'react-icons/fi';
import type { Page } from '../types/pages'; // import your shared Page type

interface NavbarProps {
  onNavigate: React.Dispatch<React.SetStateAction<Page>>;
  current?: Page;
  children?: React.ReactNode; // <-- allow children
}

const items: { Icon: IconType; label: Page }[] = [
  { Icon: FiHome, label: 'home' },
  { Icon: FiUser, label: 'clientes' },
  { Icon: FiBox, label: 'produtos' },
];

export default function Navbar({ onNavigate, current, children }: NavbarProps) {
  return (
    <nav>
      {items.map(({ Icon, label }) => (
        <div
          key={label}
          onClick={() => onNavigate(label)}
          style={{ cursor: 'pointer', fontWeight: current === label ? 'bold' : 'normal' }}
        >
          <Icon />
          <span>{label}</span>
        </div>
      ))}
      {children}
    </nav>
  );
}