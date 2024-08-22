import { Text } from "@/components/Elements";
import { Divider } from "@gluestack-ui/themed";
import { IRowProps } from "./RowContainer";

const RowView = ({ label, ...textProps }: IRowProps) => {
  return (
    <>
      <Divider my="$2" bgColor="$contentColorFooter" />
      <Text color="$white" fontFamily="$body" {...textProps}>
        {label}
      </Text>
    </>
  );
};

export default RowView;
