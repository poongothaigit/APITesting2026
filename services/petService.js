//import { createClient } from "../utils/apiClient";
import { request as playwrightRequest } from "@playwright/test";
import { PET } from "../utils/endPoints";

//common call methods
export async function getPetById(id) {
  const BASE_URL = "https://petstore.swagger.io/v2/pet";
  const api = await playwrightRequest.newContext();
  const response = await api.get(`${BASE_URL}/${id}`, {
    headers: {
      "accept": "application/json",
             },
   });
  return response;
}

export async function createPet(newPetData) {
   console.log("Sending POST /pet body:", newPetData);
   const api = await playwrightRequest.newContext();
    const response = await api.post("https://petstore.swagger.io/v2/pet", {
    headers: {
      "accept": "application/json",
      "Content-Type": "application/json",
             },
    data: newPetData, 
  });
  return response;
}


