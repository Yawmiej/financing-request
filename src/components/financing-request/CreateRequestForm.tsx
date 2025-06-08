import { Button } from "@heroui/button";
import { Form } from "@heroui/form";
import { Input, Textarea } from "@heroui/input";
import { NumberInput } from "@heroui/number-input";
import { Select, SelectItem } from "@heroui/select";
import { DatePicker } from "@heroui/date-picker";
import { Autocomplete, AutocompleteItem } from "@heroui/autocomplete";
import { Avatar } from "@heroui/avatar";
import { useState } from "react";
import { DateValue, today, getLocalTimeZone } from "@internationalized/date";
import { z } from "zod";
import { Chip } from "@heroui/chip";
import { addToast } from "@heroui/toast";
import { format, isAfter } from "date-fns";

import { useCountries } from "@/hooks/useCountries";
import { useCurrency } from "@/hooks/useCurrency";
import { MINIMUM_START_DAYS } from "@/config/const";
import { useFinancingRequest } from "@/hooks/useFinancingRequest";
import { useRequestForm } from "@/context/RequestFormProvider";

const minDate = today(getLocalTimeZone()).add({ days: MINIMUM_START_DAYS });

const schema = z.object({
  firstName: z.string().min(1, "First name is required").max(50, "Name is too long"),
  lastName: z.string().min(1, "Last name is required").max(50, "Name is too long"),
  country: z.string().min(1, "Country is required"),
  projectCode: z
    .string()
    .min(1, "Project code is required")
    .regex(
      /^[A-Z]{4}-[1-9]{4}$/,
      `Project code must be in the format XXXX-YYYY, where X is any uppercase letter, followed by (-) and Y is any number between 1 and 9`
    ),
  projectDescription: z
    .string()
    .min(1, "Project description is required")
    .max(1000, "Description is too long"),
  currency: z.string().min(1, "Currency is required"),
  amount: z.coerce.number().min(1, "Amount is required").max(1000000000, "Amount is too high"),
  startDate: z.coerce.date().refine(
    (date) => {
      return isAfter(date, minDate.toString());
    },
    {
      message: `Minimum start date is ${format(minDate.toString(), "dd/MM/yyyy")}`,
    }
  ),
  validityPeriod: z.coerce
    .number()
    .min(1, "Validity period is required")
    .max(3, "Validity period can't be more than 3 years"),
});

const initialForm = {
  firstName: "",
  lastName: "",
  country: "",
  projectCode: "",
  projectDescription: "",
  currency: "",
  amount: 0,
  startDate: minDate,
  validityPeriod: "",
  isOPEC: false,
};

