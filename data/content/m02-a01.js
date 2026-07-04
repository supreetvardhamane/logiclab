/**
 * Module 2 · Article 1 — Skeleton of a C++ Program
 * #include, int main(), return 0, std
 * Has 2 Quick Checks
 */
export default {
  id:       'm02-a01',
  moduleId: 2,
  n:        1,
  title:    'Skeleton of a C++ Program',
  subtitle: '#include, int main(), return 0, std namespace',
  readMinutes: 10,
  blocks: [
    {
      type: 'heading',
      text: 'The Minimal C++ Program',
    },
    {
      type: 'text',
      html: 'Every C++ program must have at least one thing: a function called <code>main()</code>. This is where program execution begins. Here is the smallest valid C++ program:',
    },
    {
      type: 'code',
      lang: 'cpp',
      code: `int main() {
    return 0;
}`,
    },
    {
      type: 'text',
      html: 'This program does nothing visible, but it is valid C++. Let\'s add a "Hello, World!" output and then dissect every piece:',
    },
    {
      type: 'code',
      lang: 'cpp',
      code: `#include <iostream>
using namespace std;

int main() {
    cout << "Hello, World!" << endl;
    return 0;
}`,
    },
    {
      type: 'heading',
      text: '#include — Preprocessor Directives',
    },
    {
      type: 'text',
      html: '<code>#include</code> is a <strong>preprocessor directive</strong> — an instruction that runs before compilation. It literally pastes the contents of the named file into your source code.',
    },
    {
      type: 'list',
      items: [
        '<code>#include &lt;iostream&gt;</code> — includes the <strong>iostream</strong> standard library header. This header defines <code>cout</code>, <code>cin</code>, and <code>endl</code>.',
        'Angle brackets <code>&lt; &gt;</code> — search the standard library directories.',
        'Quotes <code>" "</code> — search your own project directory first, then standard.',
      ],
    },
    {
      type: 'note',
      variant: 'tip',
      text: 'Without <code>#include &lt;iostream&gt;</code>, the compiler does not know what <code>cout</code> is and will give an error. Always include the headers for everything you use.',
    },
    {
      type: 'subheading',
      text: 'Common Standard Headers',
    },
    {
      type: 'list',
      items: [
        '<code>&lt;iostream&gt;</code> — input/output (cin, cout)',
        '<code>&lt;string&gt;</code> — std::string class',
        '<code>&lt;cmath&gt;</code> — math functions (sqrt, pow, abs)',
        '<code>&lt;vector&gt;</code> — dynamic arrays',
        '<code>&lt;algorithm&gt;</code> — sort, find, min, max',
      ],
    },
    {
      type: 'heading',
      text: 'int main()',
    },
    {
      type: 'text',
      html: '<code>main()</code> is the <strong>entry point</strong> of every C++ program. The OS calls <code>main()</code> when it starts your program. It must be declared with a return type of <code>int</code>.',
    },
    {
      type: 'list',
      items: [
        '<code>int</code> — the return type. main() returns an integer to the OS.',
        '<code>main</code> — the special function name the OS looks for.',
        '<code>()</code> — empty parameter list (no command-line args in the basic form).',
        '<code>{ }</code> — the function body — all your program code goes here.',
      ],
    },
    {
      type: 'note',
      variant: 'warn',
      text: '<strong>Never use <code>void main()</code>!</strong> Some old books and compilers allowed it, but it is non-standard. The C++ standard mandates <code>int main()</code>. Using <code>void main()</code> is undefined behaviour.',
    },
    {
      type: 'heading',
      text: 'return 0',
    },
    {
      type: 'text',
      html: '<code>return 0;</code> at the end of <code>main()</code> tells the OS: <strong>"the program finished successfully"</strong>.',
    },
    {
      type: 'list',
      items: [
        '<strong>0</strong> → success (universal convention).',
        '<strong>Non-zero</strong> → error code (the meaning depends on your program).',
        'In C++11 and later, if you omit <code>return 0;</code>, it is <em>implied</em> at the end of main. But explicit is better practice.',
      ],
    },
    {
      type: 'code',
      lang: 'cpp',
      code: `int main() {
    // ... program logic ...
    return 0;   // tells the OS: all good ✓
}`,
    },
    {
      type: 'heading',
      text: 'namespace std — What is a Namespace?',
    },
    {
      type: 'text',
      html: 'A <strong>namespace</strong> is a named scope that groups related identifiers to avoid naming conflicts. All standard library functions and objects live in the <code>std</code> namespace.',
    },
    {
      type: 'subheading',
      text: 'Three Ways to Use std',
    },
    {
      type: 'code',
      lang: 'cpp',
      code: `// Option 1: using namespace std (import everything — convenient for beginners)
using namespace std;
cout << "Hello";

// Option 2: std:: prefix (explicit, preferred in professional code)
std::cout << "Hello";

// Option 3: using declaration (import just what you need)
using std::cout;
using std::endl;
cout << "Hello" << endl;`,
    },
    {
      type: 'text',
      html: 'In this course we use <code>using namespace std;</code> for simplicity. In real projects, <code>std::</code> is preferred to avoid conflicts.',
    },
    {
      type: 'heading',
      text: 'Braces, Semicolons & Whitespace',
    },
    {
      type: 'list',
      items: [
        '<strong>Curly braces <code>{ }</code></strong> — define the <em>body</em> of a function or block. Must match.',
        '<strong>Semicolons <code>;</code></strong> — terminate statements. Forgetting one is the most common beginner mistake.',
        '<strong>Whitespace</strong> — spaces, tabs, newlines are ignored by the compiler (inside code). Use them for readability.',
        '<strong>Case-sensitive</strong> — <code>main</code>, <code>Main</code>, and <code>MAIN</code> are three different identifiers.',
      ],
    },
    {
      type: 'qc',
      id: 'm02-a01-qc1',
      question: 'What does #include <iostream> do in a C++ program?',
      options: [
        'Defines the main() function',
        'Imports the std namespace',
        'Pastes the iostream header so cout and cin are available',
        'Compiles the program',
      ],
      correct: 2,
      explanation: '#include is a preprocessor directive that pastes the named header file\'s contents. <iostream> defines cout, cin, and endl.',
    },
    {
      type: 'heading',
      text: 'Comments',
    },
    {
      type: 'text',
      html: 'Comments are text the compiler ignores — they exist only for humans reading the code.',
    },
    {
      type: 'code',
      lang: 'cpp',
      code: `// This is a single-line comment
int x = 5;  // This is an inline comment

/*
 * This is a
 * multi-line comment
 */
int y = 10;`,
    },
    {
      type: 'note',
      variant: 'tip',
      text: 'Good comments explain <em>why</em>, not <em>what</em>. The code already shows what — comment the intent. Bad: <code>// increment x by 1</code>. Good: <code>// adjust for 0-based index</code>.',
    },
    {
      type: 'heading',
      text: 'Putting It All Together',
    },
    {
      type: 'code',
      lang: 'cpp',
      code: `#include <iostream>      // 1. Include input/output library
using namespace std;    // 2. Use std namespace for convenience

int main() {            // 3. Program entry point
    // 4. Output a message to the terminal
    cout << "Hello, LogicLab!" << endl;
    return 0;           // 5. Report success to the OS
}`,
    },
    {
      type: 'qc',
      id: 'm02-a01-qc2',
      question: 'Which of the following is the correct return type for main() in standard C++?',
      options: [
        'void',
        'int',
        'string',
        'bool',
      ],
      correct: 1,
      explanation: 'The C++ standard requires main() to return int. void main() is non-standard and should never be used.',
    },
  ],
};
