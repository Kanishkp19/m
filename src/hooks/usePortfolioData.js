import { useState } from "react";
import { defaultData } from "../constants/defaultData";

export function usePortfolioData() {
  const [data] = useState(defaultData);
  return { data, loading: false, error: null };
}
