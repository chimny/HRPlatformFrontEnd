import {Dispatch, SetStateAction} from "react";

export const updateForm = (key: string, value: any, hook: any, hookSetState: Dispatch<SetStateAction<any>>) => {
    hookSetState((formObj: object) => ({
        ...formObj,
        [key]: value,
    }));
};