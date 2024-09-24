import {configureStore} from '@reduxjs/toolkit'
import userReducer from './userSlice'
import goalReducer from './goalSlice'
import adminReducer from './adminSlice'


const store = configureStore({
    reducer: {
        user: userReducer,
        goal: goalReducer,
        admin: adminReducer
    }
})

export default store;