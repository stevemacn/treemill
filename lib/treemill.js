treemill = function () {
    this.unflatten = function (data) {
    
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
            tree = { "children": children}
            //get all properties of object
            for (var i in data.nodes[root]) {
                if (i!="children")
                    tree[i]=data.nodes[root][i]
            }
            //call recusive step 
            buildTree (data, root, children)
        }
        
        //find the root and pass result to beginTree
        findRoot(data, beginTree)
       
        //recursively follow the target of the new subroot 
        //until the tree has been completed.
        function buildTree (data, root, children) {
            var temp = []
            
            for (i in data.links) {
                if (data.links[i].source==root) temp.push(data.links[i]) 
            }                
    
            for (i=0; i<temp.length; i++) {
                
                var newChildren = []
                var obj = {
                    "name":data.nodes[temp[i].target].name, 
                    "children":newChildren
                }
                for (var x in data.nodes[temp[i].target]) 
                    obj[x] = data.nodes[temp[i].target][x]
                    
                
                children.push(obj)    
                buildTree(data, temp[i].target, newChildren)
            }
        }
    }
    
    this.flatten = function (data) {
    
        var nodes = [];
        var links = [];
    
        //breadth first search
        var recurse = function (count, data) {
            
            var node = {}
            nodes.push(node)
            
            count++
            
            for (var x in data) {
                if (x!="children") node[x] = data[x]
                else {
                    for (var i in data[x]) {
                        links.push({
                            "source":count,
                            "target":count+parseInt(i)+1,
                        })
                        recurse(count, data["children"][i]) 
                    }
                }
            }
        }
        //invoke itself recursively and return result 
        recurse (-1, data);
        return ({"nodes":nodes,"links":links})
    }

    return this;
}

//compatible with bower
if (typeof(module) !== 'undefined') {
    module.exports = function(data, links) { 
        return new treemill()
    }
}
