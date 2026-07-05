/**
 * Module 3 · Article 2 — Variables
 * Declaration, initialization, naming rules
 */
export default {
  id:          'm03-a02',
  moduleId:    3,
  n:           2,
  title:       'Variables',
  subtitle:    'Declaration, initialization, and naming rules',
  readMinutes: 8,
  blocks: [
    {
      type: 'heading',
      text: 'What is a Variable?',
    },
    {
      type: 'text',
      html: 'A <strong>variable</strong> is a named storage location in memory. When you declare a variable, you are asking the OS to reserve a chunk of RAM and give it a name so you can refer to it in your code. The type you choose determines how large that chunk is.',
    },
    {
      type: 'code',
      lang: 'cpp',
      code: `int age;        // reserves 4 bytes, names it "age"
age = 25;       // stores 25 in those 4 bytes`,
    },
    {
      type: 'text',
      html: 'Every variable has three attributes: its <strong>name</strong> (identifier), its <strong>type</strong> (what it stores), and its <strong>value</strong> (what is currently in those bytes).',
    },

    {
      type: 'heading',
      text: 'Declaration vs Initialization',
    },
    {
      type: 'text',
      html: '<strong>Declaration</strong> reserves memory. <strong>Initialization</strong> sets the first value. You can do both at the same time or separately.',
    },
    {
      type: 'code',
      lang: 'cpp',
      code: `// Declaration only — value is garbage (unpredictable)!
int x;

// Declaration + initialization (preferred)
int y = 10;
float price = 9.99f;
char grade = 'A';
bool active = true;

// Multiple variables of the same type (one line)
int a = 1, b = 2, c = 3;`,
    },
    {
      type: 'note',
      variant: 'warn',
      text: 'An uninitialized variable contains <strong>garbage</strong> — whatever bytes happened to be in that memory location. Reading an uninitialized variable is undefined behaviour. Always initialize before use.',
    },

    {
      type: 'heading',
      text: 'Constants — Variables That Cannot Change',
    },
    {
      type: 'text',
      html: 'Add the <code>const</code> keyword to make a variable read-only. The compiler will reject any attempt to change it. Use <code>const</code> for values that should never change — PI, tax rates, speed of light.',
    },
    {
      type: 'code',
      lang: 'cpp',
      code: `const float PI = 3.14159f;
const int MAX_STUDENTS = 60;

PI = 3;   // ERROR: assignment of read-only variable 'PI'`,
    },
    {
      type: 'note',
      variant: 'tip',
      text: 'By convention, constant names are written in <code>UPPER_SNAKE_CASE</code>. This signals to every reader that the value never changes.',
    },

    {
      type: 'heading',
      text: 'Naming Rules — What is Valid?',
    },
    {
      type: 'text',
      html: 'The C++ standard defines strict rules for identifiers (variable names, function names, etc.):',
    },
    {
      type: 'list',
      items: [
        'Must start with a <strong>letter</strong> (a–z, A–Z) or an <strong>underscore</strong> (_).',
        'Can contain letters, digits (0–9), and underscores — nothing else.',
        'Case-sensitive: <code>Score</code>, <code>score</code>, and <code>SCORE</code> are three different names.',
        'Cannot be a C++ keyword: <code>int</code>, <code>if</code>, <code>return</code>, <code>class</code>, etc.',
        'No spaces allowed in a name.',
      ],
    },
    {
      type: 'code',
      lang: 'cpp',
      code: `// ✓ VALID names
int rollno;
int roll_no;       // snake_case
int rollNo;        // camelCase
int RollNo;        // PascalCase
int _internal;     // leading underscore (valid, but avoid — reserved by standard)
int x1, y2;        // letters then digits

// ✗ INVALID names
int 1x;            // ERROR: cannot start with digit
int roll no;       // ERROR: spaces not allowed
int int;           // ERROR: 'int' is a keyword
int my-var;        // ERROR: hyphen not allowed`,
    },

    {
      type: 'heading',
      text: 'Naming Conventions (Best Practice)',
    },
    {
      type: 'text',
      html: 'Rules are enforced by the compiler. Conventions are agreed habits that make code readable:',
    },
    {
      type: 'list',
      items: [
        '<strong>camelCase</strong> for local variables and function names: <code>studentAge</code>, <code>calculateArea()</code>',
        '<strong>PascalCase</strong> for class names: <code>BankAccount</code>, <code>StudentRecord</code>',
        '<strong>UPPER_SNAKE_CASE</strong> for constants: <code>MAX_SIZE</code>, <code>PI</code>',
        'Be <strong>descriptive</strong>: <code>studentAge</code> is better than <code>a</code>. <code>totalPrice</code> is better than <code>tp</code>.',
        'Avoid abbreviations unless they are universally understood (<code>id</code>, <code>url</code>, <code>i</code> for loop indices).',
      ],
    },

    {
      type: 'qc',
      id:          'm03-a02-qc1',
      question:    'Which of the following is a valid C++ variable name?',
      options:     ['2ndScore', 'student-name', '_totalCount', 'class'],
      correct:     2,
      explanation: '_totalCount is valid — it starts with an underscore, followed by letters. 2ndScore starts with a digit (invalid), student-name uses a hyphen (invalid), and class is a C++ keyword (invalid).',
    },

    {
      type: 'heading',
      text: 'Scope — Where a Variable Lives',
    },
    {
      type: 'text',
      html: 'A variable only exists within the <strong>block</strong> (pair of curly braces) where it was declared. This is called <strong>scope</strong>. When execution leaves that block, the variable is destroyed.',
    },
    {
      type: 'code',
      lang: 'cpp',
      code: `int main() {
    int x = 10;     // x is alive from here...

    {
        int y = 20; // y is alive only inside this inner block
        cout << x;  // OK — x is in scope
        cout << y;  // OK — y is in scope
    }               // y is destroyed here

    cout << x;      // OK — x still in scope
    // cout << y;   // ERROR — y is out of scope
    return 0;
}   // x is destroyed here`,
    },
    {
      type: 'text',
      html: 'A variable declared directly inside <code>main()</code> is a <strong>local variable</strong>. A variable declared outside all functions is a <strong>global variable</strong> — it lives for the entire program duration. Prefer local variables; global variables make code harder to reason about.',
    },

    {
      type: 'heading',
      text: 'Assignment & Re-assignment',
    },
    {
      type: 'code',
      lang: 'cpp',
      code: `int score = 0;      // initialized to 0
score = 50;         // re-assigned to 50
score = score + 10; // use current value, add 10, store result: 60
cout << score;      // prints 60`,
    },
    {
      type: 'text',
      html: 'The <code>=</code> sign is the <strong>assignment operator</strong> — not equality. It takes the value on the right and stores it in the variable on the left. The right side is evaluated first.',
    },

    {
      type: 'qc',
      id:          'm03-a02-qc2',
      question:    'What is printed by this code?\n\nint x = 5;\nx = x * 2;\ncout << x;',
      options:     ['5', '10', '2', 'Error'],
      correct:     1,
      explanation: 'x starts at 5. x = x * 2 evaluates the right side first (5 * 2 = 10), then assigns 10 to x. cout << x prints 10.',
    },
  ],
};
