import moment from "moment";

export type TimeSlot = {
  id: number;
  time: string;
};

export const generateTimeSlots = (
  openTime: string,
  closeTime: string,
  timeSlotInterval: number
): TimeSlot[] => {
  const timeSlots: TimeSlot[] = [];
  const startTime = moment(openTime, "HH:mm");
  const endTime = moment(closeTime, "HH:mm");

  while (startTime.isBefore(endTime)) {
    timeSlots.push({
      id: timeSlots.length + 1,
      time: startTime.format("hh:mm A"),
    });
    startTime.add(timeSlotInterval, "minutes");
  }

  return timeSlots;
};
