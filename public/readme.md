<h1 align="center"  width="310px" >
	TSSG - The Swagger Schema Generator
</h1>
<p align="center">
	Write schema in an easy, concise and short way.<br>
</p>


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

-   `string` (shorthand `s`)
-   `number` (shorthand `n`)
-   `integer` (shorthand `i`)
-   `boolean` (shorthand `b`)
-   `{}` (shorthand for object type)
-   `[]` (shorthand for array)

> Mark a field `required` with `!` sign

### More Examples

**Required Properties**

Let take the above example again, and add some properties as required.

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

Above schema can be written in TSSG as follow:

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

> If `data` property is needed to be required, just mark that required using `!` sign.
