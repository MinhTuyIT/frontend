import { Text } from "@gluestack-ui/themed";
import { ComponentProps, FC } from "react";
interface ITextProps extends Omit<ComponentProps<typeof Text>, ""> {
  content?: string;
}

const TextView: FC<ITextProps> = ({ content, children, ...rest }) => {
  return (
    <Text fontSize="$sm" {...rest}>
      {content || children}
    </Text>
  );
};

export default TextView;
