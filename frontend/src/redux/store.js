import {configureStore} from '@reduxjs/toolkit'
import userReducer from './userSlice'
import goalReducer from './goalSlice'


const store = configureStore({
    reducer: {
        user: userReducer,
        goal: goalReducer,
    }
})

export default store;