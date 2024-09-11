import { useMutation } from "@tanstack/react-query"; 
import toast from "react-hot-toast";
import { apiConnector } from "../apiConnector";
import { contact } from "../apis"; 

const {
  CONTACT_US_API
} = contact;

export function useContactUsMutation() {
  return useMutation({
    mutationFn: ({ email, firstname, lastname, message, phoneNo, countrycode }) => {
      return apiConnector('POST', CONTACT_US_API, {
        email,
        firstname,
        lastname,
        message,
        phoneNo,
        countrycode
      });
    },
    onMutate: () => {
      toast.loading('Sending message...');
    },
    onSuccess: (response) => {
      toast.dismiss();
      if (!response.data.success) {
        throw new Error(response.data.msg);
      }
      toast.success('Message sent successfully');
      console.log("Response:", response);
    },
    onError: (error) => {
      toast.dismiss();
      const errorMessage = error.response?.data?.msg || 'Failed to send message';
      toast.error(errorMessage);
      console.error('Error:', errorMessage);
    }
  });
}
