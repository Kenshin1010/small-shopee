// import * as httpRequest from "../utils/httpRequest";

// export const search = async (
//   query: string,
//   page: number = 1,
//   type = "less"
// ) => {
//   try {
//     const res = await httpRequest.get(`search/${query}/${page}`, {
//       // Sử dụng đường dẫn 'search/{query}/{page}' để gọi API
//       params: {
//         query,
//         type,
//       },
//     });
//     return res.data;
//   } catch (error) {
//     console.log(error);
//     throw error;
//   }
// };
