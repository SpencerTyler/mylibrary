function helloWorld(name: string): string {
  return `Hello, ${name}`;
}

let result = helloWorld("Spencer");

interface HasName {
  name: string;
}

let myObject = { name: "abd", job: "something" };

function foobar(myObject: HasName) {
  console.log(myObject.name);
}

foobar(myObject);
