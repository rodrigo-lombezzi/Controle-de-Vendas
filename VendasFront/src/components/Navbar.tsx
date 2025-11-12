import React from 'react';
import { FiHome, FiUser, FiBox } from 'react-icons/fi';
import type { IconType } from 'react-icons';
import type { Page } from '../App';

interface NavbarProps {
  onNavigate: React.Dispatch<React.SetStateAction<Page>>;
  current?: Page;
}

const items: { Icon: IconType; label: Page }[] = [
  { Icon: FiHome, label: 'home' },
  { Icon: FiUser, label: 'clientes' },
  { Icon: FiBox, label: 'produtos' },
];

export default function Navbar({ onNavigate, current }: NavbarProps) {
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
    </nav>
  );
}