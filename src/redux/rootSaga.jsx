import {all} from 'redux-saga/effects';
import placesWatcherSaga from "../modules/map/redux/sagas/placeSaga";
import addressWathcerSaga from '../modules/map/redux/sagas/latlngToAddress';

export default function* rootSaga(){
    yield all([
        placesWatcherSaga(),
        addressWathcerSaga(),
    ])
}
