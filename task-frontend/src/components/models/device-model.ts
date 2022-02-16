export interface DeviceModel {
    peripherals: any[];
    _id?: string;
    ip: string;
    serial: string;
    name: string;
    createdAt?: Date;
    updatedAt?: string;
    __v?: number;
    record_status?:string
  }