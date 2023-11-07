export const fetchService = async (url) => {
  try {
    let res = await fetch(url);
    if (!res.ok) {
      throw new Error("Ошибка получения данных с сервера");
    }
    return await res.json();
  } catch (error) {
    return error.message;
  }
};
