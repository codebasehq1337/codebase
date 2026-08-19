export interface Lesson {
  id: string
  title: string
  minutes: number
  intro: string
  code: string
  filename: string
  points: string[]
}

export interface Language {
  id: string
  name: string
  tagline: string
  color: string
  glyph: string
  level: string
  usedFor: string[]
  description: string
  heroCode: string
  lessons: Lesson[]
}

export const languages: Language[] = [
  {
    id: 'python',
    name: 'Python',
    tagline: 'Readability first',
    color: '#3b82f6',
    glyph: 'Py',
    level: 'Beginner friendly',
    usedFor: ['Web backends', 'Data science', 'Automation', 'AI & ML'],
    description:
      'Python is the language people recommend when someone asks where to start. Its syntax reads almost like plain English, yet it powers everything from small scripts to the training pipelines of large AI models.',
    heroCode: `def greet(name: str) -> str:
    return f"Hello, {name}!"

skills = ["variables", "loops", "functions"]

for skill in skills:
    print(f"Learning {skill}")

print(greet("world"))`,
    lessons: [
      {
        id: 'py-variables',
        title: 'Variables and Types',
        minutes: 8,
        intro:
          'Variables in Python need no type declaration. You assign a value and Python figures out the type for you. You can always check it with the built-in type() function.',
        code: `name = "Ada"
age = 36
height = 1.68
is_engineer = True

print(type(name))
print(type(age))
print(type(height))
print(type(is_engineer))

next_year = age + 1
print(f"{name} will be {next_year}")`,
        filename: 'variables.py',
        points: [
          'Assignment uses a single equals sign',
          'Common types are str, int, float and bool',
          'f-strings embed values directly inside text',
          'Python is dynamically typed, types attach to values',
        ],
      },
      {
        id: 'py-control-flow',
        title: 'Conditionals and Loops',
        minutes: 10,
        intro:
          'Python uses indentation instead of braces to group code. A block starts after a colon and every line inside it shares the same indentation level.',
        code: `score = 87

if score >= 90:
    grade = "A"
elif score >= 80:
    grade = "B"
elif score >= 70:
    grade = "C"
else:
    grade = "F"

print(f"Grade: {grade}")

for i in range(5):
    print(i * i)

count = 3
while count > 0:
    print(count)
    count -= 1`,
        filename: 'control_flow.py',
        points: [
          'if, elif and else branch on conditions',
          'range(5) produces the numbers 0 through 4',
          'while loops repeat until the condition turns false',
          'Indentation is syntax, not style',
        ],
      },
      {
        id: 'py-functions',
        title: 'Functions',
        minutes: 12,
        intro:
          'Functions package logic into reusable units. Python supports default arguments, keyword arguments and returning multiple values at once.',
        code: `def area(width, height=1):
    return width * height

print(area(4, 3))
print(area(5))

def min_max(numbers):
    return min(numbers), max(numbers)

low, high = min_max([3, 9, 1, 7])
print(low, high)

square = lambda x: x * x
print(square(6))`,
        filename: 'functions.py',
        points: [
          'def introduces a function',
          'Parameters can carry default values',
          'A tuple lets you return several values',
          'lambda creates small anonymous functions',
        ],
      },
      {
        id: 'py-data-structures',
        title: 'Lists and Dictionaries',
        minutes: 12,
        intro:
          'Lists hold ordered collections, dictionaries map keys to values. Together they cover most day-to-day data modeling in Python.',
        code: `stack = ["python", "git", "sql"]
stack.append("docker")
stack.insert(0, "linux")
print(stack[1])
print(stack[-1])
print(len(stack))

user = {
    "name": "Grace",
    "role": "admin",
    "languages": ["python", "c"],
}

user["active"] = True
print(user["name"])
print(user.get("email", "not set"))

for key, value in user.items():
    print(key, "->", value)

squares = [n * n for n in range(6)]
print(squares)`,
        filename: 'structures.py',
        points: [
          'Negative indexes count from the end of a list',
          'dict.get provides a fallback for missing keys',
          'items() iterates over key and value together',
          'Comprehensions build lists in a single expression',
        ],
      },
    ],
  },
  {
    id: 'c',
    name: 'C',
    tagline: 'Close to the metal',
    color: '#94a3b8',
    glyph: 'C',
    level: 'Intermediate',
    usedFor: ['Operating systems', 'Embedded devices', 'Compilers', 'Databases'],
    description:
      'C is the language underneath almost everything. Operating system kernels, databases and other languages interpreters are written in it. Learning C teaches you how memory and machines actually work.',
    heroCode: `#include <stdio.h>

int main(void) {
    int numbers[] = {2, 4, 6, 8};
    int total = 0;

    for (int i = 0; i < 4; i++) {
        total += numbers[i];
    }

    printf("total = %d\\n", total);
    return 0;
}`,
    lessons: [
      {
        id: 'c-basics',
        title: 'Your First Program',
        minutes: 9,
        intro:
          'Every C program starts at main. You declare types explicitly, include the libraries you need, and return zero to signal success to the operating system.',
        code: `#include <stdio.h>

int main(void) {
    int age = 36;
    float height = 1.68f;
    char initial = 'A';

    printf("age: %d\\n", age);
    printf("height: %.2f\\n", height);
    printf("initial: %c\\n", initial);

    int next_year = age + 1;
    printf("next year: %d\\n", next_year);

    return 0;
}`,
        filename: 'main.c',
        points: [
          'printf formats output with placeholders like %d and %f',
          'Variables must declare a type before use',
          'main returns an int status code to the OS',
          'Every statement ends with a semicolon',
        ],
      },
      {
        id: 'c-pointers',
        title: 'Pointers and Memory',
        minutes: 15,
        intro:
          'A pointer stores the address of a value rather than the value itself. This is the concept that makes C powerful and, at first, confusing.',
        code: `#include <stdio.h>

void double_it(int *n) {
    *n = *n * 2;
}

int main(void) {
    int value = 21;
    int *ptr = &value;

    printf("value: %d\\n", value);
    printf("address: %p\\n", (void *)ptr);
    printf("through pointer: %d\\n", *ptr);

    double_it(&value);
    printf("doubled: %d\\n", value);

    return 0;
}`,
        filename: 'pointers.c',
        points: [
          '& takes the address of a variable',
          '* dereferences a pointer to reach the value',
          'Passing a pointer lets a function modify the original',
          'Arrays and pointers are deeply connected in C',
        ],
      },
      {
        id: 'c-structs',
        title: 'Structs and Arrays',
        minutes: 12,
        intro:
          'Structs bundle related fields into one type. Combined with arrays, they are how C models records like users, files or packets.',
        code: `#include <stdio.h>
#include <string.h>

struct User {
    char name[32];
    int age;
    float score;
};

int main(void) {
    struct User users[2];

    strcpy(users[0].name, "Ada");
    users[0].age = 36;
    users[0].score = 9.5f;

    strcpy(users[1].name, "Alan");
    users[1].age = 41;
    users[1].score = 9.8f;

    for (int i = 0; i < 2; i++) {
        printf("%s is %d\\n", users[i].name, users[i].age);
    }

    return 0;
}`,
        filename: 'structs.c',
        points: [
          'struct defines a composite type',
          'The dot operator accesses fields',
          'Strings in C are arrays of char',
          'strcpy copies text into a char array safely sized',
        ],
      },
    ],
  },
  {
    id: 'cpp',
    name: 'C++',
    tagline: 'Power with abstraction',
    color: '#6366f1',
    glyph: 'C++',
    level: 'Intermediate',
    usedFor: ['Game engines', 'Trading systems', 'Browsers', 'Graphics'],
    description:
      'C++ keeps the control of C and adds classes, templates and a rich standard library. It runs the world\'s game engines, browsers and high-frequency trading systems.',
    heroCode: `#include <iostream>
#include <vector>
#include <string>

int main() {
    std::vector<std::string> stack = {"cpp", "cmake", "opengl"};

    for (const auto& item : stack) {
        std::cout << "learning " << item << "\\n";
    }

    return 0;
}`,
    lessons: [
      {
        id: 'cpp-basics',
        title: 'From C to C++',
        minutes: 10,
        intro:
          'C++ compiles almost all C code, then adds safer and more expressive tools on top: iostream for IO, string for text and auto for type inference.',
        code: `#include <iostream>
#include <string>

int main() {
    std::string name = "Bjarne";
    int year = 1985;
    auto pi = 3.14159;

    std::cout << name << " created C++\\n";
    std::cout << "year: " << year << "\\n";
    std::cout << "pi: " << pi << "\\n";

    if (year > 1980) {
        std::cout << "modern classic\\n";
    }

    return 0;
}`,
        filename: 'main.cpp',
        points: [
          'cout streams values to standard output',
          'std::string manages memory for you',
          'auto lets the compiler deduce the type',
          'The std namespace holds the standard library',
        ],
      },
      {
        id: 'cpp-classes',
        title: 'Classes and Objects',
        minutes: 14,
        intro:
          'Classes combine data and the functions that operate on it. Constructors set up the object, destructors clean it up automatically.',
        code: `#include <iostream>
#include <string>

class Account {
public:
    Account(std::string owner, double balance)
        : owner(owner), balance(balance) {}

    void deposit(double amount) {
        balance += amount;
    }

    void report() const {
        std::cout << owner << ": " << balance << "\\n";
    }

private:
    std::string owner;
    double balance;
};

int main() {
    Account acc("Linus", 100.0);
    acc.deposit(42.5);
    acc.report();
    return 0;
}`,
        filename: 'account.cpp',
        points: [
          'public and private control access to members',
          'Member initializer lists set fields efficiently',
          'const after a method promises not to mutate',
          'Encapsulation keeps invariants in one place',
        ],
      },
      {
        id: 'cpp-stl',
        title: 'The Standard Library',
        minutes: 13,
        intro:
          'The STL gives you containers and algorithms that are fast and generic. vector, map and sort alone cover a huge share of real problems.',
        code: `#include <algorithm>
#include <iostream>
#include <map>
#include <vector>

int main() {
    std::vector<int> nums = {5, 1, 4, 2, 8};
    std::sort(nums.begin(), nums.end());

    for (int n : nums) {
        std::cout << n << " ";
    }
    std::cout << "\\n";

    std::map<std::string, int> scores;
    scores["ada"] = 95;
    scores["alan"] = 92;

    for (const auto& [name, score] : scores) {
        std::cout << name << " -> " << score << "\\n";
    }

    return 0;
}`,
        filename: 'stl.cpp',
        points: [
          'vector is a dynamic array with contiguous storage',
          'map keeps keys sorted and lookups fast',
          'Iterators connect containers to algorithms',
          'Structured bindings unpack pairs cleanly',
        ],
      },
    ],
  },
  {
    id: 'csharp',
    name: 'C#',
    tagline: 'Productive and typed',
    color: '#a855f7',
    glyph: 'C#',
    level: 'Beginner friendly',
    usedFor: ['Enterprise apps', 'Unity games', 'Web APIs', 'Desktop apps'],
    description:
      'C# blends the safety of a strongly typed language with a huge ecosystem: ASP.NET for the web, Unity for games, and tooling that stays out of your way.',
    heroCode: `using System;
using System.Linq;

var numbers = new[] { 1, 2, 3, 4, 5 };

var squares = numbers
    .Select(n => n * n)
    .ToList();

foreach (var s in squares)
{
    Console.WriteLine(s);
}`,
    lessons: [
      {
        id: 'cs-basics',
        title: 'Types and Console Output',
        minutes: 9,
        intro:
          'Modern C# needs almost no boilerplate. Top-level statements let you start writing logic immediately, and var lets the compiler infer types.',
        code: `using System;

string name = "Margaret";
int age = 87;
double height = 1.70;
bool isLegend = true;

Console.WriteLine($"{name}, {age}");
Console.WriteLine($"Height: {height}");
Console.WriteLine($"Legend: {isLegend}");

var nextYear = age + 1;
Console.WriteLine($"Next year: {nextYear}");

if (age > 65)
{
    Console.WriteLine("Retired and still coding");
}`,
        filename: 'Program.cs',
        points: [
          'var infers the type from the right-hand side',
          'String interpolation uses a $ prefix and braces',
          'Top-level statements remove the Main ceremony',
          'Console.WriteLine prints a line to the terminal',
        ],
      },
      {
        id: 'cs-oop',
        title: 'Classes and Properties',
        minutes: 13,
        intro:
          'C# classes come with properties, auto-implemented getters and setters, and records for data-centric types.',
        code: `using System;

public class Developer
{
    public string Name { get; set; }
    public string Language { get; set; }
    public int Years { get; private set; }

    public Developer(string name, string language)
    {
        Name = name;
        Language = language;
        Years = 0;
    }

    public void CodeOneYear()
    {
        Years++;
    }

    public override string ToString()
    {
        return $"{Name} writes {Language} ({Years}y)";
    }
}

var dev = new Developer("Anders", "C#");
dev.CodeOneYear();
dev.CodeOneYear();
Console.WriteLine(dev);`,
        filename: 'Developer.cs',
        points: [
          'Properties wrap fields with get and set',
          'private set allows writes only inside the class',
          'override replaces a base method like ToString',
          'Constructors run when new creates an instance',
        ],
      },
      {
        id: 'cs-linq',
        title: 'LINQ Queries',
        minutes: 12,
        intro:
          'LINQ treats collections like a queryable data source. Filter, transform and aggregate with a syntax that reads like a pipeline.',
        code: `using System;
using System.Collections.Generic;
using System.Linq;

var repos = new List<Repo>
{
    new Repo("linux", "C", 190000),
    new Repo("cpython", "C", 65000),
    new Repo("dotnet", "C#", 16000),
    new Repo("rust", "Rust", 96000),
};

var big = repos
    .Where(r => r.Stars > 50000)
    .OrderByDescending(r => r.Stars)
    .Select(r => $"{r.Name} ({r.Language})");

foreach (var line in big)
{
    Console.WriteLine(line);
}

record Repo(string Name, string Language, int Stars);`,
        filename: 'Linq.cs',
        points: [
          'Where filters elements with a predicate',
          'Select projects each element into a new shape',
          'OrderByDescending sorts from large to small',
          'Records give you value-based types in one line',
        ],
      },
    ],
  },
]

