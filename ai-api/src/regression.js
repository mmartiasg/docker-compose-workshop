const math_extra = require("./math_extras")

class Regression{
    constructor(epsilon, metric){
        this.tita1 = (Math.random()*2-1)
        this.tita2 = (Math.random()*2-1)
        this.epsilon = epsilon
        this.metric = metric

        // optimizer rms
        this.velocity_tita1 = 0
        this.velocity_tita2 = 0
        this.previous_velocity_tita1 = 0
        this.previous_velocity_tita2 = 0
        this.mometum = 0.09
    }

    reset_params(){
        this.tita1 = (Math.random()*2-1)
        this.tita2 = (Math.random()*2-1)
    }

    update_weights(y_pred, y, x){
        const N = x.length

        this.tita1 -= this.epsilon*math_extra.dotproduct(msubstract(y_pred, y), x)/N
        this.tita2 -= this.epsilon*math_extra.msubstract(y_pred, y).reduce((m, n) => m + n)/N
    }

    update_weights_rms(y_pred, y, x){
        const N = x.length

        this.velocity_tita1 = this.previous_velocity_tita1*this.mometum - this.epsilon*math_extra.dotproduct(msubstract(y_pred, y), x)/N
        this.velocity_tita2 = this.previous_velocity_tita2*this.mometum - this.epsilon*math_extra.msubstract(y_pred, y).reduce((m, n) => m + n)/N

        this.tita1 += (this.velocity_tita1*this.mometum - this.epsilon*math_extra.dotproduct(msubstract(y_pred, y), x)/N)
        this.tita2 += (this.velocity_tita2*this.mometum - this.epsilon*math_extra.msubstract(y_pred, y).reduce((m, n) => m + n)/N)

        this.previous_velocity_tita1 = this.velocity_tita1
        this.previous_velocity_tita2 = this.velocity_tita2
    }

    predict(x){
        return this.tita1 * x + this.tita2
    }

    training_loop(train_x, train_y, MAX_EPOCHS){
        //Cantida de datos de entrenamiento
        const N = train_x.length

        //Estructuras auxiliares para actualizar los pesos en cada paso del entrenamiento
        let y_preds = new Array(N)
    
        for (let epoch=0; epoch<MAX_EPOCHS; epoch++){
            for (let i=0; i<N; i++){
                y_preds[i] = this.predict(train_x[i])//prediccion - pateas 50 pelotas 
            }
            
            if (epoch%(MAX_EPOCHS/100)==0){
                console.log("----------------------"+"EPOCH: "+epoch+"--------------------------")
                console.log("TRAIN MSE: "+this.metric(y_preds, train_y))//3 pelotas en el angulo 3/50 / 5/50
            }

            //correccion - haces tus cambios en el
            //moviento el coach(el gradiente la senal de correcion) te dice tiratemas a la izquierda
            this.update_weights(y_preds, train_y, train_x)
        }
    }

    training_map(train_x, train_y, MAX_EPOCHS, use_rms_optimizer){ 
        for (let epoch=0; epoch<MAX_EPOCHS; epoch++){
            let y_preds = train_x.map((features) => this.predict(features))

            if (use_rms_optimizer){
                this.update_weights_rms(y_preds, train_y, train_x)
            }else{
                this.update_weights(y_preds, train_y, train_x)
            }
    
            if (epoch%(MAX_EPOCHS/100)==0){
                console.log("----------------------"+"EPOCH: "+epoch+"--------------------------")
                console.log("TRAIN MSE: "+this.metric(y_preds, train_y))
            }
        }
    }

    eval_map(val_x, train_y){
        let y_preds = val_x.map((x, i) => this.predict(val_x[i]))

        return this.metric(y_preds, train_y)
    }

}

module.exports = Regression
