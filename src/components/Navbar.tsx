'use client';

import React, { useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { getSession, signIn, signOut, useSession } from 'next-auth/react';
import LoadingScreen from './LoadingScreen';

const Navbar = () => {
  const { data: session, status } = useSession();
  const { name, email, image } = session?.user ?? {};

  return (
    <nav className="bg-slate-900 flex items-center justify-between px-24 py-4  text-white">
      <Link href="/">
        <h1>Next Auth0</h1>
      </Link>

      {status === 'loading' && <LoadingScreen />}

      {session?.user ? (
        <div className="flex gap-x-2 items-center">
          <p>
            {name} {email}
          </p>

          <Image
            src={image ?? '/default-user-image.png'}
            alt="User Image"
            width={30}
            height={30}
            className="rounded-full w-8 h-8"
          />
          <button
            onClick={async () => await signOut({ callbackUrl: '/' })}
            className="bg-sky-400 px-3 py-2 rounded-md text-white"
          >
            Sign Out
          </button>
        </div>
      ) : (
        <button
          onClick={async () =>
            await signIn('auth0', { callbackUrl: '/dashboard' })
          }
          className="bg-sky-400 px-3 py-2 rounded-md text-white"
        >
          Login
        </button>
      )}
    </nav>
  );
};

export default Navbar;
