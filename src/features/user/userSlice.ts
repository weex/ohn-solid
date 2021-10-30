import { createAsyncThunk, createSelector, createSlice } from '@reduxjs/toolkit'
import { RootState } from '../../app/store'
import * as api from './userAPI'
import { User } from './types'
import { getOffersOfUser } from '../offer/offerSlice'

export interface UserState {
  byId: { [id: string]: User }
  allIds: string[]
}

const initialState: UserState = {
  byId: {},
  allIds: [],
}

export const getUser = createAsyncThunk(
  'user/fetchUser',
  async (webId: string, { dispatch }) => {
    const response = await api.getUser(webId)
    dispatch(getOffersOfUser(webId))
    return response
  },
)

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(getUser.fulfilled, (state, action) => {
      const user = action.payload
      state.byId[user.id] = user
      if (!state.allIds.includes(user.id)) {
        state.allIds.push(user.id)
      }
    })
  },
})

export default userSlice.reducer

const selectUserId = (_: RootState, webId: string) => webId

const selectUsers = (state: RootState) => state.user.byId

export const selectUser = createSelector(
  selectUserId,
  selectUsers,
  (webId, users) =>
    users[webId] ?? { id: webId, name: '', avatar: '', about: '' },
)

const selectOffers = (state: RootState) => state.offer.byId

export const selectUserOffers = createSelector(
  selectUserId,
  selectOffers,
  (userId, offers) =>
    Object.values(offers).filter(offer => offer.userId === userId),
)
