/* eslint-disable @typescript-eslint/no-explicit-any */
import { Author } from "@/gql/graphql";
import { gqlClient } from "@/utils/request";
import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
  Button,
  ButtonProps,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import { useMutation } from "@tanstack/react-query";
import React from "react";
import { DELETE_ONE_AUTHOR_MUTATION } from "./gql";

interface DeleteButtonProps extends ButtonProps {
  author: Author;
  onDeleted?: () => void;
}

export default function DeleteButton({
  author,
  onDeleted,
  ...props
}: DeleteButtonProps) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const cancelRef = React.useRef<any>();
  const toast = useToast();
  const { mutateAsync } = useMutation({
    mutationFn: () =>
      gqlClient.request(DELETE_ONE_AUTHOR_MUTATION, {
        input: {
          id: author._id,
        },
      }),
  });
  const handleDelete = async () => {
    try {
      await mutateAsync();
      toast({
        title: "Xóa tác giả thành công",
        status: "success",
        colorScheme: "green",
      });
      onDeleted?.();
    } catch (error) {
      toast({
        title: "Error",
        description: "Có lỗi xảy ra khi xóa tác giả",
        status: "error",
        colorScheme: "red",
      });
    }
    onClose();
  };
  return (
    <>
      <Button onClick={onOpen} {...props}></Button>
      <AlertDialog
        leastDestructiveRef={cancelRef}
        isOpen={isOpen}
        onClose={onClose}
      >
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize="lg" fontWeight="bold">
              Cảnh báo
            </AlertDialogHeader>

            <AlertDialogBody>
              Bạn có chắc chắn muốn xóa tác giả {author.name} không?
            </AlertDialogBody>

            <AlertDialogFooter>
              <Button ref={cancelRef} onClick={onClose}>
                Hủy
              </Button>
              <Button colorScheme="red" onClick={handleDelete} ml={3}>
                Xóa
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </>
  );
}
