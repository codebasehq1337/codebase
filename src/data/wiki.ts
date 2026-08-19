export interface WikiArticle {
  id: string
  category: string
  title: string
  minutes: number
  summary: string
  body: string[]
  code?: string
  filename?: string
}

export const wikiCategories = [
  'Foundations',
  'Data Structures',
  'Algorithms',
  'Systems',
  'Tools',
] as const

export const wikiArticles: WikiArticle[] = [
  {
    id: 'how-programs-run',
    category: 'Foundations',
    title: 'How a Program Actually Runs',
    minutes: 8,
    summary: 'From source text to a running process: compilation, interpretation and everything in between.',
    body: [
      'Every program begins as plain text. Before a machine can execute it, that text must become machine instructions. Compiled languages like C and Rust translate the whole program ahead of time into a binary for a specific processor. Interpreted languages like Python translate on the fly, statement by statement, inside a runtime program.',
      'Many modern languages sit in between. Java and C# compile to an intermediate bytecode, then a virtual machine compiles hot paths to native code while the program runs. JavaScript engines do the same, which is why today\'s JavaScript is far faster than its reputation suggests.',
      'Once running, your program is a process: the operating system gives it memory, a stack for function calls, and access to files and the network through system calls. Everything you learn later, from pointers to async IO, is a way of controlling what happens inside that process.',
    ],
  },
  {
    id: 'binary-and-hex',
    category: 'Foundations',
    title: 'Binary, Hex and Bits',
    minutes: 9,
    summary: 'Why computers count in twos, and why programmers write numbers like 0xFF.',
    body: [
      'A bit is a single switch: 0 or 1. Eight bits make a byte, which can hold 256 distinct values, enough for one character of text or a small number. Everything in a computer, photos, music, this page, is ultimately bytes.',
      'Hexadecimal is binary with better ergonomics. One hex digit covers exactly four bits, so 0xFF is 11111111, 255 in decimal. You will see hex in colors, memory addresses and error codes.',
      'Bitwise operators manipulate individual bits directly. They show up in flags, permissions, compression and cryptography, and understanding them demystifies a lot of low-level code.',
    ],
    code: `flags = 0b0000

READ = 0b0001
WRITE = 0b0010
EXEC = 0b0100

flags |= READ
flags |= WRITE

print(bin(flags))
print(flags & READ != 0)
print(flags & EXEC != 0)

print(hex(255))
print(int("ff", 16))`,
    filename: 'bits.py',
  },
  {
    id: 'variables-and-types',
    category: 'Foundations',
    title: 'Variables, Values and Types',
    minutes: 7,
    summary: 'What a variable really is, and why types matter even in dynamic languages.',
    body: [
      'A variable is a name bound to a value stored somewhere in memory. In statically typed languages the name itself has a type that never changes; in dynamically typed languages the type travels with the value and the name can be rebound to anything.',
      'Primitive types, integers, floats, booleans, characters, are the atoms. Everything else, strings, arrays, objects, is built by combining them. Knowing the primitives of your language tells you what is cheap and what costs memory.',
      'Type errors are the compiler or interpreter telling you an operation makes no sense for the data you gave it. Learn to read them literally; they almost always say exactly what is wrong and where.',
    ],
  },
  {
    id: 'control-flow',
    category: 'Foundations',
    title: 'Control Flow in Every Language',
    minutes: 8,
    summary: 'If, loops and match are the same three ideas wearing different syntax.',
    body: [
      'Strip away the syntax and every language offers the same control flow: branch with if, repeat with loops, and jump with function calls. Learn them once and you can read code in a language you have never studied.',
      'Loops come in two flavors: iterate a known number of times, usually over a collection, or repeat until a condition changes. Choosing the wrong one is a classic source of off-by-one and infinite-loop bugs.',
      'Pattern matching, in Rust, C# and modern Python, generalizes if/else into a structure that destructures data and forces you to handle every case. It is one of the most loved features in modern language design.',
    ],
  },
  {
    id: 'arrays',
    category: 'Data Structures',
    title: 'Arrays and Dynamic Arrays',
    minutes: 9,
    summary: 'The most important data structure: contiguous memory, instant indexing, painful insertion.',
    body: [
      'An array stores elements side by side in memory. Given an index, the computer jumps straight to the element with one multiplication and one addition: O(1) access, the fastest lookup that exists.',
      'The trade-off is flexibility. Inserting in the middle means shifting everything after it, and a fixed array cannot grow. Dynamic arrays, Python lists, C++ vectors, JavaScript arrays, solve this by over-allocating and doubling in size when full, which keeps appends effectively O(1).',
      'Cache performance is the hidden reason arrays dominate. The CPU loads memory in chunks, so iterating neighbors is nearly free while pointer-chasing structures stall the processor.',
    ],
    code: `package main

import "fmt"

func insert(xs []int, at int, v int) []int {
	xs = append(xs, 0)
	copy(xs[at+1:], xs[at:])
	xs[at] = v
	return xs
}

func main() {
	nums := []int{10, 20, 30, 40}
	fmt.Println(nums[2])

	nums = insert(nums, 1, 15)
	fmt.Println(nums)

	nums = append(nums, 50, 60)
	fmt.Println(len(nums), cap(nums))
}`,
    filename: 'arrays.go',
  },
  {
    id: 'linked-lists',
    category: 'Data Structures',
    title: 'Linked Lists',
    minutes: 10,
    summary: 'Nodes connected by pointers: cheap insertion, expensive everything else.',
    body: [
      'A linked list stores each element in a node that also holds a pointer to the next node. Inserting or deleting at a node you already hold is O(1): just rewire a pointer or two.',
      'The cost is access. Reaching the thousandth element means walking a thousand pointers, each one a potential cache miss. In practice, arrays beat linked lists for almost every workload on modern hardware.',
      'Linked lists still matter for learning. Implementing one by hand is the rite of passage that makes pointers, references and ownership finally click, which is exactly why interviews keep asking for it.',
    ],
    code: `class Node:
    def __init__(self, value, next=None):
        self.value = value
        self.next = next

class LinkedList:
    def __init__(self):
        self.head = None

    def push_front(self, value):
        self.head = Node(value, self.head)

    def find(self, value):
        node = self.head
        while node:
            if node.value == value:
                return True
            node = node.next
        return False

lst = LinkedList()
for n in [3, 1, 4, 1, 5]:
    lst.push_front(n)

print(lst.find(4))
print(lst.find(9))`,
    filename: 'linked_list.py',
  },
  {
    id: 'hash-tables',
    category: 'Data Structures',
    title: 'Hash Tables',
    minutes: 10,
    summary: 'The structure behind dicts, maps and objects: average O(1) everything.',
    body: [
      'A hash table turns a key into an array index using a hash function, then stores the value at that slot. Lookups, inserts and deletes are all average O(1), which is why dictionaries appear in nearly every program ever written.',
      'Two keys sometimes hash to the same slot, a collision. Real implementations handle this with chains of entries per slot or by probing for the next free slot. Good hash functions make collisions rare enough that the average stays constant.',
      'The catch: hash tables are unordered, and worst-case behavior degrades if many keys collide. Languages defend against this with randomized hashing and by resizing the table as it fills.',
    ],
  },
  {
    id: 'trees',
    category: 'Data Structures',
    title: 'Trees and Binary Search Trees',
    minutes: 11,
    summary: 'Hierarchical data, from file systems to indexes, and the search tree that keeps it sorted.',
    body: [
      'A tree is nodes with children and no cycles. Your file system, the HTML of this page, and most database indexes are trees. They model hierarchy better than any flat structure can.',
      'A binary search tree keeps a simple rule: everything to the left of a node is smaller, everything to the right is larger. Search, insert and delete then take time proportional to the height of the tree.',
      'Balanced variants like AVL and red-black trees guarantee the height stays logarithmic, giving O(log n) operations even in the worst case. This is what powers ordered maps in C++ and most database indexes.',
    ],
    code: `class Node:
    def __init__(self, value):
        self.value = value
        self.left = None
        self.right = None

def insert(node, value):
    if node is None:
        return Node(value)
    if value < node.value:
        node.left = insert(node.left, value)
    else:
        node.right = insert(node.right, value)
    return node

def in_order(node):
    if node is None:
        return []
    return in_order(node.left) + [node.value] + in_order(node.right)

root = None
for n in [8, 3, 10, 1, 6, 14, 4, 7, 13]:
    root = insert(root, n)

print(in_order(root))`,
    filename: 'bst.py',
  },
  {
    id: 'big-o',
    category: 'Algorithms',
    title: 'Big-O Notation',
    minutes: 10,
    summary: 'The shared vocabulary for talking about speed: O(1), O(n), O(n²) and what they feel like.',
    body: [
      'Big-O describes how the running time of an algorithm grows as the input grows, ignoring constants and hardware. It answers one question: if my data gets ten times bigger, how much slower does this get?',
      'O(1) is constant: a hash lookup. O(log n) is binary search: doubling the data adds one step. O(n) is a single pass. O(n log n) is good sorting. O(n²) is comparing every pair, fine for hundreds of items, unusable for millions.',
      'You do not need formal proofs to use Big-O well. Count the nested loops over your data, know the cost of your containers\' operations, and you can predict performance before you write a line of code.',
    ],
  },
  {
    id: 'binary-search',
    category: 'Algorithms',
    title: 'Binary Search',
    minutes: 9,
    summary: 'Halve the search space every step: find anything in a billion items in 30 steps.',
    body: [
      'Given a sorted collection, binary search looks at the middle element. If the target is smaller, it discards the right half; if larger, the left half. Each step halves what remains, so a billion items need at most about 30 comparisons.',
      'The requirement is sorted data and random access. That is why binary search works on arrays but not linked lists, and why keeping data sorted can pay for itself many times over.',
      'The idea generalizes far beyond finding numbers: you can binary search answers, like the minimum capacity that ships packages in time, whenever the feasibility test is monotonic.',
    ],
    code: `function binarySearch(sorted, target) {
  let lo = 0;
  let hi = sorted.length - 1;

  while (lo <= hi) {
    const mid = (lo + hi) >> 1;
    if (sorted[mid] === target) return mid;
    if (sorted[mid] < target) lo = mid + 1;
    else hi = mid - 1;
  }

  return -1;
}

const nums = [2, 5, 8, 12, 16, 23, 38, 56, 72, 91];

console.log(binarySearch(nums, 23));
console.log(binarySearch(nums, 7));`,
    filename: 'search.js',
  },
  {
    id: 'sorting',
    category: 'Algorithms',
    title: 'Sorting Algorithms',
    minutes: 11,
    summary: 'Bubble for learning, quicksort for speed, and why you should almost always call sort().',
    body: [
      'Sorting is the most studied problem in computer science. Simple algorithms like bubble and insertion sort compare neighbors and are easy to understand but O(n²). Efficient ones, merge sort and quicksort, divide the problem and reach O(n log n).',
      'Merge sort splits the array in half, sorts each half, then merges two sorted runs in linear time. Quicksort picks a pivot, partitions smaller and larger elements around it, and recurses. Both are worth implementing once by hand.',
      'In real code, use the built-in sort. Standard libraries ship hybrid algorithms tuned over decades, with guarantees against worst-case input. Your job is to know the cost and to supply a correct comparator.',
    ],
    code: `def merge_sort(items):
    if len(items) <= 1:
        return items

    mid = len(items) // 2
    left = merge_sort(items[:mid])
    right = merge_sort(items[mid:])

    merged = []
    i = j = 0
    while i < len(left) and j < len(right):
        if left[i] <= right[j]:
            merged.append(left[i])
            i += 1
        else:
            merged.append(right[j])
            j += 1

    return merged + left[i:] + right[j:]

print(merge_sort([38, 27, 43, 3, 9, 82, 10]))`,
    filename: 'merge_sort.py',
  },
  {
    id: 'recursion',
    category: 'Algorithms',
    title: 'Recursion',
    minutes: 10,
    summary: 'Functions that call themselves, and the two rules that keep them from exploding.',
    body: [
      'A recursive function solves a problem by solving smaller versions of itself. Tree walks, directory scans and divide-and-conquer algorithms are far more natural recursively than with loops.',
      'Two rules make recursion safe. First, a base case that stops the chain. Second, every call must move strictly toward that base case. Break either rule and you get infinite recursion and a stack overflow.',
      'Each call adds a frame to the call stack, so deep recursion costs memory. Languages with tail-call optimization can reuse the frame; most mainstream ones cannot, which is why very deep recursion is usually rewritten with an explicit stack.',
    ],
    code: `#include <stdio.h>

unsigned long factorial(unsigned int n) {
    if (n <= 1) {
        return 1;
    }
    return n * factorial(n - 1);
}

unsigned long fib(unsigned int n) {
    if (n < 2) {
        return n;
    }
    return fib(n - 1) + fib(n - 2);
}

int main(void) {
    printf("%lu\\n", factorial(10));
    printf("%lu\\n", fib(15));
    return 0;
}`,
    filename: 'recursion.c',
  },
  {
    id: 'stack-and-heap',
    category: 'Systems',
    title: 'The Stack and the Heap',
    minutes: 10,
    summary: 'Two regions of memory with opposite personalities, and where your variables actually live.',
    body: [
      'The stack is fast and automatic. Each function call pushes a frame with its local variables; returning pops it. Allocation is just moving a pointer, and cleanup is free, but sizes must be known and lifetimes are tied to function calls.',
      'The heap is flexible and manual. You ask for memory of any size, keep it as long as you like, and share it between functions. The cost is bookkeeping: somebody must free it, whether that is you in C, a garbage collector in C# and Go, or the ownership system in Rust.',
      'Stack overflows happen when calls nest too deep; memory leaks happen when heap allocations are never released. Most mysterious crashes reduce to one of these two.',
    ],
  },
  {
    id: 'processes-threads',
    category: 'Systems',
    title: 'Processes, Threads and Concurrency',
    minutes: 11,
    summary: 'How programs do many things at once, and why shared memory is a minefield.',
    body: [
      'A process is a running program with its own private memory. A thread is a path of execution inside a process; threads share memory, which makes communication fast and bugs catastrophic.',
      'When two threads write the same data simultaneously, the result depends on timing: a race condition. Locks, channels and immutable data are the three classic defenses, and every serious language offers at least one of them.',
      'Concurrency is about structure, doing many things over time; parallelism is about hardware, doing many things at the same instant. Async IO gives concurrency on one thread; thread pools give both.',
    ],
    code: `use std::sync::mpsc;
use std::thread;
use std::time::Duration;

fn main() {
    let (tx, rx) = mpsc::channel();

    for id in 0..3 {
        let sender = tx.clone();
        thread::spawn(move || {
            thread::sleep(Duration::from_millis(50));
            sender.send(format!("done by worker {}", id)).unwrap();
        });
    }

    drop(tx);

    for message in rx {
        println!("{}", message);
    }
}`,
    filename: 'threads.rs',
  },
  {
    id: 'memory-leaks',
    category: 'Systems',
    title: 'Memory Leaks and How to Avoid Them',
    minutes: 8,
    summary: 'Programs that slowly eat your RAM, and the habits that prevent it.',
    body: [
      'A leak is memory your program can no longer use but has not released. The program grows until the machine slows or the OS kills it. Leaks matter most in long-running processes: servers, editors, browsers.',
      'In C the fix is discipline: every malloc gets exactly one free, owned by a clearly named part of the code. In garbage-collected languages leaks come from accidental references, caches that never evict, listeners never removed, closures capturing big objects.',
      'Rust takes a third path: the compiler rejects programs whose ownership is unclear, making most leaks impossible by construction. Whatever your language, the skill is the same: always know who owns every allocation.',
    ],
  },
  {
    id: 'git-essentials',
    category: 'Tools',
    title: 'Git Essentials',
    minutes: 12,
    summary: 'The commands that cover 95% of daily version control, explained properly.',
    body: [
      'Git snapshots your project as a chain of commits. A branch is just a movable pointer to a commit, which is why branching in Git is instant and why the feature-branch workflow dominates the industry.',
      'The daily loop is small: change files, git add to stage them, git commit to snapshot, git push to share. Pull before you push, write commit messages that explain why, and keep commits small enough to describe in one line.',
      'When things go wrong, remember three commands: git status tells you where you are, git log --oneline shows history, and git restore undoes local damage. Almost nothing in Git is truly lost once committed.',
    ],
    code: `git init
git add .
git commit -m "initial commit"

git switch -c feature/login
git add src/login.ts
git commit -m "add login form validation"

git switch main
git merge feature/login

git push origin main
git pull --rebase origin main

git log --oneline --graph --all`,
    filename: 'workflow.sh',
  },
  {
    id: 'http-basics',
    category: 'Tools',
    title: 'HTTP and How the Web Talks',
    minutes: 10,
    summary: 'Requests, responses, status codes and JSON: the protocol behind every API.',
    body: [
      'HTTP is a text protocol. The client sends a request with a method, a path and headers; the server replies with a status code, headers and a body. GET reads, POST creates, PUT replaces, DELETE removes.',
      'Status codes are the server\'s one-line summary: 2xx success, 3xx redirect, 4xx your mistake, 5xx their mistake. Reading the code before the error message saves hours of debugging.',
      'APIs usually exchange JSON. A fetch in JavaScript, requests in Python, or net/http in Go all do the same three steps: build the request, send it, parse the response. Learn one and the others are translation exercises.',
    ],
    code: `import json
import urllib.request

req = urllib.request.Request(
    "https://api.github.com/repos/python/cpython",
    headers={"User-Agent": "codebase-learner"},
)

with urllib.request.urlopen(req) as res:
    print("status:", res.status)
    data = json.loads(res.read())

print(data["full_name"])
print(data["stargazers_count"])
print(data["language"])`,
    filename: 'http_client.py',
  },
  {
    id: 'regex',
    category: 'Tools',
    title: 'Regular Expressions',
    minutes: 10,
    summary: 'A tiny language for describing text patterns, worth the hour it takes to learn.',
    body: [
      'A regular expression describes a pattern of characters. \\d+ matches one or more digits, \\w+ matches a word, and parentheses capture the parts you care about. Every mainstream language embeds the same core syntax.',
      'Start with five pieces: . any character, * zero or more, + one or more, ? optional, and [ ] character classes. With anchors ^ and $ you can already validate emails sloppily, extract numbers and reformat logs.',
      'Regex trades readability for power. Use it for searching and simple extraction; reach for a real parser when the structure is nested, because regex famously cannot parse HTML or JSON reliably.',
    ],
    code: `import re

log = "user=ada status=200 ms=42 path=/api/repos"
pattern = r"(\\w+)=(\\S+)"

pairs = re.findall(pattern, log)
print(dict(pairs))

email = "contact@codebase.dev"
ok = re.fullmatch(r"[\\w.]+@[\\w.]+\\.\\w+", email)
print(bool(ok))

text = "call 555-0192 or 555-0143"
masked = re.sub(r"\\d{3}-\\d{4}", "XXX-XXXX", text)
print(masked)`,
    filename: 'regex.py',
  },
  {
    id: 'testing',
    category: 'Tools',
    title: 'Testing Your Code',
    minutes: 9,
    summary: 'Unit tests, what to test, and why tests are documentation that cannot lie.',
    body: [
      'A unit test calls one function with known input and asserts the output. Fast, isolated and boring, exactly as they should be. A good suite runs in seconds and catches regressions the moment they appear.',
      'Test behavior, not implementation. The tests that survive refactors are the ones that treat the function as a contract: given this, expect that. Edge cases, empty input, zero, null, boundaries, are where bugs hide.',
      'Tests double as executable documentation. Reading a test file tells you what a module is supposed to do better than most comments, and unlike comments, tests fail loudly when they go stale.',
    ],
    code: `using System;
using System.Collections.Generic;

static int Clamp(int value, int low, int high)
{
    if (value < low) return low;
    if (value > high) return high;
    return value;
}

static void AssertEqual(int expected, int actual, string name)
{
    if (expected != actual)
    {
        throw new Exception($"{name}: expected {expected}, got {actual}");
    }
    Console.WriteLine($"pass: {name}");
}

AssertEqual(5, Clamp(5, 0, 10), "inside range");
AssertEqual(0, Clamp(-3, 0, 10), "below range");
AssertEqual(10, Clamp(42, 0, 10), "above range");
AssertEqual(0, Clamp(0, 0, 10), "lower boundary");
AssertEqual(10, Clamp(10, 0, 10), "upper boundary");`,
    filename: 'Tests.cs',
  },
]
