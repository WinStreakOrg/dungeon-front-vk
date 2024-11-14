import axios from 'axios';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Метод не разрешен' });
  }
  const {
    zone,
    time,
    userName,
    comment,
    date,
    address,
    persons,
    hookah,
    nameValue,
    phoneValue,
  } = req.body;

  try {
    const response = await axios.post(`https://dungeonbrongmailcom.amocrm.ru/api/v4/leads`, JSON.stringify([{
      custom_fields_values: [{
        field_id: 878527,
        values: [{ value: time }],
      }, {
        field_id: 878509, values: [{ value: date }],
      }, {
        field_id: 878519, values: [{ value: address }],
      }, {
        field_id: 878515, values: [{ value: persons }],
      }, {
        field_id: 878525, values: [{
          value: hookah ? 'буду кальян' : 'не буду кальян',
        }],
      }, {
        field_id: 878533, values: [{ value: 'Сделка пришла из ВК' }],
      }, {
        field_id: 878511, values: [{ value: nameValue }],
      }, {
        field_id: 878517, values: [{ value: phoneValue }],
      }, {
        field_id: 878523, values: [{ value: zone }],
      }, {
        field_id: 878521, values: [{
          value: userName || 'не указан',
        }],
      }, {
        field_id: 878701, values: [{ value: comment }],
      }],
    }]), {
      headers: {
        Authorization: `Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImp0aSI6IjAzZTM3YjY5ZGEwMzkzMDNlMjBjNTVlZWMzMGYwNmVlOTc5NTY0YTAxMjAxMzJlYjM3MTNjNzhiMmYwMTk3ZGU0NmVmMzdlNWU5NzU3NzU5In0.eyJhdWQiOiI1ZGYyMjY2MC1lNzc4LTQwNTEtOGMwZC01NmE3Yzg2ZWY1ZDYiLCJqdGkiOiIwM2UzN2I2OWRhMDM5MzAzZTIwYzU1ZWVjMzBmMDZlZTk3OTU2NGEwMTIwMTMyZWIzNzEzYzc4YjJmMDE5N2RlNDZlZjM3ZTVlOTc1Nzc1OSIsImlhdCI6MTczMDgyMjE2NSwibmJmIjoxNzMwODIyMTY1LCJleHAiOjE3MzMwMTEyMDAsInN1YiI6Ijc4NTkyNjAiLCJncmFudF90eXBlIjoiIiwiYWNjb3VudF9pZCI6MzE3Mjk4NDYsImJhc2VfZG9tYWluIjoiYW1vY3JtLnJ1IiwidmVyc2lvbiI6Miwic2NvcGVzIjpbImNybSJdLCJoYXNoX3V1aWQiOiI2ZjVlNmM4MC0wMDc5LTQ5ZmMtYjA0NS1lY2NjYzQ3OWI4YTgiLCJhcGlfZG9tYWluIjoiYXBpLWIuYW1vY3JtLnJ1In0.NwROCN-0u0yD5vthuQhroNL7bUySOlU1uK0eguE8HJylkDW5MjffrORBbKzAkBXG5fgrpBtHuEszYzYAQh4LNOSueWcBSQ_tt_wZrCwVQ02ruseaTyNY8EVPp7ROD6vL1JUgeGIezQuBp9M-u5Qn6CNjG2ShTI_uQhYqPewlrRoR6xFG_X58eq2j0ltrqf-Yy9RXBz17FnFYY0bvRIdbRLIISg5vsHfVZynkO4cm9aWzLjjfhLXoKweWf2q40eIdQqyVsYU5EbcsO8HyeYLOkPQmg8AL5R8HCTC9AUgkneV2nFxANQk6vfvxWRm1iokqyhmxJ26zL9ZMH6tmBKW9AQ`,
        'Content-Type': 'application/json',
      },
    });

    res.status(200).json(response.data);
  } catch (error) {
    console.error('Ошибка при создании сделки:', error.response ? error.response.data : error.message);
    res.status(500).json({ error: 'Ошибка сервера' });
  }
}
