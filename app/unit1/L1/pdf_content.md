
# Unit 1 Lecture 1: PDF Content Draft

This content is structured for slides. You can copy and paste the text directly.

---

## **Slide 1: Introduction to C Programming**

**Heading:** The Mother of All Languages

**Detailed Text:**
C is a general-purpose, high-level structural programming language originally developed to write the UNIX operating system. It acts as a bridge between the software and the hardware, which is why it is often called a **"Middle-Level Language."**

It combines the elements of high-level languages (easy for humans to read/write) with the functionalism of assembly language (low-level direct memory access). This unique capability allows C to be used for:
*   **System Software:** Operating Systems (Windows, Linux, macOS), Compilers, and Drivers.
*   **Application Software:** Databases (MySQL), Graphic packages, and Desktop apps.
*   **Embedded Systems:** Microcontrollers in cars, washing machines, and robotics.

**Key Features:**
1.  **Robust:** It has a rich set of built-in functions and operators.
2.  **Efficient:** C programs run significantly faster than Java or Python because there is less "overhead" (extra processing) between your code and the hardware.
3.  **Portable:** C is machine-independent. A code written on one computer can be compiled and run on many other different types of computers with little to no modification.
4.  **Structured:** It breaks large, complex problems into smaller, manageable sub-problems called "Functions."

**[Image Prompt]**
> *A conceptual illustration showing "C Language" as the massive root system of a tree. The trunk leads up to branches labeled "UNIX", "Windows", and "Linux", and smaller branches labeled "Python", "C++", "Java", and "JavaScript", signifying that C supports them all.*

---

## **Slide 2: History & Evolution**

**Heading:** The Origin Story (1972)

**Detailed Text:**
The story of C is closely tied to the creation of the **UNIX** operating system. In the 1960s, existing languages like ALGOL were too abstract for system programming, while Assembly was too tedious and tied to specific hardware.

**The Timeline of Evolution:**
*   **1960 - ALGOL (Algorithmic Language):** Introduced the concept of structured programming but was too abstract for hardware control.
*   **1967 - BCPL (Basic Combined Programming Language):** Developed by **Martin Richards** at Cambridge. It was a typeless language meant for writing system software.
*   **1970 - B Language:** Created by **Ken Thompson** at Bell Labs. It was a simplified version of BCPL used to create the early versions of UNIX. However, it was interpreted (slow) and lacked data types.
*   **1972 - C Language:** **Dennis Ritchie** at **Bell Laboratories (AT&T)** improved B by adding **Data Types** (like `int`, `char`, `float`) and compiling capabilities. This became C.

**Standardization:**
*   **K&R C (1978):** The classic version defined in the book "The C Programming Language" by Brian Kernighan and Dennis Ritchie.
*   **ANSI C (1989):** The American National Standards Institute formally standardized the language (also known as C89), establishing the version widely used today.

**[Image Prompt]**
> *A timeline infographic going from left to right: "ALGOL (1960)" → "BCPL (1967)" → "B Language (1970)" → "C Language (1972)". Under "C Language", show a photo or sketch of Dennis Ritchie.*

---

## **Slide 3: The C Character Set**

**Heading:** The Building Blocks

**Detailed Text:**
Before expanding into words and sentences, every language needs an alphabet. In C, this "alphabet" is called the **Character Set**. These are the only characters the C compiler can recognize and process.

**1. Letters:**
*   Uppercase: `A` to `Z`
*   Lowercase: `a` to `z`
*   *Note: C is **Case Sensitive**, meaning 'Total' and 'total' are treated as different names.*

**2. Digits:**
*   `0` through `9`

