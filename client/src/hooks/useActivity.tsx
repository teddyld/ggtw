import React from "react";
import dayjs from "dayjs";

export const useActivity = (datesWithActivity: Set<string>) => {
  const today = new Date();

  const getDay = (date: Date) => {
    const day = date.getDay();
    return day === 0 ? 6 : day - 1;
  };

  const startOfWeek = (date: Date) => {
    return new Date(
      date.getFullYear(),
      date.getMonth(),
      date.getDate() - getDay(date) - 1,
    );
  };

  const endOfWeek = (date: Date) => {
    return dayjs(
      new Date(
        date.getFullYear(),
        date.getMonth(),
        date.getDate() + (6 - getDay(date)),
      ),
    )
      .endOf("date")
      .toDate();
  };

  const startOfMonth = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth(), 1);
  };

  const endOfMonth = (date: Date) => {
    return dayjs(new Date(date.getFullYear(), date.getMonth(), date.getDate()))
      .endOf("month")
      .toDate();
  };

  const startOfYear = (date: Date) => {
    return new Date(date.getFullYear(), 0, 1);
  };

  const endOfYear = (date: Date) => {
    return dayjs(new Date(date.getFullYear(), date.getMonth(), date.getDate()))
      .endOf("year")
      .toDate();
  };

  const startWeek = startOfWeek(today);
  const endWeek = endOfWeek(today);
  const startMonth = startOfMonth(today);
  const endMonth = endOfMonth(today);
  const startYear = startOfYear(today);
  const endYear = endOfYear(today);

  const getDatesInRange = (startDate: Date, endDate: Date) => {
    const dates: Date[] = [];
    let currentDate = new Date(startDate.getTime());

    while (currentDate <= endDate) {
      if (datesWithActivity.has(currentDate.toDateString())) {
        dates.push(new Date(currentDate));
      }
      currentDate.setDate(currentDate.getDate() + 1);
    }

    return dates;
  };

  const [selected, setSelected] = React.useState<Date[]>([
    ...getDatesInRange(startWeek, endWeek),
  ]);
  const [control, setControl] = React.useState<string | undefined>("week");
  const [period, setPeriod] = React.useState({
    startDate: startWeek.toDateString(),
    endDate: endWeek.toDateString(),
  });

  const handleControl = (value: string) => {
    setControl(value);

    if (value === "week") {
      setSelected([...getDatesInRange(startWeek, endWeek)]);
      setPeriod({
        startDate: startWeek.toDateString(),
        endDate: endWeek.toDateString(),
      });
      return;
    } else if (value === "month") {
      setSelected([...getDatesInRange(startMonth, endMonth)]);
      setPeriod({
        startDate: startMonth.toDateString(),
        endDate: endMonth.toDateString(),
      });
    } else if (value === "year") {
      setSelected([...getDatesInRange(startYear, endYear)]);
      setPeriod({
        startDate: startYear.toDateString(),
        endDate: endYear.toDateString(),
      });
    }
  };

  // When calendar days are clicked
  const handleSelect = (date: Date) => {
    // Check if date has activity
    if (!datesWithActivity.has(date.toDateString())) {
      return;
    }

    // Set current period to date
    setPeriod({
      startDate: date.toDateString(),
      endDate: date.toDateString(),
    });
    setSelected([date]);
  };

  return {
    period,
    control,
    selected,
    handleControl,
    handleSelect,
  };
};
