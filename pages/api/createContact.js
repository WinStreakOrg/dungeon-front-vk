import axios from 'axios';
// изм
export default async function handler(req, res) {
  if (req.method !== 'PATCH') {
    return res.status(405).json({ error: 'Метод не разрешен' });
  }
  const { contactId, phoneValue } = req.body;

  try {
    const response = await axios.patch(
      `https://dungeonbron.amocrm.ru/api/v4/contacts`,
      JSON.stringify([
        {
          id: contactId,
          custom_fields_values: [
            {
              field_id: 174275,
              values: [
                {
                  value: phoneValue,
                  enum_id: 82235,
                },
              ]
            }
          ],
        },
      ]),
      {
        headers: {
          Authorization: `Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImp0aSI6IjlmMDIzYzY2ZmUxNjE1N2JmZTZiMGY1YzA1ZDdiZTE3YTY1OWQwYWJhZmJmODJmYTc0NWM0Yzg4OTk1OWJkYzNmMzViMzA4ZTc2NmU3OWY3In0.eyJhdWQiOiIzYjNlNGNmZS1mZGFlLTRlNGQtOWZhNC00ODY4ZmVlZWFkMDMiLCJqdGkiOiI5ZjAyM2M2NmZlMTYxNTdiZmU2YjBmNWMwNWQ3YmUxN2E2NTlkMGFiYWZiZjgyZmE3NDVjNGM4ODk5NTliZGMzZjM1YjMwOGU3NjZlNzlmNyIsImlhdCI6MTczMzIxMTcxNCwibmJmIjoxNzMzMjExNzE0LCJleHAiOjE4OTA2OTEyMDAsInN1YiI6Ijc4NTkyNjAiLCJncmFudF90eXBlIjoiIiwiYWNjb3VudF9pZCI6Mjk5NjY4MDMsImJhc2VfZG9tYWluIjoiYW1vY3JtLnJ1IiwidmVyc2lvbiI6Miwic2NvcGVzIjpbImNybSIsImZpbGVzIiwiZmlsZXNfZGVsZXRlIiwibm90aWZpY2F0aW9ucyIsInB1c2hfbm90aWZpY2F0aW9ucyJdLCJoYXNoX3V1aWQiOiIxNzUwYWJjYS1lNGMxLTQ4NTgtYmM1ZS1kOTk1YjI1ODQ0NmYiLCJhcGlfZG9tYWluIjoiYXBpLWIuYW1vY3JtLnJ1In0.ZxqQ_vI1yi7RBiFx_a0Bn-mHVv0d2Vn1vTo-CH13qcXbVC-wBvE1Kh-FtWMpYSk4h3Gf9sHsO_Lkbpua_R_lGNnwt8Y_zkbYBo2AFzGDieY_l8Lwp_3K2ILvUgUGqohJ06k1kk3iYmG7d8HF26YjcjREubY0kTvykqZU-H3XTXu1BSmDntuxlI6ZfoWIYBXB--X9Aia-bYhUcmogS3wf54f-hEzlBxw_nmMBgrPMsWiRo19yBzdT7cKayZfPIQ86nszupBUG4Zwc1xg137AhhUVEnPQXneiBiMQIPZSq9wjfma3L2hil4QrWGu_LCBstTQjBE5_D3OTA-N4pN33C9w`,
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
