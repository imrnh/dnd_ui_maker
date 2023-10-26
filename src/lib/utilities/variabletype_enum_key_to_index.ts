import { VariableType } from "$lib/interfaces/variable_definition_interface";


export default function varTypekeyToIndex(givenV: string) {
    var idx = 0
    for (const colorKey in VariableType) {
        if (typeof VariableType[colorKey] === 'string') {
            const colorValue = VariableType[colorKey];

            if (givenV == colorValue) {
                return idx;
            }

        }
        idx++;
    }

    return 0;
}