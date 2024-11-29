import axios from 'axios';

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Метод не разрешен' });
  }

  const { vkId } = req.query;

  if (!vkId) {
    return res.status(400).json({ error: 'Необходимо указать vkId' });
  }

  try {
    const response = await axios.get(`https://spacetimeceo.amocrm.ru/private/api/v2/json/contacts/list?limit_offset=0&limit_rows=499`, {
      headers: {
        Authorization: `Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImp0aSI6IjVhN2JhNDE0NDBkZjZlYmRkMTgzZDEwMjA4OWM1ODg1ZDgwYmI0YjRkMzgwN2U1YjFiMDQ0Mjk4ZDFmZjA4MGI3YjhmNmZlOGJlOGU4YTc1In0.eyJhdWQiOiI1MzY2Y2FiNy1jODYxLTQ3YWUtOWE2ZC1mZGI1NDE5MWY2NjIiLCJqdGkiOiI1YTdiYTQxNDQwZGY2ZWJkZDE4M2QxMDIwODljNTg4NWQ4MGJiNGI0ZDM4MDdlNWIxYjA0NDI5OGQxZmYwODBiN2I4ZjZmZThiZThlOGE3NSIsImlhdCI6MTczMTg0OTU5NiwibmJmIjoxNzMxODQ5NTk2LCJleHAiOjE3OTU5OTY4MDAsInN1YiI6IjExNDczMTQ2IiwiZ3JhbnRfdHlwZSI6IiIsImFjY291bnRfaWQiOjMxOTMwNDU4LCJiYXNlX2RvbWFpbiI6ImFtb2NybS5ydSIsInZlcnNpb24iOjIsInNjb3BlcyI6WyJjcm0iXSwiaGFzaF91dWlkIjoiYTNjOWMyZTMtZWZjYi00MzMwLTgxZWEtNGYxYzhkYjYyYmM4IiwiYXBpX2RvbWFpbiI6ImFwaS1iLmFtb2NybS5ydSJ9.GSyqBene10IXXAzk1kR-y8hMgkRdBqsLSisXCki5lsUL_zAgBYbwlfbLcLdb2rdVtmJrBOk-i22OoSqETOaRhlkAPktHEio20kesAtzNBx06vjkcKGXMWFMygn5PeRDDLtlb-aNtdlyOGRn-EUBnYD15sjrmCuxrFhiei67GKEq9jSk0Ze1MXKodFqFoxtuXObK-YzHNQfpODb2JGsVyhlP8XWHl0Z3-tcDZ7c2rQDwpZmR4O7lXlQqVGxL_3ZtBKN11QLM2hJbsFJeaxf5OggD7R06h3rziVm8SUsGPrDNiCTwpQfuG1wo-Ao9X-vIh9DfRG6b8-UuVYMJC19EASw`,
        'Content-Type': 'application/json',
      },
    });

    if (response.status === 204) {
      return res.status(204).json([]);
    }

    const contacts = response.data?.response?.contacts || [];

    const contact = contacts.find(
      contact => contact.profiles?.VK?.profile_id === vkId,
    );

    if (!contact) {
      return res.status(404).json({
        error: 'Контакт с vkId не найден',
      });
    }


    res.status(200).json({
      contactId: contact.id,
      vkId: contact.profiles.VK.profile_id,
    });

  } catch (error) {
    console.error('Ошибка запроса:', error);
    res.status(500).json({ error: 'Ошибка сервера' });
  }
}

//
// {
//   telegramId: response.data?.response?.contacts.at(-1)?.profiles?.Telegram?.profile_id,
//     contactId: response.data?.response?.contacts.at(-1)?.id,
// }
//
