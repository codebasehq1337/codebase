import { languages } from './languages'

const byId = (id: string) => languages.find((l) => l.id === id)!

byId('python').lessons.push(
  {
    id: 'py-oop',
    title: 'Classes and Objects',
    minutes: 14,
    intro:
      'Classes let you bundle state and behavior together. Python keeps the ceremony minimal: a constructor called __init__, methods that receive self, and nothing else required.',
    code: `class Account:
    def __init__(self, owner, balance=0):
        self.owner = owner
        self.balance = balance

    def deposit(self, amount):
        self.balance += amount
        return self

    def __repr__(self):
        return f"Account({self.owner!r}, {self.balance})"

acc = Account("Ada", 100)
acc.deposit(50).deposit(25)
print(acc)
print(acc.balance)

class Savings(Account):
    def add_interest(self, rate):
        self.balance *= 1 + rate

s = Savings("Alan", 200)
s.add_interest(0.05)
print(s.balance)`,
    filename: 'classes.py',
    points: [
      'self is the instance, passed explicitly to methods',
      '__repr__ controls how the object prints',
      'Methods can return self to allow chaining',
      'Inheritance reuses and extends a base class',
    ],
  },
  {
    id: 'py-errors',
    title: 'Errors and Files',
    minutes: 12,
    intro:
      'Robust programs expect failure. try/except catches exceptions, and the with statement guarantees files close even when something goes wrong.',
    code: `def divide(a, b):
    try:
        return a / b
    except ZeroDivisionError:
        return None
    except TypeError as e:
        print("bad types:", e)
        raise

print(divide(10, 2))
print(divide(10, 0))

lines = ["first", "second", "third"]

with open("notes.txt", "w") as f:
    for line in lines:
        f.write(line + "\\n")

with open("notes.txt") as f:
    content = f.read()

print(content)`,
    filename: 'errors_files.py',
    points: [
      'Catch specific exceptions, never bare except',
      'raise re-throws after logging or cleanup',
      'with closes the file automatically',
      'Files open in read mode by default',
    ],
  },
  {
    id: 'py-modules',
    title: 'Comprehensions and Itertools',
    minutes: 11,
    intro:
      'Comprehensions are Python at its most idiomatic. Combined with the itertools module, they replace most manual loop-and-append patterns.',
    code: `nums = range(20)

evens = [n for n in nums if n % 2 == 0]
squares = {n: n * n for n in range(5)}
unique_lengths = {len(w) for w in ["hi", "hey", "hello", "yo"]}

print(evens)
print(squares)
print(unique_lengths)

from itertools import chain, islice, pairwise

a = [1, 2, 3]
b = [4, 5, 6]
print(list(chain(a, b)))
print(list(islice(chain(a, b), 4)))
print(list(pairwise("abcde")))

matrix = [[1, 2], [3, 4], [5, 6]]
flat = [x for row in matrix for x in row]
print(flat)`,
    filename: 'comprehensions.py',
    points: [
      'List, dict and set comprehensions share one syntax',
      'chain concatenates iterables lazily',
      'islice slices any iterable without materializing it',
      'Nested comprehensions flatten nested loops',
    ],
  },
)

