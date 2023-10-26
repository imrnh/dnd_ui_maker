

// generate something like this from the style object: width: 300px; height: 230px; background-color: blue; position: absolute;
export default function get_style_string(style: Record<string, string | number>){
    return Object.keys(style)
        .filter((key) => key !== "left" && key !== "top") // Exclude left and top
        .map((key) => `${key}:${style[key]}`)
        .join(";");
}