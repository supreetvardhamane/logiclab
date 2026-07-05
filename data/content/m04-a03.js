/**
 * Module 4 · Article 3 — Bitwise, Increment & Overflow
 * ++, --, &, |, ^, ~, shift, overflow behaviour
 */
export default {
  id:          'm04-a03',
  moduleId:    4,
  n:           3,
  title:       'Bitwise, Increment & Overflow',
  subtitle:    '++, --, &, |, ^, ~, shift operators and overflow',
  readMinutes: 11,
  blocks: [
    {
      type: 'heading',
      text: 'Increment & Decrement — ++ and --',
    },
    {
      type: 'text',
      html: '<code>++</code> adds 1 to a variable; <code>--</code> subtracts 1. They are the most-used operators in loops. Both come in two forms: <strong>prefix</strong> (before the variable) and <strong>postfix</strong> (after the variable).',
    },
    {
      type: 'code',
      lang: 'cpp',
      code: `int i = 5;

// Prefix: increment FIRST, then use the value
int a = ++i;   // i becomes 6, then a = 6
cout << a;     // 6

// Postfix: use the value FIRST, then increment
int j = 5;
int b = j++;   // b = 5 (old value), then j becomes 6
cout << b;     // 5
cout << j;     // 6`,
    },
    {
      type: 'list',
      items: [
        '<strong>Prefix <code>++i</code></strong> — increments first, then returns the new value.',
        '<strong>Postfix <code>i++</code></strong> — returns the old value, then increments.',
        'When used <em>alone</em> on its own statement (<code>i++;</code>), both are identical — the difference only matters when the expression\'s value is used.',
        'In loops, <code>i++</code> and <code>++i</code> are equivalent when it is the entire statement.',
      ],
    },
    {
      type: 'note',
      variant: 'warn',
      text: '<strong>Never use <code>++</code> or <code>--</code> on the same variable twice in one expression.</strong> The result is <em>unpredictable</em> and compiler-dependent. Bad: <code>j = ++i + i++</code>. This is undefined behaviour.',
    },
    {
      type: 'code',
      lang: 'cpp',
      code: `// CORRECT usage — one increment per expression
for (int i = 0; i < 10; i++) {   // standalone i++, fine
    cout << i << " ";
}

// WRONG — undefined behaviour
int x = 5;
int y = ++x + x++;   // DO NOT DO THIS — unpredictable result`,
    },

    {
      type: 'qc',
      id:          'm04-a03-qc1',
      question:    'What is the value of b after this code?\n\nint a = 10;\nint b = a++;',
      options:     ['10', '11', '9', 'Undefined'],
      correct:     0,
      explanation: 'a++ is postfix: it returns the current value of a (10) and assigns it to b, then increments a to 11. So b = 10 and a = 11.',
    },

    {
      type: 'heading',
      text: 'How Numbers are Stored in Binary',
    },
    {
      type: 'text',
      html: 'Before understanding bitwise operators, you need to know that every integer is stored as a sequence of bits. A <code>char</code> is 8 bits (1 byte). Positive numbers use standard binary. <strong>Negative numbers use Two\'s Complement</strong>.',
    },
    {
      type: 'code',
      lang: 'cpp',
      code: `// char x = 5
// Binary:          0000 0101

// char x = -5  (Two's Complement)
// Step 1: Binary of 5:     0000 0101
// Step 2: Flip all bits:   1111 1010  ← One's Complement
// Step 3: Add 1:           1111 1011  ← Two's Complement = -5

// The leftmost bit (MSB) is always 1 for negative numbers`,
    },

    {
      type: 'heading',
      text: 'Bitwise Operators — Working at the Bit Level',
    },
    {
      type: 'text',
      html: 'Bitwise operators act on the <strong>individual bits</strong> of integer types. They are used in low-level programming, hardware interfacing, flags, and performance-critical code.',
    },
    {
      type: 'code',
      lang: 'cpp',
      code: `// & (AND) — bit is 1 only if BOTH bits are 1
//    0000 1100   (12)
// &  0000 1010   (10)
// =  0000 1000   (8)
cout << (12 & 10) << endl;  // 8

// | (OR) — bit is 1 if EITHER bit is 1
//    0000 1100   (12)
// |  0000 1010   (10)
// =  0000 1110   (14)
cout << (12 | 10) << endl;  // 14

// ^ (XOR) — bit is 1 if bits are DIFFERENT
//    0000 1100   (12)
// ^  0000 1010   (10)
// =  0000 0110   (6)
cout << (12 ^ 10) << endl;  // 6

// ~ (NOT) — flips every bit
//    0000 0101   (5)
// ~  1111 1010   = -6  (Two's Complement of -6)
char x = 5;
cout << (int)(~x) << endl;  // -6`,
    },
    {
      type: 'note',
      variant: 'warn',
      text: 'Bitwise operators only work on <strong>integer types</strong> (<code>int</code>, <code>char</code>, <code>long</code>). Using them on <code>float</code> or <code>double</code> is a <strong>compile error</strong>.',
    },

    {
      type: 'heading',
      text: 'Shift Operators — << and >>',
    },
    {
      type: 'text',
      html: 'Shift operators move all bits left or right by a specified number of positions. Shifting left by 1 doubles the value; shifting right by 1 halves it (integer division by 2).',
    },
    {
      type: 'code',
      lang: 'cpp',
      code: `int x = 5;             // binary: 0000 0101

cout << (x << 1) << endl;  // 10  — shift left 1:  0000 1010 (×2)
cout << (x << 2) << endl;  // 20  — shift left 2:  0001 0100 (×4)
cout << (x >> 1) << endl;  // 2   — shift right 1: 0000 0010 (÷2)

// Useful: powers of 2
int mask = 1 << 3;   // 1 shifted left 3 = 8 (binary: 0000 1000)`,
    },
    {
      type: 'code',
      lang: 'cpp',
      code: `// Compound assignment versions work too
int flags = 0b00000001;   // binary literal (C++14)
flags <<= 2;              // shift left 2: flags = 0b00000100 (4)
flags >>= 1;              // shift right 1: flags = 0b00000010 (2)`,
    },

    {
      type: 'heading',
      text: 'Practical Use — Bit Flags',
    },
    {
      type: 'text',
      html: 'Bitwise operators shine when packing multiple boolean flags into a single integer. This is common in systems programming and game engines.',
    },
    {
      type: 'code',
      lang: 'cpp',
      code: `const int READ    = 1;   // 0001
const int WRITE   = 2;   // 0010
const int EXECUTE = 4;   // 0100

int perms = READ | WRITE;    // 0011 — read and write

// Check if WRITE is set:
if (perms & WRITE) {
    cout << "Has write permission" << endl;
}

// Remove WRITE permission:
perms &= ~WRITE;   // AND with 1111 1101`,
    },

    {
      type: 'heading',
      text: 'Integer Overflow — When Values Wrap',
    },
    {
      type: 'text',
      html: 'Every integer type has a fixed range. When you exceed the maximum, the bits wrap around — this is <strong>overflow</strong>. Negative numbers are stored in Two\'s Complement, so exceeding <code>INT_MAX</code> wraps to <code>INT_MIN</code>.',
    },
    {
      type: 'code',
      lang: 'cpp',
      code: `#include <iostream>
#include <climits>
using namespace std;

int main() {
    int x = INT_MAX;           // 2,147,483,647
    cout << x     << endl;     // 2147483647
    cout << x + 1 << endl;     // -2147483648  ← wrapped!

    // char overflow — wraps at 127
    char c = 127;
    c++;
    cout << (int)c << endl;    // -128  ← wrapped to minimum

    return 0;
}`,
    },
    {
      type: 'note',
      variant: 'warn',
      text: 'Signed integer overflow is <strong>undefined behaviour</strong> in the C++ standard. Compilers may assume it never happens and optimize accordingly — sometimes producing counterintuitive code. Use <code>unsigned</code> types when you need well-defined wrapping behaviour.',
    },

    {
      type: 'heading',
      text: 'Why ~5 equals -6 — The Math',
    },
    {
      type: 'code',
      lang: 'cpp',
      code: `// char x = 5
// Binary:           0000 0101
// ~x (flip bits):   1111 1010  ← this is -6 in Two's Complement

// To verify: convert 1111 1010 back to decimal
// 1. 1's complement: 0000 0101
// 2. Add 1:          0000 0110 = 6
// 3. Since MSB was 1, it's negative: -6

// General rule: ~x == -(x + 1)
cout << ~5  << endl;   // -6
cout << ~0  << endl;   // -1
cout << ~-1 << endl;   // 0`,
    },

    {
      type: 'qc',
      id:          'm04-a03-qc2',
      question:    'Which types can the % (modulo) operator be used on in C++?',
      options:     [
        'Any numeric type including float and double',
        'Only integer types (int, char, long, etc.)',
        'Only int and long',
        'Only positive integers',
      ],
      correct:     1,
      explanation: 'The % operator is defined only for integer types in C++. Using % on float or double is a compile error. For floating-point remainder, use fmod() from <cmath>.',
    },
  ],
};
