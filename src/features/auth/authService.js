import api from "../../services/api"

export const loginUserApi = async (data) =>{
    const response =await api.post("/auth/login", data);
    return response.data
}

// service file - only api calls