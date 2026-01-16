import {test, expect, request as playwrightRequest} from "@playwright/test";
import {getPetById, createPet} from "../../services/petService";
import {logger} from "../../utils/logger";
import petData from "../../testdata/petData.json";

test("Get pet by ID", async({request})=>{
    const createResp = await createPet(petData);
    const created = await createResp.json();
    logger.info("Created pet response-----", {status:createResp.status()});
    const response = await getPetById(created.id);
    logger.info("Get pet by ID response ----- ", {status:response.status()});
    expect(response.status()).toBe(200);
    
    const respBody = await response.json();
    console.log(respBody);
    expect(respBody.id).toBe(created.id);
})