webix.ui({
    rows:[
        header,
        {
            cols:[
            aside, {view: "resizer"}, multi
            ]
        },
        footer
    ]
});


// $$("mylist").select("products");

$$("chart").sync($$("user_list"));

$$("list_input").attachEvent("onTimedKeyPress",function(){
    var value = this.getValue().toLowerCase();
    $$("user_list").filter(function(obj){
      return obj.name.toLowerCase().indexOf(value) !== -1;
    })
});