languages.push(
  {
    id: 'javascript',
    name: 'JavaScript',
    tagline: 'The language of the web',
    color: '#eab308',
    glyph: 'JS',
    level: 'Beginner friendly',
    usedFor: ['Websites', 'Servers with Node', 'Mobile apps', 'Tooling'],
    description:
      'JavaScript runs in every browser on earth and, through Node.js, on servers too. It is the only language that lets you build an entire product end to end.',
    heroCode: `const skills = ["dom", "events", "fetch", "async"];

const learn = async (skill) => {
  return \`learned \${skill}\`;
};

for (const skill of skills) {
  console.log(await learn(skill));
}`,
    lessons: [
      {
        id: 'js-basics',
        title: 'Variables and Functions',
        minutes: 9,
        intro:
          'Modern JavaScript uses const and let instead of var. Arrow functions give you a compact syntax that also preserves the surrounding this.',
        code: `const name = "Brendan";
let year = 1995;

const add = (a, b) => a + b;
const square = (n) => n * n;

console.log(add(2, 3));
console.log(square(7));

const nums = [1, 2, 3, 4];
const doubled = nums.map((n) => n * 2);
const evens = nums.filter((n) => n % 2 === 0);

console.log(doubled);
console.log(evens);

year = 2024;
console.log(\`\${name} wrote JS in \${1995}.\`);`,
        filename: 'app.js',
        points: [
          'const for values that never reassign, let otherwise',
          'map transforms each element, filter keeps matches',
          'Template literals interpolate with backticks',
          'Arrow functions are the default function style',
        ],
      },
      {
        id: 'js-async',
        title: 'Async and Promises',
        minutes: 14,
        intro:
          'JavaScript is single threaded, so long operations run asynchronously. async and await let you write that code as if it were sequential.',
        code: `const wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const fetchUser = async (id) => {
  await wait(300);
  return { id, name: "Grace", role: "admin" };
};

const main = async () => {
  console.log("loading...");
  const user = await fetchUser(1);
  console.log(user.name, user.role);

  const [a, b] = await Promise.all([fetchUser(2), fetchUser(3)]);
  console.log(a.id, b.id);
};

main().catch(console.error);`,
        filename: 'async.js',
        points: [
          'A promise represents a value arriving later',
          'await pauses inside an async function only',
          'Promise.all runs operations in parallel',
          'catch handles failures at the end of the chain',
        ],
      },
      {
        id: 'js-objects',
        title: 'Objects and Destructuring',
        minutes: 10,
        intro:
          'Objects are the core data structure in JavaScript. Destructuring and the spread operator make working with them concise.',
        code: `const repo = {
  name: "react",
  language: "JavaScript",
  stars: 220000,
  topics: ["ui", "components"],
};

const { name, stars } = repo;
console.log(name, stars);

const updated = { ...repo, stars: stars + 1 };
console.log(updated.stars);

const print = ({ name, language = "unknown" }) => {
  console.log(\`\${name} is written in \${language}\`);
};

print(repo);
print({ name: "mystery" });

const keys = Object.keys(repo);
console.log(keys);`,
        filename: 'objects.js',
        points: [
          'Destructuring pulls fields into local variables',
          'Spread copies and extends objects immutably',
          'Default values apply when a field is missing',
          'Object.keys lists the property names',
        ],
      },
    ],
  },
  {
    id: 'typescript',
    name: 'TypeScript',
    tagline: 'JavaScript with types',
    color: '#0ea5e9',
    glyph: 'TS',
    level: 'Intermediate',
    usedFor: ['Large web apps', 'APIs', 'Shared libraries', 'Safer refactors'],
    description:
      'TypeScript is JavaScript plus a type system that catches mistakes before your code runs. It compiles away, leaving plain JavaScript behind.',
    heroCode: `interface Repo {
  name: string;
  stars: number;
  private?: boolean;
}

const format = (repo: Repo): string => {
  return \`\${repo.name} has \${repo.stars} stars\`;
};

console.log(format({ name: "vite", stars: 70000 }));`,
    lessons: [
      {
        id: 'ts-types',
        title: 'Basic and Custom Types',
        minutes: 11,
        intro:
          'Type annotations describe the shape of your data. Interfaces and type aliases name those shapes so you can reuse them everywhere.',
        code: `type Role = "admin" | "editor" | "viewer";

interface User {
  id: number;
  name: string;
  role: Role;
  email?: string;
}

const describe = (user: User): string => {
  const contact = user.email ?? "no email";
  return \`\${user.name} is \${user.role} (\${contact})\`;
};

const ada: User = { id: 1, name: "Ada", role: "admin" };
const alan: User = { id: 2, name: "Alan", role: "viewer", email: "a@t.io" };

console.log(describe(ada));
console.log(describe(alan));

const scores: number[] = [90, 85, 77];
const pair: [string, number] = ["rank", 1];
console.log(scores, pair);`,
        filename: 'types.ts',
        points: [
          'Union types restrict a value to a fixed set',
          'A question mark marks a field as optional',
          'The ?? operator falls back on null or undefined',
          'Tuples fix both the length and the types',
        ],
      },
      {
        id: 'ts-generics',
        title: 'Generics',
        minutes: 13,
        intro:
          'Generics let one function or class work with many types while staying fully type safe. They are the backbone of reusable libraries.',
        code: `const first = <T>(items: T[]): T | undefined => {
  return items[0];
};

console.log(first([1, 2, 3]));
console.log(first(["a", "b"]));

interface Box<T> {
  value: T;
  map: <U>(fn: (v: T) => U) => Box<U>;
}

const boxOf = <T>(value: T): Box<T> => ({
  value,
  map: (fn) => boxOf(fn(value)),
});

const loud = boxOf("hello").map((s) => s.toUpperCase());
console.log(loud.value);

const keyed = <K extends string, V>(key: K, value: V): Record<K, V> => {
  return { [key]: value } as Record<K, V>;
};

console.log(keyed("language", "typescript"));`,
        filename: 'generics.ts',
        points: [
          'T is a placeholder filled in at the call site',
          'Constraints with extends limit what T can be',
          'Generic methods can introduce their own type params',
          'The compiler infers generics from arguments',
        ],
      },
    ],
  },
  {
    id: 'rust',
    name: 'Rust',
    tagline: 'Fearless concurrency',
    color: '#f97316',
    glyph: 'Rs',
    level: 'Advanced',
    usedFor: ['Systems software', 'WebAssembly', 'CLI tools', 'Performance services'],
    description:
      'Rust guarantees memory safety without a garbage collector, through a borrow checker that validates your code at compile time. It has been the most loved language in developer surveys for years.',
    heroCode: `fn main() {
    let skills = vec!["ownership", "borrowing", "lifetimes"];

    for skill in &skills {
        println!("learning {}", skill);
    }

    let total: usize = skills.iter().map(|s| s.len()).sum();
    println!("total chars: {}", total);
}`,
    lessons: [
      {
        id: 'rs-basics',
        title: 'Variables and Control Flow',
        minutes: 10,
        intro:
          'Rust variables are immutable by default. You opt into change with mut, and the compiler enforces that choice everywhere.',
        code: `fn main() {
    let name = "Ferris";
    let mut age = 10;

    println!("{} the crab is {}", name, age);
    age += 1;

    let label = if age > 9 { "senior" } else { "junior" };
    println!("status: {}", label);

    for n in 1..=3 {
        println!("n = {}", n);
    }

    let mut countdown = 3;
    while countdown > 0 {
        println!("{}", countdown);
        countdown -= 1;
    }
}`,
        filename: 'main.rs',
        points: [
          'let binds an immutable value, mut makes it mutable',
          'if is an expression and can produce a value',
          '1..=3 is an inclusive range',
          'println! is a macro, note the exclamation mark',
        ],
      },
      {
        id: 'rs-ownership',
        title: 'Ownership and Borrowing',
        minutes: 16,
        intro:
          'Every value in Rust has exactly one owner. You can lend it out with references, and the compiler guarantees no dangling pointers or data races.',
        code: `fn shout(text: &str) -> String {
    text.to_uppercase()
}

fn main() {
    let message = String::from("hello rust");

    let loud = shout(&message);
    println!("{}", loud);
    println!("still mine: {}", message);

    let mut buffer = String::from("abc");
    buffer.push_str("def");
    println!("{}", buffer);

    let length = {
        let temp = String::from("scoped");
        temp.len()
    };
    println!("length was {}", length);
}`,
        filename: 'ownership.rs',
        points: [
          '&str borrows a string without taking ownership',
          'A moved value cannot be used again',
          'References never outlive their target',
          'Blocks control when values get dropped',
        ],
      },
    ],
  },
  {
    id: 'go',
    name: 'Go',
    tagline: 'Simple and concurrent',
    color: '#22d3ee',
    glyph: 'Go',
    level: 'Beginner friendly',
    usedFor: ['Cloud services', 'DevOps tools', 'APIs', 'CLIs'],
    description:
      'Go was designed at Google for building servers that are easy to write, read and operate. Goroutines make concurrency feel like ordinary code.',
    heroCode: `package main

import "fmt"

func main() {
	skills := []string{"goroutines", "channels", "interfaces"}

	for _, skill := range skills {
		fmt.Println("learning", skill)
	}
}`,
    lessons: [
      {
        id: 'go-basics',
        title: 'Functions and Slices',
        minutes: 10,
        intro:
          'Go keeps the language small: one loop keyword, short declarations, and functions that can return multiple values including errors.',
        code: `package main

import "fmt"

func divide(a, b float64) (float64, error) {
	if b == 0 {
		return 0, fmt.Errorf("cannot divide by zero")
	}
	return a / b, nil
}

func main() {
	result, err := divide(10, 4)
	if err != nil {
		fmt.Println("error:", err)
		return
	}
	fmt.Println("result:", result)

	nums := []int{1, 2, 3}
	nums = append(nums, 4)

	total := 0
	for _, n := range nums {
		total += n
	}
	fmt.Println("total:", total)
}`,
        filename: 'main.go',
        points: [
          ':= declares and infers in one step',
          'Errors are ordinary return values, checked with if',
          'range iterates over index and value',
          'append grows a slice and returns the new one',
        ],
      },
      {
        id: 'go-concurrency',
        title: 'Goroutines and Channels',
        minutes: 14,
        intro:
          'A goroutine is a lightweight thread managed by the Go runtime. Channels let goroutines pass values to each other safely.',
        code: `package main

import (
	"fmt"
	"time"
)

func worker(id int, jobs <-chan int, results chan<- string) {
	for job := range jobs {
		time.Sleep(50 * time.Millisecond)
		results <- fmt.Sprintf("worker %d finished job %d", id, job)
	}
}

func main() {
	jobs := make(chan int, 3)
	results := make(chan string, 3)

	for w := 1; w <= 2; w++ {
		go worker(w, jobs, results)
	}

	for j := 1; j <= 3; j++ {
		jobs <- j
	}
	close(jobs)

	for r := 1; r <= 3; r++ {
		fmt.Println(<-results)
	}
}`,
        filename: 'workers.go',
        points: [
          'go f() launches f as a goroutine',
          'Channels send and receive with the arrow operator',
          'close signals that no more values will be sent',
          'Directional channel types document intent',
        ],
      },
    ],
  }
)
