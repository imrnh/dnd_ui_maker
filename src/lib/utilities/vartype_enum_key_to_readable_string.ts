/*
 *  @ make the ugly 'allowed data type' names in VariableType readable to normal people.
 *   Ex: objects are named as 'named_list'. this function made it 'Named list' which is more readable to normal users.
 *
 *  @ Object.keys(VariableType).filter((key) => make_readable(VariableType[key]));
 *      This line reads the enum keys iterateively and fetch the strng value of each key
 *
 */

import { VariableType } from "$lib/interfaces/variable_definition_interface";


export default class VarTypeToReadableString {

    allowedVarTypeNameArray: string[] = []; //allowed variable types are stored in enum. We converted to array.
    allowedVarTypeOriginalEnumKeyStr: string[] = [];

    svd_instances = [VariableType.text, VariableType.number, VariableType.color, VariableType.file] //svd => single valued
    mvd_instances = [VariableType.list, VariableType.key_value_pair] //mvd => multi valued

    private make_readable(str: VariableType, filter: string) {
        if (filter == 'svd') {
            if (this.svd_instances.includes(str)) {
                this.allowedVarTypeOriginalEnumKeyStr.push(str);
                var first_char = str.substring(0, 1).toUpperCase();
                var new_str = first_char + str.substring(1, str.length);
                new_str = new_str.replace("_", " ");
                new_str = new_str.replace("_", " ");
                new_str = new_str.replace("_", " ");
                this.allowedVarTypeNameArray.push(new_str);
                return new_str;
            }
        }
        else {
            if (this.mvd_instances.includes(str)) {
                this.allowedVarTypeOriginalEnumKeyStr.push(str);
                var first_char = str.substring(0, 1).toUpperCase();
                var new_str = first_char + str.substring(1, str.length);
                new_str = new_str.replace("_", " ");
                new_str = new_str.replace("_", " ");
                new_str = new_str.replace("_", " ");
                this.allowedVarTypeNameArray.push(new_str);
                return new_str;
            }
        }
    }


    public getReadableStrs(filter: string) {
        Object.keys(VariableType).filter((key) => this.make_readable(VariableType[key], filter));
        return {
            "readable": this.allowedVarTypeNameArray,
            "original": this.allowedVarTypeOriginalEnumKeyStr
        }
    }


}

