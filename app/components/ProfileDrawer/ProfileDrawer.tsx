'use clients';

import { Conversation, User } from '@prisma/client';

interface ProfileDrawerProps {
  data: Conversation & {
    users: User[];
  };
  isOpen: boolean;
  onClose: () => void;
}

const ProfileDrawer: React.FC<ProfileDrawerProps> = ({
  data,
  isOpen,
  onClose,
}) => {
  return <div>Drawer</div>;
};

export default ProfileDrawer;
