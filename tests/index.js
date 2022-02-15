import {Area} from "../Area.js"

console.asserth = function(assertion, {errorMsg}) {
    if (!assertion)
        document.getElementById('result').innerHTML += errorMsg + " "+ Math.floor(Math.random()*10000)+"<br />";
    console.assert(assertion, {errorMsg: errorMsg})
};

console.log = function(message) {
    document.getElementById('result').innerHTML += message + " "+ Math.floor(Math.random()*10000)+"<br />";
};

test_b_inside_a()

function test_b_inside_a() {
    const a = new Area({top: {x: 0, y: 0}, bottom: {x: 3, y: 3}})
    const b = new Area({top: {x: 1, y: 1}, bottom: {x: 2, y: 2}})
    console.log("a bottomLeft: " + a.bottomLeft.x+" <= b bottomLeft: " + b.bottomLeft.x)
    console.log("a bottomRight: "+ a.bottomRight.x + ">= b bottomRight: " + b.bottomRight.x)
    console.log("a topLeft.y: "+ a.topLeft.y + "<= b bottomRight: " + b.topLeft.y)
    console.log("a bottomLeft.y: "+ a.bottomLeft.y + ">= b bottomLeft: " + b.bottomLeft.y)
    console.asserth( a.collidesWith({area: b}), {errorMsg: "test_b_inside_a not working"})
}