import { UPDATE_OCCURRENCE, UPDATE_OCCURRENCES } from './types';

export const updateOccurrence = occurrence => {
    const { description, date, type, location, address } = occurrence;

    return {
        type: UPDATE_OCCURRENCE,
        payload: {
            ...(description && {description}),
            ...(date && {date}),
            ...(type && {type}),
            ...(location && {location: {
                    address,
                    long: location[0],
                    latt: location[1],

               }
         }),
        }
    }
};

export const updateOccurrences = occurrences => {

    const payload = occurrences.map(occurrence => {
    const { description, date, type, location, address } = occurrence;
        return {
            ...(description && {description}),
            ...(date && {date}),
            ...(type && {type}),
            ...(location && {location: {
                address,
                long: location.coordinates[0],
                latt: location.coordinates[1],
           }}),
        };
    });   

    return {
        type: UPDATE_OCCURRENCES,
        payload
    }
};