import { Button } from "@heroui/button";
import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";

import { ThemeSwitch } from "@/components/theme-switch";
import SimpleLayout from "@/layouts/simple";
import { RequestFormProvider } from "@/context/RequestFormProvider";
import { FinancingRequest } from "@/components/financing-request";

const FinancingRequestPage = () => {
  return (
    <SimpleLayout>
      <div className="flex justify-between mb-6">
        <Button as={Link} to="/" startContent={<ArrowLeft />} variant="light" size="sm">
          Back
        </Button>
        <ThemeSwitch />
      </div>
      <RequestFormProvider>
        <FinancingRequest />
      </RequestFormProvider>
    </SimpleLayout>
  );
};

export default FinancingRequestPage;
