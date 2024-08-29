import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import UserRow from "./UserRow";

interface UserTableProps {
  users: UserType[];
}

const UserTable: React.FC<UserTableProps> = ({ users }) => {
  return (
    <div className="w-full overflow-x-auto">
      <Table className="min-w-full table-auto">
        <TableHeader>
          <TableRow>
            <TableHead className="w-1/5">User</TableHead>
            <TableHead className="w-1/4">Email</TableHead>
            <TableHead className="w-1/5">Birth Date</TableHead>
            <TableHead className="w-1/5">Gender</TableHead>
            <TableHead className="w-1/5">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {users.map((user) => (
            <UserRow key={user.id} user={user} />
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default UserTable;
