import { call, put, takeEvery } from 'redux-saga/effects';
import { nearByPlaces } from '../../../../utils/apiRequests';
import { placesRequested, placesSuccess, placesFailed } from '../slices/places';
import generateRandomUsers from '../../../../utils/generateRandomUsers';

function* fetchPlaces(action) {
  try {
    // yield put(placesRequested())
    const hospital = yield call(nearByPlaces, action.payload.latitude, action.payload.longitude,"hospital");   
    const police = yield call(nearByPlaces, action.payload.latitude, action.payload.longitude,"police"); 
    const users = yield call(generateRandomUsers, 10, action.payload.latitude, action.payload.longitude);
    
    const mergedResult = hospital.results.concat(police.results, users).sort((a,b) => a.name.localeCompare(b.name, 'en', { sensitivity: 'base' }));
    
    yield put(placesSuccess(mergedResult))
  } catch (e) {
    yield put(placesFailed(e.message))
  }
}

export default function* placesWatcherSaga(){
  yield takeEvery(placesRequested, fetchPlaces)
}

