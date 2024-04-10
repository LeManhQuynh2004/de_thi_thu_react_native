import { createSlice } from "@reduxjs/toolkit";
import { addMotorBikeAPI, deleteBikeApi, updateMotorBikeAPI } from "../actions/motorbikeAction";

const initialState = {
  listBike: []
}

const bikeSlice = createSlice({
  name: 'bike',
  initialState,
  reducers: {
    addBike(state, action) {
      state.listBike.push(action.payload);
    },
  },
  extraReducers: builder => {

    builder.addCase(deleteBikeApi.fulfilled, (state, action) => {
      // Xóa todo
      state.listBike = state.listBike.filter(row => row._id !== action.payload);

    }).addCase(deleteBikeApi.rejected, (state, action) => {
      // Xử lý khi yêu cầu xóa todo bị từ chối hoặc xảy ra lỗi
      console.log('Delete todo rejected:', action.error.message);
    });
    builder.addCase(addMotorBikeAPI.fulfilled, (state, action) => {
      state.listBike.push(action.payload);
    })
      .addCase(addMotorBikeAPI.rejected, (state, action) => {
        console.log('Add bike rejected:', action.error.message);
      });

    builder.addCase(updateMotorBikeAPI.fulfilled, (state, action) => {
      // lấy tham số truyền vào
      // console.log(action);
      const { _id, name_ph32353, price_ph32353, describe_ph32353, color_ph32353, image_ph32353 } = action.payload;
      // tìm bản ghi phù hợp với tham số truyền vào
      const bike = state.listBike.find(row => row._id === _id);
      // update
      if (bike) {
        bike.name_ph32353 = name_ph32353,
          bike.price_ph32353 = price_ph32353,
          bike.color_ph32353 = color_ph32353,
          bike.describe_ph32353 = describe_ph32353,
          bike.image_ph32353 = image_ph32353
      }
    })
      .addCase(updateMotorBikeAPI.rejected, (state, action) => {
        // Xử lý khi yêu cầu Sửa todo bị từ chối hoặc xảy ra lỗi
        console.log('Update bike rejected:', action.error.message);
      });
  },
})
export const { addBike } = bikeSlice.actions;
export default bikeSlice.reducer;