import HashMap from "./hashMap.js";

const test = new HashMap();

test.set("apple", "red");
test.set("banana", "yellow");
test.set("carrot", "orange");
test.set("dog", "brown");
test.set("elephant", "gray");
test.set("frog", "green");
test.set("grape", "purple");
test.set("hat", "black");
test.set("ice cream", "white");
test.set("jacket", "blue");
test.set("kite", "pink");
test.set("lion", "golden");

console.log("Length after initial insertions:", test.length()); // 12

test.set("apple", "dark red");
test.set("dog", "dark brown");

console.log("Length after overwriting:", test.length()); // 12

console.log("Get apple:", test.get("apple")); // dark red
console.log("Get dog:", test.get("dog")); // dark brown
console.log("Has banana:", test.has("banana")); // true
console.log("Has unicorn:", test.has("unicorn")); // false

test.set("moon", "silver");
console.log("Length after add 13 element:", test.length()); // 13
console.log("All entries:", test.entries());

console.log("All keys:", test.keys());
console.log("All values:", test.values());
console.log("All entries:", test.entries());

console.log("Remove grape:", test.remove("grape")); // true
console.log("Remove unicorn:", test.remove("unicorn")); // false

console.log("Length after removals:", test.length()); // 12

test.clear();
console.log("Length after clear:", test.length()); // 0
console.log("Keys after clear:", test.keys()); // []
