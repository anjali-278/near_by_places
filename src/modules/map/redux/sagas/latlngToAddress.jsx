import {call, put, takeEvery} from 'redux-saga/effects';
import { geocodeWithLatlong } from '../../../../utils/apiRequests';

import { addressRequested,addressSuccess, addressFailed } from '../slices/currentLocationAddress';

function* fetchAddress (action) {
    try{
     const address = yield call(geocodeWithLatlong, action.payload.latitude, action.payload.longitude);
     yield put (addressSuccess(address.results))
    } catch (e){
     yield put(addressFailed(e.message))
    }
}

export default function* addressWathcerSaga(){
    yield takeEvery(addressRequested, fetchAddress)
}