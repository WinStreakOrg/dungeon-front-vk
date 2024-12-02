import axios from 'axios';

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Метод не разрешен' });
  }

  const { vkId } = req.query;

  if (!vkId) {
    return res.status(400).json({ error: 'Необходимо указать vkId' });
  }

  const fetchContacts = async (offset) => {
    const response = await axios.get(
      `https://dungeonbron.amocrm.ru/private/api/v2/json/contacts/list`,
      {
        headers: {
          Authorization: `Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImp0aSI6IjkzOWNjM2E3OWIyM2M4MjczYTg0ZjZkNmVjZjMwMWE4ZWI5YjE2ZDYwY2NjZTFiY2Y1MzM1NDJmNmJjMmU3NGNiYjIwY2RjZDNiOGVhZDUyIn0.eyJhdWQiOiIzYjNlNGNmZS1mZGFlLTRlNGQtOWZhNC00ODY4ZmVlZWFkMDMiLCJqdGkiOiI5MzljYzNhNzliMjNjODI3M2E4NGY2ZDZlY2YzMDFhOGViOWIxNmQ2MGNjY2UxYmNmNTMzNTQyZjZiYzJlNzRjYmIyMGNkY2QzYjhlYWQ1MiIsImlhdCI6MTczMzEwNTA4OSwibmJmIjoxNzMzMTA1MDg5LCJleHAiOjE4ODc3NTM2MDAsInN1YiI6Ijc4NTkyNjAiLCJncmFudF90eXBlIjoiIiwiYWNjb3VudF9pZCI6Mjk5NjY4MDMsImJhc2VfZG9tYWluIjoiYW1vY3JtLnJ1IiwidmVyc2lvbiI6Miwic2NvcGVzIjpbImNybSIsImZpbGVzIiwiZmlsZXNfZGVsZXRlIiwibm90aWZpY2F0aW9ucyIsInB1c2hfbm90aWZpY2F0aW9ucyJdLCJoYXNoX3V1aWQiOiI4ZGI0NDM1Ny00OGU1LTQ2NWQtOWY4OS00MWQ5MjA0ZjU1Y2YiLCJhcGlfZG9tYWluIjoiYXBpLWIuYW1vY3JtLnJ1In0.TQ5oaojz6iCKSLcVWPNgFCv4nT2uVyTHDrNPn7obku5_B0iP0k-C4va7NztuiQZl9EW160he-rYQho1q83pOBj59u2ag630BHNSf0gYRmDS5WuR4bf7uSgsQMfyetQj2zSc86syFOshPQUhq9HNOIU8SKhzHnpxy3EzLQuyCe2jRCPL5PR4qBL5U0yPWo8EAi60i_82Thv0CnHaimbwRWzTXKD60AUGY97plFOpqdHmAKfKD0eh2gTpjUeHe4gUkUeWxXP1bI5PxQMgSlLN8uxoc3m7q0iGvCHV06Djxi-VwnDZFsFdNu58Qvl_8JXPFEIxYGj2eoePnnve_7ClLeg`,
          'Content-Type': 'application/json',
        },
        params: {
          limit_offset: offset,
          limit_rows: 499,
        },
      }
    );

    if (response.status === 204) {
      return [];
    }

    return response.data?.response?.contacts || [];
  };

  try {
    let offset = 0;
    let foundContact = null;

    while (!foundContact) {
      const contacts = await fetchContacts(offset);

      if (!contacts.length) {
        break;
      }

      foundContact = contacts.find(contact =>
        contact.profiles?.VK?.profile_id === vkId
      );

      if (foundContact) {
        break;
      }

      offset += 499;
    }

    if (!foundContact) {
      return res.status(404).json({ error: 'Контакт с указанным vkId не найден' });
    }

    res.status(200).json({
      contactId: foundContact.id,
      vkId,
    });
  } catch (error) {
    console.error('Ошибка запроса:', error.message, error.stack);
    res.status(500).json({ error: error.response?.data || 'Ошибка сервера' });
  }
}
