unflatten = function (data) {

    var findRoot = function(data, cb) {

        //fill sources and targets array from data
        var sources = []
        var targets = []
        for (i in data.links) {
            sources.push(data.links[i].source)
            targets.push(data.links[i].target)
        }

        //find a source with no targets pointing to it
        root = null
        for (i in sources) {
            if(targets.indexOf(sources[i])==-1) 
               root = sources[i]
        }

        //if found move along
        if (root==null) return "could not find a root node"
        cb(data, root)
    }

    var beginTree = function(data, root) {

        //setup for recursion
        children = []
        tree = { 
            "name": data.nodes[root].name,
            "children": children
        } 
        //call recusive step 
        //buildTree (data, root, children)
    }
    
    //find the root and pass result to beginTree
    findRoot(data, beginTree)
   
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
