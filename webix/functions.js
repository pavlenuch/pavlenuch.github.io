
let clearForm = () => {
    webix.confirm({
        title:"All data will be lost!",
        text:"Are you sure?"
    }).then(
        () => {
            
            $$("film_form").clear();
            $$("film_form").clearValidation();
        }
)};

let saveItem = () => {
    let form = $$( "film_form" );  
    let list = $$( "film_list" );  
    let item_data = $$("film_form").getValues();    
    if( form.validate() && form.validate() ){
        if( item_data.id ) 
            list.updateItem(item_data.id, item_data);
        else 
            list.add( item_data );
    }
}


let addPerson = () => {
    let obj = {
        name:"Some name",
        age:Math.floor(Math.random() * 80) + 10, 
        country:"Some country"
    }
    $$("user_list").add(obj);
};

