import { TIMEOUT_SEC } from './config';

const timeout = function (s) {
  return new Promise((_, rej) => {
    setTimeout(() => {
      rej(new Error(`Request took too long! Timeout after ${s} seconds`));
    }, s * 1000);
  });
};

export const AJAX = async function (url, uploadData = undefined) {
  try {
    const fetchPro = uploadData
      ? fetch(url, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(uploadData),
        })
      : fetch(url);
    const res = await Promise.race([fetchPro, timeout(TIMEOUT_SEC)]);

    const data = await res.json();

    if (!res.ok) throw new Error(`${data.message}  (${res.status})`);

    return data;
  } catch (error) {
    throw error;
  }
};

// export const getJSON = async function (url) {
//   try {
//     const fetchPro = fetch(url);
//     const res = await Promise.race([fetchPro, timeout(TIMEOUT_SEC)]);

//     const data = await res.json();

//     if (!res.ok) throw new Error(`${data.message}  (${res.status})`);

//     return data;
//   } catch (error) {
//     throw error;
//   }
// };

// export const sendJSON = async function (url, uploadData) {
//   console.log('uploadData', JSON.stringify(uploadData, null, 2));
//   try {
//     const fetchPro = fetch(url, {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json',
//       },
//       body: JSON.stringify(uploadData),
//     });
//     const res = await Promise.race([fetchPro, timeout(TIMEOUT_SEC)]);

//     const data = await res.json();

//     if (!res.ok) throw new Error(`${data.message}  (${res.status})`);

//     return data;
//   } catch (error) {
//     throw error;
//   }
// };