
const users = {
    rows:[
        {
            cols:[
                { 
                    view:"button", 
                    id:"btn_add_person", 
                    value:"Add new person", 
                    width:150, css:"webix_primary", 
                    click:addPerson
                },
                { 
                    view:"text", 
                    id:"list_input" 
                },
                { view:"button", id:"btn_asc", width:150, value:"Sort asc", css:"webix_primary", click:()=>{
                    $$("user_list").sort("#name#","asc")
                }},
                { view:"button", id:"btn_desc", width:150, value:"Sort desc", css:"webix_primary", click:()=>{
                    $$("user_list").sort("#name#","desc")
                    
                }},
            ]
        },
        {
            view: "editlist",
            editable:true,
            editor:"text",
            editValue:"name",
            id:"user_list",
            select:true,
            url:"data/users.js",
            template:"#name# from #country# <span class='webix_icon wxi-close'></span> ",
            onClick:{
                webix_icon(e, id){
                    this.remove(id);
                    return false;
                }
            }
        },
        {
            view:"chart",
            id:"chart",
            type:"bar",
            value:"#age#",
            label:"#age#",
            // url:"data/users.js",
            xAxis:{
                template:"#name#",
                title:"Age"
            }
        }
    ]
}

webix.protoUI({
    name:"editlist"
}, webix.EditAbility, webix.ui.list);

