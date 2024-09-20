import { useMutation, useQuery } from "@tanstack/react-query";
import { getShipments, loginAction } from "../actions/shippex.actions";
import { router } from "expo-router";

export const useLogin = () => {
  const { mutateAsync: handleLogin, isPending: isLoading } = useMutation({
    mutationFn: loginAction,
    onSuccess: async (data) => {
      console.log(data);
      //   router.navigate("/(tabs)/");
    },
    onError: (error) => {
      console.log(error);
      //   setErrorMsg(error);
    },
  });
  return {
    handleLogin,
    isLoading,
  };
};

export const useGetShipments = () => {
  const {
    data: shipments,
    isLoading: shipmentsLoading,
    refetch: refetchShipments,
  } = useQuery({
    queryFn: getShipments,
    queryKey: ["shipments"],
  });

  return {
    shipments,
    shipmentsLoading,
    refetchShipments,
  };
};
