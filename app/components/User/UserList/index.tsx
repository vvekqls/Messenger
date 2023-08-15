'use client';
import { User } from '@prisma/client';
import Userbox from '../Userbox';

interface UserListProps {
  users: User[];
}

const UserList: React.FC<UserListProps> = ({ users }) => {
  return (
    <aside
      className="
        fixed
        insett-y-0
        pb-20
        lg:pb-0
        lg:left-20
        lg:w-80
        lg:block
        overflow-y-auto
        border-r
        border-gray-200 
        block 
        w-full  
        left-0
      "
    >
      <div className="px-5">
        <div className="flex-col">
          <div
            className="
            text-2xl  
            fontt-bold
            text-neutral-800  
            py-4
          "
          >
            people
          </div>
          {users.map((user) => {
            return (
              <Userbox
                key={user.id}
                data={user}
              />
            );
          })}
        </div>
      </div>
    </aside>
  );
};

export default UserList;
