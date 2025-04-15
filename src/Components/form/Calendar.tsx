import { useState, useEffect } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { format } from "date-fns";
import { Holiday } from "../../types/types";
import { Time } from "../Time";

const API_KEY = "OH+HEf/9IH2zuHR/cMO/8g==ldhBovC6Rpa1TIss";
const trainingTimes = ["08:00", "10:00", "12:00", "14:00", "16:00"];

interface Props {
  selectedDate: Date | null;
  selectedTime: string | null;
  setSelectedTime: (time: string) => void;
  setSelectedDate: (date: Date | null) => void;
}

const CalendarWithHolidays = ({
  selectedDate,
  selectedTime,
  setSelectedTime,
  setSelectedDate,
}: Props) => {
  const [holidays, setHolidays] = useState<Holiday[]>([]);
  const [holidayInfo, setHolidayInfo] = useState("");

  const handleTime = (time: string) => {
    setSelectedTime(time);
  };

  useEffect(() => {
    const fetchHolidays = async () => {
      try {
        const response = await fetch(
          `https://api.api-ninjas.com/v1/holidays?country=PL`,
          {
            headers: { "X-Api-Key": API_KEY },
          }
        );
        const data: Holiday[] = await response.json();
        setHolidays(data);
      } catch (err) {
        console.error("Failed to fetch holidays", err);
      }
    };

    fetchHolidays();
  }, []);

  const filterDate = (date: Date): boolean => {
    if (date.getDay() === 0) return false;
    const dateString = format(date, "yyyy-MM-dd");
    const holidayFound = holidays.find(
      (h) => h.date === dateString && h.type === "NATIONAL_HOLIDAY"
    );
    return !holidayFound;
  };

  const handleDateChange = (date: Date | null) => {
    if (!date) return;
    setSelectedDate(date);
    const dateString = format(date, "yyyy-MM-dd");
    const observanceHoliday = holidays.find(
      (h) => h.date === dateString && h.type === "OBSERVANCE"
    );
    if (observanceHoliday) {
      setHolidayInfo(observanceHoliday.name);
    } else {
      setHolidayInfo("");
    }
  };

  return (
    <div>
      <div className="flex flex-col md:flex-row">
        <div>
          <p>Date</p>
          <DatePicker
            className="[&_.react-datepicker__day--selected]:bg-purple-300 [&_.react-datepicker__day--selected]:text-white"
            selected={selectedDate}
            onChange={handleDateChange}
            inline
            filterDate={filterDate}
            renderCustomHeader={({ date, decreaseMonth, increaseMonth }) => (
              <div className="flex items-center justify-between p-2">
                <button type="button" onClick={decreaseMonth}>
                  <svg
                    className="cursor-pointer"
                    width="32"
                    height="32"
                    viewBox="0 0 32 32"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M9.5 16.866C8.83333 16.4811 8.83333 15.5189 9.5 15.134L18.5 9.93782C19.1667 9.55292 20 10.034 20 10.8038L20 21.1962C20 21.966 19.1667 22.4471 18.5 22.0622L9.5 16.866Z"
                      fill="#CBB6E5"
                    />
                  </svg>
                </button>
                <p className="font-medium">{format(date, "MMMM yyyy")}</p>
                <button type="button" onClick={increaseMonth}>
                  <svg
                    className="cursor-pointer"
                    width="32"
                    height="32"
                    viewBox="0 0 32 32"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M22.5 16.866C23.1667 16.4811 23.1667 15.5189 22.5 15.134L13.5 9.93782C12.8333 9.55292 12 10.034 12 10.8038L12 21.1962C12 21.966 12.8333 22.4471 13.5 22.0622L22.5 16.866Z"
                      fill="#CBB6E5"
                    />
                  </svg>
                </button>
              </div>
            )}
          />
        </div>
        {selectedDate && !holidayInfo && (
          <div>
            <p className="md:ml-4">Time</p>
            <div className="flex flex-wrap md:flex-col md:ml-4 gap-2">
              {trainingTimes.map((el, index) => (
                <Time
                  key={index}
                  time={el}
                  onClick={() => handleTime(el)}
                  isActive={selectedTime === el}
                />
              ))}
            </div>
          </div>
        )}
      </div>
      {holidayInfo && (
        <div className="text-sm p-2 flex gap-2 text-textMain">
          <svg
            width="18"
            height="18"
            viewBox="0 0 18 18"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M9 17C7.41775 17 5.87104 16.5308 4.55544 15.6518C3.23985 14.7727 2.21447 13.5233 1.60897 12.0615C1.00347 10.5997 0.84504 8.99113 1.15372 7.43928C1.4624 5.88743 2.22433 4.46197 3.34315 3.34315C4.46197 2.22433 5.88743 1.4624 7.43928 1.15372C8.99113 0.845037 10.5997 1.00346 12.0615 1.60896C13.5233 2.21447 14.7727 3.23985 15.6518 4.55544C16.5308 5.87103 17 7.41775 17 9C17 11.1217 16.1571 13.1566 14.6569 14.6569C13.1566 16.1571 11.1217 17 9 17ZM8.00667 13C8.00667 13.2652 8.11203 13.5196 8.29956 13.7071C8.4871 13.8946 8.74145 14 9.00667 14C9.27189 14 9.52624 13.8946 9.71378 13.7071C9.90131 13.5196 10.0067 13.2652 10.0067 13V8.40667C10.0067 8.27535 9.9808 8.14531 9.93055 8.02398C9.88029 7.90266 9.80664 7.79242 9.71378 7.69956C9.62092 7.6067 9.51068 7.53304 9.38935 7.48279C9.26803 7.43253 9.13799 7.40667 9.00667 7.40667C8.87535 7.40667 8.74531 7.43253 8.62399 7.48279C8.50266 7.53304 8.39242 7.6067 8.29956 7.69956C8.2067 7.79242 8.13305 7.90266 8.08279 8.02398C8.03254 8.14531 8.00667 8.27535 8.00667 8.40667V13ZM9 4C8.77321 4 8.55152 4.06725 8.36295 4.19325C8.17438 4.31925 8.02741 4.49833 7.94062 4.70786C7.85383 4.91738 7.83113 5.14794 7.87537 5.37037C7.91961 5.5928 8.02882 5.79712 8.18919 5.95748C8.34955 6.11785 8.55387 6.22706 8.7763 6.2713C8.99873 6.31555 9.22929 6.29284 9.43881 6.20605C9.64834 6.11926 9.82743 5.97229 9.95342 5.78372C10.0794 5.59515 10.1467 5.37346 10.1467 5.14667C10.1467 4.84255 10.0259 4.55089 9.81082 4.33585C9.59578 4.12081 9.30412 4 9 4Z"
              fill="#CBB6E5"
            />
          </svg>
          {holidayInfo}
        </div>
      )}
    </div>
  );
};

export default CalendarWithHolidays;
