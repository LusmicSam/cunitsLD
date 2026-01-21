
# Unit 1 Lecture 2: PDF Content Draft

This content is structured for slides. You can copy and paste the text directly.

---

## **Slide 1: Variables (Data Storage)**

**Heading:** Containers of Code

**Detailed Theory:**
In computer programming, data is not stored in a vacuum. It is stored in hardware memory (RAM). However, we don't refer to memory by its binary address (e.g., `0x7fff40`). Instead, we use names.

A **Variable** is a named memory location used to store data that can change (vary) during program execution.

**Visualizing Variables:**
Think of a variable as a labeled storage box.
*   **The Box:** The memory (RAM) allocated.
*   **The Label:** The variable name (Identifier).
*   **The Contents:** The value stored inside.

**Syntax of Creating a Variable:**
1.  **Declaration:** Tells the OS to reserve space.
    *   `int age;` (Reserves 4 bytes for an integer named 'age')
2.  **Assignment:** Puts a value into that space.
    *   `age = 25;` (Stores the binary representation of 25 in those bytes)
3.  **Initialization:** Declaring and assigning in one step.
    *   `int age = 25;`

**[Image Prompt]**
> *A 3D illustration of a cardboard box with a label "Score" written on the side. The box is open, and inside sits a glowing number "100". The background has faint binary code patterns.*

---

## **Slide 2: Data Types (Shapes & Sizes)**

**Heading:** Defining Data Shapes

**Detailed Theory:**
C is a **Statically Typed** language. This means you must tell the compiler exactly what *kind* of data you plan to store in a variable *before* you use it. This allows C to be extremely memory-efficient.

**The 4 Primitive Data Types:**

1.  **`int` (Integer):**
    *   **Usage:** Whole numbers (counting, indices, math).
    *   **Size:** Usually 2 or 4 bytes.
    *   **Example:** `10`, `-5`, `0`.
    *   **Format Specifier:** `%d`

2.  **`float` (Floating Point):**
    *   **Usage:** Decimal numbers (precision up to 6 decimal places).
    *   **Size:** 4 bytes.
    *   **Example:** `3.14`, `0.005`.
    *   **Format Specifier:** `%f`

3.  **`char` (Character):**
    *   **Usage:** Single text characters (letters, symbols).
    *   **Size:** 1 byte.
    *   **Example:** `'A'`, `'z'`, `'#'`. (Note: Must use single quotes!)
    *   **Format Specifier:** `%c`

4.  **`double` (Double Precision):**
    *   **Usage:** Large decimal numbers or high precision (up to 15 decimal places).
    *   **Size:** 8 bytes.
    *   **Format Specifier:** `%lf`

**[Code Snippet]**
```c
int count = 10;       // Integer
float temp = 98.6;    // Float
char grade = 'A';     // Character
double reallyBig = 1234.56789123; // Double
```

---

## **Slide 3: Input & Output (I/O)**

**Heading:** Talking to the User

**Detailed Theory:**
Programs are useless if they can't interact with the outside world. In C, we use the Standard Input/Output Library (`stdio.h`) to read input and write output.

**1. Output: `printf()`**
*   "Print Formatted". It writes text to the screen (console).
*   It uses **Format Specifiers** (placeholder symbols starting with `%`) to insert variable values into the text.

**Example Code:**
```c
int age = 20;
printf("I am %d years old", age); 
// Output: I am 20 years old
```

**2. Input: `scanf()`**
*   "Scan Formatted". It reads data from the keyboard.
*   **CRITICAL RULE:** You must use the **Address-of Operator (`&`)** before the variable name. This tells `scanf` *where* in memory to put the input data.

**Example Code:**
```c
int score;
scanf("%d", &score); // Correct
// scanf("%d", score); // CRASH! Missing &
```

**[Image Prompt]**
> *Split screen illustration. Left side shows a keyboard with an arrow pointing INTO the computer (Input/scanf). Right side shows a monitor with an arrow coming OUT (Output/printf).*

---

## **Slide 4: Type Modifiers & Modifiers Table**

**Heading:** Tweaking Data Types

**Detailed Theory:**
Sometimes the basic types aren't perfect. Standard `int` might be too small for a population count, or `float` might not have enough precision for rocket science. C uses **Modifiers** to alter the range and size of data types.

**Common Modifiers:**

1.  **`unsigned`**:
    *   Removes negative numbers.
    *   Doubles the positive range!
    *   *Usage:* `unsigned int population;` (Because population can't be negative).

2.  **`long`**:
    *   Increases memory size (usually doubles it).
    *   *Usage:* `long long int national_debt;`

3.  **`short`**:
    *   Decreases memory size (saves RAM).
    *   *Usage:* `short int age;` (You don't need 4 billion numbers for age).

**[Code Example]**
```c
short int smallNum = 32000;      // 2 bytes
long int bigNum = 1000000;       // 4 or 8 bytes
unsigned int noNegatives = 500;  // 0 to 4 Billion
```

---

## **Slide 5: Common Pitfalls**

**Heading:** Safety First

**Text:**
C gives you raw power, which means it doesn't protect you from mistakes. Two common dangers:

1.  **Integer Overflow:**
    *   If you add 1 to the maximum possible value of a variable, it doesn't stay at the max. It "wraps around" to the lowest negative value!
    *   *Analogy:* Like a car odometer rolling from 999999 back to 000000.

2.  **The `&` in scanf:**
    *   Forgetting the ampersand (`&`) in `scanf` is the #1 beginner mistake. It causes memory access violations and crashes your program immediately.

**[Image Prompt]**
> *A warning sign graphic (yellow triangle with exclamation mark). Next to it, text showing code `scanf("%d", a);` with a big red X, and `scanf("%d", &a);` with a green Checkmark.*
