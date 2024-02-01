export type Store = {
    _id: string;
    name: string;
    openTime: string;
    closeTime: string;
    employees: Array<string>; 
    timeSlotInterval: number;
    capacityPerSlot: number;
    __v: number;
  };
    
 export  interface StoreOverviewProps {
    store: Store;
  }
 export  type User = {
    _id: string;
    username: string;
    email: string;
    password: string;
    role: string;
    preference: string;
  };
  export type FormData = {
    name: string;
    openTime: string;
    closeTime: string;
    timeSlotInterval: string;
    capacityPerSlot: string;
  };