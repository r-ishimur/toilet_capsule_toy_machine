import { Prize } from "../types/prize";

export const GACHA_PRIZES: Prize[] = [
  {
    id: "first",
    label: "1等",
    count: 3,
    bgColor: "bg-yellow-300",
    textColor: "text-yellow-900",
  },
  {
    id: "second",
    label: "2等",
    count: 7,
    bgColor: "bg-slate-300",
    textColor: "text-slate-800",
  },
  {
    id: "third",
    label: "3等",
    count: 30,
    bgColor: "bg-orange-300",
    textColor: "text-orange-900",
  },
  {
    id: "fourth",
    label: "4等",
    count: 60,
    bgColor: "bg-green-300",
    textColor: "text-green-900",
  },
];
