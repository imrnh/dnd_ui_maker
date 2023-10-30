import type { VariableType } from "$lib/interfaces/variable_definition_interface"

export default class KVPair {
    public name: string
    public type: VariableType.list | VariableType.key_value_pair
    public value: any[]

    constructor(name: string, type: VariableType.list | VariableType.key_value_pair, value: any[]) {
        this.name = name;
        this.type = type;
        this.value = value;
    }
}