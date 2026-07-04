/**
 * Module 1 · Article 1 — How Computers Work
 * CPU, memory, binary data, 0s & 1s
 */
export default {
  id:       'm01-a01',
  moduleId: 1,
  n:        1,
  title:    'How Computers Work',
  subtitle: 'CPU, memory, binary data, 0s & 1s',
  readMinutes: 8,
  blocks: [
    {
      type: 'heading',
      text: 'What Is a Computer?',
    },
    {
      type: 'text',
      html: 'At its core, a computer is a machine that processes <strong>data</strong> using a set of <strong>instructions</strong>. Everything a computer does — from playing a video to running a C++ program — boils down to these two things.',
    },
    {
      type: 'text',
      html: 'A modern computer has four major hardware components working together:',
    },
    {
      type: 'list',
      items: [
        '<strong>CPU (Central Processing Unit)</strong> — the "brain". Executes instructions, performs arithmetic and logic.',
        '<strong>RAM (Random Access Memory)</strong> — short-term working memory. Holds the program and data while it runs.',
        '<strong>Storage (HDD / SSD)</strong> — long-term memory. Keeps files and programs even when power is off.',
        '<strong>I/O Devices</strong> — keyboard, monitor, mouse, network card — for input and output.',
      ],
    },
    {
      type: 'heading',
      text: 'Inside the CPU',
    },
    {
      type: 'text',
      html: 'The CPU contains smaller components that work in concert:',
    },
    {
      type: 'list',
      items: [
        '<strong>ALU (Arithmetic Logic Unit)</strong> — performs addition, subtraction, comparisons.',
        '<strong>CU (Control Unit)</strong> — decodes instructions and directs all other units.',
        '<strong>Registers</strong> — tiny ultra-fast storage inside the CPU (e.g., EAX, EBX on x86).',
        '<strong>Cache</strong> — L1/L2/L3: fast memory between CPU and RAM. Speeds up repeated data access.',
        '<strong>Clock</strong> — pulses billions of times per second (GHz). Each pulse = one CPU cycle.',
      ],
    },
    {
      type: 'note',
      variant: 'info',
      text: 'A 3 GHz CPU can execute about 3 billion cycles per second. Modern CPUs do multiple operations per cycle using <em>pipelining</em> and multiple cores.',
    },
    {
      type: 'heading',
      text: 'The Fetch–Decode–Execute Cycle',
    },
    {
      type: 'text',
      html: 'Every instruction in your program goes through three steps inside the CPU:',
    },
    {
      type: 'list',
      ordered: true,
      items: [
        '<strong>Fetch</strong> — The CU reads the next instruction from RAM (pointed to by the Program Counter).',
        '<strong>Decode</strong> — The CU figures out what the instruction means (e.g. "add two numbers").',
        '<strong>Execute</strong> — The ALU or other unit performs the operation and stores the result.',
      ],
    },
    {
      type: 'text',
      html: 'This cycle repeats millions of times per second — for every line your C++ program runs.',
    },
    {
      type: 'heading',
      text: 'Memory Hierarchy',
    },
    {
      type: 'text',
      html: 'Storage in a computer is organised from fastest/smallest to slowest/largest:',
    },
    {
      type: 'list',
      ordered: true,
      items: [
        '<strong>Registers</strong> — inside CPU, &lt;1 ns, bytes',
        '<strong>L1 Cache</strong> — inside CPU, ~1 ns, 32–64 KB',
        '<strong>L2 Cache</strong> — inside CPU, ~5 ns, 256 KB – 1 MB',
        '<strong>RAM</strong> — ~100 ns, GBs',
        '<strong>SSD</strong> — ~100 µs, TBs',
        '<strong>HDD</strong> — ~10 ms, TBs',
      ],
    },
    {
      type: 'note',
      variant: 'tip',
      text: 'When you declare <code>int x = 5;</code> in C++, x lives in <strong>RAM</strong> (or a register when optimised). When your program ends, that value is gone — this is why you need files or databases for permanent storage.',
    },
    {
      type: 'heading',
      text: 'Binary Data — Why 0s and 1s?',
    },
    {
      type: 'text',
      html: 'Computers use binary (base-2) because transistors — the tiny switches inside chips — have two reliable states: <strong>ON (1) and OFF (0)</strong>. This maps perfectly to electrical voltage levels.',
    },
    {
      type: 'list',
      items: [
        '<strong>Bit</strong> — a single 0 or 1.',
        '<strong>Byte</strong> — 8 bits. Can represent 2<sup>8</sup> = 256 different values (0–255).',
        '<strong>Kilobyte (KB)</strong> — 1024 bytes. A short text file.',
        '<strong>Megabyte (MB)</strong> — 1024 KB. A small image.',
        '<strong>Gigabyte (GB)</strong> — 1024 MB. A movie.',
      ],
    },
    {
      type: 'subheading',
      text: 'How is the letter "A" stored?',
    },
    {
      type: 'text',
      html: 'Computers use <strong>ASCII</strong> (or Unicode) to map characters to numbers. The letter <code>"A"</code> is ASCII code <strong>65</strong>, which in binary is <code>01000001</code> — exactly 8 bits (1 byte).',
    },
    {
      type: 'subheading',
      text: 'How are images stored?',
    },
    {
      type: 'text',
      html: 'Each pixel in a colour image stores three values: Red, Green, Blue — each 0–255 (1 byte). A 1920×1080 image has ~2 million pixels × 3 bytes = ~6 MB of raw data.',
    },
    {
      type: 'note',
      variant: 'tip',
      text: 'Everything on a computer — numbers, text, images, sound, programs — is ultimately stored as 0s and 1s. The difference lies only in how those bits are <em>interpreted</em>.',
    },
  ],
};
