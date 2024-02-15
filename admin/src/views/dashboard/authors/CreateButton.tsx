import { CreateAuthorDto } from "@/gql/graphql";
import { gqlClient } from "@/utils/request";
import {
  Button,
  ButtonProps,
  FormControl,
  FormErrorMessage,
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
import { CREATE_ONE_AUTHOR_MUTATION } from "./gql";
import { createAuthorDtoResolver } from "./validators";

interface CreateButtonProps extends ButtonProps {
  onCreated?: () => void;
}
export default function CreateButton({
  onCreated,
  ...rest
}: CreateButtonProps) {
  const { onOpen, isOpen, onClose } = useDisclosure();
  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
  } = useForm<CreateAuthorDto>({
    defaultValues: {
      name: "",
      description: "",
    },
    resolver: createAuthorDtoResolver,
  });
  const toast = useToast();
  const { mutateAsync } = useMutation({
    mutationFn: (variable: CreateAuthorDto) =>
      gqlClient.request(CREATE_ONE_AUTHOR_MUTATION, {
        input: {
          author: variable,
        },
      }),
  });
  return (
    <>
      <Button onClick={onOpen} {...rest}>
        Thêm tác giả
      </Button>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent
          as={"form"}
          onSubmit={handleSubmit((data) => {
            console.log(data);
            mutateAsync(data)
              .then(() => {
                onCreated && onCreated();
                onClose();
                toast({
                  title: "Thêm tác giả thành công",
                  status: "success",
                  duration: 3000,
                  isClosable: true,
                });
              })
              .catch((err) => {
                toast({
                  title: "Thêm tác giả thất bại",
                  description: err.message,
                  status: "error",
                  duration: 3000,
                  isClosable: true,
                });
              });
          })}
        >
          <ModalHeader>Thêm tác giả</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <FormControl isRequired>
              <FormLabel>Id</FormLabel>
              <Input readOnly />
            </FormControl>
            <FormControl isRequired isInvalid={!!errors.name}>
              <FormLabel>Tên tác giả</FormLabel>
              <Input {...register("name")} />
              <FormErrorMessage>
                {errors.name && errors.name.message}
              </FormErrorMessage>
            </FormControl>
            <FormControl isInvalid={!!errors.description}>
              <FormLabel>Mô tả</FormLabel>
              <Textarea
                placeholder="Mô tả"
                {...register("description")}
              ></Textarea>
              <FormErrorMessage>
                {errors.description && errors.description.message}
              </FormErrorMessage>
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
