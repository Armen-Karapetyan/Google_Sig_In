import { uri } from '../Constants/common';

export const getTitles = async () => {
    const data = await fetch(uri);
    return data?.json();
}

export const getComments = async (id = 1) => {
    const data = await fetch(`${uri}/${id}/comments`);
    return data?.json();
}