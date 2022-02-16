import { notification } from "antd";
import { IconType } from "antd/lib/notification";

export const openNotification = (type: IconType, msg: string, desc?: string ) => {
    notification[type]({
        message: msg,
        description:
            desc ? desc : null
    });
};