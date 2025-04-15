import { useState } from "react";
import "react-datepicker/dist/react-datepicker.css";
import { useApplicationForm } from "../../hooks/useApplicationForm";
import { TextInput } from "./TextInput";
import { AgeSlider } from "./AgeSlider";
import { InputPhoto } from "./InputPhoto";
import { CalendarWithHolidays } from "./Calendar";
import { validateForm } from "../../utils/validateForm";
import { ButtonSubmit } from "./ButtonSubmit";

export const ApplicationForm = () => {
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const { formData, errors, setErrors, handleChange, handleFileSelect } =
    useApplicationForm();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const validationErrors = validateForm(formData);

    setErrors(validationErrors);

    if (Object.keys(validationErrors).length > 0) {
      return;
    }

    const finalFormData = {
      ...formData,
      selectedDate,
      selectedTime,
    };

    const formDataToSend = new FormData();

    for (const key in finalFormData) {
      formDataToSend.append(
        key,
        finalFormData[key as keyof typeof finalFormData] as string
      );
    }

    try {
      await fetch("http://letsworkout.pl/submit", {
        method: "POST",
        body: formDataToSend,
      });

      console.log("done");
    } catch (err: unknown) {
      console.log(err);
    }
  };

  return (
    <div className="p-4 sm:p-0 text-textMain mt-16 mb-24">
      <h1 className="text-2xl font-medium text-left mb-5">Person info</h1>
      <form onSubmit={handleSubmit} className="max-w-md mx-auto space-y-6">
        <TextInput
          label="First Name"
          name="firstName"
          value={formData.firstName}
          onChange={handleChange}
          error={errors.firstName}
        />
        <TextInput
          label="Last Name"
          name="lastName"
          value={formData.lastName}
          onChange={handleChange}
          error={errors.lastName}
        />
        <TextInput
          label="Email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          error={errors.email}
        />
        <AgeSlider
          label="Age"
          name="age"
          max={100}
          min={0}
          onChange={handleChange}
          range1={0}
          range2={100}
          value={formData.age}
          error={errors.age}
        />
        <InputPhoto
          label="Photo"
          name="photo"
          onFileSelect={handleFileSelect}
          error={errors.photo}
        />
        <h2 className="text-2xl font-medium">Your workout</h2>
        <CalendarWithHolidays
          selectedDate={selectedDate}
          setSelectedDate={setSelectedDate}
          selectedTime={selectedTime}
          setSelectedTime={setSelectedTime}
        />
        <ButtonSubmit
          isDisabled={Object.keys(errors).length > 0 || !selectedTime}
        >
          Send Application
        </ButtonSubmit>
      </form>
    </div>
  );
};
