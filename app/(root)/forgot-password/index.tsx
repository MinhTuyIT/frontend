import Head from "expo-router/head";

import { ForgotPassword } from "@/features/auth";

const ForgotPasswordPage = () => {
  return (
    <>
      <Head>
        <title>Reset Password</title>
      </Head>
      <ForgotPassword />
    </>
  );
};

export default ForgotPasswordPage;
