/**
 * Module 1 · Article 3 — What is a Program?
 * Data + Instructions, languages, Compiler vs Interpreter
 * Has 2 Quick Checks (as per curriculum)
 */
export default {
  id:       'm01-a03',
  moduleId: 1,
  n:        3,
  title:    'What is a Program?',
  subtitle: 'Data + Instructions, Low/High Level Languages, Compiler vs Interpreter',
  readMinutes: 10,
  blocks: [
    {
      type: 'heading',
      text: 'A Program = Data + Instructions',
    },
    {
      type: 'text',
      html: 'A computer program is a set of <strong>instructions</strong> that tells the CPU what to do with <strong>data</strong>. Nothing more, nothing less.',
    },
    {
      type: 'list',
      items: [
        '<strong>Data</strong> — the information being processed: numbers, text, images.',
        '<strong>Instructions</strong> — operations to perform: add, compare, print, loop.',
      ],
    },
    {
      type: 'text',
      html: 'A recipe is a good analogy: the <em>ingredients</em> are the data; the <em>steps</em> are the instructions. The CPU is the chef.',
    },
    {
      type: 'heading',
      text: 'Low-Level vs High-Level Languages',
    },
    {
      type: 'text',
      html: 'Programming languages exist on a spectrum from "close to hardware" to "close to human language":',
    },
    {
      type: 'subheading',
      text: 'Machine Code (Lowest Level)',
    },
    {
      type: 'text',
      html: 'The CPU only understands <strong>machine code</strong> — raw binary instructions specific to its architecture.',
    },
    {
      type: 'code',
      lang: 'text',
      code: `// x86 machine code (hex) to add two numbers:
B8 05 00 00 00   ; MOV EAX, 5
BB 03 00 00 00   ; MOV EBX, 3
01 D8            ; ADD EAX, EBX`,
    },
    {
      type: 'text',
      html: 'No human writes this directly. It\'s what the compiler ultimately produces.',
    },
    {
      type: 'subheading',
      text: 'Assembly Language',
    },
    {
      type: 'text',
      html: 'Assembly is a thin human-readable wrapper over machine code. One assembly instruction = one machine instruction. Still hardware-specific.',
    },
    {
      type: 'code',
      lang: 'text',
      code: `MOV EAX, 5   ; put 5 into register EAX
MOV EBX, 3   ; put 3 into register EBX
ADD EAX, EBX ; EAX = EAX + EBX = 8`,
    },
    {
      type: 'subheading',
      text: 'High-Level Languages (C++, Python, Java…)',
    },
    {
      type: 'text',
      html: 'High-level languages are <strong>abstracted from hardware</strong>. The same C++ code runs on any machine (after compilation). This is what we write.',
    },
    {
      type: 'code',
      lang: 'cpp',
      code: `int a = 5;
int b = 3;
int sum = a + b;   // sum = 8`,
    },
    {
      type: 'text',
      html: 'High-level languages trade <em>raw performance</em> for <em>productivity and portability</em>. C++ is special: it\'s high-level yet gives near-machine-code performance.',
    },
    {
      type: 'heading',
      text: 'Compiler vs Interpreter',
    },
    {
      type: 'text',
      html: 'High-level code must be translated into machine code before the CPU can run it. There are two main approaches:',
    },
    {
      type: 'subheading',
      text: 'Compiler (C++, C, Rust, Go)',
    },
    {
      type: 'list',
      ordered: true,
      items: [
        'Takes your entire source file and translates it into an executable.',
        'Translation happens <strong>before</strong> you run the program.',
        'Result: a standalone executable (e.g., <code>a.out</code> or <code>hello.exe</code>).',
        'Errors are caught at compile time — before the program runs.',
        '<strong>Faster</strong> at runtime since translation is done once.',
      ],
    },
    {
      type: 'code',
      lang: 'text',
      code: `Source code  →  Compiler  →  Executable  →  CPU runs it
hello.cpp       g++          ./hello`,
    },
    {
      type: 'subheading',
      text: 'Interpreter (Python, JavaScript in browser, Ruby)',
    },
    {
      type: 'list',
      ordered: true,
      items: [
        'Translates and executes code <strong>line by line</strong> at runtime.',
        'No separate compilation step — run the source directly.',
        'Errors are found as each line is executed.',
        '<strong>Slower</strong> at runtime but often easier to debug interactively.',
      ],
    },
    {
      type: 'code',
      lang: 'text',
      code: `Source code  →  Interpreter  →  runs it directly
hello.py        python3       (no .exe created)`,
    },
    {
      type: 'note',
      variant: 'info',
      text: 'Some languages (Java, C#) use a <strong>hybrid</strong>: compiled to bytecode (intermediate), then run by a virtual machine (JVM / CLR) that interprets or JIT-compiles it. This gives portability with good performance.',
    },
    {
      type: 'qc',
      id: 'm01-a03-qc1',
      question: 'Which translation approach produces a standalone executable before the program runs?',
      options: [
        'Interpreter',
        'Compiler',
        'Virtual Machine',
        'Assembler',
      ],
      correct: 1,
      explanation: 'A compiler translates the entire source file into a machine-code executable ahead of time, before any execution happens.',
    },
    {
      type: 'heading',
      text: 'Why C++ Uses a Compiler',
    },
    {
      type: 'text',
      html: 'C++ is a <strong>compiled language</strong>. The compiler (like <code>g++</code>) checks your entire program for errors, optimises it heavily, and produces a fast executable. This is why:',
    },
    {
      type: 'list',
      items: [
        'C++ programs are very fast — the compiler can optimise across the whole program.',
        'Type errors are caught before you even run the program.',
        'The resulting executable has no dependency on a C++ runtime being installed.',
      ],
    },
    {
      type: 'subheading',
      text: 'The Full Build Process for C++',
    },
    {
      type: 'code',
      lang: 'text',
      code: `Source (.cpp)
   ↓  Preprocessor  (#include, #define expanded)
Preprocessed source
   ↓  Compiler      (C++ → assembly)
Assembly
   ↓  Assembler     (assembly → object code)
Object file (.o)
   ↓  Linker        (combines .o files + libraries)
Executable (./program)`,
    },
    {
      type: 'note',
      variant: 'tip',
      text: 'When you type <code>g++ hello.cpp -o hello</code>, all four steps (preprocess → compile → assemble → link) happen automatically. The <code>-o</code> flag names the output executable.',
    },
    {
      type: 'qc',
      id: 'm01-a03-qc2',
      question: 'A program crashes on line 42 at runtime. This error was caught by…',
      options: [
        'The compiler, before the program ran',
        'The interpreter / runtime, while the program was running',
        'The preprocessor',
        'The linker',
      ],
      correct: 1,
      explanation: 'A runtime crash happens while the program is executing — it got past compilation. The compiler would have caught syntax errors; the runtime catches logic errors and crashes.',
    },
  ],
};
