/**
 * Module 2 · Article 2 — Writing & Running Your First Program
 * cout, cin, endl, compiling step by step
 */
export default {
  id:       'm02-a02',
  moduleId: 2,
  n:        2,
  title:    'Writing & Running Your First Program',
  subtitle: 'cout, cin, endl, compiling step by step',
  readMinutes: 12,
  blocks: [
    {
      type: 'heading',
      text: 'Your First Real Program',
    },
    {
      type: 'text',
      html: 'Let\'s write a program that asks for your name, then greets you. This covers <strong>output</strong> (<code>cout</code>), <strong>input</strong> (<code>cin</code>), and storing a value in a <strong>variable</strong>.',
    },
    {
      type: 'code',
      lang: 'cpp',
      code: `#include <iostream>
#include <string>
using namespace std;

int main() {
    string name;
    cout << "What is your name? ";
    getline(cin, name);
    cout << "Hello, " << name << "!" << endl;
    return 0;
}`,
    },
    {
      type: 'text',
      html: 'Run it and you\'ll see:',
    },
    {
      type: 'code',
      lang: 'text',
      code: `What is your name? Alice
Hello, Alice!`,
    },
    {
      type: 'heading',
      text: 'Output with cout',
    },
    {
      type: 'text',
      html: '<code>cout</code> stands for <strong>"character output"</strong>. It sends data to the standard output (your terminal). The <code>&lt;&lt;</code> operator is the <strong>insertion operator</strong> — it inserts data into the output stream.',
    },
    {
      type: 'code',
      lang: 'cpp',
      code: `cout << "Hello!";             // prints: Hello!
cout << 42;                    // prints: 42
cout << 3.14;                  // prints: 3.14
cout << "Sum: " << 5 + 3;     // prints: Sum: 8

// Chain multiple items with multiple <<
cout << "x = " << 10 << ", y = " << 20;
// prints: x = 10, y = 20`,
    },
    {
      type: 'subheading',
      text: 'endl vs "\\n"',
    },
    {
      type: 'text',
      html: 'Both move to the next line, but they behave slightly differently:',
    },
    {
      type: 'list',
      items: [
        '<code>endl</code> — outputs a newline AND <strong>flushes the buffer</strong> (forces immediate display). Slower but guaranteed output.',
        '<code>"\\n"</code> — outputs a newline only. Faster — preferred when printing many lines.',
      ],
    },
    {
      type: 'code',
      lang: 'cpp',
      code: `cout << "Line 1" << endl;   // newline + flush
cout << "Line 2\n";           // newline only (faster)
cout << "Line 3" << "\n";     // same as above`,
    },
    {
      type: 'note',
      variant: 'tip',
      text: 'Use <code>endl</code> when you want output to appear immediately (e.g., before a cin prompt). Use <code>"\\n"</code> inside loops for performance.',
    },
    {
      type: 'heading',
      text: 'Input with cin',
    },
    {
      type: 'text',
      html: '<code>cin</code> stands for <strong>"character input"</strong>. It reads from the keyboard. The <code>&gt;&gt;</code> operator is the <strong>extraction operator</strong> — it extracts data from the input stream into a variable.',
    },
    {
      type: 'code',
      lang: 'cpp',
      code: `int age;
cout << "Enter your age: ";
cin >> age;
cout << "You are " << age << " years old." << endl;`,
    },
    {
      type: 'subheading',
      text: 'Reading Multiple Values',
    },
    {
      type: 'code',
      lang: 'cpp',
      code: `int a, b;
cout << "Enter two numbers: ";
cin >> a >> b;                  // reads two ints (space-separated)
cout << "Sum = " << a + b << endl;`,
    },
    {
      type: 'text',
      html: 'If the user types <code>5 10</code>, a=5 and b=10.',
    },
    {
      type: 'subheading',
      text: 'Reading a Full Line — getline()',
    },
    {
      type: 'text',
      html: '<code>cin &gt;&gt;</code> stops reading at whitespace. To read a full line including spaces, use <code>getline()</code>:',
    },
    {
      type: 'code',
      lang: 'cpp',
      code: `string fullName;
cout << "Enter your full name: ";
getline(cin, fullName);   // reads until Enter
cout << "Hello, " << fullName << "!" << endl;`,
    },
    {
      type: 'note',
      variant: 'warn',
      text: '<strong>cin/getline mixing gotcha:</strong> After using <code>cin &gt;&gt; someInt;</code>, there is a leftover newline in the buffer. Before calling <code>getline()</code>, call <code>cin.ignore();</code> to discard it. Otherwise getline reads an empty string.',
    },
    {
      type: 'code',
      lang: 'cpp',
      code: `int age;
cin >> age;
cin.ignore();               // ← discard leftover newline
string name;
getline(cin, name);         // now works correctly`,
    },
    {
      type: 'heading',
      text: 'A Complete Example — Sum of Two Numbers',
    },
    {
      type: 'code',
      lang: 'cpp',
      code: `#include <iostream>
using namespace std;

int main() {
    int a, b, sum;

    cout << "Enter two numbers: ";
    cin >> a >> b;

    sum = a + b;

    cout << a << " + " << b << " = " << sum << endl;

    return 0;
}`,
    },
    {
      type: 'text',
      html: 'Sample run:',
    },
    {
      type: 'code',
      lang: 'text',
      code: `Enter two numbers: 7 13
7 + 13 = 20`,
    },
    {
      type: 'heading',
      text: 'Compiling and Running — Step by Step',
    },
    {
      type: 'text',
      html: 'To turn your C++ source into an executable, use the <strong>g++ compiler</strong>:',
    },
    {
      type: 'code',
      lang: 'text',
      code: `# Step 1: Create the file
# (write your code in hello.cpp)

# Step 2: Compile
g++ hello.cpp -o hello

# Step 3: Run
./hello             # Linux / macOS
hello.exe           # Windows`,
    },
    {
      type: 'subheading',
      text: 'Useful Compiler Flags',
    },
    {
      type: 'list',
      items: [
        '<code>-o name</code> — name the output executable.',
        '<code>-Wall</code> — enable all warnings (always use this!).',
        '<code>-std=c++17</code> — use C++17 standard.',
        '<code>-g</code> — include debug info (for debuggers).',
      ],
    },
    {
      type: 'code',
      lang: 'text',
      code: `g++ -Wall -std=c++17 hello.cpp -o hello`,
    },
    {
      type: 'subheading',
      text: 'Reading Compiler Errors',
    },
    {
      type: 'text',
      html: 'A compiler error message looks like:',
    },
    {
      type: 'code',
      lang: 'text',
      code: `hello.cpp:5:5: error: 'cout' was not declared in this scope
    cout << "Hello";
    ^~~~`,
    },
    {
      type: 'text',
      html: 'Format: <code>filename:line:column: error: message</code>. The error is on line 5, column 5. Here, the fix is to add <code>#include &lt;iostream&gt;</code> and <code>using namespace std;</code>.',
    },
    {
      type: 'note',
      variant: 'tip',
      text: 'Fix errors <strong>top to bottom</strong>. One missing semicolon or brace often triggers dozens of fake errors below it. Fix the first error, recompile, repeat.',
    },
    {
      type: 'heading',
      text: 'Escape Sequences',
    },
    {
      type: 'text',
      html: 'Inside string literals, backslash starts an <strong>escape sequence</strong>:',
    },
    {
      type: 'list',
      items: [
        '<code>\\n</code> — newline',
        '<code>\\t</code> — tab',
        '<code>\\\\"</code> — literal double-quote',
        '<code>\\\\\\\\</code> — literal backslash',
        '<code>\\0</code> — null character (string terminator in C-strings)',
      ],
    },
    {
      type: 'code',
      lang: 'cpp',
      code: `cout << "Name:\tAlice\nAge:\t20\n";
// Output:
// Name:   Alice
// Age:    20`,
    },
  ],
};
