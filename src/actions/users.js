import { UPDATE_USER } from './types';

export const updateUser = (user, {isLogged, token}) => {
    const { name, username, registrationNumber, profile, _id: id} = user;
    //console.warn('isLogged: ' + isLogged);
    return {
        type: UPDATE_USER,
        payload: {
            ...(name && {name}),
            ...(username && {username}),
            ...(registrationNumber && {registrationNumber}),
            ...(profile && {profile}),
            ...((isLogged === true || isLogged ===false) && {isLogged:isLogged}),
            ...(token && {token}),
            ...(id && {id}),
        }
    }
}