import { SubmitSuccess } from "./SubmitSuccess";
import { CreateRequestForm } from "./CreateRequestForm";

import { useRequestForm } from "@/context/RequestFormProvider";

export const FinancingRequest = () => {
  const { isSuccess } = useRequestForm();

  return <div>{isSuccess ? <SubmitSuccess /> : <CreateRequestForm />}</div>;
};
