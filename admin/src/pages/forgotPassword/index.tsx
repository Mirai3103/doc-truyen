import { AuthPage, ThemedTitleV2 } from "@refinedev/chakra-ui";
import { AppIcon } from "../../components/app-icon";

export const ForgotPassword = () => {
  return (
    <AuthPage
      type="forgotPassword"
      title={
        <ThemedTitleV2
          collapsed={false}
          text="Quản lý truyện"
          icon={<AppIcon />}
        />
      }
    />
  );
};
