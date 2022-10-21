import { useState } from "react";
import { axiosInterface } from "../../helper/axiosInterface";
import { Customer } from "../../interfaces/customer";
import { useToastNotification } from "../helpers/useToastNotification";

export const useCustomers = () => {
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { notificationApi } = useToastNotification();

  const getCustomers = async () => {
    try {
      setIsLoading(true);
      const resp = await axiosInterface.get<Customer[]>(
        "customer/getCustomers"
      );
      setCustomers(resp.data);
    } catch (error: any) {
      console.error(error);
      notificationApi.showNotification(
        notificationApi.notificationType.Error,
        notificationApi.genericMessage.Error
      );
    } finally {
      setIsLoading(false);
    }
  };

  const upsertCustomer = async (customer: Customer) => {
    try {
      const resp =
        customer?.CustomerId && customer?.CustomerId > 0
          ? axiosInterface.post("customer/updateCustomer", customer)
          : axiosInterface.put("customer/createCustomer", customer);

      if ((await resp)?.data)
        notificationApi.showNotification(
          notificationApi.notificationType.Success,
          notificationApi.genericMessage.Success
        );
    } catch (error) {
      console.error(error);
      notificationApi.showNotification(
        notificationApi.notificationType.Error,
        notificationApi.genericMessage.Error
      );
    } finally {
      getCustomers();
    }
  };

  const customerApi = {
    getCustomers,
    upsertCustomer,
  };

  return {
    customers,
    isLoading,
    customerApi,
  };
};
