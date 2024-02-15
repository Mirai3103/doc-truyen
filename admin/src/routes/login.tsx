import React from "react";
import {
  Box,
  Button,
  Checkbox,
  Divider,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Icon,
  Input,
  InputGroup,
  InputRightElement,
  Text,
  useColorModeValue,
  useToast,
} from "@chakra-ui/react";

import { FcGoogle } from "react-icons/fc";
import { MdOutlineRemoveRedEye } from "react-icons/md";
import { RiEyeCloseLine } from "react-icons/ri";
import { Link, createFileRoute, useRouter } from "@tanstack/react-router";
import { useForm } from "react-hook-form";
import { login } from "@/utils/auth.utils";

export const Route = createFileRoute("/login" as never)({
  component: SignIn,
});
interface SignInState {
  email: string;
  password: string;
}

function SignIn() {
  // Chakra color mode
  const textColor = useColorModeValue("navy.700", "white");
  const textColorSecondary = "gray.400";
  const textColorBrand = useColorModeValue("brand.500", "white");
  const googleBg = useColorModeValue("secondaryGray.300", "whiteAlpha.200");
  const googleText = useColorModeValue("navy.700", "white");
  const googleHover = useColorModeValue(
    { bg: "gray.200" },
    { bg: "whiteAlpha.300" }
  );
  const googleActive = useColorModeValue(
    { bg: "secondaryGray.300" },
    { bg: "whiteAlpha.200" }
  );
  const [show, setShow] = React.useState(false);
  const handleClick = () => setShow(!show);
  const toast = useToast();
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<SignInState>({
    defaultValues: {
      email: "",
      password: "",
    },
  });
  const onSubmit = (data: SignInState) => {
    login(data).then((res) => {
      if (res.success) {
        toast({
          colorScheme: "green",
          title: "Đăng nhập thành công",
          position: "top-right",
        });
        router.history.push("/dashboard");
      } else
        toast({
          colorScheme: "red",
          title: "Đăng nhập thất bại",
          description: res.error?.message,
        });
    });
  };
  return (
    <Flex
      maxW={{ base: "100%", md: "max-content" }}
      w="100%"
      mx={"auto"}
      me="auto"
      h="100%"
      alignItems="start"
      justifyContent="center"
      mb={{ base: "30px", md: "60px" }}
      px={{ base: "25px", md: "0px" }}
      mt={{ base: "40px", md: "7vh" }}
      flexDirection="column"
    >
      <Box me="auto">
        <Heading color={textColor} fontSize="36px" mb="10px">
          Đăng nhập
        </Heading>
        <Text
          mb="36px"
          ms="4px"
          color={textColorSecondary}
          fontWeight="400"
          fontSize="md"
        >
          Đăng nhập để quản lý truyện của bạn
        </Text>
      </Box>
      <Flex
        as={"form"}
        onSubmit={handleSubmit(onSubmit)}
        zIndex="2"
        direction="column"
        w={{ base: "100%", md: "420px" }}
        maxW="100%"
        background="transparent"
        borderRadius="15px"
        mx={{ base: "auto", lg: "unset" }}
        me="auto"
        mb={{ base: "20px", md: "auto" }}
      >
        <Button
          fontSize="sm"
          me="0px"
          mb="26px"
          py="15px"
          h="50px"
          borderRadius="16px"
          bg={googleBg}
          color={googleText}
          fontWeight="500"
          _hover={googleHover}
          _active={googleActive}
          _focus={googleActive}
        >
          <Icon as={FcGoogle} w="20px" h="20px" me="10px" />
          Đăng nhập với Google
        </Button>
        <Flex align="center" mb="25px">
          <Divider />
          <Text color="gray.400" mx="14px">
            hoặc
          </Text>
          <Divider />
        </Flex>
        <FormControl isRequired>
          <FormLabel
            display="flex"
            ms="4px"
            fontSize="sm"
            fontWeight="500"
            color={textColor}
            mb="8px"
          >
            Tên đăng nhập
          </FormLabel>
          <Input
            isRequired={true}
            variant="auth"
            fontSize="sm"
            ms={{ base: "0px", md: "0px" }}
            type="email"
            placeholder="username/email"
            mb="24px"
            fontWeight="500"
            size="lg"
            {...register("email", { required: "Email không được để trống" })}
          />
          <FormControl isRequired>
            <FormLabel
              ms="4px"
              fontSize="sm"
              fontWeight="500"
              color={textColor}
              display="flex"
            >
              Mật khẩu
            </FormLabel>
            <InputGroup size="md">
              <Input
                isRequired={true}
                fontSize="sm"
                placeholder="mật khẩu"
                mb="24px"
                size="lg"
                type={show ? "text" : "password"}
                variant="auth"
                {...register("password", {
                  required: "Mật khẩu không được để trống",
                })}
              />

              <InputRightElement display="flex" alignItems="center" mt="4px">
                <Icon
                  color={textColorSecondary}
                  _hover={{ cursor: "pointer" }}
                  as={show ? RiEyeCloseLine : MdOutlineRemoveRedEye}
                  onClick={handleClick}
                />
              </InputRightElement>
            </InputGroup>
          </FormControl>
          <Flex justifyContent="space-between" align="center" mb="24px">
            <FormControl display="flex" alignItems="center">
              <Checkbox
                id="remember-login"
                colorScheme="brandScheme"
                me="10px"
              />
              <FormLabel
                htmlFor="remember-login"
                mb="0"
                fontWeight="normal"
                color={textColor}
                fontSize="sm"
              >
                Lưu đăng nhập
              </FormLabel>
            </FormControl>
            <Link to="/forgot-password">
              <Text
                color={textColorBrand}
                fontSize="sm"
                w="124px"
                fontWeight="500"
              >
                Quên mật khẩu?
              </Text>
            </Link>
          </Flex>
          <Button
            fontSize="sm"
            colorScheme="blue"
            fontWeight="500"
            w="100%"
            h="50"
            mb="24px"
            isLoading={isSubmitting}
            type="submit"
          >
            Đăng nhập
          </Button>
        </FormControl>
      </Flex>
    </Flex>
  );
}

export default SignIn;
