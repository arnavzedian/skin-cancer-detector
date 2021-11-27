import * as tf from "@tensorflow/tfjs";

function makePrediction(model) {

    return new Promise(resolve=>{
   
        setTimeout(()=>{
            const pixels = tf.browser.fromPixels(document.querySelector("#imageSource")).resizeBilinear([150,150]).div(tf.scalar(255));
            const images = tf.reshape(pixels, [1, 150, 150, 3]) // array is expected
    
            const modelPrediction = model.predict(images);
            console.log(modelPrediction.dataSync())
            const [maligant] = Array.from(modelPrediction.dataSync());
          
            console.log(maligant)
            if(maligant > 0.5) return resolve("Malignant")
            return resolve("Benign")
        },1000)

    })
  }

export default makePrediction