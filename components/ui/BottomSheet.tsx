import {
  BottomSheetModal,
  BottomSheetProps as GorhomSheetProps,
  BottomSheetModalProps,
} from "@gorhom/bottom-sheet";
import { Portal } from "@gorhom/portal";
import React, { ReactNode } from "react";
import BottomSheetBackdrop from "./BottomSheetBackdrop";

type BottomSheetProps = BottomSheetModalProps;
interface CustomButtomSheetProps extends BottomSheetProps {
  children: ReactNode;
  showBackdrop?: boolean;
  onPressBackdrop?: () => void;
}
type BottomSheetRef = BottomSheetModal;

const BottomSheet = React.forwardRef<BottomSheetModal, CustomButtomSheetProps>(
  (props, ref) => {
    return (
      <Portal>
        <BottomSheetBackdrop
          isOpen={props.showBackdrop ?? false}
          onPress={props.onPressBackdrop}
        />
        <BottomSheetModal
          ref={ref}
          index={1}
          {...props}
          enablePanDownToClose
          style={{
            flex: 1,
          }}
          backgroundStyle={[
            {
              borderRadius: 20,
              overflow: "hidden",
              flex: 1,
              shadowRadius: 2,
              shadowOffset: { width: 0, height: -3 },
              elevation: 6,
              shadowOpacity: 1,
            },
          ]}
          handleIndicatorStyle={[
            {
              backgroundColor: "#A7A3B3",
              paddingVertical: 4,
              paddingHorizontal: 25,
            },
          ]}
        >
          {props.children}
        </BottomSheetModal>
      </Portal>
    );
  }
);

BottomSheet.displayName = "BottomSheet";

export { BottomSheet, BottomSheetRef };
