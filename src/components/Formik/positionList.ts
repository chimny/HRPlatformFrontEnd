import {PositionList} from "../../../../backend/types/personPosition";

interface positionObj{
    label: PositionList,
    value: PositionList
}

export const positionObj:positionObj[] = [{
    label:'Trainee',
    value:'Trainee',
},{
    label:'Assistant',
    value:'Assistant',
},{
    label:'Junior Specialist',
    value:'Junior Specialist',
},{
    label:'Specialist',
    value:'Specialist',
},{
    label:'Senior Specialist',
    value:'Senior Specialist',
},{
    label:'Manager',
    value:'Manager',
}];
