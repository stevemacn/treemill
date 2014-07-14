unflatten-js
============

A javascript library for creating trees from flattened trees: node(id), link(source, target) to tree (id, children)

```
{
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


```

becomes 

```
  { 
    "name":"Steve", 
    "children": [ 
      {
        "name":"Dahlia",
        "children": [
          { 
            "name":"Boris",
            "children": []
          }, 
          { 
            "name":"Natasha",
            "children": [
              { 
                "name":"Leo",
                "children": [
                  {
                    "name":"Lena",
                    "children": []
                  },
                  {
                    "name":"Ralph",
                    "children": [
                      { 
                        "name":"Meghna",
                        "children":[]
                      }
                    ]
                  }
                ]
              }
            ]
          }
        ]
      }
    ]
  }


```

