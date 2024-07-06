import {createStore} from 'redux';
import reducer from '../reducers/pocket';



const store = createStore(reducer)



export default store;