import Head from "expo-router/head";

import { HomeScreen } from "@/features/home";

const Index = () => {
  return (
    <>
      <Head>
        <title>Home</title>
      </Head>
      <HomeScreen />
    </>
  );
};

export default Index;
