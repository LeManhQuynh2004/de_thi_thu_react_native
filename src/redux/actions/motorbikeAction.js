import { createAsyncThunk } from '@reduxjs/toolkit';
import { addBike } from '../reducers/motorbikeReducers';

const api_url = 'http://10.0.2.2:3000/motorbike';
export const fetchBikes = () => {
    return async dispatch => {
        try {
            const response = await fetch(api_url);
            const data = await response.json();
            data.forEach(row => {
                dispatch(addBike(row));
            });
        } catch (error) {
            console.error('Error fetching bikes:', error);
        }
    };
};

export const addMotorBikeAPI = createAsyncThunk(
    'bike/addMotorBikeAPI',
    async (objTodo, thunkAPI) => {
        console.log(objTodo);
        try {
            const response = await fetch(`http://10.0.2.2:3000/motorbike/uploadImage`, {
                method: 'POST',
                body: objTodo
            });
            const data = await response.json();
            if (response.ok) {
                return data;
            } else {
                // Nếu có lỗi từ phía server, trả về lỗi
                const errorData = await response.json();
                return thunkAPI.rejectWithValue(errorData);
            }
        } catch (error) {
            // Xử lý lỗi nếu có bất kỳ lỗi nào xảy ra
            return thunkAPI.rejectWithValue(error.message);
        }
    }
);



export const deleteBikeApi = createAsyncThunk(
    'bike/deleteBikeApi',
    async (id, thunkAPI) => {
        try {
            // Gửi yêu cầu DELETE đến API để xóa todo
            const response = await fetch(`${api_url}/${id}`, {
                method: 'DELETE',
            });
            // console.log(response);
            if (response.ok) {
                // console.log(response);
                // Sau khi xóa thành công, trả về id của todo đã xóa để cập nhật store
                // action.payload ở trong reducer sẽ chính là id
                return id;
            } else {
                // Nếu có lỗi từ phía server, trả về lỗi cho reducer
                const errorData = await response.json();
                return thunkAPI.rejectWithValue(errorData);
            }
        } catch (error) {
            // Xử lý lỗi nếu có bất kỳ lỗi nào xảy ra 
            return thunkAPI.rejectWithValue(error.message);
        }
    }
);


export const updateMotorBikeAPI = createAsyncThunk(
    'bike/updateMotorBikeAPI',
    async (formData, thunkAPI) => {
        console.log(formData.id)
        console.log(formData.formData)
        try {
            const response = await fetch(`http://10.0.2.2:3000/motorbike/uploadImage/${formData.id}`, {
                method: 'PUT',
                body: formData.formData
            });
            const data = await response.json();
            if (response.ok) {
                return data;
            } else {
                // If there's an error from the server, return the error data
                const errorData = await response.json();
                return thunkAPI.rejectWithValue(errorData);
            }
        } catch (error) {
            // Handle any errors that occurred during the fetch
            return thunkAPI.rejectWithValue(error.message);
        }
    }
);
