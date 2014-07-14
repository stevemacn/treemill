unflatten = function (data) {

}

module.exports = function(data, links) { 
   
    if (links) {
        nodes = data;
        data = {
            "nodes":nodes,
            "links":links
        }
    }
    return new unflatten(data)
}
