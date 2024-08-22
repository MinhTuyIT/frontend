/* eslint-disable max-lines */
import {
  Button,
  ButtonSpinner,
  ButtonText,
  CheckIcon,
  Checkbox,
  CheckboxIcon,
  CheckboxIndicator,
  CheckboxLabel,
  FormControl,
  FormControlError,
  FormControlErrorIcon,
  FormControlErrorText,
  FormControlLabel,
  FormControlLabelText,
  Input,
  InputField,
  VStack,
} from "@gluestack-ui/themed";
import { Control, Controller, FieldErrors } from "react-hook-form";

import { IconAlert } from "@/components/Elements";

interface Props {
  control: Control<IForm>;
  errors: FieldErrors<IForm>;
  isSubmitting: boolean;
  isValid: boolean;
  onSubmit: () => void;
  onCancel: () => void;
}

export interface IForm {
  name: string;
  serial: string;
  isAutograph: boolean;
  code: string;
  parallel: string;
}

const UserFormView = ({
  control,
  errors,
  isSubmitting,
  isValid,
  onSubmit,
  onCancel,
}: Props) => (
  <VStack gap="$6" m="$4">
    <Controller
      name="name"
      control={control}
      render={({ field: { onChange, onBlur, value } }) => (
        <FormControl size="md" isInvalid={!!errors.name?.message}>
          <FormControlLabel mb="$2">
            <FormControlLabelText>Name</FormControlLabelText>
          </FormControlLabel>
          <Input size="xl" isDisabled={isSubmitting} borderWidth="$1">
            <InputField
              onBlur={onBlur}
              value={value}
              onChangeText={onChange}
              inputMode="text"
              placeholder="0000000000"
              onSubmitEditing={!isValid ? undefined : onSubmit}
              returnKeyType="next"
              accessibilityLabel="Set Name Input"
              fontSize="$lg"
              width="$full"
            />
          </Input>
          <FormControlError accessibilityRole="alert">
            <FormControlErrorIcon as={IconAlert} size="2xs" color="$error700" />
            <FormControlErrorText fontSize="$xs" fontFamily="$bodyLight">
              {errors.name?.message ?? ""}
            </FormControlErrorText>
          </FormControlError>
        </FormControl>
      )}
    />

    <Controller
      name="parallel"
      control={control}
      render={({ field: { onChange, onBlur, value } }) => (
        <FormControl size="md" isInvalid={!!errors.parallel?.message}>
          <FormControlLabel mb="$2">
            <FormControlLabelText>Parallel</FormControlLabelText>
          </FormControlLabel>
          <Input size="xl" isDisabled={isSubmitting} borderWidth="$1">
            <InputField
              onBlur={onBlur}
              value={value}
              onChangeText={onChange}
              inputMode="text"
              placeholder="0000000000"
              onSubmitEditing={!isValid ? undefined : onSubmit}
              returnKeyType="next"
              accessibilityLabel="Set Parallel Input"
              fontSize="$lg"
              width="$full"
            />
          </Input>
          <FormControlError accessibilityRole="alert">
            <FormControlErrorIcon as={IconAlert} size="2xs" color="$error700" />
            <FormControlErrorText fontSize="$xs" fontFamily="$bodyLight">
              {errors.parallel?.message ?? ""}
            </FormControlErrorText>
          </FormControlError>
        </FormControl>
      )}
    />

    <Controller
      name="serial"
      control={control}
      render={({ field: { onChange, onBlur, value } }) => (
        <FormControl size="md" isInvalid={!!errors.serial?.message}>
          <FormControlLabel mb="$2">
            <FormControlLabelText>Serial</FormControlLabelText>
          </FormControlLabel>
          <Input size="xl" isDisabled={isSubmitting} borderWidth="$1">
            <InputField
              onBlur={onBlur}
              value={value}
              onChangeText={onChange}
              inputMode="text"
              placeholder="Enter Serial"
              onSubmitEditing={!isValid ? undefined : onSubmit}
              returnKeyType="next"
              accessibilityLabel="Set Serial Input"
              fontSize="$lg"
              width="$full"
            />
          </Input>
          <FormControlError accessibilityRole="alert">
            <FormControlErrorIcon as={IconAlert} size="2xs" color="$error700" />
            <FormControlErrorText fontSize="$xs" fontFamily="$bodyLight">
              {errors.serial?.message ?? ""}
            </FormControlErrorText>
          </FormControlError>
        </FormControl>
      )}
    />

    <Controller
      name="code"
      control={control}
      render={({ field: { onChange, onBlur, value } }) => (
        <FormControl size="md" isInvalid={!!errors.code?.message}>
          <FormControlLabel mb="$2">
            <FormControlLabelText>Code</FormControlLabelText>
          </FormControlLabel>
          <Input size="xl" isDisabled={isSubmitting} borderWidth="$1">
            <InputField
              onBlur={onBlur}
              value={value}
              onChangeText={onChange}
              inputMode="text"
              placeholder="Enter Code"
              onSubmitEditing={!isValid ? undefined : onSubmit}
              returnKeyType="next"
              accessibilityLabel="Set Code Input"
              fontSize="$lg"
              width="$full"
            />
          </Input>
          <FormControlError accessibilityRole="alert">
            <FormControlErrorIcon as={IconAlert} size="2xs" color="$error700" />
            <FormControlErrorText fontSize="$xs" fontFamily="$bodyLight">
              {errors.code?.message ?? ""}
            </FormControlErrorText>
          </FormControlError>
        </FormControl>
      )}
    />

    <Controller
      name="isAutograph"
      control={control}
      render={({ field: { onChange, value } }) => (
        <FormControl size="md" isInvalid={!!errors.code?.message}>
          <Checkbox
            accessibilityLabel="Is Autograph Checkbox"
            isChecked={!!value}
            onChange={onChange}
            value="1"
          >
            <CheckboxIndicator mr="$2">
              <CheckboxIcon as={CheckIcon} />
            </CheckboxIndicator>
            <CheckboxLabel accessibilityLabel="Is Autograph Label">
              Is Autograph?
            </CheckboxLabel>
          </Checkbox>

          <FormControlError accessibilityRole="alert">
            <FormControlErrorIcon as={IconAlert} size="2xs" color="$error700" />
            <FormControlErrorText fontSize="$xs" fontFamily="$bodyLight">
              {errors.code?.message ?? ""}
            </FormControlErrorText>
          </FormControlError>
        </FormControl>
      )}
    />
    <Button
      isDisabled={isSubmitting || !isValid}
      onPress={onSubmit}
      size="xl"
      rounded="$full"
      accessibilityLabel="Submit"
      accessibilityRole="button"
    >
      {isSubmitting ? (
        <ButtonSpinner />
      ) : (
        <ButtonText color="$textLight0">Submit</ButtonText>
      )}
    </Button>

    <Button
      isDisabled={isSubmitting}
      onPress={onCancel}
      size="xl"
      rounded="$full"
      accessibilityLabel="Cancel"
      accessibilityRole="button"
      action="negative"
    >
      {isSubmitting ? (
        <ButtonSpinner />
      ) : (
        <ButtonText color="$textLight0">Cancel</ButtonText>
      )}
    </Button>
  </VStack>
);

export default UserFormView;
