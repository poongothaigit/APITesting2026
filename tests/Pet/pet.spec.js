import {test, expect, request as playwrightRequest} from "@playwright/test";
import {getPetById, createPet, deletePet} from "../../services/petService";
import {logger} from "../../utils/logger";
import petData from "../../testdata/petData.json";
import createPetSchema from "../../Schemas/pet.schema.json"
import { validateSchema } from "../../utils/schemaValidator";


test.describe.serial('Pet API flow: POST -> GET -> DELETE', () => {
let createdPetId;

test("POST to create pet", async({request})=>{
    const createResp = await createPet(petData);
    const rawBodyPOST = await createResp.text();
    createdPetId = rawBodyPOST.match(/"id"\s*:\s*(\d+)/)[1];
    console.log("Extracted petId(str)------", createdPetId);
    logger.info("Create pet response status -----", { status: createResp.status() });
     // Schema Validation
     const respPostJson = await createResp.json();
     validateSchema(createPetSchema, respPostJson);
     expect(respPostJson.name).toBe(petData.name);
});

test("GET pet by ID", async({request})=>{
    const getResp = await getPetById(createdPetId);
    const rawGetBody = await getResp.text();
    console.log('Raw POST response:', rawGetBody);
    const respGetId = rawGetBody.match(/"id"\s*:\s*(\d+)/)[1];
    logger.info("Get pet response -----", { status: getResp.status() });
    expect(getResp.status()).toBe(200);
    expect(respGetId).toBe(createdPetId);

    //Schema Validation
    const getJsonResp = await getResp.json();
    validateSchema(createPetSchema, getJsonResp);
    expect(getJsonResp.name).toBe(petData.name);
    
    
});

test("Delete a pet", async({request})=>{
    const deleteResp = await deletePet(createdPetId);
     logger.info("Delete pet response -----", { status: deleteResp.status() });
     expect(deleteResp.status()).toBe(200);
});
});