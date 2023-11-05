'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React from 'react';
import { AiFillBug } from 'react-icons/ai';
import classnames from 'classnames';

const NavBar = () => {
  const pathName = usePathname();

  const links = [
    { label: 'Dashboard', href: '/' },
    { label: 'Issues', href: '/issues' },
  ];

  return (
    <nav className="flex gap-6 border-b mb-5 px-5 h-14 items-center">
      <Link href="/">
        <AiFillBug />
      </Link>
      <ul className="flex gap-6">
        {links.map(({ label, href }) => (
          <li key={href}>
            <Link
              href={href}
              className={classnames({
                'text-zinc-900': href === pathName,
                'text-zinc-500': href !== pathName,
                'hover:text-zinc-800 transition-colors': true,
              })}
            >
              {label}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default NavBar;
