
# Unit 1 Lecture 3: PDF Content Draft

This content is structured for slides. You can copy and paste the text directly.

---

## **Slide 1: Arithmetic Operators**

**Heading:** Doing the Math

**Detailed Theory:**
Operators are symbols that tell the computer to perform specific mathematical or logical tasks. The most basic group is the **Arithmetic Operators**.

**The Standard Set:**
*   `+` (Addition)
*   `-` (Subtraction)
*   `*` (Multiplication)

**The Tricky Ones (Crucial for C):**
1.  **Division (`/`):**
    *   If both numbers are integers, the result is an **integer** (decimal part is lost!).
    *   *Example:* `5 / 2 = 2` (Not 2.5)
    *   To get 2.5, at least one number must be a float: `5.0 / 2 = 2.5`.

2.  **Modulus (`%`):**
    *   Returns the **Remainder** of a division.
    *   *Example:* `5 % 2 = 1` (2 goes into 5 twice, with 1 left over).
    *   *Usage:* Checking even/odd numbers, cyclical arrays.

**[Code Snippet]**
```c
int a = 10, b = 3;
printf("Div: %d", a / b); // Output: 3
printf("Mod: %d", a % b); // Output: 1
```

**[Image Prompt]**
> *Illustration of a pizza being sliced. "Division" shows sharing whole slices. "Modulus" highlights the one crumb left over.*

---

## **Slide 2: Relational & Logical Operators**

**Heading:** Making Decisions

**Detailed Theory:**
These operators allow your program to ask questions. They always return **1 (True)** or **0 (False)**.

**Relational Operators (Comparisons):**
*   `==` (Equal To) - **Warning:** Don't confuse with `=` (Assignment)!
*   `!=` (Not Equal)
*   `>` `&lt;` `>=` `<=` (Greater/Less Than)

**Logical Operators (Connector Logic):**
1.  **`&&` (AND):** True only if **BOTH** sides are True.
2.  **`||` (OR):** True if **AT LEAST ONE** side is True.
3.  **`!` (NOT):** Reverses the value (True becomes False).

**Short Circuit Rule:**
*   If the first part of an `&&` is False, the computer ignores the second part (because the whole thing must be False).

**[Code Snippet]**
```c
int age = 20;
int hasID = 1; // True

if (age >= 18 && hasID) {
    printf("Allowed Entry");
}
```

---

## **Slide 3: Bitwise Operators**

**Heading:** Hacking at the Bit Level

**Detailed Theory:**
C allows you to manipulate data at the lowest level: binary bits (0s and 1s). This is essential for systems programming and embedded devices.

**The Operators:**
*   `&` (Bitwise AND): Bits matches if both are 1.
*   `|` (Bitwise OR): Bits matches if either is 1.
*   `^` (XOR): Bits matches if they are *different*.
*   `<<` (Left Shift): Moves bits left (Multiplies by 2).
*   `>>` (Right Shift): Moves bits right (Divides by 2).

**[Image Prompt]**
> *Matrix-style visual showing two rows of binary numbers. A third row shows the result, with glowing lines connecting the bits vertically.*

---

## **Slide 4: Unary & Ternary Operators**

**Heading:** The Shortcuts

**1. Unary Operators (Increment/Decrement):**
*   **`++`**: Increases variable by 1.
*   **`--`**: Decreases variable by 1.
*   **Prefix (`++i`):** Increments **BEFORE** using the value.
*   **Postfix (`i++`):** Uses the value first, **THEN** increments.

**2. Ternary Operator (`? :`):**
*   It is a one-line replacement for `if-else`.
*   **Syntax:** `Condition ? TrueValue : FalseValue;`

**[Code Snippet]**
```c
// Unary
int a = 5;
int b = ++a; // a becomes 6, then b becomes 6

// Ternary
int max = (10 > 5) ? 10 : 5; // assigns 10 to max
```

---

## **Slide 5: Operator Precedence**

**Heading:** Order of Operations

**Detailed Theory:**
Just like PEMDAS in math, C follows a strict hierarchy. If you mix operators, C needs to know which to do first.

**The Hierarchy (Top to Bottom):**
1.  **Postfix/Parentheses:** `()` `[]` `->`
2.  **Unary:** `++` `--` `!` `sizeof`
3.  **Multiplicative:** `*` `/` `%`
4.  **Additive:** `+` `-`
5.  **Relational:** `<` `>` `<=` `>=`
6.  **Equality:** `==` `!=`
7.  **Logical AND:** `&&`
8.  **Logical OR:** `||`
9.  **Assignment:** `=` `+=`

**[Image Prompt]**
> *A ladder or pyramid diagram showing `()` at the very top and `=` at the very bottom. Icons represents the operators on each step.*
