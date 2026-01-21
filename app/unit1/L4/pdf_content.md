
# Unit 1 Lecture 4: PDF Content Draft

This content is structured for slides. You can copy and paste the text directly.

---

## **Slide 1: Relational Operators**

**Heading:** Decisions, Decisions

**Detailed Theory:**
Relational operators allow the computer to compare two values. In C, the result of a comparison is always an integer:
*   **1** represents **True**
*   **0** represents **False**

**The Operators:**
*   `>` (Greater Than)
*   `<` (Less Than)
*   `>=` (Greater or Equal)
*   `<=` (Less or Equal)
*   `==` (Equal To) - **Warning:** Don't confuse with `=` (Assignment)!
*   `!=` (Not Equal)

**The Float Trap:**
Computers cannot store some decimal numbers perfectly.
*   *Example:* `0.1 + 0.2` might equal `0.30000000000000004` inside the CPU.
*   **Result:** `if (0.1 + 0.2 == 0.3)` might be **FALSE**.
*   **Rule:** Never compare floating point numbers with `==`.

**[Image Prompt]**
> *A futuristic "Scale of Justice". One side holds a glowing "A", the other holds a "B". The scale tips to show one is heavier (greater) than the other.*

---

## **Slide 2: Logical Operators**

**Heading:** The Logic Gates

**Detailed Theory:**
Logical operators combine multiple conditions to form complex decision trees.

**1. AND (`&&`)**
*   Returns True only if **ALL** conditions are True.
*   *Real World:* You can log in if (User is Valid) **AND** (Password is Correct).

**2. OR (`||`)**
*   Returns True if **ANY** condition is True.
*   *Real World:* You lose the game if (Health is 0) **OR** (Time is 0).

**3. NOT (`!`)**
*   Reverses the value.
*   *Example:* `!True` = `False`.

**Short-Circuit Evaluation:**
C is efficient (and lazy).
*   In `(A && B)`, if A is False, C stops immediately. It doesn't check B because the result is already doomed to be False.
*   This is useful to prevent crashes, e.g., `if (x != 0 && 10/x > 1)`. If x is 0, the second part (dividing by zero) is never run!

**[Code Snippet]**
```c
int age = 25;
int hasTicket = 1;

if (age >= 18 && hasTicket) {
    printf("Enter Concert");
}
```

---

## **Slide 3: Logical vs Bitwise Confusion**

**Heading:** The Double-Symbol Trap

**Detailed Theory:**
One of the most common beginner bugs in C is swapping logical operators (double symbols) with bitwise operators (single symbols).

**The Difference:**
*   `&&` (Logical AND): Checks if both statements are true. Returns 1 or 0.
*   `&` (Bitwise AND): Mashes the binary bits of two numbers together. Returns a new number.

**Why it matters:**
`if (5 & 4)` evaluates to `4` (which is True in C), but `if (5 && 4)` evaluates to `1`. While often similar in "truthiness", using the wrong one breaks short-circuit logic and can cause subtle math errors.

**[Image Prompt]**
> *A warning sign showing "&&" (Green Check) vs "&" (Red X) in an `if` statement context.*

---

## **Slide 4: Advanced Logic & De Morgan's Laws**

**Heading:** Master Class Logic

**De Morgan's Laws:**
A way to simplify complex "NOT" logic.
1.  `!(A && B)` is the same as `!A || !B`
    *   *Translation:* "Not (Rich AND Famous)" means "Not Rich OR Not Famous".
2.  `!(A || B)` is the same as `!A && !B`

**Logic Order of Operations:**
Just like math, logic has precedence when mixed:
1.  **NOT (`!`)** happens first.
2.  **AND (`&&`)** happens second.
3.  **OR (`||`)** happens last.

*Example:* `!A || B && C` is treated as `(!A) || (B && C)`.

**[Code Snippet]**
```c
// Complex
if (!((age > 18) && (hasID == 1))) ...

// Simplified (De Morgan)
if ((age <= 18) || (hasID == 0)) ...
```

---

## **Slide 5: The Ternary Operator**

**Heading:** The One-Liner

**Detailed Theory:**
The Conditional Operator (`? :`) is the only operator in C that takes three operands. It is a shorthand for `if-else`.

**Syntax:**
`Condition ? TrueValue : FalseValue;`

**When to use:**
Use it for simple assignments to keep code clean. Avoid it for complex logic blocks.

**[Code Snippet]**
```c
// The Long Way
if (a > b)
    max = a;
else
    max = b;

// The Ternary Way
max = (a > b) ? a : b;
```

**[Image Prompt]**
> *A fork in the road. A signpost asks "Condition?". The left path says "True", the right path says "False".*
