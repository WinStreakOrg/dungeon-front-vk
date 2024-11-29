import axios from 'axios';


export default async function handler(req, res) {
  if (req.method !== 'PATCH') {
    return res.status(405).json({ error: 'Метод не разрешен' });
  }
  const {
    zone, time, // userName,
    comment, date, address, persons, hookah, nameValue, contactId,
  } = req.body;

  const addressEnumId = (() => {
    switch (address) {
      case 'ул. Полевая, 72':
        return 1276707;
      case 'Московское шоссе, 43':
        return 1276703;
      case 'ул. Революционная, 155':
        return 1276705;
    }
  })();


  const zoneEnumId = (() => {
    switch (zone) {
      case 'Мягкая зона':
        return 1276625;
      case 'VIP-зона':
        return 1276627;
    }
  })();


  const hookahEnumId = (() => {
    switch (hookah) {
      case 'буду':
        return 1276633;
      case 'не буду':
        return 1276635;
      default:
        return 1276635;
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
    const response = await axios.patch(`https://spacetimeceo.amocrm.ru/api/v4/leads`, JSON.stringify({
      status_id: contactId,
      custom_fields_values: [{
        field_id: 904521, values: [{ value: unixTimestamp }],
      }, {
        field_id: 904513, values: [{ enum_id: addressEnumId }],
      }, {
        field_id: 904517, values: [{ value: persons }],
      }, {
        field_id: 904525, values: [{ enum_id: hookahEnumId }],
      }, { //vk source
        field_id: 904511, values: [{ enum_id: 1276617 }],
      }, {
        field_id: 904529, values: [{ value: nameValue }],
      },
        {
          field_id: 904515, values: [{ enum_id: zoneEnumId }],
        },
        {
          field_id: 904523, values: [{ value: comment }],
        }],
    }), {
      headers: {
        Authorization: `Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImp0aSI6IjVhN2JhNDE0NDBkZjZlYmRkMTgzZDEwMjA4OWM1ODg1ZDgwYmI0YjRkMzgwN2U1YjFiMDQ0Mjk4ZDFmZjA4MGI3YjhmNmZlOGJlOGU4YTc1In0.eyJhdWQiOiI1MzY2Y2FiNy1jODYxLTQ3YWUtOWE2ZC1mZGI1NDE5MWY2NjIiLCJqdGkiOiI1YTdiYTQxNDQwZGY2ZWJkZDE4M2QxMDIwODljNTg4NWQ4MGJiNGI0ZDM4MDdlNWIxYjA0NDI5OGQxZmYwODBiN2I4ZjZmZThiZThlOGE3NSIsImlhdCI6MTczMTg0OTU5NiwibmJmIjoxNzMxODQ5NTk2LCJleHAiOjE3OTU5OTY4MDAsInN1YiI6IjExNDczMTQ2IiwiZ3JhbnRfdHlwZSI6IiIsImFjY291bnRfaWQiOjMxOTMwNDU4LCJiYXNlX2RvbWFpbiI6ImFtb2NybS5ydSIsInZlcnNpb24iOjIsInNjb3BlcyI6WyJjcm0iXSwiaGFzaF91dWlkIjoiYTNjOWMyZTMtZWZjYi00MzMwLTgxZWEtNGYxYzhkYjYyYmM4IiwiYXBpX2RvbWFpbiI6ImFwaS1iLmFtb2NybS5ydSJ9.GSyqBene10IXXAzk1kR-y8hMgkRdBqsLSisXCki5lsUL_zAgBYbwlfbLcLdb2rdVtmJrBOk-i22OoSqETOaRhlkAPktHEio20kesAtzNBx06vjkcKGXMWFMygn5PeRDDLtlb-aNtdlyOGRn-EUBnYD15sjrmCuxrFhiei67GKEq9jSk0Ze1MXKodFqFoxtuXObK-YzHNQfpODb2JGsVyhlP8XWHl0Z3-tcDZ7c2rQDwpZmR4O7lXlQqVGxL_3ZtBKN11QLM2hJbsFJeaxf5OggD7R06h3rziVm8SUsGPrDNiCTwpQfuG1wo-Ao9X-vIh9DfRG6b8-UuVYMJC19EASw`,
        'Content-Type': 'application/json',
      },
    });
    res.status(200).json(response.data);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Ошибка сервера' });
  }
}
