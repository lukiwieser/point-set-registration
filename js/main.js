import { pointCloudSvg } from "./point-cloud-canvas.js";
import { pointsSmall } from "../config/points-small.js";
import { pointsBig } from "../config/points-big.js";

const pointCloudSmall = new pointCloudSvg("svg-small", "bt-delete-svg-small", "bt-import-small", pointsSmall, "bt-eval-small");
const pointCloudBig = new pointCloudSvg("svg-big", "bt-delete-svg-big", "bt-import-big", pointsBig, "bt-eval-big");