export const CreateRequestForm = () => {
  const [form, setForm] = useState(initialForm);
  const { setIsSuccess } = useRequestForm();
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [isDirty, setIsDirty] = useState(false);

  const { data: countries = [], isPending: isLoadingCountries } = useCountries();
  const { data: currencies = [], isPending: isLoadingCurrencies } = useCurrency();
  const { mutate: submitFinancingRequest, isPending: isLoadingFinancingRequest } =
    useFinancingRequest();

  const resetForm = () => {
    setForm(initialForm);
    setErrors({});
    setIsDirty(false);
  };

  const onValueChange = ({ name, value }: { name: string; value: string | DateValue }) => {
    const data = {
      ...form,
      [name]: value,
    };

    setForm(data);

    isDirty && validateForm(data);
  };

  const onCountryChange = (value: string, isOpec?: boolean) => {
    const data = {
      ...form,
      country: value,
      currency: isOpec ? "USD" : form.currency,
      isOPEC: !!isOpec,
    };

    setForm(data);

    isDirty && validateForm(data);
  };

  const validateForm = (data: typeof form) => {
    const result = schema.safeParse(data);

    if (!result.success) {
      const errors = Object.fromEntries(
        Object.entries(result.error.flatten().fieldErrors).map(([key, value]) => [key, value[0]])
      );

      setErrors(errors);

      return false;
    }
    setErrors({});

    return true;
  };

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const isValid = validateForm(form);

    if (!isValid) {
      return setIsDirty(true);
    }

    const payload = {
      projectCode: form.projectCode,
      projectDescription: form.projectDescription,
      currency: form.currency,
      countryCode: form.country,
      date: format(form.startDate.toString(), "yyyy-MM-dd"),
      validityPeriod: Number(form.validityPeriod),
      fullName: `${form.firstName} ${form.lastName}`,
      amount: Number(form.amount),
    };

    submitFinancingRequest(payload, {
      onSuccess: () => {
        resetForm();
        setIsSuccess(true);
      },
      onError: () => {
        addToast({
          title: "Unable to submit request",
          description: "Please try again later",
          color: "danger",
        });
      },
    });
  };

  return (
    <div className="py-4 px-4">
      <div className="mb-6">
        <h1 className="text-3xl font-bold mb-1">Financing Request</h1>
        <p className="text-sm text-gray-500">
          Please fill out the form below to submit your financing request.
        </p>
      </div>

      <Form onSubmit={onSubmit} validationErrors={errors}>
        <div className="flex flex-col w-full gap-5">
          <div className="flex w-full gap-3">
            <Input
              label="First Name"
              name="firstName"
              value={form.firstName}
              onValueChange={(value) => {
                onValueChange({ name: "firstName", value });
              }}
              errorMessage={errors.firstName}
              isInvalid={!!errors.firstName}
            />
            <Input
              label="Last Name"
              name="lastName"
              value={form.lastName}
              onValueChange={(value) => {
                onValueChange({ name: "lastName", value });
              }}
              errorMessage={errors.lastName}
              isInvalid={!!errors.lastName}
            />
          </div>
          <Autocomplete
            label="Country"
            name="country"
            value={form.country}
            isLoading={isLoadingCountries}
            isDisabled={isLoadingCountries || !countries}
            scrollShadowProps={{
              isEnabled: false,
            }}
            errorMessage={errors.country}
            isInvalid={!!errors.country}
          >
            {countries?.map((country) => (
              <AutocompleteItem
                key={country.code}
                onPress={() => onCountryChange(country.code, country.isOPEC)}
                startContent={<Avatar src={country.flag} alt={country.name} className="w-6 h-6" />}
                {...(country.isOPEC && {
                  endContent: (
                    <Chip variant="faded" size="sm">
                      OPEC
                    </Chip>
                  ),
                })}
              >
                {country.name}
              </AutocompleteItem>
            ))}
          </Autocomplete>
          <div>
            <Input
              label="Project Code"
              description="Format is XXXX-YYYY"
              className="mb-1"
              name="projectCode"
              value={form.projectCode}
              onValueChange={(value) => {
                onValueChange({ name: "projectCode", value });
              }}
              errorMessage={errors.projectCode}
              isInvalid={!!errors.projectCode}
            />
          </div>
          <Textarea
            label="Project Description"
            name="projectDescription"
            value={form.projectDescription}
            onValueChange={(value) => {
              onValueChange({ name: "projectDescription", value });
            }}
            errorMessage={errors.projectDescription}
            isInvalid={!!errors.projectDescription}
          />
          <div className="flex w-full gap-3">
            <Autocomplete
              label="Currency"
              className="max-w-[150px]"
              value={form.currency}
              selectedKey={form.currency}
              isLoading={isLoadingCurrencies}
              isDisabled={isLoadingCurrencies || !currencies || form.isOPEC}
              onSelectionChange={(value) => {
                onValueChange({ name: "currency", value: value as string });
              }}
              errorMessage={errors.currency}
              isInvalid={!!errors.currency}
            >
              {currencies?.map((currency) => (
                <AutocompleteItem key={currency.code}>{currency.code}</AutocompleteItem>
              ))}
            </Autocomplete>
            <NumberInput
              isWheelDisabled
              label="Amount"
              name="amount"
              value={form.amount}
              onValueChange={(value) => {
                onValueChange({ name: "amount", value: value.toString() });
              }}
              errorMessage={errors.amount}
              isInvalid={!!errors.amount}
            />
          </div>
          <div className="mb-2">
            <h4 className="text-md font-medium mb-2">Project Validity</h4>

            <div className="flex flex-col sm:flex-row w-full gap-3">
              <DatePicker
                label="Start Date"
                name="startDate"
                defaultValue={minDate}
                value={form.startDate}
                minValue={minDate}
                onChange={(value) => {
                  onValueChange({ name: "startDate", value: value as unknown as DateValue });
                }}
                errorMessage={errors.startDate}
                isInvalid={!!errors.startDate}
              />
              <Select
                label="Validity Period (Years)"
                description="We only accept validity from 1 to 3 years"
                name="validityPeriod"
                value={form.validityPeriod}
                onSelectionChange={(value) => {
                  onValueChange({
                    name: "validityPeriod",
                    value: value.anchorKey as string,
                  });
                }}
                errorMessage={errors.validityPeriod}
                isInvalid={!!errors.validityPeriod}
              >
                <SelectItem key="1">1</SelectItem>
                <SelectItem key="2">2</SelectItem>
                <SelectItem key="3">3</SelectItem>
              </Select>
            </div>
          </div>
          <Button
            color="primary"
            type="submit"
            size="lg"
            className="w-full"
            isDisabled={isLoadingCountries || isLoadingCurrencies}
            isLoading={isLoadingFinancingRequest}
          >
            Submit
          </Button>
        </div>
      </Form>
    </div>
  );
};
