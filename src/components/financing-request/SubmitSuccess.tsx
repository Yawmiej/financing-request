import { Button } from "@heroui/button";
import { CircleCheckBigIcon } from "lucide-react";

import { useRequestForm } from "@/context/RequestFormProvider";

export const SubmitSuccess = () => {
  const { setIsSuccess } = useRequestForm();

  return (
    <div className="flex flex-col items-center text-center justify-center h-[calc(100vh-10rem)]">
      <CircleCheckBigIcon className="w-24 h-24 text-green-500 mb-5" />
      <h1 className="text-2xl font-bold mb-3">Request submitted successfully</h1>
      <p className=" text-gray-500">
        We will review your request and get back to you shortly. Thank you for your patience.
      </p>
      <Button variant="flat" className="mt-5" onClick={() => setIsSuccess(false)}>
        Submit Another
      </Button>
    </div>
  );
};
