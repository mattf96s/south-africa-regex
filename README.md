# south-africa-regex

## Overview

south-africa-regex is a collection of typescript regex (or similar) functions specific to **South Africa**.

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

## Documentation

#### Identity Number

Usual [validation](https://www.westerncape.gov.za/general-publication/decoding-your-south-african-id-number-0#:~:text=A%20South%20African%20ID%20number,used%20to%20define%20your%20gender.) for an identity number except the citizen value can be [0, 1, 2] with the latter representing a [refugee](https://www.refworld.org/docid/52a8458d4.html).

This is then validated with a [Luhn algorithm](https://en.wikipedia.org/wiki/Luhn_algorithm) .

The input is trimmed and checked to ensure it only contains numbers.

#### Tax Identification Number

#### VAT Number

#### Cellphone Number

#### Geographic Number

#### Non-Geographic Number

#### Geographic or Non-Geographic Number

#### Luhn Algorithm

## Issues

The bundle size is much larger than it should be. This is something that will be addressed.

## License

south-africa-regex is [GPLv3 licensed](https://www.gnu.org/licenses/quick-guide-gplv3.html)
