import { VStack } from "@gluestack-ui/themed";
import React from "react";

import ResetPasswordForm, {
  ResetPasswordViewProps,
} from "../../components/ResetPasswordForm";

const ForgotPasswordView: React.FC<ResetPasswordViewProps> = ({
  control,
  errors,
  doSubmit,
  modalWidth,
  watch,
  loading,
}) => (
  <VStack
    backgroundColor="$white"
    borderRadius={10}
    alignItems="center"
    width="100%"
    height="100%"
  >
    <ResetPasswordForm
      control={control}
      doSubmit={doSubmit}
      modalWidth={modalWidth}
      errors={errors}
      watch={watch}
      loading={loading}
    />
  </VStack>
);
export default ForgotPasswordView;
