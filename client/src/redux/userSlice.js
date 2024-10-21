import {createSlice} from '@reduxjs/toolkit'

const initialState = {
    user: null,
    token: null
}

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setLogin: (state, action) => {
            state.user = action.payload.user;
            state.token = action.payload.token;
        },
        setLogout: (state) => {
            state.user = null;
            state.token = null;
        },
        insertFavorite: (state, action) => {
            state.user.wishList = [...state.user.wishList, { propertyId: action.payload.propertyId }];
        },
        deleteFavorite: (state, action) => {
            state.user.wishList = state.user.wishList.filter(
                (wishItem) => wishItem.propertyId !== action.payload.propertyId
            );
        }
    }
});


export const {setLogin, setLogout, insertFavorite, deleteFavorite} = userSlice.actions
export default userSlice.reducer
