import Element from "../element.js"

export default function loader() {
    return new Element({classes: "loader", attributes: {id: "loader-points"}}).child({tag: "span"}).child({tag: "span"}).child({tag: "span"}).get();
}