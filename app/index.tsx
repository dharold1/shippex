import { MainIconWhite } from "@/assets/icons/icons";
import Button from "@/components/ui/button";
import React, { useCallback, useEffect, useLayoutEffect, useMemo, useRef } from "react";
import { View, Text, StyleSheet, Pressable } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Portal } from "@gorhom/portal";
import { Colors } from "@/constants/Colors";
import { MaterialIcons } from "@expo/vector-icons";
import * as Yup from "yup";
import { Formik, FormikProps } from "formik";
import Input, { INPUT_TYPE } from "@/components/ui/Input";
import { router } from "expo-router";
import { useLogin } from "@/api/hooks/shippex.hooks";
import LoadingSpinner from "@/components/LoadingSpinner";
import { BottomSheet, BottomSheetRef } from "@/components/ui/BottomSheet";

export interface FormValues {
  usr: string;
  pwd: string;
}
const Index = () => {
  const { handleLogin, isLoading } = useLogin();
  const bottomSheetModalRef = useRef<BottomSheetRef>(null);

  // variables
  const snapPoints = useMemo(() => ["90%", "93%"], []);

  // callbacks
  const handlePresentModalPress = useCallback(() => {
    bottomSheetModalRef.current?.present();
  }, []);
  const handleCloseModalPress = useCallback(() => {
    bottomSheetModalRef.current?.close();
  }, []);
  const validationSchema = Yup.object().shape({
    usr: Yup.string()
      .email("Invalid email address")
      .required("Email is required"),
    pwd: Yup.string().required("Password is required"),
  });

 
  return (
    <>
      <SafeAreaView className="flex-1 py-12 px-6 justify-between items-center bg-primary">
        <View></View>

        <MainIconWhite />

        <Button
          onPress={handlePresentModalPress}
          className="bg-white w-full"
          _labelClassName="text-primary font-bold"
        >
          Login
        </Button>
      </SafeAreaView>
      <BottomSheet
        ref={bottomSheetModalRef}
        onPressBackdrop={handleCloseModalPress}
        index={1}
        snapPoints={snapPoints}
      >
        <LoadingSpinner visible={isLoading} />
        <Pressable
          onPress={handleCloseModalPress}
          className="py-2 flex-row px-3 mb-2"
        >
          <MaterialIcons
            name="arrow-back-ios"
            size={24}
            color={Colors.primary}
          />
          <Text className="text-lg text-primary">Cancel</Text>
        </Pressable>
        <View className="bg-white flex-1 px-3 h-full">
          <Text className="font-bold text-3xl">Login</Text>
          <Text className="mt-4 text-gray-200 text-lg">
            Please enter your First, Last name and your phone number in order to
            register
          </Text>
          <Formik
            onSubmit={(values) => {
              try {
                console.log(values);
                handleCloseModalPress();
                //   handleLogin(values);
                router.navigate("/(tabs)/");
              } catch (error) {}
            }}
            enableReinitialize
            validationSchema={validationSchema}
            initialValues={{
              usr: "",
              pwd: "",
            }}
          >
            {({
              handleChange,
              handleBlur,
              handleSubmit,
              errors,
              touched,
              values,
              dirty,
              isValid,
            }: FormikProps<FormValues>) => (
              <View className="px-2 flex-1 justify-between  ">
                <View style={{ gap: 25 }} className="mb-7 h-48 ">
                  <Input
                    bottomSheet
                    value={values.usr}
                    labelAnimated="Username / Email"
                    onBlur={handleBlur("usr")}
                    onChangeText={handleChange("usr")}
                    error={touched?.usr && errors.usr}
                  />
                  <Input
                    bottomSheet
                    value={values.pwd}
                    labelAnimated="Password"
                    onBlur={handleBlur("pwd")}
                    onChangeText={handleChange("pwd")}
                    type={INPUT_TYPE.PASSWORD}
                    error={touched?.pwd && errors.pwd}
                  />
                </View>
                <Button
                  disabled={!isValid}
                  onPress={() => {
                    handleSubmit();
                  }}
                  className={`w-full bottom-0 ${!isValid && "bg-[#eae7f2]"}`}
                  _labelClassName={`font-bold ${!isValid && "text-[#A7A3B3]"}`}
                >
                  Login
                </Button>
              </View>
            )}
          </Formik>
        </View>
      </BottomSheet>
    </>
  );
};

export default Index;
