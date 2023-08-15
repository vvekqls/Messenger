import '@/styles/globals.css';
import getUsers from '../../api/actions/getUsers';
import Sidebar from '../../components/Sidebar/Sidebar';
import UserList from '@/app/components/User/UserList';

export default async function userLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const users = await getUsers();
  return (
    <Sidebar>
      <div className="h-full">
        <UserList users={users} />
        {children}
      </div>
    </Sidebar>
  );
}