byId('c').lessons.push(
  {
    id: 'c-memory',
    title: 'Dynamic Memory',
    minutes: 15,
    intro:
      'When you do not know sizes at compile time, you ask the heap. malloc reserves bytes, free gives them back. Forgetting free leaks; using after free crashes.',
    code: `#include <stdio.h>
#include <stdlib.h>

int main(void) {
    int n = 5;
    int *scores = malloc(n * sizeof(int));
    if (scores == NULL) {
        return 1;
    }

    for (int i = 0; i < n; i++) {
        scores[i] = i * 10;
    }

    int total = 0;
    for (int i = 0; i < n; i++) {
        total += scores[i];
    }
    printf("average: %d\\n", total / n);

    free(scores);
    scores = NULL;

    char *greeting = malloc(6);
    if (greeting) {
        greeting[0] = 'h';
        greeting[1] = 'e';
        greeting[2] = 'l';
        greeting[3] = 'l';
        greeting[4] = 'o';
        greeting[5] = '\\0';
        printf("%s\\n", greeting);
        free(greeting);
    }

    return 0;
}`,
    filename: 'memory.c',
    points: [
      'malloc returns void*, sized with sizeof',
      'Always check for NULL after allocating',
      'free releases memory exactly once',
      'A C string ends with the \\0 terminator',
    ],
  },
  {
    id: 'c-strings',
    title: 'Strings and Functions',
    minutes: 12,
    intro:
      'C has no string type, just arrays of char ending in a null byte. The string.h library provides the operations every other language builds in.',
    code: `#include <stdio.h>
#include <string.h>

int word_count(const char *text) {
    int count = 0;
    int in_word = 0;
    for (int i = 0; text[i] != '\\0'; i++) {
        if (text[i] == ' ') {
            in_word = 0;
        } else if (!in_word) {
            in_word = 1;
            count++;
        }
    }
    return count;
}

int main(void) {
    char name[32] = "Dennis";
    char greeting[64];

    strcpy(greeting, "hello, ");
    strcat(greeting, name);

    printf("%s\\n", greeting);
    printf("length: %zu\\n", strlen(greeting));
    printf("words: %d\\n", word_count("the quick brown fox"));

    if (strcmp(name, "Dennis") == 0) {
        printf("same name\\n");
    }

    return 0;
}`,
    filename: 'strings.c',
    points: [
      'Buffers must be sized for content plus \\0',
      'strcpy and strcat copy into a destination buffer',
      'strcmp returns 0 when strings are equal',
      'const char * promises the function will not mutate',
    ],
  },
  {
    id: 'c-headers',
    title: 'Headers and Multi-File Programs',
    minutes: 11,
    intro:
      'Real C programs span many files. Header files declare what a module offers; source files implement it. The compiler checks one, the linker joins all.',
    code: `#ifndef MATH_UTILS_H
#define MATH_UTILS_H

int clamp(int value, int low, int high);
int max_of(const int *nums, int n);

#endif`,
    filename: 'math_utils.h',
    points: [
      'Include guards prevent double inclusion',
      'Headers carry declarations, not definitions',
      'Compile each .c file, then link the objects',
      'static limits a function to its own file',
    ],
  },
)

