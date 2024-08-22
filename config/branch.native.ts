import { router } from "expo-router";
import { useEffect } from "react";
import branch from "react-native-branch";

const useBranchConfig = () => {
  useEffect(() => {
    branch.setRequestMetadata("$analytics_visitor_id", "000001");
    branch.subscribe(({ error, params }: any) => {
      if (error) return;
      const { user_name, confirmation_code, otpCode }: any = params ?? {};
      console.log("params: ", params);
      if (params["+clicked_branch_link"]) {
        switch (params["~feature"]) {
          case "forgot-password":
            setTimeout(() => {
              router.back();
              router.push({
                pathname: "change-password",
                params: { user_name, confirmation_code },
              });
            }, 1000);
            break;
          case "complete-account":
            setTimeout(() => {
              router.push({
                pathname: "complete-account",
                params: {
                  user_name: params["~referring_link"].split("username=")[1],
                  otpCode,
                },
              });
            }, 1000);
            break;
        }
      }
    });
  }, []);
};

export default useBranchConfig;
