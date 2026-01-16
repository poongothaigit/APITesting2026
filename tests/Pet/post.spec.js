import {test, expect, request as playwrightRequest } from "@playwright/test";
//import { request } from "node:http";
import {createPet} from "../../services/petService";
import {logger} from "../../utils/logger";
import petData from "../../testdata/petData.json";


test("create a pet", async({request})=>{
    const response = await createPet(petData);
    logger.info("Create Pet Response", {status: response.status()});
    expect(response.status()).toBe(200);
    const body = await response.json();
    console.log(body);
    expect(body.name).toBe(petData.name);
     console.log("REsponse id----" + body.id);
})