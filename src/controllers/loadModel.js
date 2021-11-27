import * as tf from "@tensorflow/tfjs";

let url = "/tfjs_model/model.json"

export default async function loadModel() {
    const model = await tf.loadLayersModel(url);
    return model;
}

