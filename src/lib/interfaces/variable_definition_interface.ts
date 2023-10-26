export default interface IVariable {
    name: string,
    value: any,
    type: VariableType
}


export enum VariableType {
    text = "text",
    number = "number",
    file = "file",
    dropdown = "dropdown",
    checkbox = "checkbox",
    color = "color",
    list = "list", //array
    key_value_list = "key-value_list", //dictionary in python
    list_of_named_list = "list_of_named_list" //object of object
}