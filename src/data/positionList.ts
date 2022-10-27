import {PositionList} from "../../../backend/types/personPosition";


interface positionObj{
    key: PositionList,
    value: PositionList
}

export const positionObj:positionObj[] = [{
    key:'Trainee',
    value:'Trainee',
},{
    key:'Assistant',
    value:'Assistant',
},{
    key:'Junior Specialist',
    value:'Junior Specialist',
},{
    key:'Specialist',
    value:'Specialist',
},{
    key:'Senior Specialist',
    value:'Senior Specialist',
},{
    key:'Manager',
    value:'Manager',
}];

export const positionList: PositionList[] = ['Trainee', 'Assistant', 'Junior Specialist', 'Specialist', 'Senior Specialist', 'Manager']