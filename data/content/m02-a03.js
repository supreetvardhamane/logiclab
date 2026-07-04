/**
 * Module 2 · Article 3 — FAQ Deep Dive
 * int main() vs void main(), why std::, what is #include
 */
export default {
  id:       'm02-a03',
  moduleId: 2,
  n:        3,
  title:    'FAQ Deep Dive',
  subtitle: 'int main() vs void main(), why std::, what is #include really',
  readMinutes: 11,
  blocks: [
    {
      type: 'heading',
      text: 'Why does main() return int, not void?',
    },
    {
      type: 'text',
      html: 'This is one of the most common beginner questions. The answer lies in how your program communicates with the OS.',
    },
    {
      type: 'text',
      html: 'When a program ends, the OS asks: <em>"Did it succeed?"</em> The return value of <code>main()</code> is the <strong>exit code</strong> — the program\'s answer:',
    },
    {
      type: 'list',
      items: [
        '<code>return 0</code> → success',
        '<code>return 1</code> (or any non-zero) → failure / error',
      ],
    },
    {
      type: 'text',
      html: 'This matters in shell scripting:',
    },
    {
      type: 'code',
      lang: 'text',
      code: `# In bash — check if program succeeded:
./myprogram
if [ $? -eq 0 ]; then
    echo "Program succeeded"
else
    echo "Program failed"
fi`,
    },
    {
      type: 'text',
      html: '<code>void main()</code> means "return nothing to the OS". The OS gets garbage. This is why:',
    },
    {
      type: 'list',
      items: [
        'The C++ standard explicitly requires <code>int main()</code>.',
        'Some old compilers tolerated <code>void main()</code> as an extension — it is non-standard.',
        'Using <code>void main()</code> causes <strong>undefined behaviour</strong> — your program may appear to work but is technically broken.',
      ],
    },
    {
      type: 'note',
      variant: 'warn',
      text: 'Never use <code>void main()</code>. If you see it in a book or tutorial, that book is outdated. Always use <code>int main()</code> and <code>return 0;</code>.',
    },
    {
      type: 'heading',
      text: 'Can main() take parameters?',
    },
    {
      type: 'text',
      html: 'Yes! The full signature is:',
    },
    {
      type: 'code',
      lang: 'cpp',
      code: `int main(int argc, char* argv[]) {
    // argc = number of command-line arguments
    // argv = array of argument strings
    // argv[0] = program name itself

    // ./hello Alice Bob   →  argc=3, argv[0]="./hello", argv[1]="Alice", argv[2]="Bob"
    return 0;
}`,
    },
    {
      type: 'text',
      html: 'You\'ll use command-line arguments much later. For now, <code>int main()</code> with empty parens is the standard form.',
    },
    {
      type: 'heading',
      text: 'What Does #include REALLY Do?',
    },
    {
      type: 'text',
      html: '<code>#include</code> is handled by the <strong>preprocessor</strong> — a text-processing step that runs before compilation. It does one thing: <strong>copy-paste the entire file</strong>.',
    },
    {
      type: 'code',
      lang: 'text',
      code: `// Your code:
#include <iostream>
int main() {
    cout << "Hi";
}

// After preprocessing (conceptually):
// ... thousands of lines from iostream ...
// ... including the declaration of cout ...
int main() {
    cout << "Hi";
}`,
    },
    {
      type: 'text',
      html: 'The header file contains <strong>declarations</strong> (function signatures, class definitions) — not implementation code. The actual implementation is in <strong>libraries</strong> that the linker connects to your program.',
    },
    {
      type: 'subheading',
      text: 'Declaration vs Definition',
    },
    {
      type: 'list',
      items: [
        '<strong>Declaration</strong> — tells the compiler: "this thing exists and here\'s its type/signature". No code generated.',
        '<strong>Definition</strong> — the actual implementation. Code is generated.',
      ],
    },
    {
      type: 'code',
      lang: 'cpp',
      code: `// Declaration (in a header):
void greet(string name);

// Definition (in a .cpp file):
void greet(string name) {
    cout << "Hello, " << name << endl;
}`,
    },
    {
      type: 'heading',
      text: 'Why std:: ?',
    },
    {
      type: 'text',
      html: 'Everything in the C++ standard library lives inside the <code>std</code> namespace. Without namespaces, you\'d have name collisions:',
    },
    {
      type: 'code',
      lang: 'cpp',
      code: `// Imagine two libraries both define a function called "sort"
// Namespaces prevent collisions:
std::sort(v.begin(), v.end());    // standard library sort
mylib::sort(v.begin(), v.end());  // your custom sort`,
    },
    {
      type: 'subheading',
      text: 'The Two Styles — Pros & Cons',
    },
    {
      type: 'code',
      lang: 'cpp',
      code: `// Style 1: using namespace std (beginner-friendly)
using namespace std;
cout << "Hello" << endl;

// PRO: less typing
// CON: pollutes global scope — if your code also has "cout" for something
//      else, there's a conflict. Real projects avoid this.

// Style 2: std:: prefix (professional)
std::cout << "Hello" << std::endl;

// PRO: unambiguous — always clear where identifiers come from
// PRO: safe in large codebases and headers
// CON: more verbose`,
    },
    {
      type: 'note',
      variant: 'tip',
      text: 'Never write <code>using namespace std;</code> in a <strong>header file</strong>. Any file that includes your header inherits the namespace, which can cause unexpected conflicts.',
    },
    {
      type: 'heading',
      text: 'cin / cout — The Full Picture',
    },
    {
      type: 'text',
      html: '<code>cin</code> and <code>cout</code> are not functions — they are <strong>objects</strong> of stream classes:',
    },
    {
      type: 'list',
      items: [
        '<code>cout</code> is an object of type <code>std::ostream</code> — "output stream". Connected to your terminal.',
        '<code>cin</code> is an object of type <code>std::istream</code> — "input stream". Connected to your keyboard.',
        '<code>cerr</code> is another <code>ostream</code> for error messages — goes to stderr (separate from stdout).',
      ],
    },
    {
      type: 'code',
      lang: 'cpp',
      code: `// cerr is for error messages — not buffered, always visible immediately
cerr << "Error: file not found!" << endl;

// In programs: good practice to use cerr for errors
// so user can redirect stdout without losing error messages:
// ./myprogram > output.txt    <-- only stdout goes to file; errors still show`,
    },
    {
      type: 'heading',
      text: 'The << and >> Operators — Why Arrows?',
    },
    {
      type: 'text',
      html: 'In C++, <code>&lt;&lt;</code> and <code>&gt;&gt;</code> are the <strong>bitwise shift</strong> operators repurposed for streams. The standard library <em>overloaded</em> them for input/output.',
    },
    {
      type: 'list',
      items: [
        '<code>cout &lt;&lt; x</code> — "insert x into the output stream" — the arrow shows data flowing <strong>into</strong> cout.',
        '<code>cin &gt;&gt; x</code> — "extract from the input stream into x" — the arrow shows data flowing <strong>into</strong> x.',
      ],
    },
    {
      type: 'code',
      lang: 'cpp',
      code: `int a = 5, b = 10;

// Data flows INTO cout (left shift direction)
cout << a << " " << b << endl;   // 5 10

// Data flows OUT of cin INTO variables
cin >> a >> b;`,
    },
    {
      type: 'heading',
      text: 'Chaining << — How It Works',
    },
    {
      type: 'text',
      html: '<code>cout &lt;&lt; "a=" &lt;&lt; a &lt;&lt; endl;</code> works because each <code>&lt;&lt;</code> returns <code>cout</code> itself, allowing the next <code>&lt;&lt;</code> to operate on it. This is called <strong>method chaining</strong>.',
    },
    {
      type: 'code',
      lang: 'cpp',
      code: `// Equivalent to:
cout << "a=";       // returns cout
cout << a;          // returns cout
cout << endl;       // returns cout

// So chaining is just syntactic sugar for calling << repeatedly`,
    },
    {
      type: 'heading',
      text: 'Common Beginner Mistakes — Quick Reference',
    },
    {
      type: 'list',
      items: [
        '<strong>Missing semicolon</strong> — <code>cout &lt;&lt; "Hi"</code> (no <code>;</code>) → compiler error on the <em>next</em> line.',
        '<strong>Using = instead of ==</strong> — <code>if (x = 5)</code> assigns 5 to x, always true. Use <code>if (x == 5)</code>.',
        '<strong>Missing #include</strong> — using <code>cout</code> without <code>#include &lt;iostream&gt;</code>.',
        '<strong>Wrong variable type</strong> — storing a float in an int truncates the decimal: <code>int x = 3.7;</code> gives x=3.',
        '<strong>Extra/missing braces</strong> — every <code>{</code> needs a matching <code>}</code>.',
        '<strong>Uninitialized variables</strong> — <code>int x; cout &lt;&lt; x;</code> prints garbage. Always initialize.',
      ],
    },
  ],
};
