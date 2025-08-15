/**
 * TODO
 * 
 * All out of order but needs to get done. 
 * 
 * Also, this is not supposed to be as expansive as something like Remeda, Rambda, lodash, underscore, etc. but can be inspired by or some functionality brought over to this one.
 * 
 * 1. JSDocs/TSDocs it up (examples, defaults, description)
 * 2. Configure project structure and available on NPM/JSR as package.
 * 3. Ensure there is no external library use!
 * 4. Tests???
 * 5. Add tsconfig.json
 * 6. Add .gitignore
 * 7. Update README.md with project description, rules/contraints for repo, and other info I can't think of right now.
 * 8. Look into making these more flexible (if needed).
 * 9. Use explicit return types when function is complete so it's clear about it's intended functional output
 * 10. If there is a utility that is commonly needed but is too complex for this repo we should recommend a good library in the README to a very good up-to-dateish solution. For example, `fast-sort` for immutable sorting methods. We could also look into copying logic into this repo if it is feasbile to do so.
 * 11. Potentially add benchmarks for all utils???
 * 12. Create a package.json file
 * 12. Pin down whether or not we use node or bun. Unfortunately, deno will not make the cut.
 */

/** Maximum allowed range is 1000 numbers */
type NumericRange<START extends number, END extends number, ARR extends unknown[] = [], ACC extends number = never> = ARR['length'] extends END ? ACC | START | END : NumericRange<START, END, [...ARR, 1], ARR[START] extends undefined ? ACC : ACC | ARR['length']>;

function formatNumber(value: number | null | undefined, precision?: NumericRange<0, 100>): string {
  if (typeof value === 'number' && !isNaN(value)) {
    return new Intl.NumberFormat(
      'en-US',
      {
        minimumFractionDigits: 0,
        maximumFractionDigits: precision ?? 100 // Must be between 0-100. Default to 100.
      }
    ).format(value);
  }

  return '';
}

function padNumber(value: number | null | undefined, padAmount?: NumericRange<1, 21>): string {
  if (typeof value === 'number' && !isNaN(value)) {
    return new Intl.NumberFormat(
      'en-US',
      {
        minimumIntegerDigits: padAmount ?? 1, // Default must be between 1-21. Default to 1.
        useGrouping: false, // Remove number grouping separators (commas, semi-colons, etc.)
      }
    ).format(value);
  }

  return '';
}

function millify(value: number | null | undefined, precision?: NumericRange<0, 100>): string {
  if (typeof value === 'number' && !isNaN(value)) {
    return new Intl.NumberFormat(
      'en-US',
      {
        notation: 'compact',
        // compactDisplay: 'long',
        maximumFractionDigits: precision ?? 2, // Must be between 0-100. Default to 2.
      }
    ).format(value);
  }

  return '';
}

// Examples
console.log('FORMAT NUMBER')
console.log(formatNumber(16))
console.log(formatNumber(16, 0))
console.log(formatNumber(16, 2))
console.log(formatNumber(27.65890908))
console.log(formatNumber(27.65890908, 0))
console.log(formatNumber(27.65890908, 2))
console.log(formatNumber(27.65890908, 100))

console.log('PAD NUMBER')
console.log(padNumber(7))
console.log(padNumber(7, 4))

console.log('MILLIFY')
console.log(millify(1234));
console.log(millify(1000000));
console.log(millify(1230000));
console.log(millify(1230000.7898798));