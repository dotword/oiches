import apiRequest from '../utils/apiRequest';

export const modifyUserAvatarService = async ({ data, userId, token }) => {
    const { VITE_API_URL_BASE } = import.meta.env;
    const url = `${VITE_API_URL_BASE}/users/avatar/${userId}`;

    return apiRequest({
        url,
        method: 'PUT',
        headers: {
            authorization: token,
        },
        body: data,
    });
};

export const modifyUserEmailService = async ({ data, userId, token }) => {
    const { VITE_API_URL_BASE } = import.meta.env;
    const url = `${VITE_API_URL_BASE}/users/email/${userId}`;

    return apiRequest({
        url,
        method: 'PUT',
        headers: {
            authorization: token,
        },
        body: data,
    });
};

export const modifyUserPasswordService = async ({ data, token }) => {
    const { VITE_API_URL_BASE } = import.meta.env;
    const url = `${VITE_API_URL_BASE}/users/password`;

    return apiRequest({
        url,
        method: 'PATCH',
        headers: {
            authorization: token,
        },
        body: data,
    });
};
