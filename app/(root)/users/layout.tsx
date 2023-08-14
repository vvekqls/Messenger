import '@/styles/globals.css';
import Sidebar from '../../components/Sidebar/Sidebar';
import getUsers from '../../api/actions/getUsers';

export default async function userLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const users = await getUsers();
  return (
    <Sidebar>
      <div className="h-full">
        {/* <UserList items={users} /> */}
        {children}
      </div>
    </Sidebar>
  );
}
