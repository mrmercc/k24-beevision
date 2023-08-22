export interface BaseResult {
  results: Result[];
}

export interface Result {
  StatusCode: number;
  StatusMessage: string;
  Width: string;
  Length: string;
  Height: string;
  DimWt: string;
  RealVolume: string;
  Weight: string;
  UnitID: string;
  BranchID: string;
  Barcode: string;
  BarcodeType: string;
  BarcoudeSource: string;
  Date: string;
  Time: string;
  MeasurementID: string;
  ImageBase64: string;
  SerialNumber: string;
  DimUnit: string;
  WeightUnit: string;
  IsRegular: number;
  ObjectRGBCoordinates: string;
  Operator: string;
  Reserved1: string;
  CRC: string;
}
