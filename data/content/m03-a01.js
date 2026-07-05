/**
 * Module 3 · Article 1 — Why Data Types?
 * Primitive types: int, float, double, char, bool
 */
export default {
  id:          'm03-a01',
  moduleId:    3,
  n:           1,
  title:       'Why Data Types?',
  subtitle:    'Primitive types: int, float, double, char, bool',
  readMinutes: 10,
  blocks: [
    {
      type: 'heading',
      text: 'Why Does C++ Need Data Types?',
    },
    {
      type: 'text',
      html: 'A computer stores everything as bits. Without knowing what those bits <em>represent</em>, the CPU cannot do meaningful work. <strong>Data types</strong> tell the compiler two things: how many bytes to reserve in memory, and how to interpret those bytes.',
    },
    {
      type: 'list',
      items: [
        '<code>int age = 25;</code> — 4 bytes, treated as a whole number',
        '<code>float price = 9.99f;</code> — 4 bytes, treated as a decimal number',
        '<code>char grade = \'A\';</code> — 1 byte, treated as a character',
      ],
    },
    {
      type: 'note',
      variant: 'tip',
      text: 'Memory is finite. Choosing the right data type prevents wasted RAM and avoids overflow bugs. A temperature reading does not need 8 bytes — a <code>float</code> (4 bytes) is more than enough.',
    },

    {
      type: 'heading',
      text: 'int — Whole Numbers',
    },
    {
      type: 'text',
      html: '<code>int</code> stores integers — positive, negative, or zero. No decimal point. On most modern systems it occupies <strong>4 bytes</strong> and can hold values from <strong>−2,147,483,648 to 2,147,483,647</strong>.',
    },
    {
      type: 'code',
      lang: 'cpp',
      code: `#include <iostream>
using namespace std;

int main() {
    int rollno = 42;
    int temperature = -15;
    int score = 0;

    cout << rollno     << endl;   // 42
    cout << temperature << endl;  // -15
    cout << score       << endl;  // 0
    return 0;
}`,
    },
    {
      type: 'list',
      items: [
        'Use <code>int</code> for counts, indices, ages, IDs — anything that is always a whole number.',
        'Never use <code>int</code> for currency (rounding errors). Use <code>double</code> instead.',
        'Variants: <code>short</code> (2 bytes), <code>long</code> (4+ bytes), <code>long long</code> (8 bytes).',
      ],
    },

    {
      type: 'heading',
      text: 'float — Single-Precision Decimal',
    },
    {
      type: 'text',
      html: '<code>float</code> stores decimal numbers using 4 bytes (single-precision IEEE 754). It gives about <strong>6–7 significant decimal digits</strong> of precision.',
    },
    {
      type: 'code',
      lang: 'cpp',
      code: `float price  = 12.75f;   // the 'f' suffix marks it as float
float pi     = 3.14159f;
float weight = 72.5f;`,
    },
    {
      type: 'note',
      variant: 'warn',
      text: 'Always add the <code>f</code> suffix to float literals: <code>3.14f</code> not <code>3.14</code>. Without <code>f</code>, the compiler treats the literal as a <code>double</code> and may warn about narrowing conversion.',
    },

    {
      type: 'heading',
      text: 'double — Double-Precision Decimal',
    },
    {
      type: 'text',
      html: '<code>double</code> uses 8 bytes and provides about <strong>15–16 significant digits</strong> of precision — twice the precision of <code>float</code>. It is the default for decimal literals in C++.',
    },
    {
      type: 'code',
      lang: 'cpp',
      code: `double distance = 384400.0;    // Earth-Moon distance in km
double pi      = 3.14159265358979;
double balance = 1234567.89;`,
    },
    {
      type: 'text',
      html: 'Use <code>double</code> for scientific calculations, financial computations, and anywhere precision matters. <code>float</code> is only preferred when memory is constrained (e.g., large arrays of coordinates in games).',
    },

    {
      type: 'heading',
      text: 'char — A Single Character',
    },
    {
      type: 'text',
      html: '<code>char</code> stores a single character using <strong>1 byte</strong>. Internally it holds an integer — the <strong>ASCII code</strong> of the character. <code>\'A\'</code> is stored as 65, <code>\'a\'</code> as 97, <code>\'0\'</code> as 48.',
    },
    {
      type: 'code',
      lang: 'cpp',
      code: `char grade  = 'A';    // single quotes — NOT double quotes
char symbol = '+';
char digit  = '7';

cout << grade  << endl;       // A
cout << (int)grade << endl;   // 65  (the ASCII code)`,
    },
    {
      type: 'list',
      items: [
        'Use <strong>single quotes</strong> for char literals: <code>\'A\'</code> — not <code>"A"</code> (that is a string).',
        'ASCII: A–Z = 65–90, a–z = 97–122. Difference of 32 between cases.',
        'You can do arithmetic on <code>char</code>: <code>\'A\' + 1</code> gives <code>\'B\'</code> (66).',
      ],
    },

    {
      type: 'heading',
      text: 'bool — True or False',
    },
    {
      type: 'text',
      html: '<code>bool</code> holds one of two values: <code>true</code> or <code>false</code>. In memory it uses <strong>1 byte</strong>. Internally, <code>false</code> is 0 and <code>true</code> is any non-zero value (usually 1).',
    },
    {
      type: 'code',
      lang: 'cpp',
      code: `bool isLoggedIn = true;
bool hasError   = false;
bool isAdult    = (age >= 18);   // expression result is bool

cout << isLoggedIn << endl;      // prints 1 (true)
cout << hasError   << endl;      // prints 0 (false)
cout << boolalpha << isLoggedIn; // prints "true"`,
    },
    {
      type: 'note',
      variant: 'info',
      text: 'In C++, any non-zero integer is "truthy". So <code>if (5)</code> and <code>if (true)</code> both enter the branch. Zero is the only falsy integer.',
    },

    {
      type: 'heading',
      text: 'Type Summary Table',
    },
    {
      type: 'code',
      lang: 'cpp',
      code: `// Type         Size      Example value       Use for
// ──────────────────────────────────────────────────────
// int           4 bytes   42, -7, 0           whole numbers
// float         4 bytes   3.14f, -0.5f        decimals (lower precision)
// double        8 bytes   3.14159265358979    decimals (higher precision)
// char          1 byte    'A', '7', '$'       single characters
// bool          1 byte    true, false         flags and conditions`,
    },

    {
      type: 'qc',
      id:          'm03-a01-qc1',
      question:    'Which data type would you use to store a student\'s GPA (e.g., 3.75)?',
      options:     ['int', 'char', 'float or double', 'bool'],
      correct:     2,
      explanation: 'GPA is a decimal number. float or double are used for decimal values. int only stores whole numbers, char stores characters, bool stores true/false.',
    },

    {
      type: 'heading',
      text: 'Typecasting — Forcing a Type Change',
    },
    {
      type: 'text',
      html: 'Sometimes you need to temporarily treat a value as a different type. <strong>Typecasting</strong> does this explicitly.',
    },
    {
      type: 'code',
      lang: 'cpp',
      code: `int a = 10, b = 3;
float result;

result = a / b;           // both int → result is 3 (integer division!)
result = (float)a / b;    // cast a to float → result is 3.333...

cout << result << endl;   // 3.33333`,
    },
    {
      type: 'text',
      html: 'The expression <code>a / b</code> produces an integer result because both <code>a</code> and <code>b</code> are <code>int</code>. Assigning it to a <code>float</code> variable does not change the computation — only the storage. Casting <em>before</em> the division is what makes it floating-point.',
    },

    {
      type: 'qc',
      id:          'm03-a01-qc2',
      question:    'What will this code print?\n\nint a = 7, b = 2;\ncout << a / b;',
      options:     ['3.5', '3', '4', '3.0'],
      correct:     1,
      explanation: 'Both a and b are int, so / performs integer division — it discards the remainder. 7 / 2 = 3 (not 3.5). To get 3.5, you would need (float)a / b.',
    },
  ],
};
