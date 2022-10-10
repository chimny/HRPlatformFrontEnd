import {useCallback, useEffect} from "react";
import {useDispatch, useSelector} from 'react-redux'
import {PersonActions} from "./SinglePerson/PersonActions";
import {StoreInterface} from "../../redux/store/storeType";
import {getPeopleList,removePerson, removePersonFromState} from "../../redux/slices/personSlice";
import {AppDispatch} from "../../redux/store/store";
import { PersonEntity } from "../../../../backend/types/person";
import {ErrorComponent} from "../ErrorComponent/ErrorComponent";
import {Spinner} from "../Spinner/Spinner";


export const PersonList = ()=>{

    // const listedPersons = useSelector((state : StoreInterface  ) => state.personList.receivedData.peopleList);
    // const dispatch =useDispatch<AppDispatch>();
    //
    // const resStatus = useSelector((state : StoreInterface)=> state.personList.status)
    //
    // const deleteHandler = useCallback((id:string)=>{
    //     dispatch(removePerson(id));
    //     dispatch(removePersonFromState(id))
    // },[dispatch])
    //
    // useEffect(()=>{
    //     dispatch(getPeopleList())
    // },[dispatch])
    //
    //
    // if (resStatus === "pending" ){
    //     return <Spinner />
    // }
    //
    //  if (resStatus === "failed" ){
    //     return (
    //         <ErrorComponent/>
    //     )
    // }



    return (
       // <ul>
       //     {listedPersons.map( (el:PersonEntity) => <PersonActions person={el} key={el.id} onDelete={()=>deleteHandler(el.id as string)}/> ) }
       // </ul>

        <h1>list suspended</h1>
    )
}