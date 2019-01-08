/**
 * Created by dhaslem on 7/12/2017.
 */
import * as R from "ramda";

export const getCookie = (name: string) => {
  const split = R.map(R.split("="), R.split(";", document.cookie));
  const cookie = R.find(c => c[0].trim() === name, split);
  return cookie ? cookie[1] : "";
};
