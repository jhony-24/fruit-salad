import AsyncStorage from "@react-native-async-storage/async-storage";
import { useCallback, useLayoutEffect } from "react";
import { useDispatch } from "react-redux";
import { firebaseFirestore } from "../../../config/firebase";
import { authActions } from "../../../features/authentication";

export interface AuthPersist {
    isAuth?: boolean,
    user: {
        id?: string,
        username: string,
        fullName: string;
    },
    loading? : boolean;   
}

const setStorageAsync = async (payload : AuthPersist) => {
    return await AsyncStorage.setItem("auth",JSON.stringify(payload)).then(e=>true).catch(e=>false);
}

const getStorageAsync = async () : Promise<AuthPersist | null> => {
    const data = await AsyncStorage.getItem("auth");
    return data != null ? JSON.parse(data) as AuthPersist : null;
};

const usePersistStorageAuth = () => {
    const dispatch = useDispatch();  
    const setPersist = useCallback(async (payload : AuthPersist) => {
        const userCreated = await firebaseFirestore.collection("users").add(payload.user);
        if(userCreated) {
            const processPayload = {
                ...payload,
                user : {
                    ...payload.user,
                    id : userCreated.id
                }
            }
            setStorageAsync(processPayload).then(() => dispatch(authActions.addNewUser(processPayload)));
        }
    },[])

    const getPersist = useCallback(async () => {
        const request = await getStorageAsync();
        if(request != null) dispatch(authActions.getUser(request));
    },[])

    return {
        setPersist,
        getPersist,
    }
}

export default usePersistStorageAuth;