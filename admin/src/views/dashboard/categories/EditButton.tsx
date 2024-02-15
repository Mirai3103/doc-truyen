import { Tag, UpdateTagDto } from "@/gql/graphql";
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
  Select,
  Textarea,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { FormErrorMessage } from "@chakra-ui/react";
import { UPDATE_ONE_TAG_MUTATION } from "./gql";
import { TAG_TYPES, updateTagDtoResolver } from "./validators";

interface EditButtonProps extends ButtonProps {
  tag: Tag;
  onEdited?: () => void;
}

export default function EditButton({
  tag,
  onEdited,
  ...props
}: EditButtonProps) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
  } = useForm<UpdateTagDto>({
    defaultValues: {
      name: tag.name,
      description: tag.description,
      type: tag.type,
    },
    resolver: updateTagDtoResolver,
  });
  const toast = useToast();
  const { mutateAsync } = useMutation({
    mutationFn: (variable: UpdateTagDto) =>
      gqlClient.request(UPDATE_ONE_TAG_MUTATION, {
        input: {
          id: tag._id,
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
                  title: "Cập nhật thẻ thành công",
                  status: "success",
                  duration: 3000,
                  isClosable: true,
                });
              })
              .catch((err) => {
                toast({
                  title: "Cập nhật thẻ thất bại",
                  status: "error",
                  duration: 3000,
                  isClosable: true,
                  description: err.message,
                });
              });
          })}
        >
          <ModalHeader>Sửa thẻ</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <FormControl isRequired>
              <FormLabel>Id</FormLabel>
              <Input defaultValue={tag._id} readOnly />
            </FormControl>
            <FormControl isRequired isInvalid={!!errors.name}>
              <FormLabel>Tên thẻ</FormLabel>
              <Input defaultValue={tag.name} {...register("name")} />
              <FormErrorMessage>
                {errors.name && errors.name.message}
              </FormErrorMessage>
            </FormControl>
            <FormControl isRequired isInvalid={!!errors.type}>
              <FormLabel>Loại thẻ</FormLabel>
              <Select placeholder="Chọn loại thẻ" {...register("type")}>
                {TAG_TYPES.map((type) => (
                  <option key={type.value} value={type.value}>
                    {type.label}
                  </option>
                ))}
              </Select>
              <FormErrorMessage>
                {errors.type && errors.type.message}
              </FormErrorMessage>
            </FormControl>
            <FormControl isInvalid={!!errors.description}>
              <FormLabel>Mô tả</FormLabel>
              <Textarea placeholder="Mô tả" {...register("description")}>
                {tag.description}
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
