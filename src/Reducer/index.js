import { combineReducers } from 'redux';
import  empreducer  from './empreducer';

 const appReducer = combineReducers({
    reducer : empreducer
})
export default appReducer

