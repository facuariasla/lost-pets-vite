import type { PetData, PetReported } from "../Types";
// LOCAL:
// export const API_BASE_URL = "http://localhost:4000";

// DEPLOYED
export const API_BASE_URL = "https://dwf-m7-test01.herokuapp.com";

// PETS ENDPOINTS ////////////////////////////////////////////////////////////////

// GET ALL PETS NO SE USA
// GET ALL LOST PETS NO SE USA

// GET /pets-around
export const lostPetsAround = async (lat: number, lng: number) => {
  try {
    const getPets = await fetch(
      API_BASE_URL + `/pets-around?lat=${lat}&lng=${lng}`
    );
    const res = await getPets.json();
    return res;
  } catch (error) {
    console.log(error);
    return error;
  }
};

// GET /pets/:objectID --> get ONE PET
export const getOnePet = async (objectID: any) => {
  try {
    const pet = await fetch(API_BASE_URL + `/pets/${objectID}`);
    const res = await pet.json();
    return res;
  } catch (error) {
    console.log({error, message: 'Error en peticion get del cliente -- getOnePet'})
    return error
  }
};

// POST /pets/:objectID/report
export const reportPetAround = async (data: PetReported) => {
  try {
    const { objectID } = data;
    const petReported = await fetch(API_BASE_URL + `/pets/${objectID}/report`, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(data),
    });
    const res = await petReported.json();
    return res;
  } catch (error) {
    console.log({error, message: 'Error en post del cleint - reportPetAround'})
    return error
  }

};

// POST /pets --> CREA PET; NECESITA BEARER TOKEN
export const createPet = async (data: PetData) => {
  try {
    const tokenVal = localStorage.getItem("token_lostpet");
    const newPet = await fetch(API_BASE_URL + "/pets", {
      method: "POST",
      headers: {
        "content-type": "application/json",
        "Authorization": `Bearer ${tokenVal}`,
      },
      body: JSON.stringify(data),
    });
    const res = await newPet.json();
    return res
  } catch (error) {
    console.log({error, message: 'Error en peticion del cliente - createPet'})
    return error
  }

};

// PUT /pets/:objectID --> Pet EDIT -- NECESITA TOKEN
export const editPet = async (data: any) => {
  try {
    const { objectID } = data;
    const tokenVal = localStorage.getItem("token_lostpet");
  
    const pet = await fetch(API_BASE_URL + `/pets/${objectID}`, {
      method: "PUT",
      headers: { "content-type": "application/json", "Authorization": `Bearer ${tokenVal}`},
      body: JSON.stringify(data),
    });
    const res = await pet.json();
    return res;
  } catch (error) {
    console.log({error, message: 'Error en peticion PUT cliente - editPet'})
    return error
  }

};

// DELETE /pets/:objectID --> Elimina PET, NECESITA TOKEN
export const deletePet = async (objectID:any) => {
  try {
    const tokenVal = localStorage.getItem("token_lostpet");
    const pet = await fetch(API_BASE_URL + `/pets/${objectID}`, {
      method: "DELETE",
      headers: { "Authorization": `Bearer ${tokenVal}`},
    })
    const res = await pet.json();
    return res
  } catch (error) {
    console.log({error, message: 'Error en peticion DELETE cliente - deletePet'})
  }
}


// USERS ENDPOITNS /////////////////////////////////////////////////////////////////
// getAllusers, deleteUser, no se usa

// POST /users --> Crear usuario  ------ DEVUELVE UN TOKEN - GUARDAR EN LOCAL
export const createUser = async (data: object) => {
  try {
    const creating = await fetch(API_BASE_URL + "/users", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(data),
    });
    const res = await creating.json();

    return res;
  } catch (error) {
    console.log(error);
    return error;
  }
};

// POST /users/login --> Logea usuario ---- DEVUELVE UN TOKEN - GUARDAR EN LOCAL
export const loginUser = async (data: object) => {
  try {
    const login = await fetch(API_BASE_URL + '/users/login', {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(data),
    });
    const res = await login.json();
    return res;
  } catch (error) {
    console.log({error, message: 'Error 400 en loginUser'});
    return error;
  }
};

// PUT /users/:id --> Actualiza users, NECESITA TOKEN
export const updateUser = async (data: object) => {
  try {
    const tokenVal = localStorage.getItem("token_lostpet");
    const userVal = localStorage.getItem("user_lostpet");
    const updateUser = await fetch(API_BASE_URL + `/users/${userVal}`, {
      method: "PUT",
      headers: {
        "content-type": "application/json",
        Authorization: `Bearer ${tokenVal}`,
      },
      body: JSON.stringify(data),
    });
    const res = await updateUser.json();
    return res;
  } catch (error) {
    console.log(error);
    return error;
  }
};

// GET /users/pets --> Llama a los pet del x user, NECESITA TOKEN
export const myPetsReported = async () => {
  try {
    const tokenVal = localStorage.getItem("token_lostpet");
    const userId_:any = localStorage.getItem("user_lostpet");
    const userId = parseInt(userId_);
    const myPets = await fetch(API_BASE_URL + `/users/${userId}/pets`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${tokenVal}`,
      },
    });
    const res = await myPets.json();
    return res
  } catch (error) {
    console.log(error);
    return error;
  }
};

// router.get("/users/me", getUser);
// GET /users/:id --> Perfil del user --- NECESITA TOKEN
export const myProfile = async () => {
  try {
    const tokenVal = localStorage.getItem("token_lostpet");
    const userIdSTR:any = localStorage.getItem("user_lostpet");
    const userId = parseInt(userIdSTR);
    const myProfileDB = await fetch(API_BASE_URL + '/me', {
      method: "GET",
      headers: {
        Authorization: `Bearer ${tokenVal}`,
      },
    });
    const res = await myProfileDB.json()
    return res
  } catch (error) {
    console.log(error);
    return error;
  }
};

