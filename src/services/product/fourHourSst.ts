// import dayjs, { Dayjs } from 'dayjs';
// import httpClient from '@/services/httpClient';
// import { ContentType } from '@/constants/request';

// const getArgoProfilesByDate = async (date: Dayjs, subProduct:string, area:string) => {
//   const validatedDate = dayjs(date);
//   if (validatedDate.isValid()) {
//     const formattedDate = validatedDate.format('YYYY MM DD HH');
//     return await httpClient.get<string>(`/SST_4hr/${subProduct}/${area}/2024022118.gif`, {
//       headers: {
//         'Content-Type': ContentType.Gif,
//       },
//     });
//   } else {
//     throw new Error('Invalid date format for Argo profiles. Please use YYYYMMDD.');
//   }
// };

// https://oceancurrent.aodn.org.au/SST_4hr/SST_Filled/Adelaide/2024022118.gif
// export { getArgoProfilesByDate };
