import DesktopSidebar from './DesktopSidebar/DesktopSidebar';
import MobileFooter from '../Footer/MobileFooter';

const Sidebar = async ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="h-full">
      <DesktopSidebar />
      <MobileFooter />
      <main className="lg:pl-20 h-full">{children}</main>
    </div>
  );
};

export default Sidebar;
