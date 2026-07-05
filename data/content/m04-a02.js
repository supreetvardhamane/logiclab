/**
 * Module 4 · Article 2 — Relational & Logical Operators
 * ==, !=, <, >, <=, >=, &&, ||, !
 */
export default {
  id:          'm04-a02',
  moduleId:    4,
  n:           2,
  title:       'Relational & Logical Operators',
  subtitle:    '==, !=, <, >, <=, >=, &&, ||, !',
  readMinutes: 9,
  blocks: [
    {
      type: 'heading',
      text: 'Relational Operators — Comparing Values',
    },
    {
      type: 'text',
      html: '<strong>Relational operators</strong> compare two values and produce a <code>bool</code> result: <code>true</code> (1) or <code>false</code> (0). They are the foundation of every <code>if</code> statement and loop condition.',
    },
    {
      type: 'code',
      lang: 'cpp',
      code: `int a = 10, b = 5;

cout << (a == b) << endl;   // 0  — equal to?        10 == 5 → false
cout << (a != b) << endl;   // 1  — not equal?        10 != 5 → true
cout << (a >  b) << endl;   // 1  — greater than?     10 > 5  → true
cout << (a <  b) << endl;   // 0  — less than?        10 < 5  → false
cout << (a >= b) << endl;   // 1  — greater or equal? 10 >= 5 → true
cout << (a <= b) << endl;   // 0  — less or equal?    10 <= 5 → false`,
    },
    {
      type: 'note',
      variant: 'warn',
      text: '<strong>= is assignment, == is comparison.</strong> Writing <code>if (x = 5)</code> assigns 5 to x (always true!) instead of checking if x equals 5. This is one of the most common C++ bugs. Always use <code>==</code> inside conditions.',
    },

    {
      type: 'heading',
      text: 'Using Relational Operators in Conditions',
    },
    {
      type: 'code',
      lang: 'cpp',
      code: `int age;
cin >> age;

if (age >= 18) {
    cout << "Adult" << endl;
} else {
    cout << "Minor" << endl;
}

// Checking a range — two separate comparisons (NOT: 10 < x < 20)
int x = 15;
if (x > 10 && x < 20) {
    cout << "x is between 10 and 20" << endl;
}`,
    },
    {
      type: 'note',
      variant: 'warn',
      text: 'In C++ you <strong>cannot</strong> write <code>10 &lt; x &lt; 20</code> to check a range. This parses as <code>(10 &lt; x) &lt; 20</code> — comparing a bool (0 or 1) to 20 — which is always true. Use <code>x &gt; 10 &amp;&amp; x &lt; 20</code>.',
    },

    {
      type: 'heading',
      text: 'Logical Operators — Combining Conditions',
    },
    {
      type: 'text',
      html: '<strong>Logical operators</strong> combine boolean expressions. They let you check multiple conditions in a single <code>if</code> statement.',
    },
    {
      type: 'code',
      lang: 'cpp',
      code: `// && (AND) — true only if BOTH sides are true
bool result1 = (5 > 3) && (10 > 7);   // true && true  → true
bool result2 = (5 > 3) && (10 < 7);   // true && false → false

// || (OR) — true if AT LEAST ONE side is true
bool result3 = (5 < 3) || (10 > 7);   // false || true → true
bool result4 = (5 < 3) || (10 < 7);   // false || false → false

// ! (NOT) — flips true to false and vice versa
bool result5 = !(5 > 3);   // !(true) → false
bool result6 = !(5 < 3);   // !(false) → true`,
    },

    {
      type: 'heading',
      text: 'Truth Tables',
    },
    {
      type: 'code',
      lang: 'cpp',
      code: `// AND (&&) truth table
// A       B       A && B
// false   false   false
// false   true    false
// true    false   false
// true    true    true   ← only this case is true

// OR (||) truth table
// A       B       A || B
// false   false   false  ← only this case is false
// false   true    true
// true    false   true
// true    true    true

// NOT (!) truth table
// A       !A
// false   true
// true    false`,
    },

    {
      type: 'qc',
      id:          'm04-a02-qc1',
      question:    'What does this expression evaluate to?\n\n(3 > 1) && (5 < 3)',
      options:     ['true', 'false', '1', 'Error'],
      correct:     1,
      explanation: '(3 > 1) is true. (5 < 3) is false. true && false = false. Both sides must be true for && to give true — one false makes the whole AND false.',
    },

    {
      type: 'heading',
      text: 'Short-Circuit Evaluation',
    },
    {
      type: 'text',
      html: 'C++ evaluates logical expressions <strong>lazily</strong>: it stops as soon as the result is determined. This is called <strong>short-circuit evaluation</strong>.',
    },
    {
      type: 'list',
      items: [
        '<code>&amp;&amp;</code> — if the left side is <code>false</code>, the right side is <strong>never evaluated</strong> (result is already false).',
        '<code>||</code> — if the left side is <code>true</code>, the right side is <strong>never evaluated</strong> (result is already true).',
      ],
    },
    {
      type: 'code',
      lang: 'cpp',
      code: `int x = 0;

// Safe division — checks divisor BEFORE dividing
if (x != 0 && 10 / x > 2) {   // if x == 0, division is never reached
    cout << "result > 2";
}

// Guard against null pointer — check before dereferencing
int* ptr = nullptr;
if (ptr != nullptr && *ptr > 0) {   // *ptr never accessed if ptr is null
    cout << "positive";
}`,
    },
    {
      type: 'text',
      html: 'Short-circuit evaluation is not just an optimization — it is a deliberate feature used to prevent crashes (division by zero, null pointer access). Put the cheaper or safer check on the left.',
    },

    {
      type: 'heading',
      text: 'Combining Relational and Logical Operators',
    },
    {
      type: 'code',
      lang: 'cpp',
      code: `int age = 20, income = 30000;
bool hasID = true;

// Voter eligibility: must be adult AND (have income OR have ID)
if (age >= 18 && (income > 0 || hasID)) {
    cout << "Eligible to vote" << endl;
}

// Login validation: username AND password both non-empty
string user = "alice", pass = "secret";
if (!user.empty() && !pass.empty()) {
    cout << "Credentials provided" << endl;
}`,
    },

    {
      type: 'heading',
      text: 'Truthy and Falsy Values',
    },
    {
      type: 'text',
      html: 'In C++, <code>false</code> is exactly 0, and <strong>any non-zero value is treated as <code>true</code></strong>. This means integers, chars, and pointers can appear in boolean contexts:',
    },
    {
      type: 'code',
      lang: 'cpp',
      code: `int n = 5;
if (n)         cout << "truthy";    // true — n is non-zero
if (!n)        cout << "falsy";     // false
if (n == 0)    cout << "zero";      // false

// Common idiom: check if a pointer is valid
int* ptr = getSomePointer();
if (ptr) {   // equivalent to: if (ptr != nullptr)
    cout << *ptr;
}`,
    },

    {
      type: 'qc',
      id:          'm04-a02-qc2',
      question:    'In C++, what does "short-circuit evaluation" mean for the && operator?',
      options:     [
        'Both sides are always evaluated in parallel',
        'If the left side is false, the right side is skipped',
        'If the left side is true, the right side is skipped',
        'The compiler optimizes away the entire expression',
      ],
      correct:     1,
      explanation: 'For &&, if the left operand is false, the whole expression must be false regardless of the right side. C++ skips evaluating the right side entirely. This allows safe patterns like: ptr != nullptr && *ptr > 0.',
    },
  ],
};
