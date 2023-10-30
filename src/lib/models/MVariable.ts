import type { VariableType } from "$lib/interfaces/variable_definition_interface"

export default class Variable {
    public name: string
    public type: VariableType.text | VariableType.number | VariableType.color | VariableType.file
    public value: any

    constructor(name: string, type: VariableType.text | VariableType.number | VariableType.color | VariableType.file, value: any) {
        this.name = name;
        this.type = type;
        this.value = value;
    }
}