//max min methods
Array.prototype.max = function() {
    return Math.max.apply(null, this)
}

Array.prototype.min = function() {
    return Math.min.apply(null, this)
}

// scaling
function scaling(feature_data, val_features){
    var min = feature_data.min()
    var max = feature_data.max()
    return {"train_scaled_data" : feature_data.map((x)=>(x-min)/(max-min)), "val_scaled_data" : val_features.map((x)=>(x-min)/(max-min))}
}

mse = (a, b) => a.map((x, i) => Math.pow(a[i] - b[i], 2)).reduce((m, n) => m+n)/a.length
dotproduct = (a, b) => a.map((x, i) => a[i] * b[i]).reduce((m, n) => m + n)
msubstract = (a, b) => a.map((x, i) => a[i] - b[i])
madd = (a, b) => a.map((x, i) => a[i] - b[i])

mmultiply = (a, b) => a.map(x => transpose(b).map(y => dotproduct(x, y)))
transpose = a => a[0].map((x, i) => a.map(y => y[i]))

module.exports = {scaling, mse, dotproduct, msubstract, mmultiply, transpose, madd}