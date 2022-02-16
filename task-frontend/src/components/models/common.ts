import { DeviceModel } from "./device-model";

export type ModalProps<T> = {
    visible: boolean;
    onClose: () => void;
    item?:T
  };
  export type PeripheralsProps={
    gateway:DeviceModel
  }