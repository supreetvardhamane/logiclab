/**
 * LogicLab — Module & Phase Metadata
 * All 19 modules across 7 phases.
 *
 * Article .n is 1-based → matches data/content/mXX-aNN.js filenames.
 * Challenge .id matches progress.js challenges{} keys.
 * NEVER import progress.js here — this is pure data.
 */

export const PHASES = [
  { id: 1, label: 'Phase 1', title: 'CS Foundations',      color: '#6C47FF', modules: [1]          },
  { id: 2, label: 'Phase 2', title: 'C++ Basics',           color: '#3b82f6', modules: [2, 3, 4]    },
  { id: 3, label: 'Phase 3', title: 'Control Flow',         color: '#06b6d4', modules: [5, 6, 7]    },
  { id: 4, label: 'Phase 4', title: 'Data Structures',      color: '#22c55e', modules: [8, 9]       },
  { id: 5, label: 'Phase 5', title: 'Strings & Functions',  color: '#f59e0b', modules: [10, 11]     },
  { id: 6, label: 'Phase 6', title: 'OOP',                  color: '#ef4444', modules: [12,13,14,15]},
  { id: 7, label: 'Phase 7', title: 'Advanced C++',         color: '#ec4899', modules: [16,17,18,19]},
];

export const MODULES = [

  // ── PHASE 1 ───────────────────────────────────────────────────────────────
  {
    id: 1,
    title: 'CS Fundamentals',
    phase: 1,
    color: '#6C47FF',
    theoryOnly: true,
    estimatedMinutes: 40,
    articles: [
      { n: 1, title: 'How Computers Work',       subtitle: 'CPU, memory, binary data, 0s & 1s'                         },
      { n: 2, title: 'Number Systems',            subtitle: 'Decimal, Binary, Octal, Hexadecimal conversions'           },
      { n: 3, title: 'What is a Program?',        subtitle: 'Data + Instructions, languages, Compiler vs Interpreter'  },
      { n: 4, title: 'OS & Paradigms',            subtitle: 'Operating System, Procedural, OOP, Functional'            },
      { n: 5, title: 'Algorithms & Flowcharts',   subtitle: 'Pseudo-code, step-by-step thinking, program development'  },
    ],
    challenges: [],
    quiz: { count: 8, passMark: 6 },
  },

  // ── PHASE 2 ───────────────────────────────────────────────────────────────
  {
    id: 2,
    title: 'Your First C++ Program',
    phase: 2,
    color: '#3b82f6',
    estimatedMinutes: 30,
    articles: [
      { n: 1, title: 'Skeleton of a C++ Program',           subtitle: '#include, int main(), return 0, std'                    },
      { n: 2, title: 'Writing & Running Your First Program', subtitle: 'cout, cin, endl, compiling step by step'               },
      { n: 3, title: 'FAQ Deep Dive',                        subtitle: 'int main() vs void main(), why std::, what is #include' },
    ],
    challenges: [
      {
        id: 'first-program',
        title: 'Print Hello, LogicLab!',
        difficulty: 'easy',
        xp: 75,
        prompt: 'Print "Hello, LogicLab!" and your name on two separate lines.',
        starterCode: '#include <iostream>\nusing namespace std;\n\nint main() {\n    // Your code here\n\n    return 0;\n}',
      },
    ],
    quiz: { count: 10, passMark: 7 },
  },
  {
    id: 3,
    title: 'Data Types & Variables',
    phase: 2,
    color: '#3b82f6',
    estimatedMinutes: 35,
    articles: [
      { n: 1, title: 'Why Data Types?',                subtitle: 'Primitive types: int, float, double, char, bool'   },
      { n: 2, title: 'Variables',                       subtitle: 'Declaration, initialization, naming rules'          },
      { n: 3, title: 'Literals, sizeof & Type Ranges',  subtitle: 'sizeof operator, type sizes and value ranges'      },
    ],
    challenges: [
      {
        id: 'datatypes-declare',
        title: 'Declare 5 Different Types',
        difficulty: 'easy',
        xp: 75,
        prompt: 'Declare one variable of each type: int, float, char, bool, double. Print all of them.',
        starterCode: '#include <iostream>\nusing namespace std;\n\nint main() {\n    // Declare and print 5 variables\n\n    return 0;\n}',
      },
      {
        id: 'datatypes-circle',
        title: 'Area of a Circle',
        difficulty: 'easy',
        xp: 75,
        prompt: 'Read a radius from cin. Calculate and print the area using const float PI = 3.14159f.',
        starterCode: '#include <iostream>\nusing namespace std;\n\nint main() {\n    const float PI = 3.14159f;\n    float radius;\n    cin >> radius;\n    // Calculate and print area\n\n    return 0;\n}',
      },
    ],
    quiz: { count: 10, passMark: 7 },
  },
  {
    id: 4,
    title: 'Operators & Expressions',
    phase: 2,
    color: '#3b82f6',
    estimatedMinutes: 45,
    articles: [
      { n: 1, title: 'Arithmetic & Compound Assignment',  subtitle: '+, -, *, /, %, +=, -=, *=, /=, %='            },
      { n: 2, title: 'Relational & Logical Operators',    subtitle: '==, !=, <, >, <=, >=, &&, ||, !'              },
      { n: 3, title: 'Bitwise, Increment & Overflow',     subtitle: '++, --, &, |, ^, ~, shift, overflow behaviour' },
    ],
    challenges: [
      {
        id: 'operators-salary',
        title: 'Net Salary Calculator',
        difficulty: 'easy',
        xp: 75,
        prompt: 'Input gross salary. Deduct 10% tax and 5% insurance. Print net salary.',
        starterCode: '#include <iostream>\nusing namespace std;\n\nint main() {\n    double gross;\n    cout << "Enter gross salary: ";\n    cin >> gross;\n    // Calculate and print net salary\n\n    return 0;\n}',
      },
      {
        id: 'operators-discount',
        title: 'Discount Calculator',
        difficulty: 'easy',
        xp: 75,
        prompt: 'Input original price and discount percentage. Print the final discounted price.',
        starterCode: '#include <iostream>\nusing namespace std;\n\nint main() {\n    double price, discount;\n    cin >> price >> discount;\n    // Calculate and print discounted price\n\n    return 0;\n}',
      },
    ],
    quiz: { count: 10, passMark: 7 },
  },

  // ── PHASE 3 ───────────────────────────────────────────────────────────────
  {
    id: 5,
    title: 'Conditional Statements',
    phase: 3,
    color: '#06b6d4',
    estimatedMinutes: 45,
    articles: [
      { n: 1, title: 'if, else if, else',               subtitle: 'Conditions, blocks, nested if, common mistakes' },
      { n: 2, title: 'Compound Conditions & Short-Circuit', subtitle: '&&, ||, short-circuit evaluation, validation' },
      { n: 3, title: 'Nested if & else-if Ladder',       subtitle: 'Complex conditions, fall-through, ternary operator' },
    ],
    challenges: [
      { id: 'conditionals-max2',    title: 'Max of 2 Numbers',   difficulty: 'easy',   xp: 75,
        prompt: 'Input two integers. Print the larger one.',
        starterCode: '#include <iostream>\nusing namespace std;\nint main() {\n    int a, b; cin >> a >> b;\n    // print max\n    return 0;\n}' },
      { id: 'conditionals-oddeven', title: 'Odd or Even',        difficulty: 'easy',   xp: 75,
        prompt: 'Input an integer. Print "Odd" or "Even".',
        starterCode: '#include <iostream>\nusing namespace std;\nint main() {\n    int n; cin >> n;\n    return 0;\n}' },
      { id: 'conditionals-grade',   title: 'Grade Calculator',   difficulty: 'easy',   xp: 75,
        prompt: 'Input score 0-100. Print grade: A (90+), B (80+), C (70+), D (60+), F.',
        starterCode: '#include <iostream>\nusing namespace std;\nint main() {\n    int score; cin >> score;\n    return 0;\n}' },
      { id: 'conditionals-max3',    title: 'Max of 3 Numbers',   difficulty: 'medium', xp: 75,
        prompt: 'Input three integers. Print the largest.',
        starterCode: '#include <iostream>\nusing namespace std;\nint main() {\n    int a, b, c; cin >> a >> b >> c;\n    return 0;\n}' },
      { id: 'conditionals-roots',   title: 'Quadratic Roots',    difficulty: 'hard',   xp: 75,
        prompt: 'Input a, b, c for ax²+bx+c=0. Print real roots or "No real roots".',
        starterCode: '#include <iostream>\n#include <cmath>\nusing namespace std;\nint main() {\n    double a, b, c; cin >> a >> b >> c;\n    return 0;\n}' },
    ],
    quiz: { count: 10, passMark: 7 },
  },
  {
    id: 6,
    title: 'Switch Case',
    phase: 3,
    color: '#06b6d4',
    estimatedMinutes: 30,
    articles: [
      { n: 1, title: 'switch-case Fundamentals',          subtitle: 'Syntax, break, default, fall-through'           },
      { n: 2, title: 'Menu-Driven Programs',               subtitle: 'Building interactive menus with switch'         },
      { n: 3, title: 'switch vs if-else & Pitfalls',       subtitle: 'When to use each, common mistakes'             },
    ],
    challenges: [
      { id: 'switch-dayname', title: 'Day Number to Name', difficulty: 'easy', xp: 75,
        prompt: 'Input 1-7. Print the day name (1=Monday … 7=Sunday). Print "Invalid" otherwise.',
        starterCode: '#include <iostream>\nusing namespace std;\nint main() {\n    int d; cin >> d;\n    return 0;\n}' },
      { id: 'switch-menu',    title: 'Simple Calculator',  difficulty: 'easy', xp: 75,
        prompt: 'Show menu: 1.Add 2.Subtract 3.Multiply 4.Divide. Read choice and two numbers. Print result.',
        starterCode: '#include <iostream>\nusing namespace std;\nint main() {\n    return 0;\n}' },
    ],
    quiz: { count: 8, passMark: 6 },
  },
  {
    id: 7,
    title: 'Loops',
    phase: 3,
    color: '#06b6d4',
    estimatedMinutes: 50,
    articles: [
      { n: 1, title: 'for and while Loops',              subtitle: 'Syntax, loop variable, condition, update'          },
      { n: 2, title: 'do-while, break & continue',       subtitle: 'do-while semantics, break, continue, nested'      },
      { n: 3, title: 'Nested Loops & Patterns',           subtitle: 'Loop-in-loop, right-angle star pattern'           },
    ],
    challenges: [
      { id: 'loops-mul-table',  title: 'Multiplication Table',    difficulty: 'easy',   xp: 75,
        prompt: 'Input n. Print the multiplication table of n (n×1 to n×10).',
        starterCode: '#include <iostream>\nusing namespace std;\nint main() {\n    int n; cin >> n;\n    return 0;\n}' },
      { id: 'loops-sum-n',      title: 'Sum of N Numbers',        difficulty: 'easy',   xp: 75,
        prompt: 'Input n. Print the sum of first n natural numbers.',
        starterCode: '#include <iostream>\nusing namespace std;\nint main() {\n    int n; cin >> n;\n    return 0;\n}' },
      { id: 'loops-factorial',  title: 'Factorial of N',          difficulty: 'easy',   xp: 75,
        prompt: 'Input n. Print n! (factorial). Assume n ≤ 12.',
        starterCode: '#include <iostream>\nusing namespace std;\nint main() {\n    int n; cin >> n;\n    return 0;\n}' },
      { id: 'loops-armstrong',  title: 'Armstrong Number',        difficulty: 'medium', xp: 75,
        prompt: 'Input n. Print "Armstrong" if it equals the sum of its digits each raised to the power of the digit count.',
        starterCode: '#include <iostream>\nusing namespace std;\nint main() {\n    int n; cin >> n;\n    return 0;\n}' },
      { id: 'loops-reverse',    title: 'Reverse a Number',        difficulty: 'medium', xp: 75,
        prompt: 'Input an integer. Print it with its digits reversed (e.g. 12345 → 54321).',
        starterCode: '#include <iostream>\nusing namespace std;\nint main() {\n    int n; cin >> n;\n    return 0;\n}' },
      { id: 'loops-gcd',        title: 'GCD of Two Numbers',      difficulty: 'medium', xp: 75,
        prompt: 'Input two integers. Print their GCD using the Euclidean algorithm.',
        starterCode: '#include <iostream>\nusing namespace std;\nint main() {\n    int a, b; cin >> a >> b;\n    return 0;\n}' },
      { id: 'loops-pattern',    title: 'Right-Angle Star Pattern', difficulty: 'medium', xp: 75,
        prompt: 'Input n. Print a right-angle triangle of stars with n rows.',
        starterCode: '#include <iostream>\nusing namespace std;\nint main() {\n    int n; cin >> n;\n    return 0;\n}' },
      { id: 'loops-palindrome', title: 'Palindrome Number Check',  difficulty: 'medium', xp: 75,
        prompt: 'Input a number. Print "Palindrome" if it reads the same forwards and backwards.',
        starterCode: '#include <iostream>\nusing namespace std;\nint main() {\n    int n; cin >> n;\n    return 0;\n}' },
    ],
    quiz: { count: 12, passMark: 9 },
  },

  // ── PHASE 4 ───────────────────────────────────────────────────────────────
  {
    id: 8,
    title: 'Arrays',
    phase: 4,
    color: '#22c55e',
    estimatedMinutes: 45,
    articles: [
      { n: 1, title: 'Array Basics',             subtitle: 'Declaration, initialization, indexing, for-each'   },
      { n: 2, title: 'Array Operations',          subtitle: 'Traversal, search, min/max, reverse'              },
      { n: 3, title: '2D Arrays & Matrices',      subtitle: 'Multidimensional arrays, matrix operations'       },
    ],
    challenges: [
      { id: 'arrays-max',      title: 'Max in Array',        difficulty: 'easy',   xp: 75,
        prompt: 'Input n, then n integers. Print the largest.',
        starterCode: '#include <iostream>\nusing namespace std;\nint main() {\n    int n; cin >> n;\n    return 0;\n}' },
      { id: 'arrays-search',   title: 'Linear Search',       difficulty: 'easy',   xp: 75,
        prompt: 'Input n, n elements, then a key. Print its 0-based index or -1 if not found.',
        starterCode: '#include <iostream>\nusing namespace std;\nint main() {\n    return 0;\n}' },
      { id: 'arrays-matrix',   title: 'Matrix Addition',     difficulty: 'medium', xp: 75,
        prompt: 'Input two 2×2 matrices. Print their element-wise sum as a 2×2 matrix.',
        starterCode: '#include <iostream>\nusing namespace std;\nint main() {\n    return 0;\n}' },
    ],
    quiz: { count: 10, passMark: 7 },
  },
  {
    id: 9,
    title: 'Pointers & References',
    phase: 4,
    color: '#22c55e',
    estimatedMinutes: 50,
    articles: [
      { n: 1, title: 'What is a Pointer?',             subtitle: 'Address-of &, dereference *, pointer arithmetic' },
      { n: 2, title: 'References & Pass by Reference', subtitle: '& alias, function pass-by-ref vs pass-by-value' },
      { n: 3, title: 'Dynamic Memory',                  subtitle: 'new, delete, heap vs stack, memory leaks'       },
    ],
    challenges: [
      { id: 'pointers-swap',    title: 'Swap Using Pointers',    difficulty: 'easy',   xp: 75,
        prompt: 'Write swap(int* a, int* b). Print x=5, y=10 before and after calling swap(&x, &y).',
        starterCode: '#include <iostream>\nusing namespace std;\nvoid swap(int* a, int* b) {\n    // Your code\n}\nint main() {\n    int x = 5, y = 10;\n    swap(&x, &y);\n    cout << x << " " << y;\n    return 0;\n}' },
      { id: 'pointers-dynarray', title: 'Dynamic Array',         difficulty: 'medium', xp: 75,
        prompt: 'Allocate int[n] on the heap. Fill with squares (arr[i]=i*i). Print. Free memory.',
        starterCode: '#include <iostream>\nusing namespace std;\nint main() {\n    int n; cin >> n;\n    int* arr = new int[n];\n    return 0;\n}' },
    ],
    quiz: { count: 10, passMark: 7 },
  },

  // ── PHASE 5 ───────────────────────────────────────────────────────────────
  {
    id: 10,
    title: 'Strings',
    phase: 5,
    color: '#f59e0b',
    estimatedMinutes: 40,
    articles: [
      { n: 1, title: 'C-Strings vs std::string',      subtitle: 'char arrays, string class, getline'                   },
      { n: 2, title: 'String Methods',                 subtitle: 'length, substr, find, replace, compare, append'      },
      { n: 3, title: 'String Manipulation Practice',   subtitle: 'Case toggle, palindrome check, username from email'  },
    ],
    challenges: [
      { id: 'strings-reverse',    title: 'Reverse a String',    difficulty: 'easy',   xp: 75,
        prompt: 'Input a string with getline. Print it reversed.',
        starterCode: '#include <iostream>\n#include <string>\nusing namespace std;\nint main() {\n    string s; getline(cin, s);\n    return 0;\n}' },
      { id: 'strings-palindrome', title: 'String Palindrome',   difficulty: 'easy',   xp: 75,
        prompt: 'Input a string. Print "Palindrome" or "Not Palindrome" (case-sensitive).',
        starterCode: '#include <iostream>\n#include <string>\nusing namespace std;\nint main() {\n    string s; getline(cin, s);\n    return 0;\n}' },
      { id: 'strings-username',   title: 'Extract Username',    difficulty: 'medium', xp: 75,
        prompt: 'Input an email (e.g. user@domain.com). Print only the username before the @.',
        starterCode: '#include <iostream>\n#include <string>\nusing namespace std;\nint main() {\n    string email; cin >> email;\n    return 0;\n}' },
    ],
    quiz: { count: 10, passMark: 7 },
  },
  {
    id: 11,
    title: 'Functions',
    phase: 5,
    color: '#f59e0b',
    estimatedMinutes: 45,
    articles: [
      { n: 1, title: 'Defining & Calling Functions',           subtitle: 'Return type, parameters, scope, call by value' },
      { n: 2, title: 'Overloading, Default Args & Recursion',  subtitle: 'Function overloading, default args, recursion' },
      { n: 3, title: 'Templates, Static & Global Variables',   subtitle: 'Function templates, static, scope rules'       },
    ],
    challenges: [
      { id: 'functions-isprime',   title: 'isPrime Function',        difficulty: 'easy',   xp: 75,
        prompt: 'Write bool isPrime(int n). Input n; print "Prime" or "Not Prime".',
        starterCode: '#include <iostream>\nusing namespace std;\nbool isPrime(int n) {\n    // Your code\n}\nint main() {\n    int n; cin >> n;\n    cout << (isPrime(n) ? "Prime" : "Not Prime");\n    return 0;\n}' },
      { id: 'functions-overload',  title: 'Overloaded max()',        difficulty: 'easy',   xp: 75,
        prompt: 'Write overloaded max(int,int) and max(double,double). Print max of two ints and two doubles.',
        starterCode: '#include <iostream>\nusing namespace std;\n// Write overloaded max functions\nint main() {\n    return 0;\n}' },
      { id: 'functions-fibonacci', title: 'Fibonacci (Recursive)',   difficulty: 'medium', xp: 75,
        prompt: 'Write recursive int fibonacci(int n). Input n; print the nth Fibonacci number.',
        starterCode: '#include <iostream>\nusing namespace std;\nint fibonacci(int n) {\n    // recursive\n}\nint main() {\n    int n; cin >> n;\n    cout << fibonacci(n);\n    return 0;\n}' },
    ],
    quiz: { count: 10, passMark: 7 },
  },

  // ── PHASE 6 ───────────────────────────────────────────────────────────────
  {
    id: 12,
    title: 'OOP Introduction & Classes',
    phase: 6,
    color: '#ef4444',
    estimatedMinutes: 50,
    articles: [
      { n: 1, title: 'OOP Concepts',               subtitle: 'Encapsulation, Inheritance, Polymorphism, Abstraction' },
      { n: 2, title: 'Classes & Objects',           subtitle: 'Class definition, objects, access specifiers'          },
      { n: 3, title: 'Constructors & Destructors',  subtitle: 'Default, parameterized, copy constructor, destructor'  },
    ],
    challenges: [
      { id: 'oop-rectangle', title: 'Rectangle Class',   difficulty: 'easy',   xp: 75,
        prompt: 'Class Rectangle with length and width. Methods: area(), perimeter(), display(). Create two objects.',
        starterCode: '#include <iostream>\nusing namespace std;\nclass Rectangle {\n    // Your code\n};\nint main() {\n    return 0;\n}' },
      { id: 'oop-student',   title: 'Student Class',     difficulty: 'medium', xp: 75,
        prompt: 'Class Student with name, rollNo, marks[3]. Method: calcAverage(). Use getters and setters.',
        starterCode: '#include <iostream>\n#include <string>\nusing namespace std;\nclass Student {\n};\nint main() {\n    return 0;\n}' },
    ],
    quiz: { count: 10, passMark: 7 },
  },
  {
    id: 13,
    title: 'OOP — Operators & Friend Functions',
    phase: 6,
    color: '#ef4444',
    estimatedMinutes: 45,
    articles: [
      { n: 1, title: 'Scope Resolution & this Pointer', subtitle: ':: operator, this keyword'                      },
      { n: 2, title: 'Operator Overloading',             subtitle: 'Overloading +, -, <<, >>'                      },
      { n: 3, title: 'Friend Functions & Classes',       subtitle: 'friend keyword, when & why to use it'           },
    ],
    challenges: [
      { id: 'oop-complex', title: 'Complex Number Addition', difficulty: 'medium', xp: 75,
        prompt: 'Class Complex with real and imag. Overload + to add two complex numbers. Print result.',
        starterCode: '#include <iostream>\nusing namespace std;\nclass Complex {\npublic:\n    double real, imag;\n    Complex operator+(const Complex& c) {\n        // Your code\n    }\n};\nint main() {\n    return 0;\n}' },
    ],
    quiz: { count: 8, passMark: 6 },
  },
  {
    id: 14,
    title: 'Inheritance',
    phase: 6,
    color: '#ef4444',
    estimatedMinutes: 50,
    articles: [
      { n: 1, title: 'Inheritance Fundamentals',    subtitle: 'Base, derived, is-a relationship, access specifiers' },
      { n: 2, title: 'Constructors in Inheritance', subtitle: 'Constructor chaining, member initializer list'       },
      { n: 3, title: 'Types of Inheritance',         subtitle: 'Single, multiple, multilevel, hierarchical'         },
    ],
    challenges: [
      { id: 'inherit-vehicle', title: 'Vehicle Hierarchy', difficulty: 'medium', xp: 75,
        prompt: 'Base class Vehicle (brand, speed). Derived Car and Bike. Each with display(). Create and display two objects.',
        starterCode: '#include <iostream>\n#include <string>\nusing namespace std;\nclass Vehicle {\n};\nclass Car : public Vehicle {\n};\nclass Bike : public Vehicle {\n};\nint main() {\n    return 0;\n}' },
    ],
    quiz: { count: 10, passMark: 7 },
  },
  {
    id: 15,
    title: 'Polymorphism & Advanced OOP',
    phase: 6,
    color: '#ef4444',
    estimatedMinutes: 55,
    articles: [
      { n: 1, title: 'Function Overriding & virtual',  subtitle: 'Overriding, virtual, base class pointers'         },
      { n: 2, title: 'Runtime Polymorphism',            subtitle: 'vtable, dynamic dispatch, override, final'       },
      { n: 3, title: 'Abstract Classes & Static Members', subtitle: 'Pure virtual, abstract class, static members' },
    ],
    challenges: [
      { id: 'poly-shape', title: 'Shape Area (Polymorphism)', difficulty: 'hard', xp: 75,
        prompt: 'Abstract base Shape with pure virtual area(). Derived: Circle, Rectangle. Print area of each via Shape pointer.',
        starterCode: '#include <iostream>\n#include <cmath>\nusing namespace std;\nclass Shape {\npublic:\n    virtual double area() = 0;\n    virtual ~Shape() {}\n};\nint main() {\n    return 0;\n}' },
    ],
    quiz: { count: 10, passMark: 7 },
  },

  // ── PHASE 7 ───────────────────────────────────────────────────────────────
  {
    id: 16,
    title: 'Exception Handling',
    phase: 7,
    color: '#ec4899',
    estimatedMinutes: 35,
    articles: [
      { n: 1, title: 'try, catch, throw',        subtitle: 'Exception flow, catching by type, rethrowing'          },
      { n: 2, title: 'Standard Exceptions',       subtitle: 'std::exception hierarchy, what(), bad_alloc'           },
      { n: 3, title: 'Custom Exceptions',          subtitle: 'Deriving from std::exception, design best practices' },
    ],
    challenges: [
      { id: 'except-division', title: 'Safe Division', difficulty: 'easy', xp: 75,
        prompt: 'Write safeDivide(a, b). Throw if b==0. In main: catch and print "Division by zero" or the result.',
        starterCode: '#include <iostream>\n#include <stdexcept>\nusing namespace std;\ndouble safeDivide(double a, double b) {\n    // throw if b == 0\n}\nint main() {\n    return 0;\n}' },
    ],
    quiz: { count: 8, passMark: 6 },
  },
  {
    id: 17,
    title: 'Templates',
    phase: 7,
    color: '#ec4899',
    estimatedMinutes: 35,
    articles: [
      { n: 1, title: 'Function Templates',      subtitle: 'template<typename T>, generic functions'            },
      { n: 2, title: 'Class Templates',          subtitle: 'template classes, the generic Stack example'        },
      { n: 3, title: 'Template Specialization', subtitle: 'Full specialization, partial spec, when to use'     },
    ],
    challenges: [
      { id: 'template-swap',  title: 'Generic swap<T>()',   difficulty: 'easy', xp: 75,
        prompt: 'Write template void mySwap(T& a, T& b). Test with int pair and double pair.',
        starterCode: '#include <iostream>\nusing namespace std;\ntemplate <typename T>\nvoid mySwap(T& a, T& b) {\n    // Your code\n}\nint main() {\n    return 0;\n}' },
      { id: 'template-stack', title: 'Generic Stack<T>',    difficulty: 'hard', xp: 75,
        prompt: 'Implement template class Stack<T> with push, pop, top, isEmpty. Test with int and string.',
        starterCode: '#include <iostream>\n#include <string>\nusing namespace std;\ntemplate <typename T>\nclass Stack {\n};\nint main() {\n    return 0;\n}' },
    ],
    quiz: { count: 8, passMark: 6 },
  },
  {
    id: 18,
    title: 'Preprocessor & Namespaces',
    phase: 7,
    color: '#ec4899',
    estimatedMinutes: 30,
    articles: [
      { n: 1, title: 'Preprocessor Directives', subtitle: '#define, #ifdef, #include, macros vs const' },
      { n: 2, title: 'Constants & Type Qualifiers', subtitle: 'const, constexpr, volatile, typedef, using' },
      { n: 3, title: 'Namespaces',               subtitle: 'namespace, using namespace, nested namespaces' },
    ],
    challenges: [
      { id: 'preproc-macros', title: 'Macro Magic', difficulty: 'easy', xp: 75,
        prompt: 'Define macros SQUARE(x) and MAX(a,b). Use them in main to compute and print values.',
        starterCode: '#include <iostream>\nusing namespace std;\n// Define SQUARE and MAX macros\nint main() {\n    return 0;\n}' },
    ],
    quiz: { count: 8, passMark: 6 },
  },
  {
    id: 19,
    title: 'File I/O & Serialization',
    phase: 7,
    color: '#ec4899',
    estimatedMinutes: 40,
    articles: [
      { n: 1, title: 'File Streams — Reading & Writing', subtitle: 'fstream, ofstream, ifstream, open modes' },
      { n: 2, title: 'Working with Files',               subtitle: 'append, seekg/seekp, error flags, existence check' },
      { n: 3, title: 'Binary Files & Serialization',     subtitle: 'read()/write(), struct serialization, binary mode' },
    ],
    challenges: [
      { id: 'fileio-write',     title: 'Write & Read a File',   difficulty: 'easy', xp: 75,
        prompt: 'Write integers 1–5 to "data.txt". Then read them back and print their sum.',
        starterCode: '#include <iostream>\n#include <fstream>\nusing namespace std;\nint main() {\n    return 0;\n}' },
      { id: 'fileio-serialize', title: 'Serialize a Struct',    difficulty: 'hard', xp: 75,
        prompt: 'struct Student {char name[50]; int age; float gpa;}. Write 3 students to binary file, read back, print.',
        starterCode: '#include <iostream>\n#include <fstream>\nusing namespace std;\nstruct Student {\n    char name[50];\n    int age;\n    float gpa;\n};\nint main() {\n    return 0;\n}' },
    ],
    quiz: { count: 10, passMark: 7 },
  },
];

// ── HELPER FUNCTIONS ─────────────────────────────────────────────────────────

/** Get a module by id (1-based number or string) */
export function getModule(id) {
  return MODULES.find(m => m.id === Number(id)) || null;
}

/** Get phase info by phase number (1-based) */
export function getPhase(phaseId) {
  return PHASES.find(p => p.id === Number(phaseId)) || null;
}

/** Max XP attainable in a module (articles + challenges + quiz first-attempt) */
export function moduleMaxXP(mod) {
  const articleXP   = mod.articles.length * 10;
  const challengeXP = mod.challenges.reduce((sum) => sum + 75, 0);
  const quizXP      = 50;
  return articleXP + challengeXP + quizXP;
}

/** Filename for a module article, e.g. getArticleFile(2, 1) → 'data/content/m02-a01.js' */
export function getArticleFile(moduleId, articleN) {
  const m = String(moduleId).padStart(2, '0');
  const n = String(articleN).padStart(2, '0');
  return `./data/content/m${m}-a${n}.js`;
}
