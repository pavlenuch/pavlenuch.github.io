const aside = {
    
    view: "list",
    id:"mylist",
    scroll:false,
    select:true,
    width:200,
    css:"list_color",
    data:[
        {value:"Dashboard", id:"dashboard"},
        {value:"Users", id:"users"},
        {value:"Products", id:"products"}
    ],
    on:{
        onAfterSelect(id){ 
            $$(id).show();
        }
    }
}

const multi = {
    cells:[
        { id:"dashboard", cols:[ table, form ] },
        { id:"users", rows:[users] },
        { id:"products", rows:[products] }
    ]   
}

