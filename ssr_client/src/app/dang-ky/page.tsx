import { getAccessToken } from "@/core/utils/server.util";
import { redirect } from "next/navigation";
import React from "react";
import RegisterForm from "./RegisterForm";

export default async function RegisterPage() {
  const token = await getAccessToken();

  if (token) {
    redirect("/");
  }
  return (
    <div className=" min-h-[100vh] grid place-items-center ">
      <div className=" max-w-lg w-full -translate-y-1/3">
        <div className="flex gap-x-4 mb-4">
          <div className="w-unit-sm  bg-primary-400"></div>
          <div className="flex-1 text-2xl font-semibold text-primary-400">
            Đăng ký tài khoản
          </div>
        </div>
        <RegisterForm />
      </div>
    </div>
  );
}
