import React, { useState } from "react";

import { useAuth } from "@/context/AuthContext";

import UserDetails from "./UserDetails";
import ConfirmationPopup from "../layout/ConfirmationPopup";

import { deleteUserById } from "@/lib/api";

import { useMutation, useQueryClient } from "@tanstack/react-query";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { TableCell, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Loader, Trash } from "lucide-react";

import { toast } from "sonner";

interface UserRowProps {
  user: UserType;
}

function UserRow({ user }: UserRowProps) {
  const [selectedUser, setSelectedUser] = useState<UserType | null>(null);
  const [confirmDelete, setConfirmDelete] = useState<boolean>(false);

  const { token } = useAuth();
  const queryClient = useQueryClient();
  const deleteMutation = useMutation({
    mutationFn: (userId: string) => deleteUserById(token as string, userId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["users", "analytics"] });
      toast.success("User deleted successfully");
      setSelectedUser(null);
    },
    onError: () => toast.error("Failed to delete user"),
  });

  return (
    <>
      <ConfirmationPopup
        isOpen={confirmDelete}
        message={`All the information for this user will be deleted.`}
        confirmText={`Delete/${user.firstName}-${user.lastName}`}
        onCancel={() => setConfirmDelete(false)}
        onConfirm={() => deleteMutation.mutate(user.id)}
      />
      {selectedUser && (
        <UserDetails
          user={selectedUser}
          setConfirmDelete={setConfirmDelete}
          onClose={() => setSelectedUser(null)}
        />
      )}
      <TableRow
        key={user.id}
        onClick={() => setSelectedUser(user)}
        className="cursor-pointer hover:bg-secondary/50"
      >
        <TableCell className=" text-nowrap">
          <div className="flex items-center space-x-3">
            <Avatar>
              <AvatarImage
                src={user.photoUrl || "/user.png"}
                alt={user.firstName}
              />
              <AvatarFallback>{user.firstName.charAt(0)}</AvatarFallback>
            </Avatar>
            <span>{`${user.firstName} ${user.lastName}`}</span>
          </div>
        </TableCell>
        <TableCell className=" text-nowrap">{user.email}</TableCell>
        <TableCell className=" text-nowrap">{user.birthDate}</TableCell>
        <TableCell className=" text-nowrap">{user.gender}</TableCell>
        <TableCell className="text-nowrap">
          <Button
            variant="ghost"
            size="icon"
            onClick={(e) => {
              e.stopPropagation();
              e.preventDefault();
              setConfirmDelete(true);
            }}
          >
            {deleteMutation.isPending ? (
              <Loader className="h-4 w-4" />
            ) : (
              <Trash className="h-4 w-4" />
            )}
          </Button>
        </TableCell>
      </TableRow>
    </>
  );
}

export default UserRow;
