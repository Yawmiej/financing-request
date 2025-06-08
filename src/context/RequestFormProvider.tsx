import { createContext, useContext, useState } from "react";

interface RequestFormContextType {
  isSuccess: boolean;
  setIsSuccess: (isSuccess: boolean) => void;
}

const RequestFormContext = createContext<RequestFormContextType>({
  isSuccess: false,
  setIsSuccess: () => {},
});

export const RequestFormProvider = ({ children }: { children: React.ReactNode }) => {
  const [isSuccess, setIsSuccess] = useState(false);

  return (
    <RequestFormContext.Provider value={{ isSuccess, setIsSuccess }}>
      {children}
    </RequestFormContext.Provider>
  );
};

export const useRequestForm = () => useContext(RequestFormContext);
