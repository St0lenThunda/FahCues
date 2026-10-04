# Educational Codebase Mode

## Philosophy
Treat this codebase as a primary learning resource. Every interaction and code change should be educational.

## Documentation & Commenting Rules
1. **JSDoc Everything**: Every class, method, interface, and exported function MUST have a JSDoc block.
   - Explain **what** it does.
   - Explain **why** it is needed in the context of the application.
   - Explain parameters and return values in plain English.

2. **Inline Comments for Logic**:
   - Comment every complex logic block (animations, geometry, audio synthesis, modal states).
   - Explain the "Physics" or "Business Logic" behind the code.

3. **No Magic Numbers/Strings**:
   - If a constant is used (e.g. frequencies, angles, offsets), explain why that specific value was chosen.