**3. Special Characters:**
*   Symbols used for logic and formatting: `,` `.` `;` `:` `?` `'` `"` `!` `|` `/` `\` `~` `_` `$` `%` `&` `^` `*` `-` `+` `<` `>` `(` `)` `{` `}` `[` `]` `=`.

**4. White Space:**
*   Blank spaces, horizontal tabs, carriage returns, and newlines. The compiler generally ignores these during execution, but they are essential for human readability.

**[Image Prompt]**
> *A clean, matrix-style graphic showing a grid of characters combining letters, numbers, and symbols like `{ } ; & %` glowing in green logic.*

---

## **Slide 4: Tokens in C**

**Heading:** What is a Token?

**Detailed Text:**
In a C program, the smallest individual unit known to the compiler is a **Token**. You can think of tokens like the "words" and "punctuation" in an English sentence. The compiler scans the text and breaks it into tokens to analyze the logic.

**There are 5 Main Types of Tokens:**

1.  **Keywords:**
    *   Pre-defined, reserved words that have special meaning. You cannot use them as variable names.
    *   *Examples:* `int`, `float`, `void`, `return`, `if`, `else`, `while`.
    *   *Total:* There are 32 standard keywords in C.

2.  **Identifiers:**
    *   Names given by the programmer to various program elements like variables, functions, and arrays.
    *   *Rules:* Must start with a letter or underscore. No spaces allowed.
    *   *Example:* `myScore`, `calculate_total`, `x`.

3.  **Constants (Literals):**
    *   Fixed values that do not change during the execution of a program.
    *   *Examples:* `100` (Integer), `25.5` (Float), `'A'` (Character).

4.  **Operators:**
    *   Symbols that tell the computer to perform specific mathematical or logical manipulations.
    *   *Examples:* `+` (Add), `-` (Subtract), `==` (Compare), `&&` (And).

5.  **Special Symbols (Punctuators):**
    *   Symbols used to separate or group distinct parts of the code.
    *   *Examples:* `;` (terminates a statement), `{}` (defines a block of code).

**[Code Snippet for Slide]**
```c
int total = 100 + 20;

// Breakdown:
// int   -> Keyword
// total -> Identifier
// =     -> Operator
// 100   -> Constant
// +     -> Operator
// 20    -> Constant
// ;     -> Special Symbol
```

---

## **Slide 5: Structure of a C Program**

**Heading:** Anatomy of Code

**Detailed Text:**
Every C program, no matter how complex, consists of specific sections. The compiler expects this structure to successfully build the program.

1.  **Documentation Section:** Comments (`//` or `/* */`) used to describe the code. Copied by humans, ignored by machines.
2.  **Link Section (Preprocessor Directives):** Instructions given to the compiler before execution. This usually involves importing libraries.
    *   *Example:* `#include <stdio.h>` tells the compiler to link the **St**andar**d** **I**nput **O**utput header file.
3.  **Definition Section:** Where global constants are defined (e.g., `#define PI 3.14`).
4.  **Global Declaration:** Variables declared here can be used by *all* functions in the program.
5.  **Main Function Section (`main()`):**
    *   This is the entry point. Every C program **must** have one main function. Execution always begins here.
    *   It contains two parts: The **Declaration Part** (defining variables) and the **Executable Part** (logic/math).
6.  **Subprogram Section:** User-defined functions that are called from within the main function.

**[Image Prompt]**
> *A labeled diagram of a C script. Left side shows the code, Right side shows labels pointing to specific lines: "Link Section", "Global Declaration", "Main Function Body".*

---

## **Slide 6: Compilation Process**

**Heading:** From Source to Executable

**Detailed Text:**
How does English-like code become something the CPU (which only knows 0s and 1s) understands? This transformation happens in 4 distinct stages:

1.  **Preprocessing:**
    *   *Input:* Source Code (`.c`)
    *   *Action:* Removes comments, expands macros, and includes header files.
    *   *Output:* Expanded Source Code.

2.  **Compiling:**
    *   *Input:* Expanded Code.
    *   *Action:* Checks for syntax errors (grammar) and converts the code into Assembly Language (low-level human readable instructions).
    *   *Output:* Assembly Code (`.s`).

3.  **Assembling:**
    *   *Input:* Assembly Code.
    *   *Action:* Converts assembly into pure machine code (binary/object code).
    *   *Output:* Object File (`.obj` or `.o`).

4.  **Linking:**
    *   *Input:* Object File.
    *   *Action:* Joins your object code with library code (like the code for `printf`) to create a single executable file.
    *   *Output:* Executable File (`.exe` or `.out`).

**[Image Prompt]**
> *A flowchart clearly showing the pipeline: `Source Code` → [Compiler] → `Assembly` → [Assembler] → `Object Code` → [Linker] → `Executable`. Illustrated with icons like gears for the compiler and a chain-link for the linker.*
