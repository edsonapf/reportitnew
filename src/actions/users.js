import { UPDATE_USER } from './types';

export const updateUser = (user, {isLogged, token}) => {
    const { name, username, registrationNumber, profile, _id: id} = user;
    return {
        type: UPDATE_USER,
        payload: {
            ...(name && {name}),
            ...(username && {username}),
            ...(registrationNumber && {registrationNumber}),
            ...(profile && {profile}),
            ...(isLogged && {isLogged}),
            ...(token && {token}),
            ...(id && {id}),
        }
    }
}