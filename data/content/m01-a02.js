/**
 * Module 1 · Article 2 — Number Systems
 * Decimal, Binary, Octal, Hexadecimal conversions
 */
export default {
  id:       'm01-a02',
  moduleId: 1,
  n:        2,
  title:    'Number Systems',
  subtitle: 'Decimal, Binary, Octal, Hexadecimal conversions',
  readMinutes: 10,
  blocks: [
    {
      type: 'heading',
      text: 'Why Multiple Number Systems?',
    },
    {
      type: 'text',
      html: 'Humans are comfortable with <strong>decimal (base 10)</strong> because we have 10 fingers. Computers work in <strong>binary (base 2)</strong> because transistors have two states. <strong>Hexadecimal (base 16)</strong> and <strong>octal (base 8)</strong> are shortcuts for representing binary data compactly.',
    },
    {
      type: 'text',
      html: 'A programmer encounters all four systems:',
    },
    {
      type: 'list',
      items: [
        '<strong>Decimal</strong> — everyday math, most user-facing numbers.',
        '<strong>Binary</strong> — bit manipulation, flags, low-level operations.',
        '<strong>Hexadecimal</strong> — memory addresses, colour codes, file headers.',
        '<strong>Octal</strong> — Unix file permissions (<code>chmod 755</code>).',
      ],
    },
    {
      type: 'heading',
      text: 'Positional Notation',
    },
    {
      type: 'text',
      html: 'Every number system uses <strong>positional notation</strong>: each digit\'s value depends on its position. The rightmost digit is position 0.',
    },
    {
      type: 'text',
      html: 'For decimal 425: <code>4×10² + 2×10¹ + 5×10⁰ = 400 + 20 + 5 = 425</code>',
    },
    {
      type: 'text',
      html: 'For binary 1011: <code>1×2³ + 0×2² + 1×2¹ + 1×2⁰ = 8 + 0 + 2 + 1 = 11</code>',
    },
    {
      type: 'heading',
      text: 'Binary (Base 2)',
    },
    {
      type: 'text',
      html: 'Binary uses only digits <strong>0</strong> and <strong>1</strong>. Each position is a power of 2.',
    },
    {
      type: 'subheading',
      text: 'Decimal → Binary: Repeated Division by 2',
    },
    {
      type: 'text',
      html: 'Convert 45 to binary:',
    },
    {
      type: 'code',
      lang: 'text',
      code: `45 ÷ 2 = 22  remainder 1
22 ÷ 2 = 11  remainder 0
11 ÷ 2 =  5  remainder 1
 5 ÷ 2 =  2  remainder 1
 2 ÷ 2 =  1  remainder 0
 1 ÷ 2 =  0  remainder 1
                         ↑ read remainders bottom to top
45₁₀ = 101101₂`,
    },
    {
      type: 'subheading',
      text: 'Binary → Decimal: Positional Sum',
    },
    {
      type: 'text',
      html: 'Convert 101101 to decimal:',
    },
    {
      type: 'code',
      lang: 'text',
      code: `Position:  5  4  3  2  1  0
Binary:    1  0  1  1  0  1

1×2⁵ + 0×2⁴ + 1×2³ + 1×2² + 0×2¹ + 1×2⁰
= 32  +  0  +  8   +  4   +  0   +  1
= 45`,
    },
    {
      type: 'heading',
      text: 'Hexadecimal (Base 16)',
    },
    {
      type: 'text',
      html: 'Hex uses 16 symbols: <strong>0–9 then A–F</strong> (A=10, B=11, C=12, D=13, E=14, F=15). Hex is popular because one hex digit represents exactly <strong>4 binary bits</strong>.',
    },
    {
      type: 'subheading',
      text: 'Binary ↔ Hex Shortcut (group into nibbles)',
    },
    {
      type: 'code',
      lang: 'text',
      code: `Binary:   1010  1111
Nibbles:  A     F
Hex:      AF

Verify:  A=10, F=15
10×16¹ + 15×16⁰ = 160 + 15 = 175 = 10101111₂`,
    },
    {
      type: 'subheading',
      text: 'Hex in C++ / Programming',
    },
    {
      type: 'code',
      lang: 'cpp',
      code: `#include <iostream>
using namespace std;

int main() {
    int dec = 175;
    cout << hex << dec << endl;    // prints: af
    cout << oct << dec << endl;    // prints: 257
    cout << dec << dec << endl;    // back to decimal: 175

    // Hex literals in C++
    int addr = 0xFF;   // = 255
    int mask = 0x0F;   // = 15

    cout << addr << endl;   // 255
    cout << mask << endl;   // 15
    return 0;
}`,
    },
    {
      type: 'heading',
      text: 'Octal (Base 8)',
    },
    {
      type: 'text',
      html: 'Octal uses digits <strong>0–7</strong>. One octal digit = 3 binary bits. In C++, octal literals start with <code>0</code> (e.g., <code>0755</code>).',
    },
    {
      type: 'code',
      lang: 'text',
      code: `Binary → Octal (group by 3 from right):
  Binary:   101  111
  Octal:    5    7  → 57₈

Verify: 5×8¹ + 7×8⁰ = 40 + 7 = 47₁₀`,
    },
    {
      type: 'note',
      variant: 'warn',
      text: 'In C++, a number starting with <code>0</code> is treated as <strong>octal</strong>! Writing <code>int x = 010;</code> gives x = 8, not 10. Always avoid leading zeros in integer literals unless you mean octal.',
    },
    {
      type: 'heading',
      text: 'Quick Conversion Table',
    },
    {
      type: 'code',
      lang: 'text',
      code: `Decimal  Binary   Octal   Hex
0        0000     0       0
1        0001     1       1
2        0010     2       2
3        0011     3       3
4        0100     4       4
5        0101     5       5
6        0110     6       6
7        0111     7       7
8        1000     10      8
9        1001     11      9
10       1010     12      A
11       1011     13      B
12       1100     14      C
13       1101     15      D
14       1110     16      E
15       1111     17      F`,
    },
    {
      type: 'note',
      variant: 'tip',
      text: 'You only need to <em>understand</em> conversions for now. In practice you\'ll use <code>hex</code>/<code>oct</code> manipulators in C++ or just trust the compiler. The key insight: all these systems represent the same numbers in different bases.',
    },
  ],
};
