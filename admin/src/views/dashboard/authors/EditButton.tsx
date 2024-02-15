import { Author, UpdateAuthorDto } from "@/gql/graphql";
import { gqlClient } from "@/utils/request";
import {
  Button,
  ButtonProps,
  FormControl,
  FormLabel,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Textarea,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { FormErrorMessage } from "@chakra-ui/react";
import { UPDATE_ONE_AUTHOR_MUTATION } from "./gql";
import { updateAuthorDtoResolver } from "./validators";

interface EditButtonProps extends ButtonProps {
  author: Author;
  onEdited?: () => void;
}

export default function EditButton({
  author,
  onEdited,
  ...props
}: EditButtonProps) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
  } = useForm<UpdateAuthorDto>({
    defaultValues: {
      name: author.name,
      description: author.description,
    },
    resolver: updateAuthorDtoResolver,
  });
  const toast = useToast();
  const { mutateAsync } = useMutation({
    mutationFn: (variable: UpdateAuthorDto) =>
      gqlClient.request(UPDATE_ONE_AUTHOR_MUTATION, {
        input: {
          id: author._id,
          update: variable,
        },
      }),
  });
  return (
    <>
      <Button onClick={onOpen} {...props}></Button>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent
          as={"form"}
          onSubmit={handleSubmit((data) => {
            mutateAsync(data)
              .then(() => {
                onEdited?.();
                onClose();
                toast({
                  title: "Cập nhật tác giả thành công",
                  status: "success",
                  duration: 3000,
                  isClosable: true,
                });
              })
              .catch((err) => {
                toast({
                  title: "Cập nhật tác giả thất bại",
                  status: "error",
                  duration: 3000,
                  isClosable: true,
                  description: err.message,
                });
              });
          })}
        >
          <ModalHeader>Sửa tác giả</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <FormControl isRequired>
              <FormLabel>Id</FormLabel>
              <Input defaultValue={author._id} readOnly />
            </FormControl>
            <FormControl isRequired isInvalid={!!errors.name}>
              <FormLabel>Tên tác giả</FormLabel>
              <Input defaultValue={author.name} {...register("name")} />
              <FormErrorMessage>
                {errors.name && errors.name.message}
              </FormErrorMessage>
            </FormControl>
            <FormControl isInvalid={!!errors.description}>
              <FormLabel>Mô tả</FormLabel>
              <Textarea placeholder="Mô tả" {...register("description")}>
                {author.description}
              </Textarea>
            </FormControl>
          </ModalBody>

          <ModalFooter>
            <Button onClick={onClose} variant="ghost" type="reset">
              Huỷ
            </Button>

            <Button
              colorScheme="blue"
              mr={3}
              type="submit"
              isLoading={isSubmitting}
            >
              Lưu
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
