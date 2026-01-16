import {test, expect, request as playwrightRequest} from "@playwright/test";
import {getPetById, createPet} from "../../services/petService";
import {logger} from "../../utils/logger";
import petData from "../../testdata/petData.json";

test("Get pet by ID", async({request})=>{
    const response = await getPetById(161601);
    logger.info("Get pet by ID response ----- ", {status:response.status()});
    expect(response.status()).toBe(200);
    
    const respBody = await response.json();
    console.log(respBody);
    expect(respBody.id).toBe(petData.id);
})