'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { AiFillBug } from 'react-icons/ai';
import classnames from 'classnames';
import { useSession } from 'next-auth/react';
import {
  Avatar,
  Box,
  Container,
  DropdownMenu,
  Flex,
  Text,
} from '@radix-ui/themes';
import { Skeleton } from '@/app/components';

const NavBar = () => {
  return (
    <nav className="border-b mb-5 px-5 py-3">
      <Container>
        <Flex align="center" justify="between">
          <Flex gap="3" align="center">
            <Link href="/">
              <AiFillBug />
            </Link>
            <NavLinks />
          </Flex>
          <AuthStatus />
        </Flex>
      </Container>
    </nav>
  );
};

const NavLinks = () => {
  const pathName = usePathname();

  const links = [
    { label: 'Dashboard', href: '/' },
    { label: 'Issues', href: '/issues' },
  ];

  return (
    <ul className="flex gap-6">
      {links.map(({ label, href }) => (
        <li key={href}>
          <Link
            href={href}
            className={classnames({
              '!text-zinc-900': href === pathName,
              'nav-link': true,
            })}
          >
            {label}
          </Link>
        </li>
      ))}
    </ul>
  );
};

const AuthStatus = () => {
  const { status, data: session } = useSession();

  if (status === 'loading') {
    return <Skeleton width="3rem" />;
  }

  if (status === 'unauthenticated') {
    return (
      <Link className="nav-link" href="/api/auth/signin">
        Log in
      </Link>
    );
  }

  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger>
        <Avatar
          className="cursor-pointer"
          src={session!.user!.image!}
          fallback="?"
          size="2"
          radius="full"
          referrerPolicy="no-referrer"
        />
      </DropdownMenu.Trigger>
      <DropdownMenu.Content>
        <DropdownMenu.Label>
          <Text size="2">{session!.user!.email}</Text>
        </DropdownMenu.Label>
        <DropdownMenu.Item>
          <Link href="/api/auth/signout">Log out</Link>
        </DropdownMenu.Item>
      </DropdownMenu.Content>
    </DropdownMenu.Root>
  );
};

export default NavBar;
