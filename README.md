#### Lightweight CLI http client.

`joj` lets you manage request collections with plain javascript files.

#### Usage

```
npm install -g joj
```

Create a request file:
```js
#!/usr/bin/env joj

url('https://jsonplaceholder.typicode.com/todos/3')
method('get')
header('accepts', 'application/json')
```

Give it execution permissions:
```
chmod +x my_request_file.js
```

And execute it:
```
./my_request_file.js
```

`joj` outputs the status code, headers, and body of the response as json. This is useful for piping the output to tools like [jq](https://github.com/stedolan/jq).


#### Using environment variables

Define a file called `blue.env.json` in the same folder as your request files:
```js
{
    "MY_API": "https://example.com"
}
```

Then, in your request files:
```js
env('blue')
url(useenv('{{MY_API}}/veryimportant/todos'))
```

By default, `joj` tries to load a file called `default.env.json`.
