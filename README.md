<h1 align="center"  width="310px" >
	TSSG - The Swagger Schema Generator
</h1>
<p align="center">
	Write schema in an easy, concise and short way.<br>
</p>
<p align="center">
	<a href="#">
		<img src="https://img.shields.io/badge/Current Version-Alpha V0.1.0-yellow" alt="Current Version">
	</a>
	<a href="#">
        <img src="https://img.shields.io/badge/Documentation-In Progress-Blue" alt="Current Version">
    </a>
    <a href="#">
        <img src="https://img.shields.io/badge/PRs-Welcome-Green" alt="Current Version">
    </a>
        
</p>

---

### Vision and Motivation

Writing OpenAPI Schema can be tiresome and time wasting task if you write a lot of API Documentation. Updating existing Schema can also be cumbersome and confusing especially when project grows to hundreds of APIs.
TSSG is here to help you write schema in an easy, clean and concise way. We have proposed a new and easy to understand Syntax/Grammar for this. It allows you to write less and get full OpenAPI Schema without writing and repeating same line again and again.

### Project Roadmap

Our aim is to build a tool that helps you in splitting your APIs Schemas and Endpoints Definitions into separate files so that it's easy to maintain and update/edit the target APIs.

Below is our roadmap:

- [x] TSSG Syntax Parser (Alpha Version released)
- [x] TSSG to OpenAPI Transformer (Alpha Version released)
- [x] TSSG Editor (Alpha Version released)
- [ ] OpenAPI to TSSG Syntax Transformer (WIP)
- [ ] TSSG CLI (WIP)

### How to use?

Consider the following object Schema of `User`:

```json
{
  "type": "object",
  "properties": {
    "name": {
      "type": "string"
    },
    "age": {
      "type": "number"
    },
    "email": {
      "type": "string"
    },
    "address": {
      "type": "object",
      "properties": {
        "street": {
          "type": "string"
        },
        "city": {
          "type": "string"
        },
        "country": {
          "type": "string"
        },
        "zipcode": {
          "type": "string"
        }
      }
    }
  }
}
```

The above schema has a lot of repetition and if the schema is more complex that have nested object or array of object, it gets more complex to write.

On the other hand, with TSSG, above schema can be written as:

```
{
    name: string,
    age: number,
    email: string,
    address: {
        street: string,
        city: string,
        country: string,
        zipcode: string,
    }
}
```

We hope, we don't need to explain above syntax. It's already understandable and easy to type and read.

You only need to mention the type of the property and it will be tranformed to `{ "type": "string" }` form.

#### Supported Types

Following data types are support as of now:

- string
- number
- integer
- boolean
- {} (shorthand for object type)
- [] (shorthand for array)

### More Examples

**Required Properties**

Let's take the above example again, and add some properties as required.

```json
{
  "type": "object",
  "required": ["name", "email", "address"],
  "properties": {
    "name": {
      "type": "string"
    },
    "age": {
      "type": "number"
    },
    "email": {
      "type": "string"
    },
    "address": {
      "type": "object",
      "required": ["country"],
      "properties": {
        "street": {
          "type": "string"
        },
        "city": {
          "type": "string"
        },
        "country": {
          "type": "string"
        },
        "zipcode": {
          "type": "string"
        }
      }
    }
  }
}
```

In the above schema, we have `name`, `email` and `address` as required property and inside the `address` object we have `country` as required.

To write the above schema, you can simply do the following:

```
{
    name: !string,
    age: number,
    email: !string,
    address: !{
        street: string,
        city: string,
        country: !string,
        zipcode: string,
    }
}
```

You can mark a property as `required` by using `!` (exclamation mark) in front of data type. Above mentioned syntax will produce the exact same OpenAPI Schema shown above example.

> Notice `!` in the start of address value.

**Arrays**

Consider this simple example which accepts `data` property of type `array of string`.

```json
{
  "type": "object",
  "properties": {
    "data": {
      "type": "array",
      "items": {
        "type": "string"
      }
    }
  }
}
```

Above schema can be written in TSSG as follows:

```
{
    data: [string]
}
```

Look, how simple it is to define `array of string` in one simple line.

You can also mark `data` property as required using `!` sign.

```
{
    data: ![string]
}
```

Above TSSG syntax will produce following Schema:

```json
{
  "type": "object",
  "required": ["data"],
  "properties": {
    "data": {
      "type": "array",
      "items": {
        "type": "string"
      }
    }
  }
}
```

**Array of Objects**

Consider the following schema:

```json
{
  "type": "object",
  "properties": {
    "data": {
      "type": "array",
      "items": {
        "type": "object",
        "properties": {
          "name": {
            "type": "string"
          },
          "age": {
            "type": "number"
          },
          "email": {
            "type": "string"
          },
          "address": {
            "type": "object",
            "required": ["country"],
            "properties": {
              "street": {
                "type": "string"
              },
              "city": {
                "type": "string"
              },
              "country": {
                "type": "string"
              },
              "zipcode": {
                "type": "string"
              }
            }
          }
        }
      }
    }
  }
}
```

Above schema can be written in TSSG as follow:

```
{
    data: [{
        name: string,
        age: number,
        email: string,
        address: {
            street: string,
            city: string,
            country: string,
            zipcode: string,
        }
    }]
}
```

> If `data` property is required, just mark that required using `!` sign.

**Enums**

You can use the enum keyword to specify possible values of a request parameter or a model property. For example, consider the following schema:

```json
{
    "type": "object",
    "properties": {
        "colors": {
            "type": "string",
            "enum": [
                "red",
                "green",
                "blue"
            ]
        }
    }
}
```
Above schema can be written in TSSG as follows:
```
{
    colors: enumOf(string, "red", "green", "blue"),
}
```
## Contributors ✨

Thanks goes to these wonderful people
([emoji key](https://allcontributors.org/docs/en/emoji-key)):

<!-- ALL-CONTRIBUTORS-LIST:START - Do not remove or modify this section -->
<!-- prettier-ignore-start -->
<!-- markdownlint-disable -->
<table>
  <tr>
    <td align="center" style='margin: 5px;'>
        <a href="https://github.com/jskod"><img src="https://github.com/jskod.png" width="100px;" alt="Tauqeer Nasir"/><br /><sub><b>Tauqeer Nasir</b></sub></a><br />
        <a href="#" title="Code">💻</a> <a href="#maintenance" title="Maintenance">🚧</a> <a href="#documentation" title="Documentation">📖</a> <a href="#examples title="Examples">💡</a>
    </td>
    <td align="center"  style='margin: 5px;'>
        <a href="https://github.com/shrmaky"><img src="https://github.com/shrmaky.png" width="100px;" alt="Akshat Sharma"/><br /><sub><b>Akshat Sharma</b></sub></a><br />
        <a href="#" title="Code">💻</a> <a href="#" title="Documentation">📖</a> <a href="#examples" title="Examples">💡</a> <a href="#maintenance" title="Maintenance">🚧</a></td>
    <td align="center"  style='margin: 5px;'>
        <a href="https://github.com/mingwho"><img src="https://github.com/mingwho.png" width="100px;" alt="Ming Hu"/><br /><sub><b>Ming Hu</b></sub></a><br />
        <a href="#" title="Code">💻</a> <a href="#examples" title="Examples">💡</a> <a href="#maintenance" title="Maintenance">🚧</a></td>
  </tr>
</table>