byId('cpp').lessons.push(
  {
    id: 'cpp-raii',
    title: 'RAII and Smart Pointers',
    minutes: 15,
    intro:
      'The central C++ idiom: tie a resource lifetime to an object lifetime. When the object dies, cleanup happens. Smart pointers apply this to heap memory.',
    code: `#include <iostream>
#include <memory>
#include <vector>

struct Connection {
    Connection(const char* host) {
        std::cout << "connecting to " << host << "\\n";
    }
    ~Connection() {
        std::cout << "connection closed\\n";
    }
    void send(const char* data) {
        std::cout << "sending: " << data << "\\n";
    }
};

int main() {
    auto conn = std::make_unique<Connection>("db.local");
    conn->send("SELECT 1");

    auto shared = std::make_shared<int>(42);
    {
        auto copy = shared;
        std::cout << "refs: " << shared.use_count() << "\\n";
    }
    std::cout << "refs: " << shared.use_count() << "\\n";

    std::vector<std::unique_ptr<Connection>> pool;
    pool.push_back(std::make_unique<Connection>("a.local"));
    pool.push_back(std::make_unique<Connection>("b.local"));

    return 0;
}`,
    filename: 'raii.cpp',
    points: [
      'Destructors run automatically at scope exit',
      'unique_ptr has exactly one owner, zero overhead',
      'shared_ptr counts references and frees at zero',
      'make_unique and make_shared are the safe constructors',
    ],
  },
  {
    id: 'cpp-templates',
    title: 'Templates',
    minutes: 13,
    intro:
      'Templates generate code for any type at compile time. The entire STL is built on them, and writing your own is simpler than the syntax suggests.',
    code: `#include <iostream>
#include <string>

template <typename T>
T maximum(T a, T b) {
    return a > b ? a : b;
}

template <typename T>
class Stack {
public:
    void push(T value) {
        data_[size_++] = value;
    }
    T pop() {
        return data_[--size_];
    }
    bool empty() const {
        return size_ == 0;
    }
private:
    T data_[64];
    int size_ = 0;
};

int main() {
    std::cout << maximum(3, 7) << "\\n";
    std::cout << maximum(2.5, 1.2) << "\\n";
    std::cout << maximum(std::string("ab"), std::string("abc")) << "\\n";

    Stack<int> s;
    s.push(1);
    s.push(2);
    while (!s.empty()) {
        std::cout << s.pop() << " ";
    }
    std::cout << "\\n";
    return 0;
}`,
    filename: 'templates.cpp',
    points: [
      'typename T is a compile-time type parameter',
      'The compiler stamps out a version per type used',
      'Template classes power vector, map and friends',
      'Errors surface at compile time, not at runtime',
    ],
  },
  {
    id: 'cpp-lambdas',
    title: 'Lambdas and Functional Style',
    minutes: 12,
    intro:
      'Lambdas are anonymous functions that can capture their surroundings. Paired with STL algorithms, they enable a clean functional style.',
    code: `#include <algorithm>
#include <iostream>
#include <numeric>
#include <vector>

int main() {
    std::vector<int> nums = {5, 2, 8, 1, 9, 3};

    int threshold = 4;
    auto big = std::count_if(nums.begin(), nums.end(),
        [threshold](int n) { return n > threshold; });
    std::cout << "above " << threshold << ": " << big << "\\n";

    std::vector<int> doubled(nums.size());
    std::transform(nums.begin(), nums.end(), doubled.begin(),
        [](int n) { return n * 2; });

    int sum = std::accumulate(nums.begin(), nums.end(), 0);
    std::cout << "sum: " << sum << "\\n";

    std::sort(nums.begin(), nums.end(),
        [](int a, int b) { return a > b; });

    for (int n : nums) std::cout << n << " ";
    std::cout << "\\n";
    return 0;
}`,
    filename: 'lambdas.cpp',
    points: [
      'Brackets capture variables from the enclosing scope',
      'count_if, transform and accumulate take callables',
      'Custom comparators redefine what sort means',
      'Lambdas compile to tiny anonymous structs',
    ],
  },
)

