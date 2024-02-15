/* eslint-disable @typescript-eslint/no-explicit-any */
import { Tag } from "@/gql/graphql";
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
import { DELETE_ONE_TAG_MUTATION } from "./gql";

interface DeleteButtonProps extends ButtonProps {
  tag: Tag;
  onDeleted?: () => void;
}

export default function DeleteButton({
  tag,
  onDeleted,
  ...props
}: DeleteButtonProps) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const cancelRef = React.useRef<any>();
  const toast = useToast();
  const { mutateAsync } = useMutation({
    mutationFn: () =>
      gqlClient.request(DELETE_ONE_TAG_MUTATION, {
        input: {
          id: tag._id!,
        },
      }),
  });
  const handleDelete = async () => {
    try {
      await mutateAsync();
      toast({
        title: "Xóa thẻ thành công",
        status: "success",
        colorScheme: "green",
      });
      onDeleted?.();
    } catch (error) {
      toast({
        title: "Error",
        description: "Có lỗi xảy ra khi xóa thẻ",
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
              Bạn có chắc chắn muốn xóa thẻ {tag.name} không?
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
