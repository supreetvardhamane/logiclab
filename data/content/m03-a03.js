/**
 * Module 3 · Article 3 — Literals, sizeof & Type Ranges
 * sizeof operator, type sizes and value ranges
 */
export default {
  id:          'm03-a03',
  moduleId:    3,
  n:           3,
  title:       'Literals, sizeof & Type Ranges',
  subtitle:    'sizeof operator, type sizes and value ranges',
  readMinutes: 9,
  blocks: [
    {
      type: 'heading',
      text: 'What is a Literal?',
    },
    {
      type: 'text',
      html: 'A <strong>literal</strong> is a fixed value written directly in source code. When you write <code>42</code>, <code>3.14f</code>, <code>\'A\'</code>, or <code>true</code>, those are literals — they have no memory address and cannot be assigned to.',
    },
    {
      type: 'code',
      lang: 'cpp',
      code: `int    x = 42;          // 42 is an integer literal
float  pi = 3.14159f;   // 3.14159f is a float literal
double g  = 9.8;        // 9.8 is a double literal (no suffix)
char   c  = 'Z';        // 'Z' is a char literal (single quotes)
bool   b  = true;       // true is a boolean literal
string s  = "Hello";    // "Hello" is a string literal (double quotes)`,
    },
    {
      type: 'list',
      items: [
        '<strong>Integer literals</strong> — plain digits: <code>0</code>, <code>42</code>, <code>-7</code>. Suffix <code>L</code> or <code>LL</code> for long/long long: <code>1000000LL</code>.',
        '<strong>Float literals</strong> — require <code>f</code> suffix: <code>3.14f</code>. Without it, treated as <code>double</code>.',
        '<strong>Double literals</strong> — decimal without suffix: <code>3.14</code>, <code>9.8</code>.',
        '<strong>Char literals</strong> — single character in single quotes: <code>\'A\'</code>, <code>\'5\'</code>, <code>\'\\n\'</code>.',
        '<strong>Boolean literals</strong> — the keywords <code>true</code> and <code>false</code>.',
        '<strong>Hex literals</strong> — prefixed with <code>0x</code>: <code>0xFF</code> = 255.',
      ],
    },

    {
      type: 'heading',
      text: 'Escape Sequences in Char and String Literals',
    },
    {
      type: 'text',
      html: 'Some characters cannot be typed directly in code. Use a backslash <code>\\</code> escape sequence:',
    },
    {
      type: 'code',
      lang: 'cpp',
      code: `cout << "Line 1\\nLine 2" << endl;  // \\n = newline
cout << "Tab\\there"    << endl;  // \\t = tab
cout << "Say \\"hi\\""  << endl;  // \\" = double-quote inside string
cout << "Back\\\\slash" << endl;  // \\\\ = literal backslash

char newline = '\\n';             // char literal escape sequence`,
    },

    {
      type: 'heading',
      text: 'sizeof — How Many Bytes?',
    },
    {
      type: 'text',
      html: '<code>sizeof</code> is a compile-time operator that returns the number of bytes a type or variable occupies in memory. The return type is <code>size_t</code> (an unsigned integer).',
    },
    {
      type: 'code',
      lang: 'cpp',
      code: `#include <iostream>
using namespace std;

int main() {
    cout << sizeof(int)    << " bytes" << endl;  // 4
    cout << sizeof(float)  << " bytes" << endl;  // 4
    cout << sizeof(double) << " bytes" << endl;  // 8
    cout << sizeof(char)   << " bytes" << endl;  // 1
    cout << sizeof(bool)   << " bytes" << endl;  // 1

    int age = 25;
    cout << sizeof(age)    << " bytes" << endl;  // 4 (same as sizeof(int))
    return 0;
}`,
    },
    {
      type: 'note',
      variant: 'info',
      text: 'Sizes above are for most modern 64-bit systems. The C++ standard only guarantees minimums: <code>char</code> ≥ 1, <code>short</code> ≥ 2, <code>int</code> ≥ 2, <code>long</code> ≥ 4, <code>long long</code> ≥ 8. Always use <code>sizeof</code> rather than hardcoding sizes in portable code.',
    },

    {
      type: 'heading',
      text: 'Type Ranges — How Big Can Values Get?',
    },
    {
      type: 'text',
      html: 'Because each type has a fixed number of bytes, it can only store values within a certain range. Using <code>&lt;climits&gt;</code> and <code>&lt;cfloat&gt;</code>, you can check these ranges at compile time:',
    },
    {
      type: 'code',
      lang: 'cpp',
      code: `#include <iostream>
#include <climits>     // INT_MIN, INT_MAX, CHAR_MIN, etc.
#include <cfloat>      // FLT_MIN, FLT_MAX, DBL_MAX, etc.
using namespace std;

int main() {
    cout << "int:    " << INT_MIN  << " to " << INT_MAX  << endl;
    // int:    -2147483648 to 2147483647

    cout << "short:  " << SHRT_MIN << " to " << SHRT_MAX << endl;
    // short:  -32768 to 32767

    cout << "char:   " << (int)CHAR_MIN << " to " << (int)CHAR_MAX << endl;
    // char:   -128 to 127

    cout << "float max:  " << FLT_MAX  << endl;  // ~3.4e38
    cout << "double max: " << DBL_MAX  << endl;  // ~1.8e308
    return 0;
}`,
    },
    {
      type: 'code',
      lang: 'cpp',
      code: `// Quick reference table (typical 64-bit system)
//
// Type           Bytes  Minimum               Maximum
// ─────────────────────────────────────────────────────
// char               1  -128                  127
// short              2  -32,768               32,767
// int                4  -2,147,483,648        2,147,483,647
// long               4  -2,147,483,648        2,147,483,647
// long long          8  -9,223,372,036,854... 9,223,372,036,854...
// unsigned int       4  0                     4,294,967,295
// float              4  ~1.2e-38              ~3.4e38
// double             8  ~2.2e-308             ~1.8e308`,
    },

    {
      type: 'qc',
      id:          'm03-a03-qc1',
      question:    'What does sizeof(double) return on a typical modern system?',
      options:     ['4', '2', '8', '16'],
      correct:     2,
      explanation: 'double uses 8 bytes (64-bit double-precision IEEE 754) on virtually all modern systems. float uses 4 bytes. sizeof returns the count in bytes.',
    },

    {
      type: 'heading',
      text: 'Overflow — When Values Exceed the Range',
    },
    {
      type: 'text',
      html: 'If you store a value larger than the type\'s maximum, the bits wrap around — this is <strong>integer overflow</strong>. It is undefined behaviour for signed integers and wraps predictably for unsigned ones.',
    },
    {
      type: 'code',
      lang: 'cpp',
      code: `#include <iostream>
#include <climits>
using namespace std;

int main() {
    int x = INT_MAX;     // 2,147,483,647
    cout << x     << endl;  // 2147483647
    cout << x + 1 << endl;  // -2147483648  (overflow — wraps around!)
    return 0;
}`,
    },
    {
      type: 'note',
      variant: 'warn',
      text: 'Signed integer overflow is <strong>undefined behaviour</strong> in C++. The compiler may assume it never happens and optimize accordingly — producing surprising results. Always check ranges before arithmetic if overflow is possible.',
    },

    {
      type: 'heading',
      text: 'unsigned — Non-Negative Only',
    },
    {
      type: 'text',
      html: 'Add <code>unsigned</code> before a type to double its positive range by giving up negative numbers. Unsigned types wrap cleanly at 0 when they underflow.',
    },
    {
      type: 'code',
      lang: 'cpp',
      code: `unsigned int count  = 4294967295u;  // maximum for unsigned int
unsigned int age    = 25;
// unsigned int negative = -1;  // Warning: wraps to 4294967295!

// unsigned char: 0 to 255 (instead of -128 to 127)
unsigned char byte = 255;`,
    },

    {
      type: 'qc',
      id:          'm03-a03-qc2',
      question:    'What happens when a signed int overflows its maximum value?',
      options:     [
        'It resets to 0',
        'A runtime exception is thrown',
        'The behaviour is undefined — the result is unpredictable',
        'It wraps to INT_MIN reliably',
      ],
      correct:     2,
      explanation: 'Signed integer overflow is undefined behaviour in C++. While it often wraps to INT_MIN on most compilers, the standard makes no guarantee. Unsigned overflow is well-defined and wraps modulo 2^n.',
    },
  ],
};
