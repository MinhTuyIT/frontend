import React, {
  forwardRef,
  useCallback,
  useEffect,
  useImperativeHandle,
  useState,
} from "react";
import {
  NativeSyntheticEvent,
  TextInputSelectionChangeEventData,
} from "react-native";
import { useBlurOnFulfill } from "react-native-confirmation-code-field";

import ConfirmationCodeFieldView from "./ConfirmationCodeFieldView";

interface Props {
  value: string;
  cellCount: number;
  pattern?: RegExp;
  isInvalid?: boolean;
  isSubmitting?: boolean;

  onFinished: (value: string) => void;
  onChange?: (value: string) => void;
}

export interface ConfirmationCodeFieldRef {
  onFocus: () => void;
}

type SelectionValue = { start: number; end?: number | undefined } | undefined;

const ConfirmationCodeFieldContainer = forwardRef<
  ConfirmationCodeFieldRef,
  Props
>(
  (
    {
      onFinished,
      onChange,
      value = "",
      cellCount,
      isInvalid = false,
      isSubmitting = false,
    },
    ref
  ) => {
    const inputRef = useBlurOnFulfill({ value, cellCount });
    const [selection, setSelection] = useState<SelectionValue>({
      start: 0,
      end: 0,
    });

    useImperativeHandle(
      ref,
      () => ({
        onFocus: () => {
          inputRef.current?.focus();
        },
      }),
      [inputRef]
    );

    const handleSelectionChange = useCallback(
      (event: NativeSyntheticEvent<TextInputSelectionChangeEventData>) => {
        const {
          selection: { start, end },
        } = event.nativeEvent;
        /**
         * When users click on the border of the input, the cursor will jump to the beginning.
         * The cursor position must always be at the end of the input.
         */
        if (value.length > 0 && (start === 0 || end === 0)) {
          setSelection({ start: value.length, end: value.length });
        }
      },
      [value.length]
    );

    useEffect(() => {
      if (value.length === cellCount) {
        onFinished(value);
      }
    }, [value, cellCount, onFinished]);

    return (
      <ConfirmationCodeFieldView
        ref={inputRef}
        value={value}
        cellCount={cellCount}
        isInvalid={isInvalid}
        maxLength={undefined}
        editable={!isSubmitting}
        selection={selection}
        onChangeText={onChange}
        onSelectionChange={handleSelectionChange}
      />
    );
  }
);

ConfirmationCodeFieldContainer.displayName = "ConfirmationCodeFieldContainer";

export default ConfirmationCodeFieldContainer;
