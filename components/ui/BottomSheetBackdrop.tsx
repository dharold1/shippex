import React from 'react';
import { Pressable, View } from 'react-native';

const BottomSheetBackdrop = ({
   isOpen,
   onPress,
}: {
   isOpen: boolean;
   onPress?: () => void;
}) => {
   return (
      <>
         {isOpen && (
            <Pressable
               onPress={onPress}
               style={{
                  position: 'absolute',
                  flex: 1,
                  backgroundColor: 'rgba(51, 51, 51, 0.4)',
                  width: '100%',
                  height: '100%',
               }}
            ></Pressable>
         )}
      </>
   );
};

export default BottomSheetBackdrop;
