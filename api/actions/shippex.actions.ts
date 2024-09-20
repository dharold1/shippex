import { FormValues } from "@/app";
import { http } from "../config";

export const loginAction = async (formdata: FormValues) => {
  try {
    const res = await http.post("/user/signin", formdata);
    return res.data;
  } catch (error: unknown) {
    console.log(error);
    throw error;
  }
};

export const getShipments = async () => {
  try {
    const res = await http.get("/frappe.client.get_list");
    return res.data;
  } catch (error: unknown) {
    console.log(error);
    
    throw error;
  }
};
