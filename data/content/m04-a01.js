/**
 * Module 4 · Article 1 — Arithmetic & Compound Assignment
 * +, -, *, /, %, +=, -=, *=, /=, %=
 */
export default {
  id:          'm04-a01',
  moduleId:    4,
  n:           1,
  title:       'Arithmetic & Compound Assignment',
  subtitle:    '+, -, *, /, %, +=, -=, *=, /=, %=',
  readMinutes: 10,
  blocks: [
    {
      type: 'heading',
      text: 'Arithmetic Operators',
    },
    {
      type: 'text',
      html: 'C++ supports five arithmetic operators. They work on numeric types (<code>int</code>, <code>float</code>, <code>double</code>, <code>char</code>) and produce a result of the <strong>larger type</strong> in the expression.',
    },
    {
      type: 'code',
      lang: 'cpp',
      code: `#include <iostream>
using namespace std;

int main() {
    int a = 13, b = 5;

    cout << a + b << endl;  // 18  — addition
    cout << a - b << endl;  // 8   — subtraction
    cout << a * b << endl;  // 65  — multiplication
    cout << a / b << endl;  // 2   — integer division (quotient only!)
    cout << a % b << endl;  // 3   — modulo (remainder)
    return 0;
}`,
    },

    {
      type: 'heading',
      text: 'Integer Division — The Most Common Gotcha',
    },
    {
      type: 'text',
      html: 'When <strong>both operands are integers</strong>, <code>/</code> performs <strong>integer division</strong> — it discards the fractional part entirely. This is not rounding; it is truncation toward zero.',
    },
    {
      type: 'code',
      lang: 'cpp',
      code: `int a = 10, b = 3;
cout << a / b << endl;          // 3  (not 3.333...)

float result = a / b;           // STILL 3! Division happens first (int÷int=int),
                                // then 3 is converted to float 3.0

float correct = (float)a / b;  // 3.333...  — cast a to float BEFORE dividing
float also_ok = a / (float)b;  // also 3.333...`,
    },
    {
      type: 'note',
      variant: 'warn',
      text: 'Assigning an integer division result to a <code>float</code> variable does <strong>not</strong> fix the problem. The division already happened as integer math. Always cast at least one operand to <code>float</code> or <code>double</code> before the division.',
    },

    {
      type: 'heading',
      text: 'Modulo (%) — The Remainder Operator',
    },
    {
      type: 'text',
      html: '<code>%</code> returns the remainder after integer division. It is one of the most useful operators in programming — used for cycling, checking even/odd, and extracting digits.',
    },
    {
      type: 'code',
      lang: 'cpp',
      code: `cout << 10 % 3  << endl;  // 1  (10 = 3*3 + 1)
cout << 20 % 5  << endl;  // 0  (divisible exactly)
cout << 7  % 2  << endl;  // 1  (odd number check)
cout << 15 % 10 << endl;  // 5  (extract last digit)

// Even/odd check
int n = 42;
if (n % 2 == 0) cout << "even";
else            cout << "odd";`,
    },
    {
      type: 'note',
      variant: 'warn',
      text: '<code>%</code> only works with <strong>integer types</strong> (<code>int</code>, <code>char</code>, <code>long</code>, etc.). Using it on <code>float</code> or <code>double</code> is a compile error. For floating-point remainder, use <code>fmod()</code> from <code>&lt;cmath&gt;</code>.',
    },

    {
      type: 'heading',
      text: 'Operator Precedence & Parentheses',
    },
    {
      type: 'text',
      html: 'Operators follow the same BODMAS/PEMDAS rules as algebra. <code>*</code>, <code>/</code>, <code>%</code> have higher precedence than <code>+</code> and <code>-</code>. Operators of the same precedence are evaluated left-to-right.',
    },
    {
      type: 'code',
      lang: 'cpp',
      code: `int result;
result = 2 + 3 * 4;      // 14  (not 20 — * before +)
result = (2 + 3) * 4;    // 20  — parentheses force order
result = 10 - 4 - 2;     // 4   — left-to-right: (10-4)-2
result = 10 % 3 + 1;     // 2   — (10%3) + 1 = 1 + 1 = 2`,
    },
    {
      type: 'text',
      html: 'The data type of an expression is determined by the <strong>largest type</strong> in the expression. <code>int + float</code> gives <code>float</code>; <code>int + double</code> gives <code>double</code>.',
    },
    {
      type: 'code',
      lang: 'cpp',
      code: `int   x = 10;
float y = 3.0f;
auto  z = x + y;   // z is float (10.0f + 3.0f = 13.0f)`,
    },

    {
      type: 'qc',
      id:          'm04-a01-qc1',
      question:    'What is the output of: cout << 17 % 5;',
      options:     ['3', '2', '3.4', '0'],
      correct:     1,
      explanation: '17 ÷ 5 = 3 remainder 2. The % operator returns the remainder, so 17 % 5 = 2.',
    },

    {
      type: 'heading',
      text: 'Compound Assignment Operators',
    },
    {
      type: 'text',
      html: '<strong>Compound assignment</strong> operators combine an arithmetic operation with assignment into one shorthand. They make code more concise and are extremely common in loops.',
    },
    {
      type: 'code',
      lang: 'cpp',
      code: `int x = 10;

x += 5;    // x = x + 5  → x is 15
x -= 3;    // x = x - 3  → x is 12
x *= 2;    // x = x * 2  → x is 24
x /= 4;    // x = x / 4  → x is 6
x %= 4;    // x = x % 4  → x is 2`,
    },
    {
      type: 'text',
      html: 'These also work with <code>&lt;&lt;=</code>, <code>&gt;&gt;=</code>, <code>&amp;=</code>, <code>|=</code>, <code>^=</code> for bitwise operations. The pattern is always: <em>variable</em> <em>op</em>= <em>value</em> means <em>variable</em> = <em>variable</em> <em>op</em> <em>value</em>.',
    },

    {
      type: 'heading',
      text: 'Real Example — Running Total',
    },
    {
      type: 'code',
      lang: 'cpp',
      code: `#include <iostream>
using namespace std;

int main() {
    double total = 0.0;
    double price;

    cout << "Enter 3 prices:" << endl;
    for (int i = 0; i < 3; i++) {
        cin >> price;
        total += price;    // accumulate: same as total = total + price
    }

    double average = total / 3.0;
    cout << "Total:   " << total   << endl;
    cout << "Average: " << average << endl;
    return 0;
}`,
    },

    {
      type: 'heading',
      text: 'Net Salary Example',
    },
    {
      type: 'code',
      lang: 'cpp',
      code: `#include <iostream>
using namespace std;

int main() {
    double gross;
    cout << "Enter gross salary: ";
    cin >> gross;

    double tax       = gross * 0.10;   // 10% tax
    double insurance = gross * 0.05;   // 5% insurance
    double net       = gross - tax - insurance;

    cout << "Net salary: " << net << endl;
    return 0;
}`,
    },

    {
      type: 'qc',
      id:          'm04-a01-qc2',
      question:    'What is the value of x after this code?\n\nint x = 20;\nx -= 5;\nx *= 2;',
      options:     ['25', '30', '35', '40'],
      correct:     1,
      explanation: 'x starts at 20. x -= 5 → x = 20 - 5 = 15. x *= 2 → x = 15 * 2 = 30.',
    },
  ],
};
