//import { createClient } from "../utils/apiClient";
import { request as playwrightRequest } from "@playwright/test";
import { PET } from "../utils/endPoints";
import { BASE_URL } from "../utils/config";

//common call methods
export async function getPetById(id) {
  const api = await playwrightRequest.newContext(); //to create a session-like object for API testing, dedicated API client
   const response = await api.get(`${BASE_URL}${PET.GET_BY_ID(id)}`, {  
    headers: {
      "accept": "application/json",
             },
   });
  return response;
}
export async function deletePet(id){
  const api = await playwrightRequest.newContext();
  const response = await api.delete(`${BASE_URL}${PET.DELETE(id)}`, {
    headers: {
      "accept": "application/json",
             },
   });
   return response;
}
export async function createPet(newPetData) {
   console.log("Sending POST /pet body:", newPetData);
   const api = await playwrightRequest.newContext();
    const response = await api.post(`${BASE_URL}${PET.CREATE}`, {
    headers: {
      "accept": "application/json",
      "Content-Type": "application/json",
             },
    data: newPetData, 
  });
  return response;
}


