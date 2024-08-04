export const addTimer = async (data) => {
  await fetch("https://66ad0a17f009b9d5c734361b.mockapi.io/api/v1/timer", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error("Ошибка запроса" + response.statusText);
      }
      return response.json();
    })
    .catch((error) => {
      console.error("Error:", error);
    });
};

export const getListTimer = async () => {
  try {
    const response = await fetch(
      "https://66ad0a17f009b9d5c734361b.mockapi.io/api/v1/timer"
    );
    const result = await response.json();
    return result;
  } catch (error) {
    console.error("Ошибка при загрузке данных:", error);
  }
};

export const setTimer = async (id, data) => {
  await fetch(
    "https://66ad0a17f009b9d5c734361b.mockapi.io/api/v1/timer/" + id,
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    }
  )
    .then((response) => {
      if (!response.ok) {
        throw new Error("Ошибка запроса" + response.statusText);
      }
    })
    .catch((error) => {
      console.error("Error:", error);
    });
};