byId('csharp').lessons.push(
  {
    id: 'cs-async',
    title: 'Async and Await',
    minutes: 14,
    intro:
      'C# made asynchronous code mainstream with async and await. A method marked async can await tasks without blocking a thread.',
    code: `using System;
using System.Net.Http;
using System.Threading.Tasks;

static async Task<string> FetchTitleAsync(string url)
{
    using var client = new HttpClient();
    var html = await client.GetStringAsync(url);
    return html.Length > 40 ? html[..40] : html;
}

static async Task Main()
{
    Console.WriteLine("starting...");

    var a = FetchTitleAsync("https://example.com");
    var b = FetchTitleAsync("https://dotnet.microsoft.com");

    var results = await Task.WhenAll(a, b);
    foreach (var r in results)
    {
        Console.WriteLine(r);
    }

    await Task.Delay(200);
    Console.WriteLine("done");
}`,
    filename: 'Async.cs',
    points: [
      'await unwraps a Task without blocking',
      'Task.WhenAll awaits many operations together',
      'using var disposes resources at scope end',
      'The range operator .. slices strings and arrays',
    ],
  },
  {
    id: 'cs-collections',
    title: 'Collections and Generics',
    minutes: 11,
    intro:
      'List, Dictionary and HashSet cover almost every collection need. All are generic, so they work with any type while keeping full type safety.',
    code: `using System;
using System.Collections.Generic;

var scores = new Dictionary<string, int>
{
    ["ada"] = 95,
    ["alan"] = 92,
};

scores["grace"] = 99;
scores.Remove("alan");

foreach (var (name, score) in scores)
{
    Console.WriteLine($"{name}: {score}");
}

var seen = new HashSet<string>();
Console.WriteLine(seen.Add("rust"));
Console.WriteLine(seen.Add("rust"));

var queue = new Queue<string>();
queue.Enqueue("first");
queue.Enqueue("second");
Console.WriteLine(queue.Dequeue());

var stack = new Stack<int>();
stack.Push(1);
stack.Push(2);
Console.WriteLine(stack.Pop());`,
    filename: 'Collections.cs',
    points: [
      'Dictionary offers near-constant-time lookups',
      'HashSet.Add returns false for duplicates',
      'Queues are first in first out, stacks the reverse',
      'Collection initializers fill data inline',
    ],
  },
  {
    id: 'cs-interfaces',
    title: 'Interfaces and Dependency Injection',
    minutes: 13,
    intro:
      'Interfaces define a contract without an implementation. Depending on the contract instead of a concrete class is the foundation of testable C# code.',
    code: `using System;
using System.Collections.Generic;
using System.Linq;

public interface IClock
{
    DateTime Now { get; }
}

public class SystemClock : IClock
{
    public DateTime Now => DateTime.UtcNow;
}

public class Greeter
{
    private readonly IClock _clock;

    public Greeter(IClock clock)
    {
        _clock = clock;
    }

    public string Greet(string name)
    {
        var hour = _clock.Now.Hour;
        var part = hour < 12 ? "morning" : hour < 18 ? "afternoon" : "evening";
        return $"Good {part}, {name}";
    }
}

var greeter = new Greeter(new SystemClock());
Console.WriteLine(greeter.Greet("Ada"));

var names = new List<string> { "ada", "alan", "grace" };
Console.WriteLine(string.Join(", ", names.Select(n => n.ToUpper())));`,
    filename: 'Interfaces.cs',
    points: [
      'An interface lists members, never bodies',
      'Constructor injection supplies dependencies',
      'readonly fields are set once, in the constructor',
      'Tests substitute fakes for real implementations',
    ],
  },
)

byId('javascript').lessons.push(
  {
    id: 'js-dom',
    title: 'The DOM and Events',
    minutes: 12,
    intro:
      'In the browser, JavaScript manipulates the document object model: a live tree of the page. Query elements, listen for events, update the tree.',
    code: `const button = document.querySelector("#add");
const input = document.querySelector("#task");
const list = document.querySelector("#tasks");

button.addEventListener("click", () => {
  const text = input.value.trim();
  if (!text) return;

  const li = document.createElement("li");
  li.textContent = text;
  li.classList.add("task");

  li.addEventListener("click", () => {
    li.classList.toggle("done");
  });

  list.appendChild(li);
  input.value = "";
  input.focus();
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Enter") button.click();
});`,
    filename: 'app.js',
    points: [
      'querySelector finds elements with CSS selectors',
      'addEventListener wires up interactions',
      'createElement plus appendChild grows the tree',
      'classList toggles styling without string hacks',
    ],
  },
  {
    id: 'js-fetch',
    title: 'Fetch and JSON',
    minutes: 11,
    intro:
      'fetch calls HTTP APIs from the browser. Responses stream in as promises, and JSON parsing is built into the response object.',
    code: `const getRepo = async (name) => {
  const res = await fetch(\`https://api.github.com/repos/\${name}\`);

  if (!res.ok) {
    throw new Error(\`request failed: \${res.status}\`);
  }

  const data = await res.json();
  return {
    name: data.full_name,
    stars: data.stargazers_count,
    language: data.language,
  };
};

const main = async () => {
  try {
    const repo = await getRepo("torvalds/linux");
    console.log(\`\${repo.name}: \${repo.stars} stars\`);

    const many = await Promise.all([
      getRepo("facebook/react"),
      getRepo("rust-lang/rust"),
    ]);
    many.forEach((r) => console.log(r.language));
  } catch (err) {
    console.error("could not load", err.message);
  }
};

main();`,
    filename: 'fetch.js',
    points: [
      'fetch resolves even on 404, check res.ok yourself',
      'res.json parses the body into objects',
      'Promise.all fetches several resources at once',
      'try/catch around await handles network failures',
    ],
  },
  {
    id: 'js-classes',
    title: 'Classes and Modules',
    minutes: 10,
    intro:
      'Modern JavaScript has real class syntax and a module system. Classes organize state; modules organize files with explicit imports and exports.',
    code: `class Emitter {
  #handlers = new Map();

  on(event, fn) {
    const list = this.#handlers.get(event) ?? [];
    list.push(fn);
    this.#handlers.set(event, list);
    return this;
  }

  emit(event, payload) {
    const list = this.#handlers.get(event) ?? [];
    list.forEach((fn) => fn(payload));
  }
}

class Timer extends Emitter {
  start(ms) {
    this.id = setInterval(() => this.emit("tick", Date.now()), ms);
  }
  stop() {
    clearInterval(this.id);
    this.emit("stopped");
  }
}

const timer = new Timer();
timer.on("tick", (t) => console.log("tick", t));
timer.on("stopped", () => console.log("done"));`,
    filename: 'emitter.js',
    points: [
      'The # prefix makes a field truly private',
      'extends builds a subclass with inheritance',
      'Methods can return this for chaining',
      'export and import share code between files',
    ],
  },
)

