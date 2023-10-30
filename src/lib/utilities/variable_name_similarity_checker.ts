export default function checkVarNameSimilar(variable_names: string[], curr_name: string) {
    if (variable_names.includes(curr_name)) return true;
    return false;
}