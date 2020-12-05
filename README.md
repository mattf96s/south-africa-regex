# south-africa-regex

## Overview

_south-africa-regex_ is a collection of typescript regex (or similar) functions specific to **South Africa**.

Currently, the bundle size is much larger than it should be. So I recommend just taking the regex directly.

- Identity Document
- Tax Income Number
- VAT Number
- Geographic Phone Numbers
- Non-Geographic Phone Numbers
- Cell Phone Numbers
- Luhn Algorithm (not specific to South Africa 😛)

## Usage

```
import { isValidIdNumber } from "south-africa-regex";
const { error, msg } = isValidIdNumber("9202204720082");
if (error) {
	// do something
}
```

### Yup

```
export const CompanyDetailsSchema = Yup.object().shape({
	idNumber:  Yup.string()
		.required("Required")
		.test("test-name", "Validation failure message", function (value) {

			const { path, createError } = this;
			const { error, msg } = isValidIdNumber(value);

			if (error) {
				return  createError({ path, message:  msg });
			}

			return  true;
		}
	),
});
```

---

## Documentation

## Identity Number

- Usual [validation](https://www.westerncape.gov.za/general-publication/decoding-your-south-african-id-number-0#:~:text=A%20South%20African%20ID%20number,used%20to%20define%20your%20gender.) for an identity number except the citizen value can be [0, 1, 2] with the latter representing a [refugee](https://www.refworld.org/docid/52a8458d4.html).
- This is then validated with a [Luhn algorithm](https://en.wikipedia.org/wiki/Luhn_algorithm) .

#### Regex

```
/^(((?:([02468][048])|(?:[13579][26]))((?:(?:0[13578]|1[02])(?:0[1-9]|[12]\d|3[01]))|(?:(?:0[469]|11)(?:0[1-9]|[12]\d|30))|(?:02(?:0[1-9]|1\d|2[0-9])))|(?:([02468][1235679])|(?:[123569][01345789]))((?:(?:0[13578]|1[02])(?:0[1-9]|[12]\d|3[01]))|(?:(?:0[469]|11)(?:0[1-9]|[12]\d|30))|(?:02(?:0[1-9]|1\d|2[0-8]))))(\d{4}[012]8\d))$/
```

#### Construction

```
  const leapYears = /(?:([02468][048])|(?:[13579][26]))/
  const normalYears = /(?:([02468][1235679])|(?:[123569][01345789]))/
  const month31 = /(?:(?:0[13578]|1[02])(?:0[1-9]|[12]\d|3[01]))/
  const month30 = /(?:(?:0[469]|11)(?:0[1-9]|[12]\d|30))/
  const month29 = /(?:02(?:0[1-9]|1\d|2[0-9]))/
  const month28 = /(?:02(?:0[1-9]|1\d|2[0-8]))/

  const leapYearDate = new RegExp(
    `${leapYears.source}(${month31.source}|${month30.source}|${month29.source})`
  );

  const normalYearsDate = new RegExp(
    `${normalYears.source}(${month31.source}|${month30.source}|${month28.source})`
  );

  const fullDate = new RegExp(
    `${leapYearDate.source}|${normalYearsDate.source}`
  );

  const sex = /\d{4}/;
  const citizen = /[012]/;
  const oldRaceIdentifier = /8/;
  const checkDigit = /\d/;
  const rest = new RegExp(
    `${sex.source}${citizen.source}${oldRaceIdentifier.source}${checkDigit.source}`
  );

  const fullRegex = new RegExp(`^((${fullDate.source})(${rest.source}))\$`);

```

---

## Tax Identification Number

- This is not the same as a VAT number.
- Also validated by the Luhn algorithm.
- Info is available [here](https://web.archive.org/web/20200228072949/http://www.oecd.org/tax/automatic-exchange/crs-implementation-and-assistance/tax-identification-numbers/South-Africa-TIN.pdf).

#### Regex

```
/^(?:0|1|2|3|9)\d{9}$/
```

#### Construction

| code | description |
|---|---|
|`(?:0\|1\|2\|3\|9)`| starts with 0, 1, 2, 3, 9 within a non-capturing group  |
|`\d{9}` | followed by nine numbers|

---

## VAT Number

- This is not the same as a Tax Income number.
- Although it doesn't state so, it seems like this number also follows a luhn algorithm. All the examples on the info website pass.
- Info is available [here](https://secure.sarsefiling.co.za/VATVendorSearch/application/help.html).

#### Regex

```
/^4\d{9}$/
```

#### Construction

| code     | description             |
| -------- | ----------------------- |
| `^4`     | must begin with a four  |
| `\d{9}$` | followed by nine digits |

---

## Cellphone Number

- Cellphone numbers that a normal person can own.
- Cellphone numbers are non-geographic and have the following beginning 3 digits: 060 to 084 but excluding 075 and 080.
- Info is available [here](https://www.icasa.org.za/uploads/files/NumberingPlanReg.pdf) from page 21 onwards.

#### Regex

```
/^(?:\+27|0)(?:6\d|7[0-4]|7[6-9]|8[1-4])\d{7}$/
```

#### Construction

| code     | description     |
| -------- | --------------- |
| `(?:\+27\|0)`             | calling code or international code within a non-capture group |
| `(?:6\d\|7[0-4]\|7[6-9]\|8[1-4])` | 2nd and 3rd digits (which can be (60-74), (76-79), (81-84), for cellphone numbers) within a non-capture group |
| `\d{7}`  | 7 normal digits |

---

## Geographic Number

- What is commonly referred to as a landline.
- As opposed to non-geographic numbers, the 2nd digit can only be one of 1, 2, 3, 4, 5.
- Info available [here](https://www.icasa.org.za/uploads/files/NumberingPlanReg.pdf) at page 21.

#### Regex

```
/^(?:\+27|0)[1-5]\d{8}$/
```

| code     | description                                               |
| -------- | --------------------------------------------------------- |
| `(?:\+27\|0)`                                                       | calling code or international code within a non-capture group |
| `[1-5]`  | 2nd digit (which can be 1,2,3,4,5 for geographic numbers) |
| ` \d{8}` | 8 normal digits                                           |

---

## Non-Geographic Number

- This includes normal cellphone numbers, toll-free services, inbound services, VoIP, Mass calling services, future non-geopgraphic services, premium rated services including adult services, machine related services.
- Info available [here](https://www.icasa.org.za/uploads/files/NumberingPlanReg.pdf) at page 21, 24-26.

#### Regex

```
/^(?:\+27|0)[6-9]\d{8}$/
```

### Construction

| code          | description                                                 |
| ------------- | ----------------------------------------------------------- |
| `(?:\+27\|0)` | calling code or international code within non-capture group |
| `[6-9]`       | 2nd digit which can be 6,7,8,9 for geographic numbers       |
| `\d{8}`       | 8 normal digits                                             |

---

## Geographic or Non-Geographic Number

- Valid number (Geographic or non-geographic).
- Info available [here](https://www.icasa.org.za/uploads/files/NumberingPlanReg.pdf) at page 21 onwards.

#### Regex

```
/^(?:\+27|0)[1-9]\d{8}$/
```

#### Construction

| code       | description                      |
| ---------- | -------------------------------- | 
| `(?:\+27\|0)`                           | calling code or international code without capture group |
| `[1-9]`    | 2nd digit cannot be zero         |
| `\d{8}`    | last 8 digits can be any numbers |

---

## Luhn Algorithm

Taken and slightly modified from [here](https://gist.github.com/ShirtlessKirk/2134376)

---

## Issues

The bundle size is much larger than it should be. This is something that will be addressed.

## License

south-africa-regex is [GPLv3 licensed](https://www.gnu.org/licenses/quick-guide-gplv3.html)