byId('typescript').lessons.push(
  {
    id: 'ts-narrowing',
    title: 'Type Narrowing and Guards',
    minutes: 12,
    intro:
      'TypeScript follows your checks. Test a value with typeof, instanceof or a discriminant, and the compiler narrows the type inside that branch.',
    code: `type Shape =
  | { kind: "circle"; radius: number }
  | { kind: "rect"; width: number; height: number }
  | { kind: "point" };

const area = (shape: Shape): number => {
  switch (shape.kind) {
    case "circle":
      return Math.PI * shape.radius ** 2;
    case "rect":
      return shape.width * shape.height;
    case "point":
      return 0;
  }
};

console.log(area({ kind: "circle", radius: 2 }));
console.log(area({ kind: "rect", width: 3, height: 4 }));

const stringify = (value: string | number | null): string => {
  if (value === null) return "nothing";
  if (typeof value === "number") return value.toFixed(2);
  return value.toUpperCase();
};

console.log(stringify("hello"));
console.log(stringify(3.14159));
console.log(stringify(null));`,
    filename: 'narrowing.ts',
    points: [
      'Discriminated unions tag each variant with a kind',
      'switch on the tag narrows each branch precisely',
      'typeof distinguishes primitives at runtime',
      'Exhaustive switches catch missing cases',
    ],
  },
  {
    id: 'ts-utility',
    title: 'Utility Types',
    minutes: 11,
    intro:
      'TypeScript ships type-level functions that transform other types: Partial, Pick, Omit, Record and friends. They keep large codebases DRY.',
    code: `interface User {
  id: number;
  name: string;
  email: string;
  passwordHash: string;
  createdAt: Date;
}

type PublicUser = Omit<User, "passwordHash">;
type UserPreview = Pick<User, "id" | "name">;
type DraftUser = Partial<User>;
type UsersById = Record<number, User>;

const preview: UserPreview = { id: 1, name: "Ada" };

const patch: DraftUser = { email: "ada@new.dev" };

const index: UsersById = {
  1: { id: 1, name: "Ada", email: "a@x.dev", passwordHash: "...", createdAt: new Date() },
};

type ReadonlyUser = Readonly<User>;

const freeze = (u: User): ReadonlyUser => ({ ...u });

console.log(preview, patch, Object.keys(index));

type Handler = (event: string, payload: unknown) => void;
type HandlerArgs = Parameters<Handler>;
const args: HandlerArgs = ["login", { user: 1 }];
console.log(args);`,
    filename: 'utility.ts',
    points: [
      'Omit and Pick derive types from existing ones',
      'Partial makes every field optional, ideal for patches',
      'Record builds keyed object types',
      'Parameters extracts a function argument tuple',
    ],
  },
)

