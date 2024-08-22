import Head from "expo-router/head";

import { ResetPassword } from "@/features/auth";

const ForgotPasswordPage = () => {
  return (
    <>
      <Head>
        <title>Change Password</title>
      </Head>
      <ResetPassword />
    </>
  );
};

export default ForgotPasswordPage;
