export const simpleExample = `{
  name: !string,
  age: number,
  email: string,
  phone: !n,
  address: s,
  isVerified: b,
}`;

export const objectSchemaExample = `{
  name: !string,
  age: number,
  email: s,
  phone: !n,
  address: {
    street: string,
    city: string,
    country: string,
    zipcode: string,
  },
  isVerified: boolean,
}`;

export const arraySchemaExample = `{
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
}`;

export const mixedSchemaExample = `{
  name: !string,
  age: number,
  email: !string,
  phoneNumbers: ![string],
  address: !{
    street: string,
    city: string,
    country: !string,
    zipcode: string,
  },
  posts: [{
    _id: !s,
    title: !s,
    content: s,
    views: integer,
    commentsCount: i,
  }]
}`;

export const enumsExample = `{
    colors: enumOf(string, "red", "green", "blue"),
}`;
