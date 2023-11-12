'use client';

import React, { useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { getSession, signIn, signOut, useSession } from 'next-auth/react';

const Navbar = () => {
  const { data: session, status } = useSession();

  if (status === 'loading') {
    return <div>Loading...</div>;
  }

  return (
    <nav className="bg-slate-900 flex items-center justify-between px-24 py-3  text-white">
      <Link href="/">
        <h1>Next Auth0</h1>
      </Link>

      {session?.user ? (
        <div className="flex gap-x-2 items-center">
          <p>
            {session.user.name} {session.user.email}
          </p>

          <Image
            src={session.user?.image ?? '/default-user-image.png'}
            alt="User Image"
            width={30}
            height={30}
            className="rounded-full w-8 h-8"
          />
          <button
            onClick={() => signOut()}
            className="bg-sky-400 px-3 py-2 rounded-md text-white"
          >
            Sign Out
          </button>
        </div>
      ) : (
        <button
          onClick={() => signIn()}
          className="bg-sky-400 px-3 py-2 rounded-md text-white"
        >
          Login
        </button>
      )}
    </nav>
  );
};

export default Navbar;
