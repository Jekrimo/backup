/**
 * Created by dhaslem on 7/12/2017.
 */
import * as R from "ramda";

///////////////////////////////////////////////////////////////////////////////
// Forensic Acquisition Tool For Cloud Based Data (FAT-C)
// Contract Number: N41756-17-C-4709
// TSWG Task: IS-DF-4379
// For support, enhancements, or questions please contact:
// Applied Research Associates (303-795-8106 / swat@ara.com)
///////////////////////////////////////////////////////////////////////////////

export const getCookie = (name: string) => {
  const split = R.map(R.split("="), R.split(";", document.cookie));
  const cookie = R.find(c => c[0].trim() === name, split);
  return cookie ? cookie[1] : "";
};
