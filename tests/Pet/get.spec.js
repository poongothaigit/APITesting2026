import {test, expect, request as playwrightRequest} from "@playwright/test";
import {getPetById, createPet, deletePet} from "../../services/petService";
import {logger} from "../../utils/logger";
import petData from "../../testdata/petData.json";

let createdPetId;

test.beforeAll(async ({ request }) => {
    const createResp = await createPet(petData);
    const created = await createResp.json();
    createdPetId = created.id; // store globally
    logger.info("Created pet response in beforeAll -----", { status: createResp.status() });
});

test("Get pet by ID", async({request})=>{
    const response = await getPetById(createdPetId);
    logger.info("Get pet by ID response ----- ", {status:response.status()});
    expect(response.status()).toBe(200);
    
    const respBody = await response.json();
    console.log(respBody);
    expect(respBody.id).toBe(created.id);
})

test("Delete- a pet", async({request})=>{
    const deleteResp = await deletePet(createdPetId);
     logger.info("Delete pet response -----", { status: deleteResp.status() });
     expect(deleteResp.status()).toBe(200);
})