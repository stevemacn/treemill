var should = require('should')
    , mocha = require('mocha')
    , treemill = require('../lib/treemill.js')

describe('unflatten-js', function () {

    it ('Correctly unflattens a node-link data structure into a tree', function(done) {
        
        var nodeLink = {
            "nodes": [
                {"name":"Steve"},
                {"name":"Dahlia"},
                {"name":"Boris"},
                {"name":"Natasha"},
                {"name":"Leo"},
                {"name":"Lena"},
                {"name":"Ralph"},
                {"name":"Meghna"}
            ],
            "links": [
                {"source":0, "target":1},
                {"source":1, "target":2},
                {"source":1, "target":3},
                {"source":4, "target":5},
                {"source":4, "target":6},
                {"source":6, "target":7},
                {"source":3, "target":4}
            ]
        }

        tm = treemill()
        tree = tm.unflatten(nodeLink) 


        walkTree = function (root, counter, testArr) {
            
            for (i=0; i<root.children.length; i++) {
                console.log(root.name + "\'s child: " + root.children[i].name)
                //correct parent
                root.name.should.eql(testArr[counter++])

                //correct child 
                root.children[i].name.should.eql(testArr[counter++])
                
                walkTree(root.children[i], counter, testArr)
            }
        }

        walkTree(tree, 0, [
            "Steve", "Dahlia",  //steve is parent of dahlia
            "Dahlia", "Boris",  //dahlia is parent of boris
            "Dahlia", "Natasha",//dahlia is parent of natasha
            "Natasha", "Leo",
            "Leo","Lena",
            "Leo","Ralph",
            "Ralph","Meghna"
        ])
        
        
        done()    
    })
})
