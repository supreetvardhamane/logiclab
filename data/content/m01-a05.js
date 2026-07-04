/**
 * Module 1 · Article 5 — Algorithms & Flowcharts
 * Pseudo-code, step-by-step thinking, program development
 */
export default {
  id:       'm01-a05',
  moduleId: 1,
  n:        5,
  title:    'Algorithms & Flowcharts',
  subtitle: 'Pseudo-code, step-by-step thinking, program development',
  readMinutes: 9,
  blocks: [
    {
      type: 'heading',
      text: 'What is an Algorithm?',
    },
    {
      type: 'text',
      html: 'An <strong>algorithm</strong> is a finite, ordered sequence of well-defined steps that solves a problem or accomplishes a task. The word comes from the 9th-century mathematician <em>al-Khwārizmī</em>.',
    },
    {
      type: 'text',
      html: 'A good algorithm has three properties:',
    },
    {
      type: 'list',
      items: [
        '<strong>Finite</strong> — it terminates after a finite number of steps.',
        '<strong>Unambiguous</strong> — every step is clear with exactly one meaning.',
        '<strong>Effective</strong> — each step is doable and produces a result.',
      ],
    },
    {
      type: 'note',
      variant: 'info',
      text: 'A recipe, directions to a location, and the steps to tie a shoelace are all algorithms. Before writing a single line of C++, professional programmers design the algorithm.',
    },
    {
      type: 'heading',
      text: 'Algorithm Example — Swap Two Numbers',
    },
    {
      type: 'text',
      html: 'Problem: Swap the values of variables A and B.',
    },
    {
      type: 'text',
      html: '<strong>Wrong attempt:</strong>',
    },
    {
      type: 'code',
      lang: 'text',
      code: `Step 1: A = B    // A is now 10 but we lost the original 5!
Step 2: B = A    // B = 10 (wrong!)`,
    },
    {
      type: 'text',
      html: '<strong>Correct — using a temporary variable:</strong>',
    },
    {
      type: 'code',
      lang: 'text',
      code: `Step 1: temp = A    // save A's value
Step 2: A = B        // overwrite A with B
Step 3: B = temp     // put A's original value into B`,
    },
    {
      type: 'text',
      html: 'This maps directly to C++:',
    },
    {
      type: 'code',
      lang: 'cpp',
      code: `int A = 5, B = 10, temp;
temp = A;   // Step 1
A = B;      // Step 2
B = temp;   // Step 3
// A = 10, B = 5 ✓`,
    },
    {
      type: 'heading',
      text: 'Pseudo-code',
    },
    {
      type: 'text',
      html: '<strong>Pseudo-code</strong> is a way to write algorithms in plain English-like notation — no strict syntax, but structured enough to translate directly into any programming language.',
    },
    {
      type: 'text',
      html: 'Example: Find the largest of two numbers.',
    },
    {
      type: 'code',
      lang: 'text',
      code: `INPUT A, B
IF A > B THEN
    OUTPUT "A is larger"
ELSE IF B > A THEN
    OUTPUT "B is larger"
ELSE
    OUTPUT "They are equal"
END IF`,
    },
    {
      type: 'subheading',
      text: 'Pseudo-code Best Practices',
    },
    {
      type: 'list',
      items: [
        'Use capital keywords: INPUT, OUTPUT, IF, THEN, ELSE, WHILE, FOR, END.',
        'Indent nested blocks.',
        'Focus on logic, not syntax — no semicolons or braces needed.',
        'One operation per line.',
      ],
    },
    {
      type: 'heading',
      text: 'Flowcharts',
    },
    {
      type: 'text',
      html: 'A <strong>flowchart</strong> is a visual diagram of an algorithm using standardised shapes:',
    },
    {
      type: 'list',
      items: [
        '<strong>Oval / Rounded rectangle</strong> — Start / End (terminator)',
        '<strong>Rectangle</strong> — Process / Action (e.g., x = x + 1)',
        '<strong>Diamond</strong> — Decision (Yes/No branch, e.g., "Is x > 0?")',
        '<strong>Parallelogram</strong> — Input / Output (cin / cout)',
        '<strong>Arrow</strong> — Flow direction',
      ],
    },
    {
      type: 'subheading',
      text: 'Flowchart: Find Max of Two Numbers',
    },
    {
      type: 'code',
      lang: 'text',
      code: `   [START]
      |
   [INPUT A, B]
      |
   <Is A > B?>
   /          \\
 YES           NO
  |             |
[Print A]   [Is B > A?]
              /       \\
            YES        NO
             |          |
         [Print B]  [Print "Equal"]
              \\      /
               \\    /
              [END]`,
    },
    {
      type: 'heading',
      text: 'Program Development Process',
    },
    {
      type: 'text',
      html: 'Professional C++ developers follow a systematic process — not just "start typing code":',
    },
    {
      type: 'list',
      ordered: true,
      items: [
        '<strong>Understand the problem</strong> — What are the inputs? What are the expected outputs? What are the constraints?',
        '<strong>Design the algorithm</strong> — Write pseudo-code or draw a flowchart. Trace through examples by hand.',
        '<strong>Write the code</strong> — Translate the algorithm into C++.',
        '<strong>Compile</strong> — Fix syntax errors. If the compiler complains, read the error message carefully.',
        '<strong>Test</strong> — Run with known inputs and verify outputs. Test edge cases (0, negative, empty).',
        '<strong>Debug</strong> — If output is wrong, trace the logic. Add print statements to inspect variables.',
        '<strong>Refine</strong> — Improve readability, add comments, optimise if needed.',
      ],
    },
    {
      type: 'note',
      variant: 'tip',
      text: 'Beginners often skip steps 1–2 and go straight to typing. This leads to more bugs and wasted time. Spending 5 minutes planning saves 30 minutes debugging.',
    },
    {
      type: 'heading',
      text: 'Algorithm Analysis — Big Picture',
    },
    {
      type: 'text',
      html: 'Not all algorithms that solve the same problem are equally good. We evaluate them by:',
    },
    {
      type: 'list',
      items: [
        '<strong>Correctness</strong> — Does it produce the right output for all valid inputs?',
        '<strong>Efficiency (Time)</strong> — How many steps does it take as input size grows?',
        '<strong>Efficiency (Space)</strong> — How much memory does it use?',
        '<strong>Readability</strong> — Can another programmer understand it?',
      ],
    },
    {
      type: 'text',
      html: 'In future modules you\'ll learn Big-O notation to formally measure algorithm efficiency. For now, just start thinking about <em>"Is there a simpler or faster way to solve this?"</em>',
    },
  ],
};
