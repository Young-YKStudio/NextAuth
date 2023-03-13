import { useRouter } from 'next/router'
import { useSession } from 'next-auth/react';
import HorizontalHeader from './horizontalHeader';
import VerticalHeader from './verticalHeader';
import { MdHome, MdSpaceDashboard } from "react-icons/md";

const navigations = [
  {
    name: 'Home',
    href: '/',
    icon: <MdHome className='mr-2 w-5 h-5'/>
  },
  {
    name: 'Dashboard',
    href: '/dashboard',
    icon: <MdSpaceDashboard className='mr-2 w-5 h-5'/>
  },
]

const Header = () => {
  const { data: session } = useSession();
  const { pathname } = useRouter();

  console.log(pathname, session, 'from header')

  const verticalHeaderSetter = () => {
    if (pathname.includes('/dashboard')) {
      return <VerticalHeader navigations={navigations} session={session} path={pathname} />
    } else if (pathname === '/login') {
      return null
    } else {
      return <HorizontalHeader navigations={navigations} session={session} />
    }
  }

  return (
    <>
      {verticalHeaderSetter()}
    </>
  );
}
export default Header;