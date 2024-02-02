"use client";
import React from "react";
import { useForm } from "react-hook-form";
import { CreateUserDto, resolver } from "./validator";
import { LockIcon, MailIcon } from "@/components/LoginModal";
import { Button, Input } from "@nextui-org/react";
import axios from "axios";
import Cookies from "universal-cookie";
import moment from "moment";
import { useRecoilState } from "recoil";
import userStore from "@/store/userStore";
import { useRouter } from "next/navigation";
export default function RegisterForm() {
  const {
    register,
    formState: { errors, isSubmitting },
    handleSubmit,
  } = useForm<CreateUserDto>({
    resolver,
  });
  const [userState, setUserState] = useRecoilState(userStore);
  const router = useRouter();
  const onSubmit = async (data: CreateUserDto) => {
    data.username = data.email;
    const res = await axios.post("/api/auth/register", {
      ...data,
    });
    const {
      accessToken,
      refreshToken,
      accessTokenExpiresIn,
      refreshTokenExpiresIn,
    } = res.data;
    const cookies = new Cookies();
    cookies.set("accessToken", accessToken, {
      expires: moment(moment())
        .add(accessTokenExpiresIn, "milliseconds")
        .toDate(),
    });
    cookies.set("refreshToken", refreshToken, {
      expires: moment(moment())
        .add(refreshTokenExpiresIn, "milliseconds")
        .toDate(),
    });
    const res2: any = axios.get("/api/auth/profile");

    alert("Đăng ký thành công");
    await res2;
    setUserState({
      ...userState,
      isAuthenticated: true,
      isLoading: false,
      profile: res2.data,
    });
    router.push("/");
  };
  return (
    <form className="flex flex-col gap-5" onSubmit={handleSubmit(onSubmit)}>
      <div className="text-red-500">{errors.root?.message}</div>
      <Input
        autoFocus
        endContent={
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="text-2xl w-6 h-6 text-default-400 pointer-events-none flex-shrink-0"
          >
            <path
              fillRule="evenodd"
              d="M7.5 6a4.5 4.5 0 1 1 9 0 4.5 4.5 0 0 1-9 0ZM3.751 20.105a8.25 8.25 0 0 1 16.498 0 .75.75 0 0 1-.437.695A18.683 18.683 0 0 1 12 22.5c-2.786 0-5.433-.608-7.812-1.7a.75.75 0 0 1-.437-.695Z"
              clipRule="evenodd"
            />
          </svg>
        }
        label="Tên hiển thị"
        placeholder="Nhập tên hiển thị của bạn"
        variant="bordered"
        {...register("displayName")}
      />
      <Input
        autoFocus
        endContent={
          <MailIcon className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />
        }
        label="Email"
        placeholder="Nhập email của bạn"
        variant="bordered"
        {...register("email")}
      />
      <Input
        endContent={
          <LockIcon className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />
        }
        label="Password"
        placeholder="Nhập mật khẩu của bạn"
        type="password"
        variant="bordered"
        {...register("rawPassword")}
      />

      <div className="flex justify-end ">
        <Button
          size="lg"
          color="primary"
          type="submit"
          isLoading={isSubmitting}
        >
          Đăng ký
        </Button>
      </div>
    </form>
  );
}
