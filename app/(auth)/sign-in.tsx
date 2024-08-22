import SignIn from "@/features/auth/screens/SignIn";
import Head from "expo-router/head";

const SignInPage = () => {
  return (
    <>
      <Head>
        <title>Sign In</title>
      </Head>
      <SignIn />
    </>
  );
};

export default SignInPage;
