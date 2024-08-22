import { StripeProvider } from "@stripe/stripe-react-native";
import { ChildrenProps } from "./StripeWrapperContainer";

const StripeWrapperView = ({ children }: ChildrenProps) => {
  return (
    <StripeProvider
      publishableKey={process.env.EXPO_PUBLIC_STRIPE_PUBLISHABLE_KEY as string}
      // merchantIdentifier="merchant.identifier" // required for Apple Pay
      urlScheme="probsteinauctions"
    >
      {children}
    </StripeProvider>
  );
};
export default StripeWrapperView;
