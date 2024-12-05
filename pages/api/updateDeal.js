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

  const localDate = new Date(`${formattedDateString}T${time}:00`);

  const adjustedDate = new Date(localDate.getTime() - 3600000);

  const adjustedTimestamp = Math.floor(adjustedDate.getTime() / 1000);

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
        status_id: 45786115,
        id: leadId,
        custom_fields_values: [
          {
            field_id: 274879,
            values: [{ value: adjustedTimestamp }],
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
