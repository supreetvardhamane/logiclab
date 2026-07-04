/**
 * Module 1 · Article 4 — OS & Programming Paradigms
 * Operating System, Procedural, OOP, Functional
 */
export default {
  id:       'm01-a04',
  moduleId: 1,
  n:        4,
  title:    'OS & Programming Paradigms',
  subtitle: 'Operating System, Procedural, OOP, Functional',
  readMinutes: 9,
  blocks: [
    {
      type: 'heading',
      text: 'What is an Operating System?',
    },
    {
      type: 'text',
      html: 'An <strong>Operating System (OS)</strong> is the master program that manages all hardware resources and provides services for other programs. Without an OS, every program would need to know how to drive the keyboard, screen, disk, and network itself — an enormous duplication of effort.',
    },
    {
      type: 'list',
      items: [
        '<strong>Process Management</strong> — runs multiple programs "at once" by rapidly switching between them (multitasking).',
        '<strong>Memory Management</strong> — allocates RAM to programs; protects them from each other.',
        '<strong>File System</strong> — organises data on disk into files and folders.',
        '<strong>Device Drivers</strong> — translates generic I/O calls into hardware-specific commands.',
        '<strong>Security</strong> — user accounts, permissions, and access control.',
      ],
    },
    {
      type: 'subheading',
      text: 'Common Operating Systems',
    },
    {
      type: 'list',
      items: [
        '<strong>Windows</strong> — dominant on desktops/laptops, most software runs here.',
        '<strong>Linux</strong> — open source, runs most servers, also popular for C++ development.',
        '<strong>macOS</strong> — Apple desktops/laptops, Unix-based (shares roots with Linux).',
        '<strong>Android / iOS</strong> — mobile OSes (Android is Linux-based).',
      ],
    },
    {
      type: 'note',
      variant: 'info',
      text: 'When you compile and run a C++ program, the OS does the heavy lifting: it loads your executable into RAM, creates a process, and schedules CPU time for it. Your <code>cout</code> eventually becomes an OS system call to write to the screen.',
    },
    {
      type: 'heading',
      text: 'Process vs Thread',
    },
    {
      type: 'text',
      html: 'Your running C++ program is a <strong>process</strong> — an isolated unit with its own memory space. Inside a process, multiple <strong>threads</strong> can run concurrently, sharing the same memory. For now, your programs will be single-threaded.',
    },
    {
      type: 'heading',
      text: 'Programming Paradigms',
    },
    {
      type: 'text',
      html: 'A <strong>paradigm</strong> is a fundamental style or approach to structuring programs. Different paradigms answer the question: <em>"How should we organise code to solve problems?"</em>',
    },
    {
      type: 'subheading',
      text: '1. Procedural Programming',
    },
    {
      type: 'text',
      html: 'Programs are sequences of <strong>statements / instructions</strong> grouped into <strong>functions (procedures)</strong>. You tell the computer <em>what to do, step by step</em>.',
    },
    {
      type: 'list',
      items: [
        'Code is a sequence of function calls.',
        'Data and functions are separate.',
        'Good for: small scripts, system programming, algorithms.',
        '<strong>Examples:</strong> C, Pascal, early BASIC.',
      ],
    },
    {
      type: 'code',
      lang: 'cpp',
      code: `// Procedural style — tell the computer what to do, step by step
int calculateArea(int width, int height) {
    return width * height;
}

int main() {
    int area = calculateArea(5, 10);
    return 0;
}`,
    },
    {
      type: 'subheading',
      text: '2. Object-Oriented Programming (OOP)',
    },
    {
      type: 'text',
      html: 'Programs are built from <strong>objects</strong> — bundles of data (<em>attributes</em>) and behaviour (<em>methods</em>) that model real-world entities.',
    },
    {
      type: 'list',
      items: [
        'Key concepts: <strong>Encapsulation, Inheritance, Polymorphism, Abstraction</strong>.',
        'Data and functions that operate on that data are together in a class.',
        'Good for: large software systems, games, GUIs.',
        '<strong>Examples:</strong> C++, Java, Python, C#.',
      ],
    },
    {
      type: 'code',
      lang: 'cpp',
      code: `// OOP style — model the world as objects
class Rectangle {
    int width, height;
public:
    Rectangle(int w, int h) : width(w), height(h) {}
    int area() { return width * height; }
};

int main() {
    Rectangle r(5, 10);
    int a = r.area();   // 50
    return 0;
}`,
    },
    {
      type: 'subheading',
      text: '3. Functional Programming',
    },
    {
      type: 'text',
      html: 'Programs are built from <strong>pure functions</strong> that transform data without side effects. Emphasis on <em>what to compute</em>, not <em>how</em>.',
    },
    {
      type: 'list',
      items: [
        'Functions are first-class values — passed around like data.',
        'Avoids mutable state (variables that change).',
        'Good for: data processing pipelines, concurrency-safe code.',
        '<strong>Examples:</strong> Haskell, Erlang, Clojure; <em>C++ has lambdas and STL for FP-style code</em>.',
      ],
    },
    {
      type: 'subheading',
      text: '4. Declarative Programming',
    },
    {
      type: 'text',
      html: 'You describe <em>what</em> you want, not <em>how</em> to get it. SQL is the classic example:',
    },
    {
      type: 'code',
      lang: 'text',
      code: `-- Declarative: just say what you want
SELECT name FROM students WHERE grade = 'A';

-- vs Procedural: manually iterate and filter
for each student in list:
    if student.grade == 'A': print student.name`,
    },
    {
      type: 'note',
      variant: 'tip',
      text: 'C++ is a <strong>multi-paradigm language</strong> — you can write procedural C, OOP, and functional-style code all in the same file. This is one of C++\'s great strengths. In this course we start procedural and move to OOP in Phase 6.',
    },
    {
      type: 'heading',
      text: 'Which Paradigm Is Best?',
    },
    {
      type: 'text',
      html: 'None is universally best. Great engineers choose the right tool for the problem:',
    },
    {
      type: 'list',
      items: [
        '<strong>Small utility scripts</strong> → procedural',
        '<strong>Large application (game, business app)</strong> → OOP',
        '<strong>Data pipeline, concurrent server</strong> → functional',
        '<strong>Database queries, config files</strong> → declarative',
      ],
    },
  ],
};
