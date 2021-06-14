import { toast } from "react-toastify";

export const showToast = (
  msg: string,
  type: "success" | "error" = "success"
) => {
  switch (type) {
    case "error":
      toast.error(msg, {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      break;
    case "success":
      toast.success(msg, {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      break;
    default:
      console.error("Invalid toast type");
  }
};
