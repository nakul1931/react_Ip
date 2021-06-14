export interface baseApiReturn {
  success: boolean;
  message: string;
}

export type Modify<T, R> = Omit<T, keyof R> & R;

export type typeInv = "Manufacture" | "Purchase" | "Sell" | "Self";
