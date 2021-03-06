function treemill () {

    this.unflatten = function (data) {

        var tree
        
        console.log("unflatten")

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
            count = 0;

            for (i in sources) {
                if(targets.indexOf(sources[i])==-1) {
                    root = sources[i];
                    count++;
                }
            }
            //if found move along
            if (root==null) return -1
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
            nodes = {}
            //call recusive step
            buildTree (data, root, children)
        }

        //find the root and pass result to beginTree
        if (findRoot(data, beginTree)==-1)
            return {"error":"could not find the root of the tree"}
        return tree
        //recursively follow the target of the new subroot
        //until the tree has been completed.

        var nodes = {}

        function buildTree (data, root, children) {
            var temp = []
            if (nodes[root]) {
                tree = {}
                return null;
            }
            nodes[root] = true
            for (i in data.links) {
                if (data.links[i].source==root) temp.push(data.links[i])
            }

            temp.forEach(function (i) {
                var newChildren = []
                var obj = {
                    "name":data.nodes[i.target].name,
                    "children":newChildren
                }
                for (var x in data.nodes[i.target])
                    obj[x] = data.nodes[i.target][x]

                children.push(obj)
                buildTree(data, i.target, newChildren)
            })
        }
    }

    this.flatten = function (data) {

        console.log("flatten")

        var nodes = [];
        var links = [];

        //breadth first search
        var recurse = function (count, data) {

            var node = {}
            nodes.push(node)

            for (var x in data) {
                if (x!="children") node[x] = data[x]
                else {
                    for (var i in data[x]) {
                        links.push({
                            "source":count,
                            "target":count+parseInt(i)+1,
                        })
                        recurse(count+parseInt(i)+1, data["children"][i])
                    }
                }
            }
        }
        //invoke itself recursively and return result
        recurse (0, data);
        return {"nodes":nodes,"links":links}
    }

    return this;
}

//compatible with bower
if (typeof(module) !== 'undefined') {
    module.exports = function() {
        return new treemill()
    }
}
