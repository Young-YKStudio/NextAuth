import NextLink from 'next/link'
import { useRouter } from 'next/router'
import { useSession, signOut } from 'next-auth/react';

const Header = () => {
  const { data: session } = useSession();
  const { pathname } = useRouter();

  return (
    <nav className='fixed top-0 flex justify-center bg-indigo-200'>
      <ul className='flex gap-4'>
        <li><NextLink href='/'>Home</NextLink></li>
        { session ? <button onClick={() => signOut()}>LogOut</button> : <li><NextLink href='/login'>Login</NextLink></li>}
      </ul>
    </nav>
  );
}
export default Header;