byId('rust').lessons.push(
  {
    id: 'rs-enums',
    title: 'Enums and Pattern Matching',
    minutes: 14,
    intro:
      'Rust enums carry data per variant, and match forces you to handle every case. Option and Result, the two most used types in Rust, are enums.',
    code: `enum Message {
    Quit,
    Move { x: i32, y: i32 },
    Write(String),
    ChangeColor(u8, u8, u8),
}

fn handle(msg: Message) {
    match msg {
        Message::Quit => println!("quit"),
        Message::Move { x, y } => println!("move to {}, {}", x, y),
        Message::Write(text) => println!("text: {}", text),
        Message::ChangeColor(r, g, b) => println!("rgb {} {} {}", r, g, b),
    }
}

fn divide(a: f64, b: f64) -> Option<f64> {
    if b == 0.0 {
        None
    } else {
        Some(a / b)
    }
}

fn main() {
    handle(Message::Write(String::from("hello")));
    handle(Message::Move { x: 3, y: 4 });

    match divide(10.0, 2.0) {
        Some(v) => println!("result: {}", v),
        None => println!("cannot divide"),
    }

    let fallback = divide(1.0, 0.0).unwrap_or(0.0);
    println!("fallback: {}", fallback);
}`,
    filename: 'enums.rs',
    points: [
      'Variants can hold structs, tuples or plain values',
      'match must be exhaustive, the compiler checks',
      'Option replaces null with Some and None',
      'unwrap_or supplies a default for the None case',
    ],
  },
  {
    id: 'rs-structs',
    title: 'Structs and Methods',
    minutes: 12,
    intro:
      'Structs define data, impl blocks attach behavior. Methods take self by reference, by mutable reference, or by value depending on what they need.',
    code: `#[derive(Debug)]
struct Rectangle {
    width: u32,
    height: u32,
}

impl Rectangle {
    fn new(width: u32, height: u32) -> Self {
        Self { width, height }
    }

    fn area(&self) -> u32 {
        self.width * self.height
    }

    fn scale(&mut self, factor: u32) {
        self.width *= factor;
        self.height *= factor;
    }

    fn square(size: u32) -> Self {
        Self::new(size, size)
    }
}

fn main() {
    let mut rect = Rectangle::new(10, 4);
    println!("area: {}", rect.area());

    rect.scale(2);
    println!("after scale: {:?}", rect);

    let sq = Rectangle::square(5);
    println!("square area: {}", sq.area());
}`,
    filename: 'structs.rs',
    points: [
      'impl blocks hold the methods of a type',
      '&self reads, &mut self mutates, self consumes',
      'Associated functions like new act as constructors',
      'derive(Debug) enables printing with the {:?} format',
    ],
  },
  {
    id: 'rs-errors',
    title: 'Results and the Question Mark',
    minutes: 13,
    intro:
      'Rust has no exceptions. Functions return Result, and the ? operator propagates errors upward with almost no syntax.',
    code: `use std::fs;
use std::io;

fn read_config(path: &str) -> Result<String, io::Error> {
    let content = fs::read_to_string(path)?;
    let trimmed = content.trim().to_string();
    Ok(trimmed)
}

fn parse_port(text: &str) -> Result<u16, std::num::ParseIntError> {
    let port: u16 = text.parse()?;
    Ok(port)
}

fn main() {
    match read_config("app.conf") {
        Ok(cfg) => println!("config: {}", cfg),
        Err(e) => println!("read failed: {}", e),
    }

    let good = parse_port("8080");
    let bad = parse_port("not a port");

    println!("good: {:?}", good);
    println!("bad: {:?}", bad);

    let port = parse_port("3000").unwrap_or(80);
    println!("using port {}", port);
}`,
    filename: 'results.rs',
    points: [
      'Ok wraps success, Err wraps failure',
      '? returns early with the error when one occurs',
      'unwrap_or substitutes a default on failure',
      'Result makes error paths part of the type',
    ],
  },
)

