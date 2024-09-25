

 export const loginUserService = async (dataForm) => {
   const { VITE_API_URL_BASE } = import.meta.env;

   const url = `${VITE_API_URL_BASE}/users/login`;

   const response = await fetch(url, {
       method: "POST",
       headers: {
           "Content-Type": "application/json",
       },
       body: JSON.stringify(dataForm)
   });

   const json = await response.json();

   if(!response.ok) throw new Error(json.message);

   return json;
}


// import apiRequest from '../utils/apiRequest';

// export const loginUserService = async (dataForm) => {
//     const { VITE_API_URL_BASE } = import.meta.env;
//     const url = `${VITE_API_URL_BASE}/users/login`;

//     return apiRequest({
//         url,
//         method: 'POST',
//         headers: {
//             'constent-Type': 'application/json',
//         },
//         body: JSON.stringify(dataForm),
//     });
// };

// export default loginUserService;
