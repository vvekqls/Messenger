import '@/styles/globals.css';
import Sidebar from '../components/Sidebar/Sidebar';

export default function userLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Sidebar>
      <div className="h-full">{children}</div>
    </Sidebar>
  );
}
