import http from "../../services/http";
import {methods} from "../../constant";
import { __endpoint_searchPlanets } from "./endpoint";

export const __api_searchPlanets = payload => http.Request(methods.GET, __endpoint_searchPlanets, payload);
