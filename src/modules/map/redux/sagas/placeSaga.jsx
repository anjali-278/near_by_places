import { call, put, takeEvery } from 'redux-saga/effects';
import { nearByPlaces } from '../../../../utils/apiRequests';
import { placesRequested, placesSuccess, placesFailed } from '../slices/places';
import generateRandomUsers from '../../../../utils/generateRandomUsers';

function* fetchPlaces(action) {
  try {
    const hospital = yield call(nearByPlaces, action.payload.latitude, action.payload.longitude,"hospital");   
    const police = yield call(nearByPlaces, action.payload.latitude, action.payload.longitude,"police"); 
    const users = yield call(generateRandomUsers, 5, action.payload.latitude, action.payload.longitude);

    const places = [...hospital.results.slice(0, 3), ...police.results.slice(0, 3)];

    const selectedData = places?.map(item => ({
      name : item?.name || "",
      types : item?.types || [],
      rating : item?.rating || 0,
      user_ratings_total : item?.user_ratings_total || 0,
      vicinity : item?.vicinity || "",
      opening_hours : item?.opening_hours || null,
      lat : item?.geometry?.location?.lat || 0,
      lng : item?.geometry?.location?.lng || 0,
    }))
    
    const mergedResult = [...selectedData, ...users].sort((a,b) => a.name.localeCompare(b.name, 'en', { sensitivity: 'base' }));
    
    yield put(placesSuccess(mergedResult))
  } catch (e) {
    yield put(placesFailed(e.message))
  }
}

export default function* placesWatcherSaga(){
  yield takeEvery(placesRequested, fetchPlaces)
}

