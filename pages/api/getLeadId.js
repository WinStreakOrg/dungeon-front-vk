import axios from 'axios';

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Метод не разрешен' });
  }

  const { contactId } = req.query;

  if (!contactId) {
    return res.status(500).json({ error: 'contactId Ошибка получения' });
  }

  try {
    const response = await axios.get(
      `https://dungeonbron.amocrm.ru/api/v4/leads?query=${contactId}&with=contacts`,
      {
        headers: {
          Authorization: `Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImp0aSI6IjkzOWNjM2E3OWIyM2M4MjczYTg0ZjZkNmVjZjMwMWE4ZWI5YjE2ZDYwY2NjZTFiY2Y1MzM1NDJmNmJjMmU3NGNiYjIwY2RjZDNiOGVhZDUyIn0.eyJhdWQiOiIzYjNlNGNmZS1mZGFlLTRlNGQtOWZhNC00ODY4ZmVlZWFkMDMiLCJqdGkiOiI5MzljYzNhNzliMjNjODI3M2E4NGY2ZDZlY2YzMDFhOGViOWIxNmQ2MGNjY2UxYmNmNTMzNTQyZjZiYzJlNzRjYmIyMGNkY2QzYjhlYWQ1MiIsImlhdCI6MTczMzEwNTA4OSwibmJmIjoxNzMzMTA1MDg5LCJleHAiOjE4ODc3NTM2MDAsInN1YiI6Ijc4NTkyNjAiLCJncmFudF90eXBlIjoiIiwiYWNjb3VudF9pZCI6Mjk5NjY4MDMsImJhc2VfZG9tYWluIjoiYW1vY3JtLnJ1IiwidmVyc2lvbiI6Miwic2NvcGVzIjpbImNybSIsImZpbGVzIiwiZmlsZXNfZGVsZXRlIiwibm90aWZpY2F0aW9ucyIsInB1c2hfbm90aWZpY2F0aW9ucyJdLCJoYXNoX3V1aWQiOiI4ZGI0NDM1Ny00OGU1LTQ2NWQtOWY4OS00MWQ5MjA0ZjU1Y2YiLCJhcGlfZG9tYWluIjoiYXBpLWIuYW1vY3JtLnJ1In0.TQ5oaojz6iCKSLcVWPNgFCv4nT2uVyTHDrNPn7obku5_B0iP0k-C4va7NztuiQZl9EW160he-rYQho1q83pOBj59u2ag630BHNSf0gYRmDS5WuR4bf7uSgsQMfyetQj2zSc86syFOshPQUhq9HNOIU8SKhzHnpxy3EzLQuyCe2jRCPL5PR4qBL5U0yPWo8EAi60i_82Thv0CnHaimbwRWzTXKD60AUGY97plFOpqdHmAKfKD0eh2gTpjUeHe4gUkUeWxXP1bI5PxQMgSlLN8uxoc3m7q0iGvCHV06Djxi-VwnDZFsFdNu58Qvl_8JXPFEIxYGj2eoePnnve_7ClLeg`,
          'Content-Type': 'application/json',
        },
      }
    );
    res.status(200).json({
      leadId: response.data?._embedded?.leads[0]?.id,
    });
  } catch (error) {
    console.error('Ошибка запроса:', error);
    res.status(500).json({ error: 'Ошибка сервера' });
  }
}