byId('go').lessons.push(
  {
    id: 'go-structs',
    title: 'Structs and Interfaces',
    minutes: 13,
    intro:
      'Go has no classes. Structs hold data, methods attach to any named type, and interfaces are satisfied implicitly just by having the right methods.',
    code: `package main

import "fmt"

type Shape interface {
	Area() float64
}

type Rect struct {
	W, H float64
}

func (r Rect) Area() float64 {
	return r.W * r.H
}

type Circle struct {
	R float64
}

func (c Circle) Area() float64 {
	return 3.14159 * c.R * c.R
}

func describe(s Shape) string {
	return fmt.Sprintf("area is %.2f", s.Area())
}

func main() {
	shapes := []Shape{
		Rect{W: 3, H: 4},
		Circle{R: 2},
	}

	for _, s := range shapes {
		fmt.Println(describe(s))
	}
}`,
    filename: 'shapes.go',
    points: [
      'Methods declare a receiver before the name',
      'Interfaces are implemented implicitly',
      'A slice of an interface holds any implementation',
      'Value receivers work on copies, pointer receivers mutate',
    ],
  },
  {
    id: 'go-maps',
    title: 'Maps, Defer and Errors',
    minutes: 12,
    intro:
      'Three everyday Go tools: maps for key-value data, defer for cleanup that runs when the function exits, and the idiomatic error return.',
    code: `package main

import (
	"fmt"
	"os"
)

func wordCounts(words []string) map[string]int {
	counts := make(map[string]int)
	for _, w := range words {
		counts[w]++
	}
	return counts
}

func readFile(name string) error {
	f, err := os.Open(name)
	if err != nil {
		return fmt.Errorf("open %s: %w", name, err)
	}
	defer f.Close()

	buf := make([]byte, 64)
	_, err = f.Read(buf)
	if err != nil {
		return fmt.Errorf("read: %w", err)
	}
	return nil
}

func main() {
	words := []string{"go", "is", "go", "very", "go"}
	for word, n := range wordCounts(words) {
		fmt.Printf("%s appears %d times\\n", word, n)
	}

	if err := readFile("missing.txt"); err != nil {
		fmt.Println("error:", err)
	}
}`,
    filename: 'maps.go',
    points: [
      'make initializes maps, slices and channels',
      'defer schedules a call for function exit',
      '%w wraps an error so callers can inspect it',
      'The comma-ok idiom tests whether a key exists',
    ],
  },
  {
    id: 'go-http',
    title: 'Building an HTTP Server',
    minutes: 13,
    intro:
      'The standard library includes a production-grade HTTP server. Handlers are just functions, and routing needs no framework for small services.',
    code: `package main

import (
	"encoding/json"
	"fmt"
	"net/http"
)

type Repo struct {
	Name  string ` + "`json:\"name\"`" + `
	Stars int    ` + "`json:\"stars\"`" + `
}

func reposHandler(w http.ResponseWriter, r *http.Request) {
	repos := []Repo{
		{Name: "kubernetes", Stars: 110000},
		{Name: "docker", Stars: 68000},
	}

	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(repos)
}

func helloHandler(w http.ResponseWriter, r *http.Request) {
	name := r.URL.Query().Get("name")
	if name == "" {
		name = "world"
	}
	fmt.Fprintf(w, "hello, %s\\n", name)
}

func main() {
	http.HandleFunc("/", helloHandler)
	http.HandleFunc("/api/repos", reposHandler)

	fmt.Println("listening on :8080")
	http.ListenAndServe(":8080", nil)
}`,
    filename: 'server.go',
    points: [
      'Handlers receive a writer and the request',
      'Struct tags control JSON field names',
      'json.Encoder streams structs as JSON',
      'Query parameters come from r.URL.Query',
    ],
  },
)
