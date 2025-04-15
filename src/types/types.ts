export type FormValues = {
  firstName: string;
  lastName: string;
  email: string;
  age: number;
  photo: File | null;
};

export type FormErrors = {
  [key in keyof FormValues]?: string;
};

export interface Holiday {
  country: string;
  iso: string;
  year: number;
  date: string;
  day: string;
  name: string;
  type: "NATIONAL_HOLIDAY" | "OBSERVANCE";
}
