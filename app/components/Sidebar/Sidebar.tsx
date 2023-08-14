import DesktopSidebar from './DesktopSidebar/DesktopSidebar';
import MobileFooter from '../Footer/MobileFooter';
import getCurrentUser from '../../api/actions/getCurrentUser';

const Sidebar = async ({ children }: { children: React.ReactNode }) => {
  const currentUser = await getCurrentUser();
  return (
    <div className="h-full">
      <DesktopSidebar currentUser={currentUser} />
      <MobileFooter />
      <main className="lg:pl-20 h-full">{children}</main>
    </div>
  );
};

export default Sidebar;
