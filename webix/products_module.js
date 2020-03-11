
const products = {
    editable:true,
    view:"treetable",
    scrollX:false,
    columns:[
        { id:"rank", header:"", width:50 },
        { id:"title", header:"Title", fillspace:true, template:"{common.treetable()} #title#"},
        { id:"price", header:"Price", width:200, editor:"text" }
    ],
    select:"row",
    url:"data/products.js",
    scheme:{
        $group:{
            by:"category",
            map:{
                title:["category"]
            }
        },
        $sort:{ by:"value", dir:"asc" }
    },
    ready(){
        this.open(this.getFirstId());
    }
}

