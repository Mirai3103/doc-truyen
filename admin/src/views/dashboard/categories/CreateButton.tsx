import { CreateTagDto } from "@/gql/graphql";
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
  Select,
  Textarea,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { CREATE_ONE_TAG_MUTATION } from "./gql";
import { TAG_TYPES, TagType, createTagDtoResolver } from "./validators";

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
  } = useForm<CreateTagDto>({
    defaultValues: {
      name: "",
      description: "",
      type: TagType.Genre,
    },
    resolver: createTagDtoResolver,
  });
  const toast = useToast();
  const { mutateAsync } = useMutation({
    mutationFn: (variable: CreateTagDto) =>
      gqlClient.request(CREATE_ONE_TAG_MUTATION, {
        input: {
          tag: variable,
        },
      }),
  });
  return (
    <>
      <Button onClick={onOpen} {...rest}>
        Thêm thẻ
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
                  title: "Thêm thẻ thành công",
                  status: "success",
                  duration: 3000,
                  isClosable: true,
                });
              })
              .catch((err) => {
                toast({
                  title: "Thêm thẻ thất bại",
                  description: err.message,
                  status: "error",
                  duration: 3000,
                  isClosable: true,
                });
              });
          })}
        >
          <ModalHeader>Thêm thẻ</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <FormControl isRequired>
              <FormLabel>Id</FormLabel>
              <Input readOnly />
            </FormControl>
            <FormControl isRequired isInvalid={!!errors.name}>
              <FormLabel>Tên thẻ</FormLabel>
              <Input {...register("name")} />
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
