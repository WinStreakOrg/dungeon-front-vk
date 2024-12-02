import axios from 'axios';
//изм
export default async function handler(req, res) {
  if (req.method !== 'PATCH') {
    return res.status(405).json({ error: 'Метод не разрешен' });
  }
  const {
    zone,
    time,
    comment,
    date,
    address,
    persons,
    hookah,
    nameValue,
    leadId,
  } = req.body;

  const addressEnumId = (() => {
    switch (address) {
      case 'ул. Полевая, 72':
        return 568295;
      case 'Московское шоссе, 43':
        return 135311;
      case 'ул. Революционная, 155':
        return 135313;
    }
  })();

  const zoneEnumId = (() => {
    switch (zone) {
      case 'Мягкая зона':
        return 230309;
      case 'VIP-зона':
        return 230311;
    }
  })();

  const hookahEnumId = (() => {
    switch (hookah) {
      case 'буду':
        return 592397;
      case 'не буду':
        return 592399;
      default:
        return 592401;
    }
  })();

  if (!date || !time) {
    return res.status(400).json({ error: 'Дата и время обязательны' });
  }

  const [day, month, year] = date.split('-');

  const formattedDateString = `${year}-${month}-${day}`;

  const formattedDate = new Date(`${formattedDateString}T${time}:00`);

  const unixTimestamp = Math.floor(formattedDate.getTime() / 1000);

  if (!addressEnumId) {
    return res.status(400).json({ error: 'Некорректный адрес' });
  }

  if (!zoneEnumId) {
    return res.status(400).json({ error: 'Некорректная зона' });
  }
  if (!hookahEnumId) {
    return res.status(400).json({ error: 'Некорректный кальян' });
  }

  try {
    const response = await axios.patch(
      `https://dungeonbron.amocrm.ru/api/v4/leads/${leadId}`,
      JSON.stringify({
        id: leadId,
        custom_fields_values: [
          {
            field_id: 274879,
            values: [{ value: unixTimestamp }],
          },
          {
            field_id: 276195,
            values: [{ enum_id: addressEnumId }],
          },
          {
            field_id: 299875,
            values: [{ value: persons }],
          },
          {
            field_id: 998443,
            values: [{ enum_id: hookahEnumId }],
          },
          {
            field_id: 933055,
            values: [{ value: nameValue }],
          },
          {
            field_id: 448385,
            values: [{ enum_id: zoneEnumId }],
          },
          {
            field_id: 407891,
            values: [{ value: comment }],
          },
        ],
      }),
      {
        headers: {
          Authorization: `Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImp0aSI6IjkzOWNjM2E3OWIyM2M4MjczYTg0ZjZkNmVjZjMwMWE4ZWI5YjE2ZDYwY2NjZTFiY2Y1MzM1NDJmNmJjMmU3NGNiYjIwY2RjZDNiOGVhZDUyIn0.eyJhdWQiOiIzYjNlNGNmZS1mZGFlLTRlNGQtOWZhNC00ODY4ZmVlZWFkMDMiLCJqdGkiOiI5MzljYzNhNzliMjNjODI3M2E4NGY2ZDZlY2YzMDFhOGViOWIxNmQ2MGNjY2UxYmNmNTMzNTQyZjZiYzJlNzRjYmIyMGNkY2QzYjhlYWQ1MiIsImlhdCI6MTczMzEwNTA4OSwibmJmIjoxNzMzMTA1MDg5LCJleHAiOjE4ODc3NTM2MDAsInN1YiI6Ijc4NTkyNjAiLCJncmFudF90eXBlIjoiIiwiYWNjb3VudF9pZCI6Mjk5NjY4MDMsImJhc2VfZG9tYWluIjoiYW1vY3JtLnJ1IiwidmVyc2lvbiI6Miwic2NvcGVzIjpbImNybSIsImZpbGVzIiwiZmlsZXNfZGVsZXRlIiwibm90aWZpY2F0aW9ucyIsInB1c2hfbm90aWZpY2F0aW9ucyJdLCJoYXNoX3V1aWQiOiI4ZGI0NDM1Ny00OGU1LTQ2NWQtOWY4OS00MWQ5MjA0ZjU1Y2YiLCJhcGlfZG9tYWluIjoiYXBpLWIuYW1vY3JtLnJ1In0.TQ5oaojz6iCKSLcVWPNgFCv4nT2uVyTHDrNPn7obku5_B0iP0k-C4va7NztuiQZl9EW160he-rYQho1q83pOBj59u2ag630BHNSf0gYRmDS5WuR4bf7uSgsQMfyetQj2zSc86syFOshPQUhq9HNOIU8SKhzHnpxy3EzLQuyCe2jRCPL5PR4qBL5U0yPWo8EAi60i_82Thv0CnHaimbwRWzTXKD60AUGY97plFOpqdHmAKfKD0eh2gTpjUeHe4gUkUeWxXP1bI5PxQMgSlLN8uxoc3m7q0iGvCHV06Djxi-VwnDZFsFdNu58Qvl_8JXPFEIxYGj2eoePnnve_7ClLeg`,
          'Content-Type': 'application/json',
        },
      }
    );

    res.status(200).json(response.data);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Ошибка сервера' });
  }
}
