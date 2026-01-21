
# Unit 1 Lecture 5: PDF Content Draft

This content is structured for slides. You can copy and paste the text directly.

---

## **Slide 1: Binary Basics**

**Heading:** The Language of Machines

**Detailed Theory:**
At the deepest level, computers don't understand 10, 100, or "Hello". They only understand **ON (1)** and **OFF (0)**.
*   **Bit:** A single 0 or 1.
*   **Byte:** A group of 8 bits.
*   **Decimal System (Base 10):** Uses 0-9. Each position is a power of 10 (1s, 10s, 100s).
*   **Binary System (Base 2):** Uses 0 and 1. Each position is a power of 2 (1, 2, 4, 8, 16...).

**Example:**
Binary `0000 0101` = `0 + 0 + 0 + 0 + 0 + 4 + 0 + 1` = **5** in Decimal.

**[Image Prompt]**
> *A split graphic. Left side: A human holding 10 fingers. Right side: A robot holding a switch labeled "0 | 1".*

---

## **Slide 2: Bitwise Logic Gates**

**Heading:** Manipulating Bits

**Detailed Theory:**
These operators work on the individual bits of a number, rather than the number's total value.

**1. Bitwise AND (`&`):**
*   **Rule:** 1 only if **BOTH** bits are 1.
*   **Use Case:** "Masking" - forcing specific bits to 0.

**2. Bitwise OR (`|`):**
*   **Rule:** 1 if **EITHER** bit is 1.
*   **Use Case:** Forcing specific bits to 1.

**3. Bitwise XOR (`^`):**
*   **Rule:** 1 if bits are **DIFFERENT**. (1^0=1, 1^1=0).
*   **Use Case:** Toggling bits on/off.

**[Code Snippet]**
```c
int a = 5;      // 0101
int b = 3;      // 0011

int res = a & b; // 0001 (Decimal 1)
```

---

## **Slide 3: Negative Numbers (Two's Complement)**

**Heading:** How Computers Store Negatives

**Detailed Theory:**
Computers don't have a specific "Negative Sign" slot. Instead, they use a math trick called **Two's Complement**.

**Steps to Negative:**
To find `-5` in binary:
1.  take `5` (0000 0101).
2.  **Invert** all bits (1111 1010) - This is One's Complement (`~`).
3.  **Add 1** (1111 1011).

**Visual:**
`1111 1111` is -1.
`0000 0000` is 0.

**[Image Prompt]**
> *A mirror reflection. Top number is "00000101". Formatting text "NOT". Bottom reflection is dark and inverted "11111010".*

---

## **Slide 4: Shift Operators**

**Heading:** Moving Bits Left and Right

**Detailed Theory:**
We can slide the bits inside a byte to the left or right.

**1. Left Shift (`<<`):**
*   Shifts bits left. New empty spots are filled with 0s.
*   **Math Effect:** Multiplies the number by 2 for every shift.
*   `5 << 1` → `10`

**2. Right Shift (`>>`):**
*   Shifts bits right. Bits fall off the edge.
*   **Math Effect:** Divides the number by 2 (integer division).
*   `10 >> 1` → `5`

**[Image Prompt]**
> *An assembly line belt moving blocks labeled "1" and "0" to the left, with new "0" blocks being added at the start.*

---

## **Slide 5: The Bit Manipulation Quartet**

**Heading:** Essential Patterns

**Detailed Theory:**
Systems programmers use these four standard patterns to control hardware flags (like turning on a specific LED on a microcontroller).

Assume `n` is your number and `k` is the position of the bit you want to change.

1.  **Set a bit (Turn ON):**
    `n = n | (1 << k);`
2.  **Clear a bit (Turn OFF):**
    `n = n & ~(1 << k);`
3.  **Toggle a bit (Flip):**
    `n = n ^ (1 << k);`
4.  **Check a bit (Read):**
    `if (n & (1 << k))`

**[Code Snippet]**
```c
// Turn on the 3rd bit of 'flags'
flags = flags | (1 << 3);

// Check if 3rd bit is on
if (flags & (1 << 3)) {
    printf("Active!");
}
```
