'use clients';

import clsx from 'clsx';
import useConversation from '@/app/hooks/useConversatiton';
import EmptyState from '@/app/components/EmptyState';
import { HiDocumentDownload } from 'react-icons/hi';

const Home = () => {
  const { isOpen } = useConversation();

  return (
    <div
      className={clsx('lg:pl-80 h-full lg:block', isOpen ? 'block' : 'hidden')}
    >
      <EmptyState />
    </div>
  );
};
